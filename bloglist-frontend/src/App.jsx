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

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await blogService.getAll()
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

  return (
    <div>
      {loginErrorMessage && (
        <LoginErrorMessage loginErrorMessage={loginErrorMessage} />
      )}
      {user === null ? (
        <Login
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      ) : (
        <Blogs
          user={user}
          blogs={blogs}
          setBlogs={setBlogs}
          handleLogout={handleLogout}
        />
      )}
    </div>
  )
}

export default App
