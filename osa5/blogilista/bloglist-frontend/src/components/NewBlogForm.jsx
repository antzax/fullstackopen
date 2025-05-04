import { useState } from "react";

const NewBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (e) => {
    e.preventDefault();

    createBlog({ title, author, url });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="">Title</label>
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder="title"
          />
        </div>
        <div>
          <label htmlFor="">Author</label>
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="author"
          />
        </div>
        <div>
          <label htmlFor="">Url</label>
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            placeholder="url"
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default NewBlogForm;
