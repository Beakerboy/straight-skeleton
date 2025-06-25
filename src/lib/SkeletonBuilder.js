import {Skeleton} from "./Skeleton";
import {HashSet, List, Dictionary} from "./Utils";
import Vector2d from "./Primitives/Vector2d";
import PriorityQueue from "./Primitives/PriorityQueue";
import Edge from "./Circular/Edge";
import Vertex from "./Circular/Vertex";
import CircularList from "./Circular/CircularList";
import FaceQueue from "./Path/FaceQueue";
import SkeletonEvent from "./Events/SkeletonEvent";
import FaceQueueUtil from "./Path/FaceQueueUtil";
import LavUtil from "./LavUtil";
import PrimitiveUtils from "./Primitives/PrimitiveUtils";
import LineParametric2d from "./Primitives/LineParametric2d";
import {FaceNode} from "./Path/FaceNode";
import MultiEdgeEvent from "./Events/MultiEdgeEvent";
import EdgeEvent from "./Events/EdgeEvent";
import PickEvent from "./Events/PickEvent";
import MultiSplitEvent from "./Events/MultiSplitEvent";
import SingleEdgeChain from "./Events/Chains/SingleEdgeChain";
import SplitChain from "./Events/Chains/SplitChain";
import SplitEvent from "./Events/SplitEvent";
import VertexSplitEvent from "./Events/VertexSplitEvent";
import EdgeChain from "./Events/Chains/EdgeChain";
import LineLinear2d from "./Primitives/LineLinear2d";
import EdgeResult from "./EdgeResult";
import ChainType from "./Events/Chains/ChainType";

export default class SkeletonBuilder {
	static SplitEpsilon = 1e-10;

	static BuildFromGeoJSON(multipolygon) {
		const allEdges = new List();
		const allDistances = new Dictionary();

		for (const polygon of multipolygon) {
			if (polygon.length > 0) {
				const outer = this.ListFromCoordinatesArray(polygon[0]);
				const holes = new List();

				for (let i = 1; i < polygon.length; i++) {
					holes.push(this.ListFromCoordinatesArray(polygon[i]));
				}

				const skeleton = this.Build(outer, holes);

				for (const edge of skeleton.Edges) {
					allEdges.push(edge);
				}

				for (const [key, distance] of skeleton.Distances.entries()) {
					allDistances.push(key, distance);
				}
			}
		}

		return new Skeleton(allEdges, allDistances);
	}

	static ListFromCoordinatesArray(arr) {
		const list = new List();

		for (const [x, y] of arr) {
			list.push(new Vector2d(x, y));
		}

		return list;
	}

	static Build(polygon, holes = null) {
		polygon = this.InitPolygon(polygon);
		holes = this.MakeClockwise(holes);

		const queue = new PriorityQueue(3, new SkeletonEventDistanseComparer());
		const sLav = new HashSet();
		const faces = new List();
		const edges = new List();

		this.InitSlav(polygon, sLav, edges, faces);

		if (holes !== null) {
			for (const inner of holes) {
				this.InitSlav(inner, sLav, edges, faces);
			}
		}

		this.InitEvents(sLav, queue, edges);

		let count = 0;
		while (!queue.Empty) {
			count = this.AssertMaxNumberOfInteraction(count);
			const levelHeight = queue.Peek().Distance;

			for (const event of this.LoadAndGroupLevelEvents(queue)) {
				if (event.IsObsolete)
					continue;

				if (event instanceof EdgeEvent)
					throw new Error("All edge@events should be converted to MultiEdgeEvents for given level");
				if (event instanceof SplitEvent)
					throw new Error("All split events should be converted to MultiSplitEvents for given level");
				if (event instanceof MultiSplitEvent)
					this.MultiSplitEvent(event, sLav, queue, edges);
				else if (event instanceof PickEvent)
					this.PickEvent(event);
				else if (event instanceof MultiEdgeEvent)
					this.MultiEdgeEvent(event, queue, edges);
				else
					throw new Error("Unknown event type: " + event.GetType());
			}

			this.ProcessTwoNodeLavs(sLav);
			this.RemoveEventsUnderHeight(queue, levelHeight);
			this.RemoveEmptyLav(sLav);
		}

		return this.AddFacesToOutput(faces);
	}

