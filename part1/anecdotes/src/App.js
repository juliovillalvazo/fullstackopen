import { useState } from 'react';

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
);

const randomAnecdote = (anecdotes) => {
    let randNumber = Math.floor(Math.random() * anecdotes.length);
    return anecdotes[randNumber];
};

const Anecdote = ({ selected }) => {
    if (!selected) {
        return (
            <div>
                <p>Start by pressing the next anecdote Button!!</p>
            </div>
        );
    }
    return <p>{selected}</p>;
};

const DisplayVotes = ({ votes, selected }) => {
    console.log(votes, selected);
    if (!selected) return <></>;
    return <p>has {votes[selected] || 0} votes</p>;
};

const voteSelection = (votes, selected) => {
    const obj = { ...votes };
    if (obj[selected]) {
        obj[selected] = obj[selected] + 1;
        return obj;
    }
    obj[selected] = 1;
    return obj;
};

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
    ];

    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState({});

    return (
        <div>
            <Anecdote selected={selected} />
            <DisplayVotes votes={votes} selected={selected} />
            <Button
                handleClick={() => setSelected(randomAnecdote(anecdotes))}
                text="next anecdote"
            />
            <Button
                handleClick={() => setVotes(voteSelection(votes, selected))}
                text="vote"
            />
        </div>
    );
};

export default App;
