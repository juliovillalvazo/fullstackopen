import React from 'react';
import { useMatch, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const User = () => {
    const match = useMatch('/users/:id');

    const users = useSelector(({ users }) => users);

    const user = match
        ? users.find((user) => user.id === match.params.id)
        : null;
    if (!user) {
        return null;
    }

    return (
        <div>
            <h2>{user.name}</h2>
            <h3>added blogs</h3>
            <ul>
                {user.blogs.map((blog) => (
                    <li key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default User;
