import React from 'react';

export default const Entry = (props) => {
    return(
        <div>
            <p>This {props.name} is {props.description}</p>
        </div>
    )
};