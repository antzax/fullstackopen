const PersonList = ({ filteredPersons, handlePersonDelete }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number} <button onClick={() => handlePersonDelete(person.id)}>delete</button>
        </p>
      ))}
    </div>
  );
};

export default PersonList;
