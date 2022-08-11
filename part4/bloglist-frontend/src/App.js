import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { initializeBlogs } from './reducers/blogsReducer';

import Logout from './components/Logout';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';

import BlogList from './components/BlogList';
import { Routes, Route, Link } from 'react-router-dom';
import Users from './components/Users';
import User from './components/User';
import BlogPost from './components/BlogPost';

import { initializeSession } from './reducers/loginReducer';
import { fetchUsers } from './reducers/usersReducer';

import styled from 'styled-components';

const Navigation = styled.div`
    background: BurlyWood;
    padding: 0.5em;
    display: flex;
    align-items: center;
    border-radius: 24px;
`;

const App = () => {
    const dispatch = useDispatch();
    const user = useSelector(({ login }) => login);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    useEffect(() => {
        dispatch(initializeBlogs());
    }, [dispatch]);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogsUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            dispatch(initializeSession(user));
        }
    }, []);

    return (
        <div>
            <Navigation>
                <Link className="smallpadding" to="/">
                    home
                </Link>
                <Link className="smallpadding" to="/users">
                    users
                </Link>
                {user ? (
                    <Logout user={user} />
                ) : (
                    <Link className="smallpadding" to="/login">
                        login
                    </Link>
                )}
            </Navigation>

            <h2>blogs app</h2>

            <Notification />

            <Routes>
                <Route path="/" element={<BlogList />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<User />} />
                <Route path="/blogs/:id" element={<BlogPost />} />
            </Routes>
        </div>
    );
};

export default App;
