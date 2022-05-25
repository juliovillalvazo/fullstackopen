import React from 'react';

const FilterCountries = ({ handler }) => {
    return (
        <div>
            find countries <input onChange={handler} />
        </div>
    );
};
export default FilterCountries;
