const AddBlogs = ({
    id,
    submitHandler,
    title,
    setTitle,
    author,
    setAuthor,
    url,
    setUrl,
}) => (
    <div>
        <h3>create new</h3>
        <form onSubmit={submitHandler} id={id}>
            <p>
                title:{' '}
                <input
                    type="text"
                    value={title}
                    name="title"
                    onChange={({ target }) => setTitle(target.value)}
                />
            </p>
            <p>
                author:{' '}
                <input
                    type="text"
                    value={author}
                    name="author"
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </p>
            <p>
                url:{' '}
                <input
                    type="text"
                    value={url}
                    name="url"
                    onChange={({ target }) => setUrl(target.value)}
                />
            </p>
            <button type="submit">create</button>
        </form>
    </div>
);

export default AddBlogs;
