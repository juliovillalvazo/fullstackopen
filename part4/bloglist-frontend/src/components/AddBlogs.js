import { useState } from 'react';
import Button from './Button';

const AddBlogs = ({ createBlog }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const addBlog = (event) => {
        event.preventDefault();

        createBlog({
            title,
            author,
            url,
        });

        setAuthor('');
        setUrl('');
        setTitle('');
    };

    return (
        <div>
            <h3>Create new</h3>
            <form onSubmit={addBlog}>
                <p>
                    title:{' '}
                    <input
                        type="text"
                        value={title}
                        placeholder="enter title..."
                        name="title"
                        id="title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </p>
                <p>
                    author:{' '}
                    <input
                        type="text"
                        value={author}
                        name="author"
                        id="author"
                        placeholder="enter author..."
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </p>
                <p>
                    url:{' '}
                    <input
                        type="text"
                        value={url}
                        name="url"
                        id="url"
                        placeholder="enter url..."
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </p>
                <Button id="create-blog" type="btn" value="create new blog" />
            </form>
        </div>
    );
};

export default AddBlogs;
