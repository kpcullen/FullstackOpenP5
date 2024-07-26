const { test, expect, beforeEach, describe } = require('@playwright/test')
const { createNewBlog, loginWith, createUser } = require('./helpers')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await createUser(request, 'john', 'john', '1234')
    await createUser(request, 'kevin', 'kevin', '1234')

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
  })
  describe('Login tests', () => {
    test('successful with correct credentials', async ({ page }) => {
      loginWith(page, 'kevin', '1234')
      await expect(page.getByText('kevin is logged in')).toBeVisible()
    })
    test.only('Login fails with wrong credentials', async ({ page }) => {
      loginWith(page, 'kevin', 'wrong')
      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('Login failed.')
    })
  })
  describe('with user logged in', () => {
    beforeEach(async ({ page }) => {
      loginWith(page, 'kevin', '1234')
    })
    test('a new blog can be created', async ({ page }) => {
      await createNewBlog(page, 'kevincullen', 'a new blog', 'blog.com')
      await expect(page.getByText('kevincullen')).toBeVisible()
      await expect(page.getByText('a new blog kevincullen')).toBeVisible()
    })
    test('a blog can be liked', async ({ page }) => {
      await createNewBlog(page, 'kevincullen', 'like this blog', 'blog.com')
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'Like' }).click()
      const element = await page.getByTestId('likes-like this blog')
      const likes = await element.textContent()
      expect(likes).toEqual('1')
    })
    test('a blog can be deleted', async ({ page }) => {
      page.on('dialog', async (dialog) => {
        await dialog.accept()
      })
      await createNewBlog(page, 'kevincullen', 'delete this blog', 'blog.com')
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'Remove' }).click()
      await expect(page.getByText('delete this blog')).not.toBeVisible()
    })

    test('blog only visible to creator', async ({ page, request }) => {
      await createNewBlog(page, 'kevincullen', 'visibleblog', 'blog.com')
      await expect(page.getByText('visibleblog kevincullen')).toBeVisible()
      await page.getByRole('button', { name: 'logout' }).click()
      await page.waitForSelector('text=Log into BlogApp')
      await loginWith(page, 'john', '1234')
      await page.getByRole('button', { name: 'View' }).click()
      await expect(
        page.getByRole('button', { name: 'Remove' })
      ).not.toBeVisible()
    })

    test.only('blogs are in descending order according to likes', async ({
      page,
    }) => {
      await createNewBlog(page, 'kevincullen', 'testblog1', 'blog.com')
      page.waitForTimeout(1000)
      await createNewBlog(page, 'kevincullen', 'testblog2', 'blog.com')
      page.waitForTimeout(1000)
      await createNewBlog(page, 'kevincullen', 'testblog3', 'blog.com')
      page.waitForTimeout(2000)

      await page
        .locator('div')
        .filter({ hasText: /^testblog1 kevincullenView$/ })
        .getByRole('button')
        .click()

      page.waitForTimeout(1000)

      await page
        .locator('div')
        .filter({ hasText: /^testblog2 kevincullenView$/ })
        .getByRole('button')
        .click()

      await page.waitForTimeout(1000)

      await page
        .locator('div')
        .filter({ hasText: /^testblog3 kevincullenView$/ })
        .getByRole('button')
        .click()

      page.waitForTimeout(1000)

      const testBlog1Button = await page.getByTestId('like-button-testblog1')
      const testBlog2Button = await page.getByTestId('like-button-testblog2')
      const testBlog3Button = await page.getByTestId('like-button-testblog3')

      await testBlog1Button.click()
      await testBlog1Button.click()

      await testBlog2Button.click()
      await testBlog2Button.click()
      await testBlog2Button.click()

      await testBlog3Button.click()

      await expect(page.locator('.blog-likes').nth(0)).toHaveText('3')
      await expect(page.locator('.blog-likes').nth(1)).toHaveText('2')
      await expect(page.locator('.blog-likes').nth(2)).toHaveText('1')
    })
  })
})
