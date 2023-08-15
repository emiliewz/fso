const listHelper = require('../utils/list_helper')

test('dummy returns 1', () => {
  const result = listHelper.dummy([])
  expect(result).toBe(1)
})

describe('total likes', () => {
  // test.only('of empty list is zero', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listHelper.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list, is calculated right', () => {
    const result = listHelper.totalLikes(listHelper.initialBlogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('of empty list is null', () => {
    expect(listHelper.favoriteBlog([])).toBe(null)
  })

  test('when list has only one blog, equals that blog', () => {
    expect(listHelper.favoriteBlog(listHelper.listWithOneBlog)).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('of a bigger list, is calculated right', () => {
    expect(listHelper.favoriteBlog(listHelper.initialBlogs)).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    })
  })
})

describe('most blogs', () => {
  test('of empty list is null', () => {
    expect(listHelper.mostBlogs([]))
      .toBe(null)
  })

  test('when list has only one blog, equals the author name and length of 1', () => {
    expect(listHelper.mostBlogs(listHelper.listWithOneBlog)).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })

  test('of a bigger list, is calculated right', () => {
    expect(listHelper.mostBlogs(listHelper.initialBlogs))
      .toEqual({
        author: 'Robert C. Martin',
        blogs: 3
      })
  })
})

describe('most likes', () => {
  test('of empty list is null', () => {
    expect(listHelper.mostLikes([]))
      .toBe(null)
  })

  test('when list has only one blog, equals the author name and length of 1', () => {
    expect(listHelper.mostLikes(listHelper.listWithOneBlog)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('of a bigger list, is calculated right', () => {
    expect(listHelper.mostLikes(listHelper.initialBlogs))
      .toEqual({
        author: 'Edsger W. Dijkstra',
        likes: 17
      })
  })
})

