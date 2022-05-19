import { useState } from 'react';

const Display = ({ counter }) => <div>{counter}</div>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;
const App = () => {
    const [counter, setCounter] = useState(0);

    const increaseByOne = () => setCounter(counter + 1);
    const setToZero = () => setCounter(0);
    const decreaseByOne = () => setCounter(counter - 1);

    return (
        <div>
            <Display counter={counter} />
            <Button text="plus" onClick={increaseByOne} />
            <Button onClick={setToZero} text="reset" />
            <Button onClick={decreaseByOne} text="minus" />
        </div>
    );
};

export default App;
