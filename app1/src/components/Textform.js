import React, { useState } from 'react'

export default function Textform(props){

const handleclick = ()=>{
    let newtext=text.toUpperCase();
   
    setText(newtext);
}

const handleLclick = ()=>{
    let newtext=text.toLowerCase();
   
    setText(newtext);
}
const handleochange=(event)=>{
    setText(event.target.value)
}
const cls=()=>{
    let newtxt=" ";
    setText(newtxt);
}

const cpy=()=>{
      
   
    var copied = document.getElementById("mybox");
    copied.select();
    navigator.clipboard.writeText(copied.value);

}

const removeExtraSpace=()=>{
    
    // let newtxt= text.replace(/\s+/g, ' ').trim();
    // setText(newtxt)
    
    let newtxt=text.split(/[ ]+/)
    setText(newtxt.join(' '))

}

const alternate=()=>{
    let str="";
    var n=text.length;
    for(var i=0;i<n;i++)
    {
        if(i%2==0)
        {
            str+=text[i].toUpperCase();

        }
        else
        {
            str+=text[i].toLowerCase()

        }
    }
    setText(str);
}

const changeCase=()=>{

    let str="";
    for(let i=0;i<text.length;i++)
    {
        if(text.charAt(i)===text.charAt(i).toLocaleLowerCase()){
            str+=text.charAt(i).toUpperCase();
        }
        else{
            str+=text.charAt(i).toLowerCase();
        }
    }
    setText(str);

}

const [text,setText]=useState('Enter the text here !!');

return (
    <>
    <div>
        <h1>{props.heading}</h1>
      
        <div className="mb-3">
         <textarea className="form-control" id="mybox" rows="8" value={text} onChange={handleochange}> </textarea>

        </div>

        <button className='btn-primary mx-2' onClick={handleclick} >Convert To Upper Case</button>
        <button className='btn-primary mx-2' onClick={handleLclick}>Convert To Lower Case</button>
        <button className='btn-primary mx-2' onClick={cls}>Clear</button>
        <button className='btn-primary mx-2' onClick={cpy}>Copy</button>
        <button className='btn-primary mx-2' onClick={removeExtraSpace}>Remove Extra Space</button>
        <button className='btn-primary mx-2' onClick={alternate}>Alternate Change Case</button>
        <button className='btn-primary mx-2' onClick={changeCase}>Change Case</button>
    </div>

    <div className='container' >

        <h1>Your Text Summary : </h1>

        <p>{text.split(" ").length} words and {text.length} characters</p>
        <p>{0.008*text.split(" ").length} Minutes read</p>
        
        {/* <h1>Copied text from the Text Area:</h1>
        <p>{copied}</p> */}
    </div>

    <h2>Preview:</h2>
    <p>{text}</p>
    </>
  )
}






