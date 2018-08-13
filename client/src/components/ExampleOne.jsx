import React from 'react';
import sampleData from '../../dist/parsedData.js';
import Example from './ExampleOneSub.jsx'

export default const Examples = ({exampleData}) => {
    return(
       <div className = "examples">
            <h1>Example p1</h1>
                {exampleData.map(example => <Example example={example}/>)}
       </div>
  )
}