import React from 'react';

const Button = ({ id, handler, value, type }) => (
    <button
        id={id ? id : ''}
        className={type ? type : 'btn'}
        onClick={handler ? handler : null}
    >
        {value}
    </button>
);

export default Button;
