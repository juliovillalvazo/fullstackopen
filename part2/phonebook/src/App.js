import { useEffect, useState } from 'react';
import Numbers from './components/Numbers';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import numbersService from './services/numbersService';
import Notification from './components/Notification';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [filter, setFilter] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const hook = () => {
        numbersService.getAll().then((all) => {
            setPersons(all);
        });
    };

    useEffect(hook, []);

    const addPerson = (event) => {
        event.preventDefault();
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

                numbersService
                    .update(id, updatedInfo)
                    .then((response) => {
                        if (response) {
                            numbersService
                                .getAll()
                                .then((response) => setPersons(response));
                            setMessage(
                                `Modified ${checkExistingPerson.name} phone number`
                            );

                            setMessageType('success');

                            setTimeout(() => {
                                setMessage(null);
                                setMessageType(null);
                            }, 5000);
                        }
                    })
                    .catch((error) => {
                        setMessage(
                            `Information of ${checkExistingPerson.name} has already been removed from server`
                        );

                        setMessageType('error');

                        numbersService
                            .getAll()
                            .then((response) => setPersons(response));

                        setNewName('');
                        setNewPhone('');

                        setTimeout(() => {
                            setMessage(null);
                            setMessageType(null);
                        }, 5000);
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

                setMessage(`Added ${newPerson.name}`);

                setMessageType('success');

                setTimeout(() => {
                    setMessage(null);
                    setMessageType(null);
                }, 5000);
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
        const personToDelete = persons.find((person) => person.id === id).name;
        const queryDelete = window.confirm(`Delete ${personToDelete} ?`);
        if (queryDelete) {
            const filteredPersons = persons.filter(
                (person) => person.id !== id
            );

            numbersService
                .deleteMethod(id)
                .then((response) => {
                    if (response.status === 200) {
                        setPersons(filteredPersons);

                        setMessage(`Deleted ${personToDelete}`);

                        setMessageType('success');

                        setTimeout(() => {
                            setMessage(null);
                            setMessageType(null);
                        }, 5000);
                    } else {
                        return response;
                    }
                })
                .catch((error) => {
                    setMessage(
                        `Information of ${personToDelete} has already been removed from server`
                    );

                    setMessageType('error');

                    setTimeout(() => {
                        setMessage(null);
                        setMessageType(null);
                    }, 5000);
                });
        }
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} type={messageType} />
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
