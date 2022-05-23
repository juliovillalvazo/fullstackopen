import React from 'react';

const Part = ({ name, exercises }) => (
    <li>
        {name} {exercises}
    </li>
);

const Total = ({ parts }) => (
    <p>
        <strong>
            total of {parts.reduce((prev, cur) => prev + cur.exercises, 0)}{' '}
            exercises
        </strong>
    </p>
);
const Course = ({ course }) => {
    return (
        <div key={course.id}>
            <h2>{course.name}</h2>
            <ul>
                {course.parts.map((part) => {
                    return (
                        <Part
                            key={part.id}
                            name={part.name}
                            exercises={part.exercises}
                        />
                    );
                })}
            </ul>
            <Total parts={course.parts} />
        </div>
    );
};

export default Course;
