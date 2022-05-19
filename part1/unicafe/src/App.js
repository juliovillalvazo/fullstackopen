import { useState } from 'react';

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
);

const Statistics = ({ good, bad, neutral }) => {
    return (
        <div>
            <h2>Statistics</h2>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
        </div>
    );
};

const App = () => {
    const title = 'give feedback';
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <div>
            <h1>{title}</h1>
            <Button handleClick={() => setGood(good + 1)} text="good" />
            <Button
                handleClick={() => setNeutral(neutral + 1)}
                text="neutral"
            />
            <Button handleClick={() => setBad(bad + 1)} text="bad" />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    );
};

export default App;