	static InitPolygon(polygon) {
		if (polygon === null)
			throw new Error("polygon can't be null");

		if (polygon[0].Equals(polygon[polygon.length - 1]))
			throw new Error("polygon can't start and end with the same point");

		return this.MakeCounterClockwise(polygon);
	}

	static ProcessTwoNodeLavs(sLav) {
		for (const lav of sLav) {
			if (lav.Size === 2) {
				const first = lav.First();
				const last = first.Next;

				FaceQueueUtil.ConnectQueues(first.LeftFace, last.RightFace);
				FaceQueueUtil.ConnectQueues(first.RightFace, last.LeftFace);

				first.IsProcessed = true;
				last.IsProcessed = true;

				LavUtil.RemoveFromLav(first);
				LavUtil.RemoveFromLav(last);
			}
		}
	}

	static RemoveEmptyLav(sLav) {
		sLav.RemoveWhere(circularList => circularList.Size === 0);
	}

	static MultiEdgeEvent(event, queue, edges) {
		const center = event.V;
		const edgeList = event.Chain.EdgeList;

		const previousVertex = event.Chain.PreviousVertex;
		previousVertex.IsProcessed = true;

		const nextVertex = event.Chain.NextVertex;
		nextVertex.IsProcessed = true;

		const bisector = this.CalcBisector(center, previousVertex.PreviousEdge, nextVertex.NextEdge);
		const edgeVertex = new Vertex(center, event.Distance, bisector, previousVertex.PreviousEdge,
			nextVertex.NextEdge);

		this.AddFaceLeft(edgeVertex, previousVertex);

		this.AddFaceRight(edgeVertex, nextVertex);

		previousVertex.AddPrevious(edgeVertex);

		this.AddMultiBackFaces(edgeList, edgeVertex);

		this.ComputeEvents(edgeVertex, queue, edges);
	}

	static AddMultiBackFaces(edgeList, edgeVertex) {
		for (const edgeEvent of edgeList) {
			const leftVertex = edgeEvent.PreviousVertex;
			leftVertex.IsProcessed = true;
			LavUtil.RemoveFromLav(leftVertex);

			const rightVertex = edgeEvent.NextVertex;
			rightVertex.IsProcessed = true;
			LavUtil.RemoveFromLav(rightVertex);

			this.AddFaceBack(edgeVertex, leftVertex, rightVertex);
		}
	}

	static PickEvent(event) {
		const center = event.V;
		const edgeList = event.Chain.EdgeList;

		const vertex = new Vertex(center, event.Distance, LineParametric2d.Empty, null, null);
		vertex.IsProcessed = true;

		this.AddMultiBackFaces(edgeList, vertex);
	}

	static MultiSplitEvent(event, sLav, queue, edges) {
		const chains = event.Chains;
		const center = event.V;

		this.CreateOppositeEdgeChains(sLav, chains, center);

		chains.Sort(new ChainComparer(center));

		let lastFaceNode = null;

		let edgeListSize = chains.length;
		for (let i = 0; i < edgeListSize; i++) {
			const chainBegin = chains[i];
			const chainEnd = chains[(i + 1) % edgeListSize];

			const newVertex = this.CreateMultiSplitVertex(chainBegin.NextEdge, chainEnd.PreviousEdge, center, event.Distance);

			const beginNextVertex = chainBegin.NextVertex;
			const endPreviousVertex = chainEnd.PreviousVertex;

			this.CorrectBisectorDirection(newVertex.Bisector, beginNextVertex, endPreviousVertex, chainBegin.NextEdge, chainEnd.PreviousEdge);

			if (LavUtil.IsSameLav(beginNextVertex, endPreviousVertex)) {
				const lavPart = LavUtil.CutLavPart(beginNextVertex, endPreviousVertex);

				const lav = new CircularList();
				sLav.Add(lav);
				lav.AddLast(newVertex);
				for (const vertex of lavPart)
					lav.AddLast(vertex);
			} else {
				LavUtil.MergeBeforeBaseVertex(beginNextVertex, endPreviousVertex);
				endPreviousVertex.AddNext(newVertex);
			}

			this.ComputeEvents(newVertex, queue, edges);
			lastFaceNode = this.AddSplitFaces(lastFaceNode, chainBegin, chainEnd, newVertex);
		}

		edgeListSize = chains.length;
		for (let i = 0; i < edgeListSize; i++) {
			const chainBegin = chains[i];
			const chainEnd = chains[(i + 1) % edgeListSize];

			LavUtil.RemoveFromLav(chainBegin.CurrentVertex);
			LavUtil.RemoveFromLav(chainEnd.CurrentVertex);

			if (chainBegin.CurrentVertex !== null)
				chainBegin.CurrentVertex.IsProcessed = true;
			if (chainEnd.CurrentVertex !== null)
				chainEnd.CurrentVertex.IsProcessed = true;
		}
	}

