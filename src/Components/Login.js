import React,{useState,useContext} from 'react'

import { Button } from '@material-ui/core';
import { AuthContext } from '../context/AuthProvider';


 const Login=(props)=> {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const[message,setMessage]=useState("");
    let {login}= useContext(AuthContext);

   const handleLogin= async(e)=>{
       // email,password.
       try{
           await login(email,password);
           console.log(props);
           props.history.push("/feed");
    }catch(err){
       setEmail("");
       setPassword("");
       setMessage(err.message);
       alert(err.message);
    }
           

    }
    return (
        <div className="login">
          <h1> Login Page</h1>
          <form>
              <h1>Email</h1>
              <input 
              type="text"
               placeholder="Email"
               value={email}
               onChange={(e)=> setEmail(e.target.value)}
               />
              <h1>Password</h1>
              <input type="password" placeholder="password" value={password}
               onChange={(e)=> setPassword(e.target.value)}/> 
              <br></br>
              <h1></h1>
              <Button color="primary" variant="outlined" 
              onClick={handleLogin}>LOGIN</Button>
              
          </form>
        </div>
    )
}

export default Login
