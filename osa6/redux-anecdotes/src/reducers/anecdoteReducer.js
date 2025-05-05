import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload;
      const anecdote = state.find((anecdote) => anecdote.id === id);
      if (anecdote) {
        anecdote.votes++;
      }
    },
    addAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { voteAnecdote, addAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