	static CorrectBisectorDirection(bisector, beginNextVertex, endPreviousVertex, beginEdge, endEdge) {
		const beginEdge2 = beginNextVertex.PreviousEdge;
		const endEdge2 = endPreviousVertex.NextEdge;

		if (beginEdge !== beginEdge2 || endEdge !== endEdge2)
			throw new Error();

		if (beginEdge.Norm.Dot(endEdge.Norm) < -0.97) {
			const n1 = PrimitiveUtils.FromTo(endPreviousVertex.Point, bisector.A).Normalized();
			const n2 = PrimitiveUtils.FromTo(bisector.A, beginNextVertex.Point).Normalized();
			const bisectorPrediction = this.CalcVectorBisector(n1, n2);

			if (bisector.U.Dot(bisectorPrediction) < 0)
				bisector.U.Negate();
		}
	}

	static AddSplitFaces(lastFaceNode, chainBegin, chainEnd, newVertex) {
		if (chainBegin instanceof SingleEdgeChain) {
			if (lastFaceNode === null) {
				const beginVertex = this.CreateOppositeEdgeVertex(newVertex);

				newVertex.RightFace = beginVertex.RightFace;
				lastFaceNode = beginVertex.LeftFace;
			} else {
				if (newVertex.RightFace !== null)
					throw new Error("newVertex.RightFace should be null");

				newVertex.RightFace = lastFaceNode;
				lastFaceNode = null;
			}
		} else {
			const beginVertex = chainBegin.CurrentVertex;
			this.AddFaceRight(newVertex, beginVertex);
		}

		if (chainEnd instanceof SingleEdgeChain) {
			if (lastFaceNode === null) {
				const endVertex = this.CreateOppositeEdgeVertex(newVertex);

				newVertex.LeftFace = endVertex.LeftFace;
				lastFaceNode = endVertex.LeftFace;
			} else {
				if (newVertex.LeftFace !== null)
					throw new Error("newVertex.LeftFace should be null.");
				newVertex.LeftFace = lastFaceNode;

				lastFaceNode = null;
			}
		} else {
			const endVertex = chainEnd.CurrentVertex;
			this.AddFaceLeft(newVertex, endVertex);
		}
		return lastFaceNode;
	}

	static CreateOppositeEdgeVertex(newVertex) {
		const vertex = new Vertex(newVertex.Point, newVertex.Distance, newVertex.Bisector, newVertex.PreviousEdge, newVertex.NextEdge);

		const fn = new FaceNode(vertex);
		vertex.LeftFace = fn;
		vertex.RightFace = fn;

		const rightFace = new FaceQueue();
		rightFace.AddFirst(fn);

		return vertex;
	}

	static CreateOppositeEdgeChains(sLav, chains, center) {
		const oppositeEdges = new HashSet();

		const oppositeEdgeChains = new List();
		const chainsForRemoval = new List();

		for (const chain of chains) {
			if (chain instanceof SplitChain) {
				const splitChain = chain;
				const oppositeEdge = splitChain.OppositeEdge;

				if (oppositeEdge !== null && !oppositeEdges.Contains(oppositeEdge)) {
					const nextVertex = this.FindOppositeEdgeLav(sLav, oppositeEdge, center);

					if (nextVertex !== null)
						oppositeEdgeChains.push(new SingleEdgeChain(oppositeEdge, nextVertex));
					else {
						this.FindOppositeEdgeLav(sLav, oppositeEdge, center);
						chainsForRemoval.push(chain);
					}
					oppositeEdges.Add(oppositeEdge);
				}
			}
		}

		for (let chain of chainsForRemoval)
			chains.Remove(chain);

		chains.push(...oppositeEdgeChains);
	}

