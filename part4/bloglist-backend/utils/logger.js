const info = (...params) => {
    if (process.env.NODE_ENV !== 'test2') {
        console.log(...params);
    }
};

const error = (...error) => {
    if (process.env.NODE_ENV !== 'test2') {
        console.log(...error);
    }
};

module.exports = {
    info,
    error,
};
