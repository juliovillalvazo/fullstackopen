import { useEffect, useState } from 'react';
import Numbers from './components/Numbers';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import numbersService from './services/numbersService';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [filter, setFilter] = useState('');

    const hook = () => {
        numbersService.getAll().then((all) => {
            setPersons(all);
        });
    };

    useEffect(hook, []);

    const addPerson = (event) => {
        event.preventDefault();
        // const checkPersonNamePhone = persons.find((person) => person.name === newName && person.number !== newPhone);
        // const checkPersonName = persons.find(
        //     (person) => person.name === newName
        // );

        const checkExistingPerson = persons.find(
            (person) => person.name === newName
        );

        const id = checkExistingPerson ? checkExistingPerson.id : 0;

        if (id) {
            const queryPerson = window.confirm(
                `${checkExistingPerson.name} is already added to phonebook, replace the old number with a new one?`
            );
            if (queryPerson) {
                const updatedInfo = {
                    ...checkExistingPerson,
                    number: newPhone,
                };

                numbersService.update(id, updatedInfo).then((response) => {
                    if (response) {
                        numbersService
                            .getAll()
                            .then((response) => setPersons(response));
                    }
                });
            }
        } else {
            const newPerson = {
                name: newName,
                number: newPhone,
            };

            numbersService.create(newPerson).then((newPerson) => {
                setPersons(persons.concat(newPerson));
                setNewName('');
                setNewPhone('');
            });
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

    const deleteHandler = (event) => {
        const id = Number(event.target.id);
        const queryDelete = window.confirm(
            `Delete ${persons.find((person) => person.id === id).name} ?`
        );
        if (queryDelete) {
            const filteredPersons = persons.filter(
                (person) => person.id !== id
            );

            numbersService.deleteMethod(id).then((response) => {
                if (response.status === 200) {
                    setPersons(filteredPersons);
                } else {
                    return response;
                }
            });
        }
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
            <Numbers persons={results} deleteHandler={deleteHandler} />
        </div>
    );
};

export default App;
