import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<BLOG /> Testing Blog rendering component', () => {
  const blog = {
    id: '123',
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 5,
    user: {
      username: 'testuser',
    },
  }

  const user = {
    username: 'testuser',
  }

  test('renders title and author, but not likes, url, or username', () => {
    const { container } = render(
      <Blog
        blog={blog}
        blogs={[]}
        setBlogs={() => {}}
        user={user}
        key={blog.title}
      />
    )

    const title = screen.getByText('Test Blog Title', { exact: false })
    const author = screen.getByText('Test Author', { exact: false })
    //checks if title is present
    expect(title).toBeInTheDocument()
    //checks if author is present
    expect(author).toBeInTheDocument()
    //checks if details are not visible
    const details = container.querySelector('.details')

    expect(details).not.toBeInTheDocument()
  })
  test('displays details when view button is clicked', async () => {
    render(<Blog blog={blog} blogs={[]} setBlogs={() => {}} user={user} />)

    // Click the button to show details
    const screenUser = userEvent.setup()
    const button = screen.getByText('View')
    await screenUser.click(button)

    // Check that the URL and likes are now displayed
    const url = screen.getByText('http://testurl.com')
    expect(url).toBeInTheDocument()

    const likes = screen.getByText('Likes: 5')
    expect(likes).toBeInTheDocument()
  })
  test('ascertains the likes event handler is called twice when clicked twice', async () => {
    const mockHandleLike = vi.fn()

    render(
      <Blog
        blog={blog}
        blogs={[]}
        setBlogs={() => {}}
        user={user}
        handleLike={mockHandleLike}
      />
    )
    const view = screen.getByText('View')
    await userEvent.click(view)

    const like = screen.getByText('Like')

    await userEvent.click(like)
    await userEvent.click(like)

    expect(mockHandleLike.mock.calls).toHaveLength(2)
  })
})
