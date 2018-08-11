import React from 'react';

export default const Sample = (props) => {
    return(
        <div>
            <p>This {props.name} is {props.description}</p>
        </div>
    )
}