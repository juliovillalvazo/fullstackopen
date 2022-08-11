/* eslint-disable indent */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch } from 'react-router-dom';
import { likeBlog, commentBlog } from '../reducers/blogsReducer';
import Button from './Button';

const BlogPost = () => {
    const dispatch = useDispatch();
    const blogs = useSelector(({ blogs }) => blogs);
    const match = useMatch('/blogs/:id');
    const blog = match
        ? blogs.find((blog) => blog.id === match.params.id)
        : null;

    if (!blog) return null;

    const likesHelper = () => {
        const updatedBlogPost = {
            user: blog.user.id,
            title: blog.title,
            url: blog.url,
            author: blog.author,
            likes: blog.likes + 1,
        };

        dispatch(likeBlog(blog.id, updatedBlogPost));
    };

    const handleComment = (e) => {
        e.preventDefault();

        const newComment = e.target.newComment.value;
        e.target.newComment.value = '';

        const updatedBlog = {
            user: blog.user.id,
            title: blog.title,
            url: blog.url,
            author: blog.author,
            likes: blog.likes,
            comments: [...blog.comments, newComment],
        };

        dispatch(commentBlog(blog.id, updatedBlog));
    };

    return (
        <div>
            <h2>{blog.title}</h2>
            <p>{blog.url}</p>
            <p>
                {blog.likes}{' '}
                <Button id="likes-button" value="like" handler={likesHelper} />
            </p>
            <p>added by {blog.author}</p>
            <h3>Comments</h3>
            <form onSubmit={handleComment}>
                <input type="text" name="newComment" />
                <button type="submit">comment</button>
            </form>
            <ul>
                {blog.comments.length
                    ? blog.comments.map((comment, i) => (
                          <li key={i}>{comment}</li>
                      ))
                    : ''}
            </ul>
        </div>
    );
};

export default BlogPost;
