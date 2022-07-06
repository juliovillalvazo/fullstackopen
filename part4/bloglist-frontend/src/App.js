import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/loginService';
import Button from './components/Button';
import AddBlogs from './components/AddBlogs';
import Notification from './components/Notification';
import Toggleable from './components/Toggleable';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    const [message, setMessage] = useState(null);
    const [type, setType] = useState('');

    const blogFormRef = useRef();

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogsUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const user = await loginService.login({ username, password });

            window.localStorage.setItem(
                'loggedBlogsUser',
                JSON.stringify(user)
            );

            setMessage(`Successfully logged in as ${user.username}`);
            setType('success');
            setTimeout(() => {
                setMessage(null);
                setType('');
            }, 3000);

            blogService.setToken(user.token);
            setUser(user);
            setUsername('');
            setPassword('');
        } catch (exception) {
            setMessage('Wrong username or password');
            setType('error');
            setTimeout(() => {
                setMessage(null);
                setType('');
            }, 3000);
        }
    };

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <h3>Log in to application to see the blogs</h3>
            <div>
                username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <Button type="submit" value="login" />
        </form>
    );

    const logoutHandler = (e) => {
        e.preventDefault();
        window.localStorage.clear();
        setUser(null);
    };

    const createBlog = async (blogObject) => {
        try {
            blogFormRef.current.toggleVisibility();
            const createdBlog = await blogService.create(blogObject);

            const reloadBlogs = await blogService.getAll();

            setBlogs(reloadBlogs);

            setMessage(
                `A new blog ${createdBlog.title} by ${createdBlog.author} was added`
            );
            setType('success');
            setTimeout(() => {
                setMessage(null);
                setType('');
            }, 3000);
        } catch (err) {
            setMessage('Invalid data input');
            setType('error');
            setTimeout(() => {
                setMessage(null);
                setType('');
            }, 3000);
        }
    };

    const handleLikes = async (id, updatedBlog) => {
        await blogService.update(id, updatedBlog);

        const updatedBlogs = await blogService.getAll();

        setBlogs(updatedBlogs);
    };

    const handleDelete = async (id) => {
        try {
            await blogService.remove(id);
            setMessage('Successfully removed blog post');
            setType('success');
            const updatedBlogs = await blogService.getAll();
            setBlogs(updatedBlogs);
            setTimeout(() => {
                setMessage(null);
                setType(null);
            }, 3000);
        } catch (error) {
            setMessage(error.message);
            setType('error');
            setTimeout(() => {
                setMessage(null);
                setType(null);
            }, 3000);
        }
    };

    const seeBlogs = () => (
        <div>
            <p>
                {user.name} logged in{' '}
                <Button handler={logoutHandler} value="logout" />
            </p>

            <Toggleable
                buttonLabel="create new"
                hideButtonLabel="cancel"
                ref={blogFormRef}
            >
                <AddBlogs createBlog={createBlog} id="first" />
            </Toggleable>

            {blogs
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        handleLikes={handleLikes}
                        user={user}
                        handleDelete={handleDelete}
                    />
                ))}
        </div>
    );

    return (
        <div>
            <h2>blogs</h2>
            {message !== null ? (
                <Notification type={type} message={message} />
            ) : (
                <></>
            )}
            <div>{user === null ? loginForm() : seeBlogs()}</div>
        </div>
    );
};

export default App;
