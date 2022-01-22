const listHelper = require('../utils/list_helper')

describe('favourite by total likes', () => {
    const blogeja = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: "Canonical ",
            author: "Edsger W. Dijkstra",
            likes: 12,
            __v: 0 
          },
          {
            _id: '5a422aa71b54a676234d17f8x',
            title: "String",
            author: "Edsger W. Dijkstra",
            likes: 600,
            __v: 0 
          }
          ,{
            _id: '5a422aa71b54a676234d17f8xx',
            title: "Reduction",
            author: "Edsger W. Dijkstra",
            likes: 6090,
            __v: 0 
          }
          ,{
            _id: '5a422aa71b54a676234d17f8xx',
            title: "Reductions2",
            author: "Dijkstra",
            likes: 6090,
            __v: 0 
          }
    ]
    // Millä eniten tykkäyksiä eli tuossa oleva neljäs.
    test('returns which one has the most likes', () => {
      const result = listHelper.favouriteBlog(blogeja)
      expect(result).toEqual(blogeja[(3)])
    })
  })
  