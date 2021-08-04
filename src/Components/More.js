import React, { useState } from 'react'
import { useContext } from 'react'
import { Button } from '@material-ui/core';
import "./More.css"
import { Link, useHistory } from 'react-router-dom'
import { AuthProvider,AuthContext } from '../context/AuthProvider'
import Profile from './Profile';
function More(props) {
    const AuthProvider=useContext(AuthContext);
    let {signOut}=useContext(AuthContext);
    const history=useHistory();
    // const [showProfile ,setShowProfie]=useState();

    const handleLogOut=async()=>{
        try{
     
          await signOut();
          props.history.push("/login");
        }catch(err){
          console.log(err);
        }
       }
       const handleProfile=()=>{
        //  setShowProfie(!showProfile),
         <Profile/>
        history.push("/profile")
    } 
    return (
        <div className="more">
            <div className="profile">
            <Button color="secondary"component='span'
             variant="outlined" size="medium"
            onClick={handleProfile} 
           >Profile</Button>
            </div>

            <div className="logOut"> 
            <Button color="primary" variant="outlined"
            onClick={handleLogOut}>LOGOUT</Button>
            </div>
        </div>
    )
}

export default More
