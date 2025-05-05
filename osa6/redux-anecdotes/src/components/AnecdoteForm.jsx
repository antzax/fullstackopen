import { createAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const submitAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value
    e.target.anecdote.value = ""
    
    dispatch(createAnecdote(content))
    dispatch(setNotification("Anecdote added succesfully", 2))
  };

  return (
    <form onSubmit={submitAnecdote}>
      <h2>create new</h2>
      <div>
        <input name="anecdote" />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default AnecdoteForm;
