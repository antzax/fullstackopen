const NoteForm = ({ addNote, newNote, setNewNote }) => {
  return (
    <div>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={({ target }) => setNewNote(target.value)} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default NoteForm;
