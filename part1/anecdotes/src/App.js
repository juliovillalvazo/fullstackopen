import { useState } from 'react';

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
);

const randomAnecdote = (anecdotes) => {
    let randNumber = Math.floor(Math.random() * anecdotes.length);
    return anecdotes[randNumber];
};

const Anecdote = ({ selected, title }) => {
    if (!selected) {
        return <p>Start by pressing the next anecdote Button!!</p>;
    }
    return (
        <div>
            <h2>{title}</h2>
            <p>{selected}</p>
        </div>
    );
};

const DisplayVotes = ({ votes, selected, anecdotes }) => {
    if (!selected) return <></>;
    const index = anecdotes.indexOf(selected);
    return <p>has {votes[index] || 0} votes</p>;
};

const votingIncrease = (votes, selected, anecdotes) => {
    let updated = {};
    let index = anecdotes.indexOf(selected);
    if (votes[index]) {
        updated[index] = votes[index] + 1;
        return {
            ...votes,
            ...updated,
        };
    }
    updated[index] = 1;
    return {
        ...votes,
        ...updated,
    };
};

const MaxVoted = ({ votes, anecdotes }) => {
    let mostVoted = getMostVoted(votes, anecdotes);
    return (
        <div>
            {(mostVoted || <></>) && (
                <Anecdote
                    selected={mostVoted}
                    title={'Anecdote with most votes'}
                />
            )}
            {(mostVoted || <></>) && (
                <DisplayVotes
                    votes={votes}
                    selected={mostVoted}
                    anecdotes={anecdotes}
                />
            )}
        </div>
    );
};

const getMostVoted = (votes, anecdotes) => {
    if (Object.values(votes).length) {
        let mostVotes = Number(Math.max(...Object.values(votes)));
        let index = Object.keys(votes).find((el) => votes[el] === mostVotes);
        return anecdotes[index];
    }
    return 0;
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

    let [selected, setSelected] = useState(0);
    let [votes, setVotes] = useState(0);

    return (
        <div>
            <Anecdote selected={selected} title={'Anecdote of the day'} />
            <DisplayVotes
                votes={votes}
                selected={selected}
                anecdotes={anecdotes}
            />
            <Button
                handleClick={() => setSelected(randomAnecdote(anecdotes))}
                text="next anecdote"
            />
            <Button
                handleClick={() =>
                    setVotes(votingIncrease(votes, selected, anecdotes))
                }
                text="vote"
            />
            <MaxVoted votes={votes} anecdotes={anecdotes} />
        </div>
    );
};

export default App;
