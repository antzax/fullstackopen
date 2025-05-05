const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        username: 'root',
        name: 'admin',
        password: 'secret'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByPlaceholder('username')).toBeVisible()
    await expect(page.getByPlaceholder('password')).toBeVisible()
  })

  describe('Login', () => {
    test('login works', async ({ page }) => {
      await page.getByPlaceholder('username').fill('root')
      await page.getByPlaceholder('password').fill('secret')
      // Login ok
      await expect(page.getByText('root logged in')).toBeVisible()
      await expect(page.getByText('log out')).toBeVisible()
      await expect(page.getByText('new blog')).toBeVisible()
    })
    test('login fails', async ({ page }) => {
      await page.getByPlaceholder('username').fill('root')
      await page.getByPlaceholder('password').fill('secret')
      // Login fails
      await expect(page.getByText('invalid username or password')).toBeVisible()
      await expect(page.getByPlaceholder('username')).toBeVisible()
      await expect(page.getByPlaceholder('password')).toBeVisible()
    })
  })
})