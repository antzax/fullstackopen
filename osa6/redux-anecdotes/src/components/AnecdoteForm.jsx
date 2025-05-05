import { addAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const submitAnecdote = (e) => {
    e.preventDefault();
    dispatch(addAnecdote(e.target.anecdote.value));
  };

  return (
    <form onSubmit={submitAnecdote}>
      <div>
        <input name="anecdote" />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default AnecdoteForm;
