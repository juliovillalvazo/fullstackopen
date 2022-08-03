const initialState = { content: '', timeOutId: 0 };

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NEW_NOTIFICATION':
            if (state.timeOutId !== action.data.timeOutId) {
                clearTimeout(state.timeOutId);
            }
            return {
                content: action.data.content,
                timeOutId: action.data.timeOutId,
            };
        case 'CLEAR':
            return { ...state, content: '' };
        default:
            return state;
    }
};

export const newNotification = (content, timeOutId) => {
    return {
        type: 'NEW_NOTIFICATION',
        data: {
            content,
            timeOutId,
        },
    };
};

export const setNotification = (content, time) => {
    return (dispatch) => {
        const TIME_IN_SECONDS = time * 1000;
        const timeOutId = setTimeout(() => {
            dispatch(clearNotification());
        }, TIME_IN_SECONDS);
        dispatch(newNotification(content, timeOutId));
    };
};

export const clearNotification = () => {
    return {
        type: 'CLEAR',
    };
};

export default notificationReducer;
