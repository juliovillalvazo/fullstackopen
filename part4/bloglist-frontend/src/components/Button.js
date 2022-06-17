import React from 'react';

const Button = ({ handler, value }) => (
    <button onClick={handler}>{value}</button>
);

export default Button;
