import React from 'react';

const Part = ({ name, exercises }) => (
    <li>
        {name} {exercises}
    </li>
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
        </div>
    );
};

export default Course;
