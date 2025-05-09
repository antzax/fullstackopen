import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewBlogForm from "./NewBlogForm";
import { vi } from "vitest";

test("new blog is created correctly", async () => {
  const mockHandler = vi.fn();
  render(<NewBlogForm createBlog={mockHandler} />);

  const user = userEvent.setup();

  const titleInput = screen.getByPlaceholderText(/title/i);
  const authorInput = screen.getByPlaceholderText(/author/i);
  const urlInput = screen.getByPlaceholderText(/url/i);
  const createButton = screen.getByRole("button", { name: /create/i });

  await user.type(titleInput, "Test Blog Title");
  await user.type(authorInput, "Test Author");
  await user.type(urlInput, "http://testblog.com");
  await user.click(createButton);

  expect(mockHandler).toHaveBeenCalledTimes(1);
  expect(mockHandler).toHaveBeenCalledWith({
    title: "Test Blog Title",
    author: "Test Author",
    url: "http://testblog.com",
  });
});
