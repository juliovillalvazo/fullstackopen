import Button from './Button';

const AddBlogs = ({ createBlog }) => {
    const addBlog = (event) => {
        event.preventDefault();

        const title = event.target.title.value;
        const author = event.target.author.value;
        const url = event.target.url.value;

        event.target.title.value = '';
        event.target.author.value = '';
        event.target.url.value = '';

        createBlog({
            title,
            author,
            url,
        });
    };

    return (
        <div>
            <h3>Create new</h3>
            <form onSubmit={addBlog}>
                <p>
                    title:{' '}
                    <input
                        type="text"
                        placeholder="enter title..."
                        name="title"
                        id="title"
                    />
                </p>
                <p>
                    author:{' '}
                    <input
                        type="text"
                        name="author"
                        id="author"
                        placeholder="enter author..."
                    />
                </p>
                <p>
                    url:{' '}
                    <input
                        type="text"
                        name="url"
                        id="url"
                        placeholder="enter url..."
                    />
                </p>
                <Button id="create-blog" type="btn" value="create new blog" />
            </form>
        </div>
    );
};

export default AddBlogs;
