import { useEffect, useState } from 'react'
import blogServices from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, blogs, setBlogs, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  console.log('USER ID:', user)
  console.log('BLOG ID:', blog)

  const handleDelete = async (blog) => {
    if (window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
      try {
        const id = blog.id
        await blogServices.remove(id)
        setBlogs(blogs.filter((blog) => blog.id !== id))
      } catch (err) {
        console.log(err)
      }
    } else return
  }

  const [showDetails, setShowDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  useEffect(() => {
    const handleUpdateLike = async (blog) => {
      try {
        const updatedBlog = {
          user: blog?.user?.id,
          likes: likes,
          author: blog.author,
          title: blog.title,
          url: blog.url,
        }

        const id = blog.id
        await blogServices.update(id, updatedBlog)
      } catch (err) {
        console.log(err)
      }
    }
    if (blog) handleUpdateLike(blog)
  }, [likes, blog])

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'Hide' : 'View'}
      </button>
      {showDetails ? (
        <>
          <div> {blog.url}</div>
          <div>
            Likes: {likes}
            <button
              onClick={() => {
                setLikes((likes) => likes + 1)
              }}
            >
              Like
            </button>
          </div>
          <div>{blog.user?.username}</div>
          {blog.user.username === user.username && (
            <button onClick={() => handleDelete(blog)}>Remove</button>
          )}
        </>
      ) : (
        ''
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog
