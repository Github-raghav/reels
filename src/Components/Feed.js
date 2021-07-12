import React from 'react'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { Button } from '@material-ui/core';

const Feed=(props)=> {
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
        <div className="feed">
          <h1>  hello from feed</h1>
          <Button color="primary" variant="outlined"
            onClick={handleLogOut}>LOGOUT</Button>
        </div>
    )
}

export default Feed; 