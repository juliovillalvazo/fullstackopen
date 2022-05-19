import { useState } from 'react';

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
);

const StatisticsLine = ({ text, value }) => (
    <tr>
        <td>{text}</td>
        <td>
            {value} {text === 'positive' ? '%' : ' '}
        </td>
    </tr>
);

const Statistics = ({ good, bad, neutral }) => {
    const total = good + bad + neutral;

    if (!total) {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        );
    }

    const average = (good * 1 + bad * -1) / total || 0;
    const posFeedback = (good / total) * 100 || 0;
    return (
        <table>
            <tbody>
                <StatisticsLine text="good" value={good} />

                <StatisticsLine text="neutral" value={neutral} />

                <StatisticsLine text="bad" value={bad} />

                <StatisticsLine text="all" value={total} />

                <StatisticsLine text="average" value={average} />

                <StatisticsLine text="positive" value={posFeedback} />
            </tbody>
        </table>
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
            <h2>Statistics</h2>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    );
};

export default App;
