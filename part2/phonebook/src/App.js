import { useState } from 'react';
import Numbers from './components/Numbers';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
    ]);
    const [newName, setNewName] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [filter, setFilter] = useState('');

    const addPerson = (event) => {
        event.preventDefault();
        if (persons.find((person) => person.name === newName)) {
            alert(`${newName} is already added to phonebook`);
        } else {
            const newPerson = {
                name: newName,
                number: newPhone,
            };
            setPersons(persons.concat(newPerson));
            setNewName('');
            setNewPhone('');
        }
    };

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handlePhoneChange = (event) => {
        setNewPhone(event.target.value);
    };

    const results = filter
        ? [...persons].filter((person) =>
              person.name.toLowerCase().includes(filter)
          )
        : [...persons];

    const handleFilter = (event) => {
        setFilter(event.target.value);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} handler={handleFilter} />
            <h3>Add a new</h3>
            <PersonForm
                addPerson={addPerson}
                newName={newName}
                handleNameChange={handleNameChange}
                newPhone={newPhone}
                handlePhoneChange={handlePhoneChange}
            />
            <h3>Numbers</h3>
            <Numbers persons={results} />
        </div>
    );
};

export default App;
