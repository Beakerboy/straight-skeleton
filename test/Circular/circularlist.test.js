import CircularList from '../../src/Circular/circularlist.js'

test('', () => {
  const list = new CircularList()
  expect(list.size).toBe(0)
})
