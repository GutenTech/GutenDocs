import React from 'react';

export default const MockData = (props) => {
    return (
        <div>
            <p onClick={props.click}> I'm {props.param} and I like {props.food}! </p>
            <p> {props.children}</p>
        </div>
    )
}


/*

2-17

[2,3,5]




*/