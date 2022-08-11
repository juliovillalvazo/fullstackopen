import { configureStore } from '@reduxjs/toolkit';
import blogsReducer from './reducers/blogsReducer';
import notificationReducer from './reducers/notificationReducer';
import loginReducer from './reducers/loginReducer';
import usersReducer from './reducers/usersReducer';

const store = configureStore({
    reducer: {
        blogs: blogsReducer,
        notification: notificationReducer,
        login: loginReducer,
        users: usersReducer,
    },
});

export default store;
