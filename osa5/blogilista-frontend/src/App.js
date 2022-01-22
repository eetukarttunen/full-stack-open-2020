import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './BlogForm'
import Notification from './Notification'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)// null, jotta ei näy aluksi
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)
  const [buttonText, setButtonText] = useState('show')
  const blogStyle = {
    marginTop: 0.5,
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
  }
  const buttonStyle = {
    marginTop: 2,
    marginBottom: 2,
  }
  const defaultVisibillity = false
  const [visible, setVisible] = useState({})
  const isVisible = (id) => visible[id] || defaultVisibillity

  const handleClick = (id) => () => {
    setVisible({
      ...visible,
      [id]: !isVisible(id)
    })
    if (visible[id] === false) {
      setButtonText('hide')
    }
    if (visible[id] === true || undefined) {
      setButtonText('show')
    }
  }

  useEffect(() => {
    blogService.getAll().then(initialBlogs =>
      setBlogs(initialBlogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handleBlogChange = async (event) => {
    try {
      await blogService.create({
        author, title, url
      })
        .then(
          setNotificationMessage('a new blog ' + title + ' by ' + author + ' added')
        )
        .then(setTimeout(() => {
          setNotificationMessage(null)
        }, 10000))
      setAuthor('')
      setTitle('')
      setUrl('')
    } catch (exception) {
      event.preventDefault()
      setErrorMessage('Error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const logOut = () => {
    window.localStorage.clear()// tyhjennetään localStorage
    window.location.reload()// Ladataan sivu uudellee uloskirjautumisen jälkeen
  }

  const Error = ({ errormes }) => {
    if (errormes === null) {
      return null
    }
    return (
      <div className="error">
        {errormes}
      </div>
    )
  }
  const likePost = (bId, wId, un, fn, titl, ur, ll) => {
    var id = String(bId)
    var us = String(wId)
    var newLike = String(ll+1)
    var auth = String(fn)
    var tt = String(titl)
    var url = String(ur)

    fetch('/api/blogs/'+id, {
      method: 'PUT',
      body: JSON.stringify({
        user: us,
        likes: newLike,
        author: auth,
        title: tt,
        url: url
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${user.token}`
      }
    }).then(response => {
      return response.json()
    })
    window.location.reload()
  }
  const deletePost = (idProps) => {
    var id = String(idProps)
    fetch('/api/blogs/'+id, { method: 'DELETE' })
    window.location.reload()
  }



  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Error errormes={errorMessage} />
        <form onSubmit={handleLogin}>
          <div>
          username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
          password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }
  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }
  return (
    <div>
      <h2>blogs</h2>
      {notificationMessage !== null &&
        <div>
          <Notification message={notificationMessage} />
        </div>
      }
      <Error errormes={errorMessage} />
      <div> {user.name} logged in
        <button onClick={logOut}>Log out</button>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>create new blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            title={title}
            author={author}
            url={url}
            handleTitleChange={({ target }) => setTitle(target.value)}
            handleAuthorChange={({ target }) => setAuthor(target.value)}
            handleUrlChange={({ target }) => setUrl(target.value)}
            handleBlogChange={handleBlogChange}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
      <div>
        {blogs.sort((i,j) => i.likes > j.likes ? -1 : 1)
        && blogs.map(blog =>
          <div key={blog.id} style={blogStyle}>
            <div> {visible &&
              <>
                <Blog key={blog.id} blog={blog}/>
                <button style={buttonStyle} onClick={handleClick(blog.id)}>{buttonText}</button>
              </>
            }</div>
            <div>{visible[blog.id] &&
            <div>
              <div>{blog.url}</div>
              <div>likes {blog.likes} <button onClick={() => likePost(blog.id, blog.user.id, blog.likes, blog.author, blog.title, blog.url, blog.likes)}>like</button></div>
              <div>{blog.user.name}</div>
              <button onClick={() => deletePost(blog.id)}>remove</button>
            </div>
            }</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App