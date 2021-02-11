import React from 'react';

const CountryFinder = ({ setWord }) => {

    const handleChange = (e) => {
        setWord(e.target.value);
    };

    return (
        <div style={{ display: 'flex', width: 300, flexDirection: 'row', alignItems: 'center' }}>
            <div style={{ flex: 1 }}><p>find countries</p></div>
            <div style={{ flex: 2 }}><input type='text' /*value={searchWord}*/ onChange={handleChange} /></div>
        </div>
    );
};

export default CountryFinder;