import Blog from './Blog'
import CreateNewBlog from './CreateNewBlog'
import ErrorMessage from './ErrorMessage'
import SuccessMessage from './SuccessMessage'
import { useState, useRef } from 'react'
import Togglable from './Togglable'
import PropTypes from 'prop-types'

const Blogs = ({ user, blogs, setBlogs, handleLogout }) => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const blogFormRef = useRef()

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

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
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
          user={user}
        />
      ))}
    </div>
  )
}

Blogs.propTypes = {
  user: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
}

export default Blogs
