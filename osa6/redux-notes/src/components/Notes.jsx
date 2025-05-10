import { toggleImportanceOf } from "../reducers/noteReducer";
import { useDispatch, useSelector } from "react-redux";
import NoteService from "../services/notes"

const Note = ({ note, handleClick }) => (
  <li onClick={handleClick}>
    {note.content} <strong>{note.important ? "important" : ""}</strong>
  </li>
);

const Notes = () => {
  const dispatch = useDispatch()

  const notes = useSelector(({filter, notes}) => {
    if(filter === 'ALL'){
      return notes
    }
    return filter === 'IMPORTANT'
      ? notes.filter(note => note.important)
      : notes.filter(note => !note.important)
  });

  const toggleImportance = async (note) => {
    try {
      const { id } = await NoteService.updateImportance(note)
      dispatch(toggleImportanceOf(id))
    } catch (error) {
      console.error('Error toggling importance: ', error)
    }
  }

  return (
    <ul>
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          handleClick={() => toggleImportance(note)}
        />
      ))}
    </ul>
  );
};

export default Notes;
