import { useState } from 'react'
import PropTypes from 'prop-types'

const CreateNewBlog = ({ blogFormRef, addBlog }) => {
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
    addBlog(newBlog)
    blogFormRef.current.toggleVisibility()

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleBlogSubmit}>
      <h2>Create a new blog</h2>
      <div>
        Author:
        <input
          placeholder="author"
          type="text"
          name="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        Title:
        <input
          placeholder="title"
          type="text"
          name="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Url:
        <input
          placeholder="url"
          type="text"
          name="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">save</button>
    </form>
  )
}

CreateNewBlog.propTypes = {
  addBlog: PropTypes.func.isRequired,
}

export default CreateNewBlog