	static CreateMultiSplitVertex(nextEdge, previousEdge, center, distance) {
		const bisector = this.CalcBisector(center, previousEdge, nextEdge);
		return new Vertex(center, distance, bisector, previousEdge, nextEdge);
	}

	static CreateChains(cluster) {
		const edgeCluster = new List();
		const splitCluster = new List();
		const vertexEventsParents = new HashSet();

		for (const skeletonEvent of cluster) {
			if (skeletonEvent instanceof EdgeEvent)
				edgeCluster.push(skeletonEvent);
			else {
				if (skeletonEvent instanceof VertexSplitEvent) {

				} else if (skeletonEvent instanceof SplitEvent) {
					const splitEvent = skeletonEvent;
					vertexEventsParents.Add(splitEvent.Parent);
					splitCluster.push(splitEvent);
				}
			}
		}

		for (let skeletonEvent of cluster) {
			if (skeletonEvent instanceof VertexSplitEvent) {
				const vertexEvent = skeletonEvent;
				if (!vertexEventsParents.Contains(vertexEvent.Parent)) {
					vertexEventsParents.Add(vertexEvent.Parent);
					splitCluster.push(vertexEvent);
				}
			}
		}

		const edgeChains = new List();

		while (edgeCluster.length > 0)
			edgeChains.push(new EdgeChain(this.CreateEdgeChain(edgeCluster)));

		const chains = new List(edgeChains.length);
		for (const edgeChain of edgeChains)
			chains.push(edgeChain);

		splitEventLoop:
			while (splitCluster.Any()) {
				const split = splitCluster[0];
				splitCluster.splice(0, 1); // shift()?

				for (const chain of edgeChains) {
					if (this.IsInEdgeChain(split, chain))
						continue splitEventLoop; //goto splitEventLoop;
				}

				chains.push(new SplitChain(split));
			}

		return chains;
	}

	static IsInEdgeChain(split, chain) {
		const splitParent = split.Parent;
		const edgeList = chain.EdgeList;

		return edgeList.Any(edgeEvent => edgeEvent.PreviousVertex === splitParent || edgeEvent.NextVertex === splitParent);
	}

	static CreateEdgeChain(edgeCluster) {
		const edgeList = new List();

		edgeList.push(edgeCluster[0]);
		edgeCluster.splice(0, 1);  // shift()?

		loop:
			for (; ;) {
				const beginVertex = edgeList[0].PreviousVertex;
				const endVertex = edgeList[edgeList.length - 1].NextVertex;

				for (let i = 0; i < edgeCluster.length; i++) {
					const edge = edgeCluster[i];
					if (edge.PreviousVertex === endVertex) {
						edgeCluster.splice(i, 1);
						edgeList.push(edge);
						//goto loop;
						continue loop;

					}
					if (edge.NextVertex === beginVertex) {
						edgeCluster.splice(i, 1);
						edgeList.Insert(0, edge);
						//goto loop;
						continue loop;
					}
				}
				break;
			}

		return edgeList;
	}

	static RemoveEventsUnderHeight(queue, levelHeight) {
		while (!queue.Empty) {
			if (queue.Peek().Distance > levelHeight + this.SplitEpsilon)
				break;
			queue.Next();
		}
	}

	static LoadAndGroupLevelEvents(queue) {
		const levelEvents = this.LoadLevelEvents(queue);
		return this.GroupLevelEvents(levelEvents);
	}

