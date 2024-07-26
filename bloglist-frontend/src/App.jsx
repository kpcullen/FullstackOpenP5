import loginService from './services/login'
import blogService from './services/blogs'
import { useState, useEffect } from 'react'
import Login from './components/Login'
import Blogs from './components/Blogs'
import LoginErrorMessage from './components/LoginErrorMessage'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginErrorMessage, setLoginErrorMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await blogService.getAll()
      console.log(blogs)
      setBlogs(blogs)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setLoginErrorMessage('Wrong login details')
      setTimeout(() => {
        setLoginErrorMessage(null)
      }, 2000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    setUser(null)
  }
  const addBlog = async (newBlog) => {
    try {
      // blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(newBlog)
      setBlogs([...blogs, returnedBlog])
      setSuccessMessage(`A new blog by ${user.username} added!`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 2000)
    } catch (error) {
      console.log(error)
      setErrorMessage(
        `Problem creating a new blog, try again. ${error.message}`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
    }
  }

  const handleLike = async (blog) => {
    try {
      const updatedBlog = {
        user: blog?.user?.id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url,
      }
      console.log(blog)

      const id = blog.id
      await blogService.update(id, updatedBlog)
      const updatedBlogs = blogs.map((blog) =>
        blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog
      )
      setBlogs(updatedBlogs)
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
      try {
        const id = blog.id
        await blogService.remove(id)
        setBlogs(blogs.filter((blog) => blog.id !== id))
      } catch (err) {
        console.log(err)
      }
    } else return
  }

  return (
    <div>
      {loginErrorMessage && (
        <LoginErrorMessage loginErrorMessage={loginErrorMessage} />
      )}
      {!user && (
        <Login
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      )}
      {user && (
        <Blogs
          user={user}
          blogs={blogs}
          setBlogs={setBlogs}
          handleLogout={handleLogout}
          addBlog={addBlog}
          errorMessage={errorMessage}
          successMessage={successMessage}
          handleLike={handleLike}
          handleDelete={handleDelete}
        />
      )}
    </div>
  )
}

export default App
