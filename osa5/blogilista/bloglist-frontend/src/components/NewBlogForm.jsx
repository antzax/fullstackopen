const NewBlogForm = ({
  addBlog,
  author,
  title,
  url,
  setAuthor,
  setTitle,
  setUrl,
}) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="">Title</label>
          <input type="text" value={title} onChange={({target}) => setTitle(target.value)} />
        </div>
        <div>
          <label htmlFor="">Author</label>
          <input type="text" value={author} onChange={({target}) => setAuthor(target.value)} />
        </div>
        <div>
          <label htmlFor="">Url</label>
          <input type="text" value={url} onChange={({target}) => setUrl(target.value)} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default NewBlogForm;
