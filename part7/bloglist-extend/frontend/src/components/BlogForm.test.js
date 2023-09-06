import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  render(<BlogForm createBlog={createBlog} />);

  const title = screen.getByPlaceholderText("title");
  const author = screen.getByPlaceholderText("author");
  const url = screen.getByPlaceholderText("url");
  const sendButton = screen.getByText("create");

  await user.type(title, "this is a happy day");
  await user.type(author, "Zhang");
  await user.type(url, "localhost:5173");
  await user.click(sendButton);

  // console.log(createBlog.mock.calls)
  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("this is a happy day");
  expect(createBlog.mock.calls[0][0].author).toBe("Zhang");
  expect(createBlog.mock.calls[0][0].url).toBe("localhost:5173");
});
