import { createAnecdote } from '../reducers/anecdoteReducer';
import { connect } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {
    // const dispatch = useDispatch();

    const addAnecdote = (event) => {
        event.preventDefault();
        const anecdote = event.target.anecdote.value;
        event.target.anecdote.value = '';

        props.createAnecdote(anecdote);
        props.setNotification(`Note: ${anecdote} created`, 5);
    };

    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={addAnecdote}>
                <input name="anecdote" />
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default connect(null, { createAnecdote, setNotification })(AnecdoteForm);
