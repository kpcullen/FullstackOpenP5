import { useState } from 'react'
import blogServices from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, handleLike, handleDelete }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div data-testid="blog-item" className="blog-post" style={blogStyle}>
      {blog.title} {blog.author}
      <button
        className="show-details-button"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? 'Hide' : 'View'}
      </button>
      {showDetails ? (
        <div className="details">
          <div> {blog.url}</div>
          <div>
            Likes:
            <span className="blog-likes" data-testid={`likes-${blog.title}`}>
              {blog.likes}
            </span>
            <button
              data-testid={`like-button-${blog.title}`}
              className="like-button"
              onClick={() => handleLike(blog)}
            >
              Like
            </button>
          </div>
          <div>{blog.user?.username}</div>
          {blog.user.username === user.username && (
            <button onClick={() => handleDelete(blog)}>Remove</button>
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default Blog
