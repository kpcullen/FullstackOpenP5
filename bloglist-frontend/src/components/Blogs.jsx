import Blog from './Blog'
import CreateNewBlog from './CreateNewBlog'
import ErrorMessage from './ErrorMessage'
import SuccessMessage from './SuccessMessage'
import { useState, useRef } from 'react'
import Togglable from './Togglable'

const Blogs = ({ user, blogs, setBlogs, handleLogout }) => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const blogFormRef = useRef()
  return (
    <div>
      <h2>Blogs</h2>
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      {successMessage && <SuccessMessage successMessage={successMessage} />}
      <h3>{user.username} is logged in</h3>{' '}
      <button onClick={handleLogout}>Logout</button>
      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <CreateNewBlog
          blogs={blogs}
          setBlogs={setBlogs}
          setErrorMessage={setErrorMessage}
          setSuccessMessage={setSuccessMessage}
          user={user}
          blogFormRef={blogFormRef}
        />
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default Blogs
