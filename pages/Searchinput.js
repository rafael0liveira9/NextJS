import React from 'react'

const Searchinput = ({value, onChange}) => {
    function handleChange(event) {
        onChange(event.target.value);
    }
    return(
        <input type="search" value={value} onChange={handleChange}></input>
    )
};

export default Searchinput