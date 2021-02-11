import React from 'react'

const Filter = (props) => {
    return (
        <div>
            Search by name or number
            <input value={props.searchWord} type = "text" placeholder = "Search..."
            onChange = {props.callback} /> 
        </div>
    )
}


  export default Filter