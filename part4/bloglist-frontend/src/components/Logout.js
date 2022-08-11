import React from 'react';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { clearUser } from '../reducers/loginReducer';
import { useNavigate } from 'react-router-dom';

const Logout = ({ user }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logoutHandler = (e) => {
        e.preventDefault();
        dispatch(clearUser());
        navigate('/login');
    };
    return (
        <>
            <em className="smallpadding">{user.name} logged in</em>
            <Button id="logout" handler={logoutHandler} value="logout" />
        </>
    );
};

export default Logout;
