import React from 'react';

export default const Example = ({exampleData})=> {
    return(
    <div className="example">
      <div>{exampleData.description}</div>
      <div>{exampleData.name}</div>
    </div>
  )
}