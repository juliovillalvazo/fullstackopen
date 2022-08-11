import { createSlice } from '@reduxjs/toolkit';

const notificationReducer = createSlice({
    name: 'notification',
    initialState: { message: '', type: '' },
    reducers: {
        setNotification(state, action) {
            return {
                message: action.payload.message,
                type: action.payload.type,
            };
        },
    },
});

export const { setNotification } = notificationReducer.actions;

let timeoutId = null;

export const createNotification = (message, type) => {
    return (dispatch) => {
        dispatch(setNotification({ message, type }));
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            dispatch(setNotification({ message: '', type: '' }));
        }, 5000);
    };
};

export default notificationReducer.reducer;
