import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import loginService from "./services/login";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect( () => {
    const userJSON = window.localStorage.getItem("loggedInUser");

    if (userJSON) {
      const user = JSON.parse(userJSON);
      blogService.setToken(user.token);
      setUser(user);
      blogService.getAll(user.token).then(blogs => setBlogs(blogs))
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
    setUser(null)
    window.localStorage.removeItem("loggedInUser")
  }

  return (
    <div>
      {user && <p>{user.username} logged in <button onClick={handleLogout}>log out</button></p>}

      {notification && <p className="notification">{notification}</p>}

      {user ? (
        <div>
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
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
