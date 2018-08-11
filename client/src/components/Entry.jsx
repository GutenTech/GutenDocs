import React from 'react';

export const Entry = (props) => {
    return (
        <div>
            <p onClick={props.click}> I'm {props.param} and I like {props.food}! </p>
            <p> {props.children}</p>
        </div>
    )
}