import React from 'react';
import { useDispatch } from 'react-redux';
import loginService from '../services/loginService';
import { setUser } from '../reducers/loginReducer';
import { createNotification } from '../reducers/notificationReducer';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const username = e.target.username.value;
            const password = e.target.password.value;
            e.target.username.value = '';
            e.target.password.value = '';

            const user = await loginService.login({ username, password });

            dispatch(setUser(user));

            dispatch(
                createNotification(
                    `Successfully logged in as ${user.username}`,
                    'success'
                )
            );
            navigate('/');
        } catch (exception) {
            dispatch(createNotification('Wrong username or password', 'error'));
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <h3>Log in to application to see the blogs</h3>
                <div>
                    username
                    <input type="text" name="username" id="username" />
                </div>
                <div>
                    password
                    <input type="password" id="password" name="password" />
                </div>
                <Button id="login-button" type="submit" value="login" />
            </form>
        </div>
    );
};

export default LoginForm;
