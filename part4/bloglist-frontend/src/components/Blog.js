import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
    // const Blog = ({ blog, handleLikes, handleDelete }) => {
    // const [showDetails, setShowDetails] = useState(false);
    // const user = useSelector(({ login }) => login);

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    };

    // const likesHelper = () => {
    //     const updatedBlogPost = {
    //         user: blog.user.id,
    //         title: blog.title,
    //         url: blog.url,
    //         author: blog.author,
    //         likes: blog.likes + 1,
    //     };

    //     handleLikes(blog.id, updatedBlogPost);
    // };

    // const removeHelper = () => {
    //     const confirm = window.confirm(
    //         `Remove ${blog.title} by ${blog.author} ?`
    //     );

    //     confirm && handleDelete(blog.id);
    // };

    return (
        <div style={blogStyle} className="blog">
            <Link to={`/blogs/${blog.id}`}>
                {blog.title} {blog.author}
            </Link>{' '}
            {/* {showDetails ? (
                <div>
                    {blog.title} {blog.author}{' '}
                    <Button
                        value="hide"
                        handler={() => {
                            setShowDetails(false);
                        }}
                    />
                    <p>{blog.url}</p>
                    <p id="likes-count">
                        {blog.likes}{' '}
                        <Button
                            id="likes-button"
                            value="like"
                            handler={likesHelper}
                        />
                    </p>
                    <p>{blog.user.name}</p>
                    {blog.user.name === user.name ? (
                        <div>
                            <Button
                                id="remove-btn"
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
                    <Link to={`/blogs/${blog.id}`}>
                        {blog.title} {blog.author}
                    </Link>{' '}
                    <Button
                        id="show-details"
                        value="show"
                        handler={() => {
                            setShowDetails(true);
                        }}
                    />
                </div>
            )} */}
        </div>
    );
};

export default Blog;
