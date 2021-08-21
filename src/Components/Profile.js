import { Avatar, Button,Input } from '@material-ui/core'
import React, { useContext,useEffect,useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthProvider';
import "./Profile.css";
import { firebaseAuth, firebaseDb } from '../config/firebase';


function Profile(props) {
    
    const history=useHistory();
    const{currentUser}=useContext(AuthContext);
    const {uid}=firebaseAuth.currentUser;
    const[ user , setUser]=useState();
    
//   console.log(uid);

  const getUser =async ()=>{
    try{
    const document=await firebaseDb.collection("users").doc(uid).get();
    const Data=(document.data());
  setUser(Data);
    }catch{

    }
}
useEffect(() => {
   getUser();

},[])
 console.log(user);
    const handleProfile=()=>{
        history.push("/profile")
    }

    useEffect(()=>{
      console.log(props);
      props.setShowSideBar(false);
    //   props.setShowRightBar(false);
    return ()=>{
        props.setShowSideBar(true);
    }
    },[])

console.log(currentUser);
console.log(user);
    return (
        <div className="Profile">
            {/* <h3>u just hit the profile</h3> */}
            <div className="user__details">
               <div className="username">
            <Avatar className="userPic" src={user?.profileImageUrl}></Avatar>
                <h3>{user?.username}</h3>
                   </div> 
            <div className="posts">
                <h1>posts</h1>
                <h2>{user?.postsCreated.length}</h2>
            </div>
            <div className="posts">
                <h1>Followers</h1>
                <h2>20</h2>
            </div>
            <div className="posts">
                <h1>Following</h1>
                <h2>25</h2>
            </div>
            </div>
            <div className="edit__profile">
                <h1>Edit Profile</h1>
                <div className="user__name">
                <h1>name</h1>
                <Input id="inputName" placeholder="Name"></Input>
                </div>
                <div className="user__username">
                <h1>username</h1>
                <Input id="inputName"  placeholder="username"></Input>
                </div>
                <div className="user__Bio">
                <h1>Bio</h1>
                <Input id="inputName"  />
                
                </div>
                
            </div>
            <div></div>

        </div>
    )
}

export default Profile
