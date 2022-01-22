const st = require("supertest")
const app = require("../app.js")
const testAPP = st(app)
const listHelper = require('../utils/list_helper')
const mongoose = require("mongoose")

describe('total likes',  () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]
    test('when list has only one blog equals the likes of that', async  () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })
  })

describe('Url or title missing', () => {
  test("verify if the POST /api/blogs requires title and url in the body", async () => {
    const logInDetails = await testAPP
      .post("/api/login")
      .send({
        "username" : "test22",
        "password": "test22"
      })
      .set("Accept","application/json")
      .expect("Content-Type",/application\/json/)
    
    const res = await testAPP
      .post("/api/blogs")
      .send({
        author: "Testibloggaaja",
        likes: 123
      })
      .set("Accept","application/json")
      .set("Authorization",`Bearer ${logInDetails.body.token}`)
      .expect(400)
  
    expect(res.body.error).toBe("missing url or title")
  })
})

// Replace with your own created user credentials.
describe('Default value of likes is 0, if not changed', () => {
  test("Default value of likes is 0, if not changed", async () => {
    const logInDetails = await testAPP
      .post("/api/login")
      .send({
        "username" : "testUser",
        "password": "testUserPass"
      })
      .set("Accept","application/json")
      .expect("Content-Type",/application\/json/)
    
    const res = await testAPP
      .post("/api/blogs")
      .send({
        title: "Testi1234",
        author: "Testibloggaaja",
        url: "https://iltalehti.fi"
      })
      .set("Accept","application/json")
      .set("Authorization",`Bearer ${logInDetails.body.token}`)
      .expect(201)
    expect(res.body.likes).toBe(0)
  })
  afterAll(done => {
    mongoose.connection.close() // suljetaan lopuksi testin yhteys mongoDB:hen
    done()
  })
})