import FaceNode from './facenode'

export default class FaceQueueUtil {
  /**
   * @param {FaceNode} firstFace Face 1
   * @param {FaceNode} secondFace Face 2
   */
  static connectQueues (firstFace, secondFace) {
    if (firstFace.list === null) { throw new Error('firstFace.list cannot be null.') }
    if (secondFace.list === null) { throw new Error('secondFace.list cannot be null.') }

    if (firstFace.list === secondFace.list) {
      if (!firstFace.isEnd || !secondFace.isEnd) { throw new Error('try to connect the same list not on end nodes') }

      if (firstFace.isQueueUnconnected || secondFace.isQueueUnconnected) { throw new Error('can\'t close node queue not conected with edges') }

      firstFace.queueClose()
      return
    }

    if (!firstFace.isQueueUnconnected && !secondFace.isQueueUnconnected) {
      throw new Error(
        'can\'t connect two diffrent queues if each of them is connected to edge')
    }

    if (!firstFace.isQueueUnconnected) {
      const qLeft = secondFace.faceQueue
      this.moveNodes(firstFace, secondFace)
      qLeft.close()
    } else {
      const qRight = firstFace.faceQueue
      this.moveNodes(secondFace, firstFace)
      qRight.close()
    }
  }

  /**
   * @param {FaceNode} firstFace
   * @param {FaceNode} secondFace
   */
  static moveNodes (firstFace, secondFace) {
    firstFace.addQueue(secondFace)
  }
}