	static GroupLevelEvents(levelEvents) {
		const ret = new List();

		const parentGroup = new HashSet();

		while (levelEvents.length > 0) {
			parentGroup.Clear();

			const event = levelEvents[0];

			// Replace with shift()?
			levelEvents.splice(0, 1);
			const eventCenter = event.V;
			const distance = event.Distance;

			this.AddEventToGroup(parentGroup, event);

			const cluster = new List();
			cluster.push(event);

			for (let j = 0; j < levelEvents.length; j++) {
				const test = levelEvents[j];

				if (this.IsEventInGroup(parentGroup, test)) {
					const item = levelEvents[j];
					levelEvents.splice(j, 1);
					cluster.push(item);
					this.AddEventToGroup(parentGroup, test);
					j--;
				} else if (eventCenter.DistanceTo(test.V) < this.SplitEpsilon) {
					const item = levelEvents[j];
					levelEvents.splice(j, 1);
					cluster.push(item);
					this.AddEventToGroup(parentGroup, test);
					j--;
				}
			}

			ret.push(this.CreateLevelEvent(eventCenter, distance, cluster));
		}
		return ret;
	}

	static IsEventInGroup(parentGroup, event) {
		if (event instanceof SplitEvent)
			return parentGroup.Contains((event).Parent);
		if (event instanceof EdgeEvent)
			return parentGroup.Contains((event).PreviousVertex)
				|| parentGroup.Contains((event).NextVertex);
		return false;
	}

	static AddEventToGroup(parentGroup, event) {
		if (event instanceof SplitEvent)
			parentGroup.Add((event).Parent);
		else if (event instanceof EdgeEvent) {
			parentGroup.Add((event).PreviousVertex);
			parentGroup.Add((event).NextVertex);
		}
	}

	static CreateLevelEvent(eventCenter, distance, eventCluster) {
		const chains = this.CreateChains(eventCluster);

		if (chains.length === 1) {
			const chain = chains[0];
			if (chain.ChainType === ChainType.ClosedEdge)
				return new PickEvent(eventCenter, distance, chain);
			if (chain.ChainType === ChainType.Edge)
				return new MultiEdgeEvent(eventCenter, distance, chain);
			if (chain.ChainType === ChainType.Split)
				return new MultiSplitEvent(eventCenter, distance, chains);
		}

		if (chains.Any(chain => chain.ChainType === ChainType.ClosedEdge))
			throw new Error("Found closed chain of events for single point, but found more then one chain");
		return new MultiSplitEvent(eventCenter, distance, chains);
	}

	static LoadLevelEvents(queue) {
		const level = new List();
		let levelStart;

		do {
			levelStart = queue.Empty ? null : queue.Next();
		}
		while (levelStart !== null && levelStart.IsObsolete);


		if (levelStart === null || levelStart.IsObsolete)
			return level;

		const levelStartHeight = levelStart.Distance;

		level.push(levelStart);

		let event;
		while ((event = queue.Peek()) !== null &&
		Math.abs(event.Distance - levelStartHeight) < this.SplitEpsilon) {
			const nextLevelEvent = queue.Next();
			if (!nextLevelEvent.IsObsolete)
				level.push(nextLevelEvent);
		}
		return level;
	}

	static AssertMaxNumberOfInteraction(count) {
		count++;
		if (count > 10000)
			throw new Error("Too many interaction: bug?");
		return count;
	}

	static MakeClockwise(holes) {
		if (holes === null)
			return null;

		const ret = new List();
		for (const hole of holes) {
			if (PrimitiveUtils.IsClockwisePolygon(hole))
				ret.push(hole);
			else {
				hole.reverse();
				ret.push(hole);
			}
		}
		return ret;
	}

	static MakeCounterClockwise(polygon) {
		return PrimitiveUtils.MakeCounterClockwise(polygon);
	}

	static InitSlav(polygon, sLav, edges, faces) {
		const edgesList = new CircularList();

		const size = polygon.length;
		for (let i = 0; i < size; i++) {
			const j = (i + 1) % size;
			edgesList.AddLast(new Edge(polygon[i], polygon[j]));
		}

		for (const edge of edgesList.Iterate()) {
			const nextEdge = edge.Next;
			const bisector = this.CalcBisector(edge.End, edge, nextEdge);

			edge.BisectorNext = bisector;
			nextEdge.BisectorPrevious = bisector;
			edges.push(edge);
		}

		const lav = new CircularList();
		sLav.Add(lav);

		for (const edge of edgesList.Iterate()) {
			const nextEdge = edge.Next;
			const vertex = new Vertex(edge.End, 0, edge.BisectorNext, edge, nextEdge);
			lav.AddLast(vertex);
		}

		for (const vertex of lav.Iterate()) {
			const next = vertex.Next;
			const rightFace = new FaceNode(vertex);

			const faceQueue = new FaceQueue();
			faceQueue.Edge = (vertex.NextEdge);

			faceQueue.AddFirst(rightFace);
			faces.push(faceQueue);
			vertex.RightFace = rightFace;

			const leftFace = new FaceNode(next);
			rightFace.AddPush(leftFace);
			next.LeftFace = leftFace;
		}
	}

