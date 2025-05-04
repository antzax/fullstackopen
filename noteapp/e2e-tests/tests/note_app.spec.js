const { test, describe, expect, beforeEach } = require("@playwright/test");
const { loginWith, createNote } = require('./helper')

describe("Note app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "root",
        username: "admin",
        password: "secret",
      },
    });

    await page.goto("/");
  });

  test("front page can be opened", async ({ page }) => {
    const locator = await page.getByText("Notes");
    await expect(locator).toBeVisible();
    await expect(
      page.getByText(
        "Note app, Department of Computer Science, University of Helsinki 2025"
      )
    ).toBeVisible();
  });

  test('login fails with wrong password', async ({ page }) => {
    await loginWith(page, "wrong", "wrong")

    const errorDiv = page.locator('.error')
    await expect(errorDiv).toContainText('wrong username or password')
    await expect(errorDiv).toHaveCSS('border-style', 'solid')
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

    await expect(page.getByText('wrong logged in succesfully')).not.toBeVisible()
  })

  test("user can login with correct credentials", async ({ page }) => {
    await loginWith(page, "admin", "secret")
    await expect(page.getByText("admin logged in succesfully")).toBeVisible();
  });

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "admin", "secret")
    });

    test("a new note can be created", async ({ page }) => {
      await createNote(page, "a note created by playwright")
      await expect(
        page.getByText("a note created by playwright")
      ).toBeVisible();
    });

    describe("and several notes exist", () => {
      beforeEach(async ({ page }) => {
        await createNote(page, "first note", true)
        await createNote(page, "second note", true)
        await createNote(page, "third note", true)
      });

      test("one of those can be made unimportant", async ({ page }) => {
        await page.pause()
        const otherNoteElement = await page.getByText('second note').locator('..')
        await otherNoteElement.getByRole("button", { name: "make not important" }).click();
        await expect(otherNoteElement.getByText("make important")).toBeVisible();
      });
    });
  });

});
