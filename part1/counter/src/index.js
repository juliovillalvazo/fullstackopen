import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const useCounter = () => {
    const [value, setValue] = useState(0);

    const increase = () => {
        setValue(value + 1);
    };

    const decrease = () => {
        setValue(value - 1);
    };

    const zero = () => {
        setValue(0);
    };

    return {
        value,
        increase,
        decrease,
        zero,
    };
};

const App = (props) => {
    const counter = useCounter();

    return (
        <div>
            <div>{counter.value}</div>
            <button onClick={counter.increase}>add</button>
            <button onClick={counter.decrease}>decrease</button>
            <button onClick={counter.zero}>zero</button>
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
