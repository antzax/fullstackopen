import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import loginService from "./services/login";
import blogService from "./services/blogs";
import NewBlogForm from "./components/NewBlogForm";
import Togglable from "./components/Togglable";
import "./main.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const userJSON = window.localStorage.getItem("loggedInUser");

    if (userJSON) {
      const user = JSON.parse(userJSON);
      blogService.setToken(user.token);
      setUser(user);
      blogService.getAll(user.token).then((blogs) => setBlogs(blogs));
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));

      setUser(user);
      setUsername("");
      setPassword("");
      setNotification(`${user.username} logged in`);
      setTimeout(() => setNotification(null), 3000);
    } catch (exception) {
      setNotification("invalid username or password");
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedInUser");
    setNotification(`${user.username} logged out`);
    setTimeout(() => setNotification(null), 3000);
  };

  const addBlog = async (newBlogObject) => {
    const savedBlog = await blogService.create(newBlogObject);
    setBlogs(blogs.concat(savedBlog));

    setNotification(`${savedBlog.title} added succesfully`);
    setTimeout(() => setNotification(null), 3000);
  };

  const changeLikes = async (newBlogObject) => {
    const savedBlog = await blogService.update(newBlogObject, newBlogObject.id);
    setBlogs(
      blogs.map((blog) => (blog.id === savedBlog.id ? savedBlog : blog))
    );

    setNotification("You liked this blog");
    setTimeout(() => setNotification(null), 3000);
  };

  const deleteBlog = async (id) => {
    await blogService.destroy(id);
    setBlogs(blogs.filter((blog) => blog.id !== id));

    setNotification("Blog deleted succesfully");
    setTimeout(() => setNotification(null), 3000);
  };

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      {user && (
        <p>
          <button onClick={handleLogout}>log out</button>
        </p>
      )}

      {notification && <p className="notification">{notification}</p>}

      {user ? (
        <div>
          <Togglable openLabel="new blog" closeLabel="cancel">
            <NewBlogForm createBlog={addBlog} />
          </Togglable>

          <div className="blog-container">
            {sortedBlogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                changeLikes={changeLikes}
                user={user}
                deleteBlog={deleteBlog}
              />
            ))}
          </div>
        </div>
      ) : (
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      )}
    </div>
  );
};

export default App;
