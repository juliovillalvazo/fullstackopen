import { createSlice } from '@reduxjs/toolkit';
import blogsService from '../services/blogs';

const blogsReducer = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload;
        },

        appendBlog(state, action) {
            return [...state, action.payload];
        },

        updateBlog(state, action) {
            const updatedBlog = action.payload;
            const id = updatedBlog.id;
            return [
                ...state.map((blog) =>
                    blog.id !== id ? blog : { ...updatedBlog }
                ),
            ];
        },

        deleteBlog(state, action) {
            const id = action.payload;
            return [...state.filter((blog) => blog.id !== id)];
        },
    },
});

export const { setBlogs, appendBlog, updateBlog, deleteBlog } =
    blogsReducer.actions;

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogsService.getAll();
        dispatch(setBlogs(blogs));
    };
};

export const createNewBlog = (blogObject) => {
    return (dispatch) => {
        dispatch(appendBlog(blogObject));
    };
};

export const likeBlog = (id, updatedBlog) => {
    return async (dispatch) => {
        const newLikes = await blogsService.update(id, updatedBlog);
        dispatch(updateBlog(newLikes));
    };
};

export const commentBlog = (id, updatedBlog) => {
    return async (dispatch) => {
        const newBlog = await blogsService.updateComments(id, updatedBlog);
        dispatch(updateBlog(newBlog));
    };
};

export default blogsReducer.reducer;
