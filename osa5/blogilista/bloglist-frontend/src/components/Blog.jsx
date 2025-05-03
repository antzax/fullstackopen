const Blog = ({ blog, changeLikes, user, deleteBlog }) => {
  const blogStyle = {
    border: "1px solid black",
    borderRadius: 12,
    marginTop: 8,
    padding: 4,
  };

  const addLike = () => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1,
    };

    changeLikes(newBlog);
  };

  const handleDelete = (id) => {
    if(window.confirm("delete blog?")) {
      deleteBlog(id);
    }
  };

  return (
    <div style={blogStyle}>
      <table>
        <tbody>
          <tr>
            <td>{blog.url}</td>
          </tr>
          <tr>
            <td>
              likes {blog.likes} <button style={{backgroundColor: "green", color: "white", border: "none"}} onClick={addLike}>like</button>
            </td>
          </tr>
          <tr>
            <td>{blog.author}</td>
          </tr>
        </tbody>
      </table>
      {blog.user.username === user.username && (
        <button style={{backgroundColor: "red", color: "white", border: "none"}} onClick={() => handleDelete(blog.id)}>delete</button>
      )}
    </div>
  );
};

export default Blog;