	static AddFacesToOutput(faces) {
		const edgeOutputs = new List();
		const distances = new Dictionary();

		for (const face of faces) {
			if (face.Size > 0) {
				const faceList = new List();

				for (const fn of face.Iterate()) {
					const point = fn.Vertex.Point;

					faceList.push(point);

					if (!distances.ContainsKey(point))
						distances.Add(point, fn.Vertex.Distance);
				}

				edgeOutputs.push(new EdgeResult(face.Edge, faceList));
			}
		}
		return new Skeleton(edgeOutputs, distances);
	}

	static InitEvents(sLav, queue, edges) {
		for (const lav of sLav) {
			for (const vertex of lav.Iterate())
				this.ComputeSplitEvents(vertex, edges, queue, -1);
		}

		for (const lav of sLav) {
			for (const vertex of lav.Iterate()) {
				const nextVertex = vertex.Next;
				this.ComputeEdgeEvents(vertex, nextVertex, queue);
			}
		}
	}

	static ComputeSplitEvents(vertex, edges, queue, distanceSquared) {
		const source = vertex.Point;
		const oppositeEdges = this.CalcOppositeEdges(vertex, edges);

		for (const oppositeEdge of oppositeEdges) {
			const point = oppositeEdge.Point;

			if (Math.abs(distanceSquared - (-1)) > this.SplitEpsilon) {
				if (source.DistanceSquared(point) > distanceSquared + this.SplitEpsilon) {
					continue;
				}
			}

			if (oppositeEdge.OppositePoint.NotEquals(Vector2d.Empty)) {
				queue.Add(new VertexSplitEvent(point, oppositeEdge.Distance, vertex));
				continue;
			}
			queue.Add(new SplitEvent(point, oppositeEdge.Distance, vertex, oppositeEdge.OppositeEdge));
		}
	}

	static ComputeEvents(vertex, queue, edges) {
		const distanceSquared = this.ComputeCloserEdgeEvent(vertex, queue);
		this.ComputeSplitEvents(vertex, edges, queue, distanceSquared);
	}

	static ComputeCloserEdgeEvent(vertex, queue) {
		const nextVertex = vertex.Next;
		const previousVertex = vertex.Previous;

		const point = vertex.Point;

		const point1 = this.ComputeIntersectionBisectors(vertex, nextVertex);
		const point2 = this.ComputeIntersectionBisectors(previousVertex, vertex);

		if (point1.Equals(Vector2d.Empty) && point2.Equals(Vector2d.Empty))
			return -1;

		let distance1 = Number.MAX_VALUE;
		let distance2 = Number.MAX_VALUE;

		if (point1.NotEquals(Vector2d.Empty))
			distance1 = point.DistanceSquared(point1);
		if (point2.NotEquals(Vector2d.Empty))
			distance2 = point.DistanceSquared(point2);

		if (Math.abs(distance1 - this.SplitEpsilon) < distance2)
			queue.Add(this.CreateEdgeEvent(point1, vertex, nextVertex));
		if (Math.abs(distance2 - this.SplitEpsilon) < distance1)
			queue.Add(this.CreateEdgeEvent(point2, previousVertex, vertex));

		return distance1 < distance2 ? distance1 : distance2;
	}

	static CreateEdgeEvent(point, previousVertex, nextVertex) {
		return new EdgeEvent(point, this.CalcDistance(point, previousVertex.NextEdge), previousVertex, nextVertex);
	}

	static ComputeEdgeEvents(previousVertex, nextVertex, queue) {
		const point = this.ComputeIntersectionBisectors(previousVertex, nextVertex);
		if (point.NotEquals(Vector2d.Empty))
			queue.Add(this.CreateEdgeEvent(point, previousVertex, nextVertex));
	}

