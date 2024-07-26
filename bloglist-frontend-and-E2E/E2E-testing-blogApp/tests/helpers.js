const loginWith = async (page, username, password) => {
  await page.getByPlaceholder('username').fill(username)
  await page.getByPlaceholder('password').fill(password)
  await page.getByRole('button', { name: 'Login' }).click()
}

const createNewBlog = async (page, author, title, url) => {
  await page.getByRole('button', { name: 'Create new blog' }).click()
  await page.getByPlaceholder('author').fill(author)
  await page.getByPlaceholder('title').fill(title)
  await page.getByPlaceholder('url').fill(url)
  await page.getByRole('button', { name: 'save' }).click()
}

const createUser = async (request, name, username, password) => {
  await request.post('/api/users', {
    data: {
      name: name,
      username: username,
      password: password,
    },
  })
}

export { loginWith, createNewBlog, createUser }
