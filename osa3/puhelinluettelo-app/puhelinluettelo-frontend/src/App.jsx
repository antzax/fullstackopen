import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import NewPersonForm from "./components/NewPersonForm";
import PersonList from "./components/PersonList";
import personService from "./services/personService";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState(null)
  const [error, setErrorMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then((allPersons) => setPersons(allPersons));
  }, []);

  const checkExisting = () => {
    const isPersonAlreadyAdded = persons
      .map(({ name }) => name.toLowerCase())
      .includes(newName.toLowerCase());

    if (isPersonAlreadyAdded) {
      const isConfirmed = window.confirm(
        `${newName} is already added to phonebook, replace old number with a new one?`
      );
      if (isConfirmed) {
        handlePersonUpdate();
      }
      return true;
    }
    return false;
  };

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };

  const handleNewNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSearchName = (e) => {
    setSearch(e.target.value);
  };

  const filteredPersons = persons.filter(({ name }) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddPerson = (e) => {
    e.preventDefault();

    if (checkExisting()) return;

    const newPersonObject = {
      name: newName,
      number: newNumber,
    };

    personService
      .create(newPersonObject)
      .then((addedPerson) => setPersons(persons.concat(addedPerson)));

    setNotification(`${newName} was succesfully added.`)
    setTimeout(() => setNotification(null), 5000)
    setNewName("");
    setNewNumber("");
  };

  const handlePersonDelete = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
      personService.destroy(person.id).then((deletedPerson) => {
        console.log(person.id)
        console.log(deletedPerson.id)
        setPersons(persons.filter((person) => person.id !== deletedPerson.id));
        setNotification(`${person.name} was succesfully deleted.`)
        setTimeout(() => setNotification(null), 5000)
      });
    }
  };

  const handlePersonUpdate = () => {
    const existingPerson = persons.find((person) => {
      return person.name.toLowerCase() === newName.toLowerCase();
    });

    personService
      .update(existingPerson.id, { ...existingPerson, number: newNumber })
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) =>
            person.id === returnedPerson.id ? returnedPerson : person
          )
        );
      });

    setNotification(`${existingPerson.name} was succesfully updated.`)
    setTimeout(() => setNotification(null), 5000)
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notificationMessage={notification} errorMessage={error} />
      <Filter handleSearchName={handleSearchName} />
      <NewPersonForm
        handleAddPerson={handleAddPerson}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
        handlePersonUpdate={handlePersonUpdate}
      />
      <PersonList
        filteredPersons={filteredPersons}
        handlePersonDelete={handlePersonDelete}
      />
    </div>
  );
};

export default App;
