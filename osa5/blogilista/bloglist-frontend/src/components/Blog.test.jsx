import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'


const blog = {
  title: "Vitest testing framework",
  author: "Anthony Fu",
  url: "www.url.com",
  likes: 0,
  user: {
    username: "root"
  }
}

const user = {
  username: "root"
}

test('renders blog title', async () => {
  render(<Blog blog={blog} user={user}/>)
  screen.getByText('Vitest testing framework')
})

test('renders blog author', async () => {
  render(<Blog blog={blog} user={user}/>)
  screen.getByText('Anthony Fu', { exact: false})
})

test('renders blog url and author when button is clicked', async () => {
  render(<Blog blog={blog} user={user} />)

  const userAction = userEvent.setup()
  const button = screen.getByText('show')
  await userAction.click(button)

  screen.getByText('www.url.com')
  screen.getByText('likes 0')
})

test('like button is clicked twice', async () => {
  const addLike = vi.fn()
  const user = userEvent.setup()

  render(<Blog blog={blog} changeLikes={addLike} user={user} />)

  const likeBtn = screen.getByText("like")

  await user.click(likeBtn)
  await user.click(likeBtn)

  expect(addLike.mock.calls).toHaveLength(2)
})