	static CalcOppositeEdges(vertex, edges) {
		const ret = new List();

		for (const edgeEntry of edges) {
			const edge = edgeEntry.LineLinear2d;

			if (this.EdgeBehindBisector(vertex.Bisector, edge))
				continue;

			const candidatePoint = this.CalcCandidatePointForSplit(vertex, edgeEntry);
			if (candidatePoint !== null)
				ret.push(candidatePoint);
		}

		ret.Sort(new SplitCandidateComparer());
		return ret;
	}

	static EdgeBehindBisector(bisector, edge) {
		return LineParametric2d.Collide(bisector, edge, this.SplitEpsilon).Equals(Vector2d.Empty);
	}

	static CalcCandidatePointForSplit(vertex, edge) {
		const vertexEdge = this.ChoseLessParallelVertexEdge(vertex, edge);
		if (vertexEdge === null)
			return null;

		const vertexEdteNormNegate = vertexEdge.Norm;
		const edgesBisector = this.CalcVectorBisector(vertexEdteNormNegate, edge.Norm);
		const edgesCollide = vertexEdge.LineLinear2d.Collide(edge.LineLinear2d);

		if (edgesCollide.Equals(Vector2d.Empty))
			throw new Error("Ups this should not happen");

		const edgesBisectorLine = new LineParametric2d(edgesCollide, edgesBisector).CreateLinearForm();

		const candidatePoint = LineParametric2d.Collide(vertex.Bisector, edgesBisectorLine, this.SplitEpsilon);

		if (candidatePoint.Equals(Vector2d.Empty))
			return null;

		if (edge.BisectorPrevious.IsOnRightSite(candidatePoint, this.SplitEpsilon)
			&& edge.BisectorNext.IsOnLeftSite(candidatePoint, this.SplitEpsilon)) {
			const distance = this.CalcDistance(candidatePoint, edge);

			if (edge.BisectorPrevious.IsOnLeftSite(candidatePoint, this.SplitEpsilon))
				return new SplitCandidate(candidatePoint, distance, null, edge.Begin);
			if (edge.BisectorNext.IsOnRightSite(candidatePoint, this.SplitEpsilon))
				return new SplitCandidate(candidatePoint, distance, null, edge.Begin);

			return new SplitCandidate(candidatePoint, distance, edge, Vector2d.Empty);
		}

		return null;
	}

	static ChoseLessParallelVertexEdge(vertex, edge) {
		const edgeA = vertex.PreviousEdge;
		const edgeB = vertex.NextEdge;

		let vertexEdge = edgeA;

		const edgeADot = Math.abs(edge.Norm.Dot(edgeA.Norm));
		const edgeBDot = Math.abs(edge.Norm.Dot(edgeB.Norm));

		if (edgeADot + edgeBDot >= 2 - this.SplitEpsilon)
			return null;

		if (edgeADot > edgeBDot)
			vertexEdge = edgeB;

		return vertexEdge;
	}

	static ComputeIntersectionBisectors(vertexPrevious, vertexNext) {
		const bisectorPrevious = vertexPrevious.Bisector;
		const bisectorNext = vertexNext.Bisector;

		const intersectRays2d = PrimitiveUtils.IntersectRays2D(bisectorPrevious, bisectorNext);
		const intersect = intersectRays2d.Intersect;

		if (vertexPrevious.Point.Equals(intersect) || vertexNext.Point.Equals(intersect))
			return Vector2d.Empty;

		return intersect;
	}

	static FindOppositeEdgeLav(sLav, oppositeEdge, center) {
		const edgeLavs = this.FindEdgeLavs(sLav, oppositeEdge, null);
		return this.ChooseOppositeEdgeLav(edgeLavs, oppositeEdge, center);
	}

