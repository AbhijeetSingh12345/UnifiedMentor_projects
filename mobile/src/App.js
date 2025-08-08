import React, { useState } from 'react'

const  App = ( ) => {

   const [count , setCount]= useState(0);

   const handleCountINC=()=>{
    setCount(count+1);
}
const handleCountDEC=()=>{
    setCount(count-1);
}

  return (
    <div>
        <h1>{count}</h1>
        <button onClick={handleCountINC} >+</button>
        
        <button onClick={handleCountDEC} >-</button>
    </div>
  )
}
export default App