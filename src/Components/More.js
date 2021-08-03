import React, { useState } from 'react'
import { useContext } from 'react'
import { Button } from '@material-ui/core';
import "./More.css"

import { AuthProvider,AuthContext } from '../context/AuthProvider'
function More(props) {
    const AuthProvider=useContext(AuthContext);
    let {signOut}=useContext(AuthContext);
    
    const handleLogOut=async()=>{
        try{
     
          await signOut();
          props.history.push("/login");
        }catch(err){
          console.log(err);
        }
       }
       
    return (
        <div className="more">
            <div className="profile"></div>
            <div className="logOut"> 
            <Button color="primary" variant="outlined"
            onClick={handleLogOut}>LOGOUT</Button>
            </div>
        </div>
    )
}

export default More
