import { useState } from 'react';
import Button from './Button';

const Blog = ({ blog, handleLikes, user, handleDelete }) => {
    const [showDetails, setShowDetails] = useState(false);

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    };

    const likesHelper = () => {
        const updatedBlogPost = {
            user: blog.user?.id,
            title: blog.title,
            url: blog.url,
            author: blog.author,
            likes: blog.likes + 1,
        };

        handleLikes(blog.id, updatedBlogPost);
    };

    const removeHelper = () => {
        const confirm = window.confirm(
            `Remove ${blog.title} by ${blog.author} ?`
        );

        confirm && handleDelete(blog.id);
    };

    return (
        <div style={blogStyle}>
            {showDetails ? (
                <div>
                    {blog.title} {blog.author}{' '}
                    <Button
                        value="hide"
                        handler={() => {
                            setShowDetails(false);
                        }}
                    />
                    <p>{blog.url}</p>
                    <p>
                        {blog.likes}{' '}
                        <Button value="like" handler={likesHelper} />
                    </p>
                    <p>{blog.user?.name}</p>
                    {blog.user?.name === user.name ? (
                        <div>
                            <Button
                                type="red"
                                value="remove"
                                handler={removeHelper}
                            />
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            ) : (
                <div>
                    {blog.title} {blog.author}{' '}
                    <Button
                        value="show"
                        handler={() => {
                            setShowDetails(true);
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default Blog;
