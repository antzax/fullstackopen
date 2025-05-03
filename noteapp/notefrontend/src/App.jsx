import { useEffect, useState } from "react";
import noteService from "./services/notes";
import loginService from "./services/login";
import Note from "./components/Note";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import NoteForm from "./components/NoteForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const initialNotes = await noteService.getAll();
      setNotes(initialNotes);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        console.log(error.message);
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => setErrorMessage(null), 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const addNote = (event) => {
    event.preventDefault();

    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    };

    noteService
      .create(noteObject)
      .then((returnedNote) => {
        setNotes(notes.concat(returnedNote));
        setNewNote("");
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data.error);
        setTimeout(() => setErrorMessage(null), 5000);
      });
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      noteService.setToken(user.token);
      window.localStorage.setItem("loggedNoteAppUser", JSON.stringify(user));
      setUser(user);
      setNotificationMessage(`${user.username} logged in succesfully`);
      setTimeout(() => setNotificationMessage(null), 5000);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  const handleLogout = () => {
    if (window.confirm("do you want to logut?")) {
      window.localStorage.removeItem("loggedNoteAppUser");
      setNotificationMessage(`${user.username} logged out succesfully`);
      setTimeout(() => setNotificationMessage(null), 5000);
      setUser(null);
    }
  };

  return (
    <div>
      <h1>Notes</h1>
      {user && <button onClick={handleLogout}>logout</button>}
      <Notification
        errorMessage={errorMessage}
        notificationMessage={notificationMessage}
      />
      {user ? (
        <div>
          <p>{user.name} logged in</p>
          <Togglable buttonLabel="new note">
            <NoteForm
              handleChange={setNewNote}
              onSubmit={addNote}
              value={newNote}
            />
          </Togglable>
        </div>
      ) : (
        <Togglable buttonLabel="login">
          <LoginForm
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            handleSubmit={handleLogin}
          />
        </Togglable>
      )}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>

      <Footer />
    </div>
  );
};

export default App;
