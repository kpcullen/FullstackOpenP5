import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateNewBlog from './CreateNewBlog'
import { vi } from 'vitest'
import blogServices from '../services/blogs'

describe('<CreateNewBlog /> new blog', () => {
  const user = {
    id: 123,
    username: 'test',
  }

  test('form calls event handler with right details', async () => {
    const mockAddBlog = vi.fn()
    const blogFormRef = { current: { toggleVisibility: vi.fn() } }

    render(
      <CreateNewBlog
        blogs={[]}
        setBlogs={() => {}}
        setErrorMessage={() => {}}
        setSuccessMessage={() => {}}
        user={user}
        addBlog={mockAddBlog}
        blogFormRef={blogFormRef}
      />
    )

    const authorInput = screen.getByPlaceholderText('author')
    const titleInput = screen.getByPlaceholderText('title')
    const urlInput = screen.getByPlaceholderText('url')
    const saveButton = screen.getByText('save')

    await userEvent.type(authorInput, 'test author')
    await userEvent.type(titleInput, 'test title')
    await userEvent.type(urlInput, 'test url')

    await userEvent.click(saveButton)

    expect(mockAddBlog).toHaveBeenCalledWith({
      author: 'test author',
      title: 'test title',
      url: 'test url',
    })
  })
})
