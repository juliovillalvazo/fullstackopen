import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewBlog, likeBlog, deleteBlog } from '../reducers/blogsReducer';
import { createNotification } from '../reducers/notificationReducer';
import Toggleable from './Toggleable';
import AddBlogs from './AddBlogs';
import Blog from './Blog';
import blogService from '../services/blogs';

const BlogList = () => {
    const blogFormRef = useRef();
    const blogs = useSelector(({ blogs }) => blogs);
    const blogsToDisplay = [...blogs];

    const dispatch = useDispatch();

    const createBlog = async (blogObject) => {
        try {
            blogFormRef.current.toggleVisibility();

            const createdBlog = await blogService.create(blogObject);

            dispatch(createNewBlog(createdBlog));

            dispatch(
                createNotification(
                    `A new blog ${createdBlog.title} by ${createdBlog.author} was added`,
                    'success'
                )
            );
        } catch (err) {
            if (err.response.status === 401) {
                dispatch(
                    createNotification('You must login to post blogs', 'error')
                );
            } else {
                dispatch(createNotification('Invalid data input', 'error'));
            }
        }
    };
    const handleLikes = async (id, updatedBlog) => {
        await blogService.update(id, updatedBlog);

        dispatch(likeBlog(id));
    };

    const handleDelete = async (id) => {
        try {
            await blogService.remove(id);
            dispatch(deleteBlog(id));
            dispatch(
                createNotification('Successfully removed blog post', 'success')
            );
        } catch (error) {
            dispatch(createNotification(error.message, 'error'));
        }
    };

    return (
        <div>
            <Toggleable
                buttonLabel="create new"
                hideButtonLabel="cancel"
                ref={blogFormRef}
                id="new-blog"
            >
                <AddBlogs createBlog={createBlog} id="first" />
            </Toggleable>

            {blogsToDisplay
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        handleLikes={handleLikes}
                        handleDelete={handleDelete}
                    />
                ))}
        </div>
    );
};

export default BlogList;
