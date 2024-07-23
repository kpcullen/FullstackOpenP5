import { useState } from 'react'
import blogServices from '../services/blogs'

const CreateNewBlog = ({
  blogs,
  setBlogs,
  setErrorMessage,
  setSuccessMessage,
  user,
  blogFormRef,
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogSubmit = async (e) => {
    e.preventDefault()
    const newBlog = {
      author,
      title,
      url,
    }

    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogServices.create(newBlog)
      console.log(returnedBlog)
      setTitle('')
      setAuthor('')
      setUrl('')

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

  return (
    <form onSubmit={handleBlogSubmit}>
      <h2>Create a new blog</h2>
      <div>
        Author:
        <input
          type="text"
          name="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        Title:
        <input
          type="text"
          name="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Url:
        <input
          type="text"
          name="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">Create a new blog</button>
    </form>
  )
}

export default CreateNewBlog
