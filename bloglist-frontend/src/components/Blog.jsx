import { useEffect, useState } from 'react'
import blogServices from '../services/blogs'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleUpdateLike = async (blog) => {
    console.log('blog', blog)

    try {
      const updatedBlog = {
        user: blog?.user?.id,
        likes: likes,
        author: blog.author,
        title: blog.title,
        url: blog.url,
      }

      console.log('UPDATED BLOG', updatedBlog)
      const id = blog.id
      console.log('ID', id)
      await blogServices.update(id, updatedBlog)
    } catch (err) {
      console.log(err)
    }
  }

  const [showDetails, setShowDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  useEffect(() => {
    handleUpdateLike(blog)
  }, [likes])

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
            <button onClick={() => setLikes(likes + 1)}>Like</button>
          </div>
          <div>{blog.user?.username}</div>
        </>
      ) : (
        ''
      )}
    </div>
  )
}

export default Blog
