import React from 'react';

const Numbers = ({ persons, deleteHandler }) => (
    <div>
        <ul>
            {persons.map((person, i) => (
                <li key={i}>
                    {person.name} {person.number}{' '}
                    <button id={person.id} onClick={deleteHandler}>
                        delete
                    </button>
                </li>
            ))}
        </ul>
    </div>
);

export default Numbers;
