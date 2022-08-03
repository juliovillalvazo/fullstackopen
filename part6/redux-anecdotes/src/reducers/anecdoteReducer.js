import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        vote(state, action) {
            return state.map((el) =>
                el.id !== action.payload.id ? el : action.payload
            );
        },

        appendAnecdote(state, action) {
            state.push(action.payload);
        },

        setAnecdotes(state, action) {
            return action.payload;
        },
    },
});

export const { vote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll();
        dispatch(setAnecdotes(anecdotes));
    };
};

export const createAnecdote = (content) => {
    return async (dispatch) => {
        const anecdote = await anecdoteService.newAnecdote(content);
        dispatch(appendAnecdote(anecdote));
    };
};

export const updateAnecdote = ({ id, content, votes }) => {
    return async (dispatch) => {
        const anecdote = await anecdoteService.update(id, {
            content,
            votes: votes + 1,
        });

        dispatch(vote(anecdote));
    };
};

export default anecdoteSlice.reducer;
