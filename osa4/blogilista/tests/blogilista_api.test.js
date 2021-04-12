const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const allBlogs = () => {
    const blogilista = Blog.find({})
    return blogilista.map(b => b)
  }

const testBlog = {
    title: 'Testi',
    author: 'Testaaja',
    url: 'www.testi.fi',
    likes: 1
}



const initialNotes = [
  {
    title: "Jorin päiväkirja",
    author: "Jori",
    url: "is.fi",
    likes: 44,
  },
  {
    title: "Jorman päiväkirja",
    author: "Jorma P",
    url: "hs.fi",
    likes: 66
  },
  {
    title: "Tapanin päiväkirja",
    author: "Tapani T",
    url: "taloussanomat.fi",
    likes: 33
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogiObject = new Blog(initialNotes[0])
  await blogiObject.save()
  blogiObject = new Blog(initialNotes[1])
  await blogiObject.save()
  blogiObject = new Blog(initialNotes[2])
  await blogiObject.save()
})

// 4.8
test('all notes are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(initialNotes.length)
  })

test('post works, and length will be +1', async () => {
    const response = await 
    api.post('/api/blogs')
    .send(testBlog)
    // 4.10
    expect(await allBlogs()).toHaveLength(initialNotes.length + 1)
  })
  // 4.11
  /*
  test("if likes are not , will be set to 0", async () => {
    const response = await api
      .post("/api/blogs")
      .send(initialNotes);

    expect(response.body.likes).toBe(0);
  });
*/

// 4.9
test("return if has id", async () => {
  const response = await 
  api.get("/api/blogs");
  expect(response.body[1].id).toBeDefined();
});

afterAll(() => {
  mongoose.connection.close()
})