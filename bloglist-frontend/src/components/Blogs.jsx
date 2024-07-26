import Blog from './Blog'
import CreateNewBlog from './CreateNewBlog'
import ErrorMessage from './ErrorMessage'
import SuccessMessage from './SuccessMessage'
import { useRef } from 'react'
import Togglable from './Togglable'
import PropTypes from 'prop-types'

const Blogs = ({
  user,
  blogs,
  setBlogs,
  handleLogout,
  addBlog,
  errorMessage,
  successMessage,
  handleLike,
  handleDelete,
}) => {
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
          user={user}
          blogFormRef={blogFormRef}
          addBlog={addBlog}
        />
      </Togglable>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
          user={user}
          handleLike={handleLike}
          handleDelete={handleDelete}
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
  addBlog: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default Blogs
