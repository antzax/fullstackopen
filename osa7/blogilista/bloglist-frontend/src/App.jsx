import { useState, useContext, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import loginService from "./services/login";
import blogService from "./services/blogs";
import NewBlogForm from "./components/NewBlogForm";
import Togglable from "./components/Togglable";
import "./main.css";
import NotificationContext from "./NotificationContext";
import Notification from "./components/Notification";
import { useMutation, useQuery } from "@tanstack/react-query";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, notificationDispatch] = useContext(NotificationContext);
  const newBlogMutation = useMutation({ mutationFn: blogService.create });

  useEffect(() => {
    const storedUser = window.localStorage.getItem("loggedInUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const blogsQuery = useQuery({
    queryKey: ["blogs"],
    queryFn: () => blogService.getAll(),
    enabled: !!user,
  });

  useEffect(() => {
    if (blogsQuery.data) {
      setBlogs(blogsQuery.data);
    }
  }, [blogsQuery.data]);

  if (blogsQuery.isLoading) return <div>Loading...</div>;

  if (blogsQuery.isError) return <div>Error: {blogsQuery.error.message}</div>;

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
      notificationDispatch({
        type: "SEND_MESSAGE",
        payload: `${user.username} logged in`,
      });
      setTimeout(() => notificationDispatch({ type: "CLEAR" }), 3000);
    } catch (exception) {
      notificationDispatch({
        type: "SEND_MESSAGE",
        payload: "invalid username or password",
      });
      setTimeout(() => notificationDispatch({ type: "CLEAR" }), 3000);
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedInUser");
    notificationDispatch({
      type: "SEND_MESSAGE",
      payload: `${user.username} logged out`,
    });
    setTimeout(() => notificationDispatch({ type: "CLEAR" }), 3000);
  };

  const addBlog = async (newBlogObject) => {
    newBlogMutation.mutate(newBlogObject, {
      onSuccess: (savedBlog) => {
        setBlogs(blogs.concat(savedBlog));
        notificationDispatch({
          type: "SEND_MESSAGE",
          payload: `${savedBlog.title} added successfully`,
        });
        setTimeout(() => notificationDispatch({ type: "CLEAR" }), 3000);
      },
      onError: (error) => {
        notificationDispatch({
          type: "SEND_MESSAGE",
          payload: `Error: ${error.message}`,
        });
        setTimeout(() => notificationDispatch({ type: "CLEAR" }), 3000);
      },
    });
  };

  const changeLikes = async (newBlogObject) => {
    const savedBlog = await blogService.update(newBlogObject, newBlogObject.id);
    setBlogs(
      blogs.map((blog) => (blog.id === savedBlog.id ? savedBlog : blog)),
    );
    notificationDispatch({
      type: "SEND_MESSAGE",
      payload: "You liked this blog",
    });
    setTimeout(() => notificationDispatch({ type: "CLEAR" }), 3000);
  };

  const deleteBlog = async (id) => {
    await blogService.destroy(id);
    setBlogs(blogs.filter((blog) => blog.id !== id));
    notificationDispatch({
      type: "SEND_MESSAGE",
      payload: "Blog deleted successfully",
    });
    setTimeout(() => notificationDispatch({ type: "CLEAR" }), 3000);
  };

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      {user && (
        <p>
          <button onClick={handleLogout}>log out</button>
        </p>
      )}

      {notification && <Notification notification={notification} />}

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
