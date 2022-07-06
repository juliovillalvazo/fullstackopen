import React from 'react';

const Button = ({ handler, value, type }) => (
    <button className={type ? type : 'btn'} onClick={handler ? handler : null}>
        {value}
    </button>
);

export default Button;
