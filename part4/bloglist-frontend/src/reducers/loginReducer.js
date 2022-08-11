import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const loginReducer = createSlice({
    name: 'login',
    initialState: null,
    reducers: {
        login(_state, action) {
            return action.payload;
        },
        // eslint-disable-next-line no-unused-vars
        logout(_state, _action) {
            return null;
        },

        // eslint-disable-next-line no-unused-vars
        fetchState(state, action) {
            return { ...state };
        },
    },
});

export const { login, logout, fetchState } = loginReducer.actions;

export const setUser = (user) => {
    return (dispatch) => {
        window.localStorage.setItem('loggedBlogsUser', JSON.stringify(user));
        blogService.setToken(user.token);
        dispatch(login(user));
    };
};

export const clearUser = () => {
    return (dispatch) => {
        window.localStorage.clear();
        dispatch(logout());
    };
};

export const initializeSession = (user) => {
    return (dispatch) => {
        blogService.setToken(user.token);
        dispatch(login(user));
    };
};

export default loginReducer.reducer;
