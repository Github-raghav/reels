import { Avatar,IconButton } from '@material-ui/core'
import React, { useContext,useEffect, useState } from 'react'
import "./SideBar.css"
import HomeIcon from '@material-ui/icons/Home';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import NearMeOutlinedIcon from '@material-ui/icons/NearMeOutlined';
import SettingsIcon from '@material-ui/icons/Settings';
import TvIcon from '@material-ui/icons/Tv';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { AuthContext } from '../context/AuthProvider';
import { firebaseAuth, firebaseDb } from '../config/firebase';

function SideBar() {
    const {currentUser} =useContext(AuthContext);
    const {uid}=firebaseAuth.currentUser;
    const[ user , setUser]=useState();
    // console.log(uid);

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

    // console.log(user); 
    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <Avatar className="user" 
                src={user?.profileImageUrl}
                />
                <h2>
                    {user?.username}
                </h2>
                <h4>
                    {currentUser?.email}</h4>
            </div>
                <div className="sidebar__stats">
                 <div className="sidebar__stat">
                     <div className="post">
                     <h4>20</h4>
                     <p>Posts</p>
                     </div>
                     <div className="post" >
                     <h4>20</h4>
                     <p>Followers</p>
                     </div>
                      <div className="post" >    
                     <h4>20</h4>
                     <p>Following</p>
                     </div>
                 </div>
                </div>
            <div className="sidebar__bottom">
                <div className="options">
             <HomeIcon />
               <p>Feed</p>
                </div>
                <div className="options">
             <FavoriteIcon />
               <p>Favorities</p>
                </div>
                <div className="options">
             <NearMeOutlinedIcon />
               <p>Direct</p>
                </div>
                <div className="options">
             <TvIcon />
               <p>IG TV</p>
                </div>

                <div className="options">
             <SettingsIcon />
               <p>Settings</p>
                </div>
             {/* <FavoriteIcon>Favourites</FavoriteIcon>
             <NearMeOutlinedIcon>Direct</NearMeOutlinedIcon>
             <TvIcon>IG TV</TvIcon>
             <EqualizerIcon>Stats</EqualizerIcon>
             <SettingsIcon>Setting</SettingsIcon>
              */}
            </div>

        </div>
    )
}

export default SideBar
