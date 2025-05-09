import Togglable from "./Togglable";

const Blog = ({ blog, changeLikes, user, deleteBlog }) => {
  const addLike = () => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1,
    };

    changeLikes(newBlog);
  };

  const handleDelete = (id) => {
    if (window.confirm("delete blog?")) {
      deleteBlog(id);
    }
  };

  return (
    <div className="blog">
      <div className="blog-preview">
        <h2>{blog.title}</h2>
        <p>(written by: {blog.author})</p>
      </div>
      <Togglable openLabel="show" closeLabel="hide">
        <div className="blog-info">
          <table>
            <tbody>
              <tr>
                <td>{blog.url}</td>
              </tr>
              <tr>
                <td>
                  likes {blog.likes}{" "}
                  <button
                    style={{
                      backgroundColor: "green",
                      color: "white",
                      border: "none",
                    }}
                    onClick={addLike}
                  >
                    like
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          {blog.user.username === user.username && (
            <button
              style={{ backgroundColor: "red", color: "white", border: "none" }}
              onClick={() => handleDelete(blog.id)}
            >
              delete
            </button>
          )}
        </div>
      </Togglable>
    </div>
  );
};

export default Blog;
