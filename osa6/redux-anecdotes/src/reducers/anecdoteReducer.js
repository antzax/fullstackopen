import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    addVote(state, action) {
      const id = action.payload.id
      return state.map(anecdote => anecdote.id === id ? action.payload : anecdote);
    },
    addAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content);
    dispatch(addAnecdote(newAnecdote));
  };
};

export const voteAnecdote = ({content, votes, id}) => {
  return async (dispatch) => {
    const votedAnecdote = { content, votes: votes + 1 };
    const updatedAnecdote = await anecdoteService.update(votedAnecdote, id);
    dispatch(addVote(updatedAnecdote));
  };
};

export const { addAnecdote, setAnecdotes, addVote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
