import React from 'react';

const Numbers = ({ persons }) => (
    <div>
        <ul>
            {persons.map((person, i) => (
                <li key={i}>
                    {person.name} {person.number}
                </li>
            ))}
        </ul>
    </div>
);

export default Numbers;
