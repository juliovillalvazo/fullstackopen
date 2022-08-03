import { useDispatch, useSelector } from 'react-redux';
import { updateAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
import Filter from './Filter';

const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        if (!filter) return anecdotes;
        return anecdotes.filter((anecdote) =>
            anecdote.content.toLowerCase().includes(filter.toLowerCase())
        );
    });
    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);
    const dispatch = useDispatch();

    const votingHandler = (anecdote) => {
        dispatch(updateAnecdote(anecdote));
        dispatch(setNotification(`You voted '${anecdote.content}'`, 5));
    };

    return (
        <div>
            <h2>Anecdotes</h2>
            <Filter />
            {sortedAnecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => votingHandler(anecdote)}>
                            vote
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AnecdoteList;
