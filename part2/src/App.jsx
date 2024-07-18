import React, { useState, useEffect } from 'react';
import personsService from './services/persons';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import Notification from './Notification';
import './index.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState({ message: null, type: '' });

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const initialPersons = await personsService.getAll();
        setPersons(initialPersons);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPersons();
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const addPerson = async (event) => {
    event.preventDefault();
    const personExists = persons.find(person => person.name === newName);

    if (personExists) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (confirmUpdate) {
        const updatedPerson = { ...personExists, number: newNumber };

        try {
          const returnedPerson = await personsService.update(personExists.id, updatedPerson);
          setPersons(persons.map(person => person.id !== personExists.id ? person : returnedPerson));
          setNewName('');
          setNewNumber('');
          setNotification({ message: `Updated ${newName}`, type: 'success' });
          setTimeout(() => {
            setNotification({ message: null, type: '' });
          }, 5000);
        } catch (error) {
          setNotification({ message: `Information of ${newName} has already been removed from server`, type: 'error' });
          setTimeout(() => {
            setNotification({ message: null, type: '' });
          }, 5000);
          setPersons(persons.filter(person => person.id !== personExists.id));
        }
      }
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    try {
      const returnedPerson = await personsService.create(personObject);
      setPersons(persons.concat(returnedPerson));
      setNewName('');
      setNewNumber('');
      setNotification({ message: `Added ${newName}`, type: 'success' });
      setTimeout(() => {
        setNotification({ message: null, type: '' });
      }, 5000);
    } catch (error) {
      console.error('Error adding person:', error);
    }
  };

  const deletePerson = async (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      try {
        await personsService.remove(id);
        setPersons(persons.filter(person => person.id !== id));
        setNotification({ message: `Deleted ${name}`, type: 'success' });
        setTimeout(() => {
          setNotification({ message: null, type: '' });
        }, 5000);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setNotification({ message: `Information of ${name} has already been removed from server`, type: 'error' });
          setPersons(persons.filter(person => person.id !== id));
        } else {
          setNotification({ message: `Failed to delete ${name}`, type: 'error' });
        }
        setTimeout(() => {
          setNotification({ message: null, type: '' });
        }, 5000);
      }
    }
  };

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
