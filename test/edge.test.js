import Edge from '../src/Circular/edge.js'
import Vector2d from '../src/Primitives/vector2d.js'

test('Constructor', () => {
  const v1 = Vector2d(0, 0)
  const v2 = Vector2d(1, 1)
  const edge = new Edge(v1, v2)

  expect(edge.begin.toString()).toBe('0, 0')
  expect(edge.end.toString()).toBe('1, 1')
})