	static ChooseOppositeEdgeLav(edgeLavs, oppositeEdge, center) {
		if (!edgeLavs.Any())
			return null;

		if (edgeLavs.length === 1)
			return edgeLavs[0];

		const edgeStart = oppositeEdge.Begin;
		const edgeNorm = oppositeEdge.Norm;
		const centerVector = center.Sub(edgeStart);
		const centerDot = edgeNorm.Dot(centerVector);
		for (const end of edgeLavs) {
			const begin = end.Previous;

			const beginVector = begin.Point.Sub(edgeStart);
			const endVector = end.Point.Sub(edgeStart);

			const beginDot = edgeNorm.Dot(beginVector);
			const endDot = edgeNorm.Dot(endVector);

			if (beginDot < centerDot && centerDot < endDot ||
				beginDot > centerDot && centerDot > endDot)
				return end;
		}

		for (const end of edgeLavs) {
			const size = end.List.Size;
			const points = new List(size);
			let next = end;
			for (let i = 0; i < size; i++) {
				points.push(next.Point);
				next = next.Next;
			}
			if (PrimitiveUtils.IsPointInsidePolygon(center, points))
				return end;
		}
		throw new Error("Could not find lav for opposite edge, it could be correct but need some test data to check.");
	}

	static FindEdgeLavs(sLav, oppositeEdge, skippedLav) {
		const edgeLavs = new List();
		for (const lav of sLav) {
			if (lav === skippedLav)
				continue;

			const vertexInLav = this.GetEdgeInLav(lav, oppositeEdge);
			if (vertexInLav !== null)
				edgeLavs.push(vertexInLav);
		}
		return edgeLavs;
	}

	static GetEdgeInLav(lav, oppositeEdge) {
		for (const node of lav.Iterate())
			if (oppositeEdge === node.PreviousEdge ||
				oppositeEdge === node.Previous.Next)
				return node;

		return null;
	}

	static AddFaceBack(newVertex, va, vb) {
		const fn = new FaceNode(newVertex);
		va.RightFace.AddPush(fn);
		FaceQueueUtil.ConnectQueues(fn, vb.LeftFace);
	}

	static AddFaceRight(newVertex, vb) {
		const fn = new FaceNode(newVertex);
		vb.RightFace.AddPush(fn);
		newVertex.RightFace = fn;
	}

	static AddFaceLeft(newVertex, va) {
		const fn = new FaceNode(newVertex);
		va.LeftFace.AddPush(fn);
		newVertex.LeftFace = fn;
	}

	static CalcDistance(intersect, currentEdge) {
		const edge = currentEdge.End.Sub(currentEdge.Begin);
		const vector = intersect.Sub(currentEdge.Begin);

		const pointOnVector = PrimitiveUtils.OrthogonalProjection(edge, vector);
		return vector.DistanceTo(pointOnVector);
	}

	static CalcBisector(p, e1, e2) {
		const norm1 = e1.Norm;
		const norm2 = e2.Norm;

		const bisector = this.CalcVectorBisector(norm1, norm2);
		return new LineParametric2d(p, bisector);
	}

	static CalcVectorBisector(norm1, norm2) {
		return PrimitiveUtils.BisectorNormalized(norm1, norm2);
	}
}

class SkeletonEventDistanseComparer {
	Compare(left, right) {
		if (left.Distance > right.Distance)
			return 1;
		if (left.Distance < right.Distance)
			return -1;

		return 0;
	}
}

class ChainComparer {
	_center;

	constructor(center) {
		this._center = center;
	}

	Compare(x, y) {
		if (x === y)
			return 0;

		const angle1 = ChainComparer.Angle(this._center, x.PreviousEdge.Begin);
		const angle2 = ChainComparer.Angle(this._center, y.PreviousEdge.Begin);

		return angle1 > angle2 ? 1 : -1;
	}

	static Angle(p0, p1) {
		const dx = p1.X - p0.X;
		const dy = p1.Y - p0.Y;
		return Math.atan2(dy, dx);
	}
}

class SplitCandidateComparer {
	Compare(left, right) {
		if (left.Distance > right.Distance)
			return 1;
		if (left.Distance < right.Distance)
			return -1;

		return 0;
	}
}

class SplitCandidate {
	Distance;
	OppositeEdge = null;
	OppositePoint = null;
	Point = null;

	constructor(point, distance, oppositeEdge, oppositePoint) {
		this.Point = point;
		this.Distance = distance;
		this.OppositeEdge = oppositeEdge;
		this.OppositePoint = oppositePoint;
	}
}

