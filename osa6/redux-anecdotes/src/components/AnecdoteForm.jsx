import { addAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import { resetNotification, sendNotification } from "../reducers/notificationReducer";
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const submitAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value
    e.target.anecdote.value = ""

    const newAnecdote = await anecdoteService.create(content)
    dispatch(addAnecdote(newAnecdote))
    dispatch(sendNotification("Anecdote added succesfully"))
    setTimeout(() => dispatch(resetNotification()), 5000)
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
