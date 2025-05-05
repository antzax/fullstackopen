import { createSlice } from "@reduxjs/toolkit";
import noteService from "../services/notes";

const noteSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {
    toggleImportanceOf(state, action) {
      const { payload: id } = action;
      return state.map((note) =>
        note.id === id ? { ...note, important: !note.important } : note
      );
    },
    appendNote(state, action) {
      state.push(action.payload);
    },
    setNotes(state, action) {
      return action.payload;
    },
  },
});

export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions;

export const initializeNotes = () => {
  return async (dispatch) => {
    const notes = await noteService.getAll();
    dispatch(setNotes(notes));
  };
};

export const createNote = (content) => {
  return async (dispatch) => {
    const newNote = await noteService.createNew(content);
    dispatch(appendNote(newNote));
  };
};

export default noteSlice.reducer;
