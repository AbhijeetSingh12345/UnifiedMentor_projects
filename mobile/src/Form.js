import React, { useState } from "react";

export default function Form() {
  // const [name, setname] = useState("");
  // const [mail, setmail] = useState("");
  // const [pass, setpass] = useState("");

  // const handlename = (e) => {
  //   console.log(e.target.value);
  //   setname(e.target.value);
  // };

  // const handlemail = (e) => {
  //   console.log(e.target.value);
  //   setmail(e.target.value);
  // };

  // const handlepass = (e) => {
  //   console.log(e.target.value);
  //   setpass(e.target.value);
  // };
const [formdata,setformdata]= useState(
  {
    name:'',
    email:'',
    password:''
  }
)
  const handleinput=(e)=>{
    const {name,value}=e.target;

    setformdata({...formdata,[name]:value})
  }

  const handlesubmit=(e)=>
  {
    e.preventDefault();
  }

  return (
    <div>
      <label>
        Name:
        <input
          type="text"
          name="name"
          onChange={handleinput}
          value={formdata.name}
          placeholder="XYZ"
        ></input>
      </label>
      <br></br>
      <label>
        Email:
        <input
          type="email"
          onChange={handleinput}
          value={formdata.mail}
          name="email"
          placeholder="xyz12@gmail.com"
        ></input>
      </label>
      <br></br>
      <label>
        Password:
        <input type="password" onChange={handleinput} name="password" value={formdata.pass}></input>
      </label>
        <br></br>
      <button type="submit"  onClick={handlesubmit}>
        Submit:
      </button>
    </div>
  );
}
