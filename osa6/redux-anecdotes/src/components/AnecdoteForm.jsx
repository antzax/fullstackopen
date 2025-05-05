import { addAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import { sendNotificaton } from "../reducers/notificationReducer";


const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const submitAnecdote = (e) => {
    e.preventDefault();
    let anecdoteText = e.target.anecdote.value

    dispatch(sendNotificaton(`${anecdoteText} added succesfully`));
    dispatch(addAnecdote(anecdoteText));

    e.target.anecdote.value = ""
    setTimeout(() => dispatch(sendNotificaton(null)), 5000)
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
