import React, { useState,useContext } from 'react'
import "./Header.css";
import SearchIcon from '@material-ui/icons/Search';
import { AuthContext } from '../context/AuthProvider';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import MicIcon from '@material-ui/icons/Mic';
import { IconButton,Button,ButtonBase } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import ViewHeadlineOutlinedIcon from '@material-ui/icons/ViewHeadlineOutlined';
import NearMeOutlinedIcon from '@material-ui/icons/NearMeOutlined';
import { firebaseDb, firebaseStorage, timestamp } from '../config/firebase';
import More from './More';
import { uuid } from 'uuidv4';

function Header() {
    const [showMore ,setShowMore]=useState(false);
    const[videoFile,setVideoFile]=useState(null);
    const{currentUser}=useContext(AuthContext);

    const  handleMore = ()=> (
      setShowMore(!showMore),
        <More/>

    )
   
    const handleInputFile= (e)=>{
        let file=e.target.files[0];
        console.log(file);
        setVideoFile(file);
    }

    const handleUploadFile= async()=>{
        console.log(videoFile);
        try{
       // upload video in storage
       let uid=currentUser.uid;
     const uploadVideoObject= 
     firebaseStorage.ref(`/profilePhotos/${uid}/${Date.now()}.mp4`).put(videoFile);
     uploadVideoObject.on(`state_changed` ,fun1,fun2,fun3);
     function fun1(snapshot){
       // snapshot info- bytes transfered and total byted, allow us to show % of download
       let progress=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
       console.log(progress);
         }
       //   to show error
         function fun2(error){
       console.log(error);
         }
       //   to show success of upload. and get link of uploaded video link
        async function  fun3(){
       let videoUrl=await uploadVideoObject.snapshot.ref.getDownloadURL();
            console.log(videoUrl);       ;
       let pid=uuid(); //unique id
       // create post documnet with following properties.
       await firebaseDb.collection("posts").doc(pid).set({
         pid:pid,
         uid:uid,
         comments:[],
         likes:[],
        videoLink:videoUrl,
        createdAt:timestamp(),
        });
       //  user data jo update hona chahta h.
      let doc= await firebaseDb.collection("users").doc(uid).get(); // get user uid
      let document= doc.data();
      document.postsCreated.push(pid);// push tht uin postcreated id
     await firebaseDb.collection("users").doc(uid).set(document
       ); // again set updated uid
     
        }
       }catch(err){
     
        }
      }
    
    return (
        <div className="header">
        
        <div className="header__left">
            <div className="header__logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"  alt=""></img>
                <div className="insta__logo">
                <img src="https://seeklogo.com/images/I/instagram-new-2016-glyph-logo-84CB825424-seeklogo.com.png"  alt=""></img>
            </div>
            </div>
        </div>
        <div className="header__middle">
        <div className="header__search">
                   <SearchIcon/>
                  <input type="text" placeholder="Search" />
                  <IconButton>
                  <MicIcon></MicIcon>
                  </IconButton>
              </div>
              <div className="CreateButton">
              <input
               style={{display:"none"}}
               type="file"id="inputFile"
               onChange={handleInputFile}/>
              <label htmlFor="inputFile">
              <Button variant="outlined" component='span' color="secondary" startIcon={<AddIcon/>} >
                   create new Post</Button>
                
              </label>

              <label>
            <Button color="secondary" onClick={handleUploadFile} startIcon={<PhotoCameraIcon/>}>upload</Button>
            </label>

              </div>
           
        </div>
        <div className="header__right">
            <div className="header__options">
            <IconButton>
            <NearMeOutlinedIcon/>
            </IconButton>
            </div>
            <div className="header__options">
            <IconButton>
                <NotificationsNoneOutlinedIcon/>
                </IconButton>
                </div>
                <div className="header__options">
                    {/* add func onclick-open more comp. */}
                <IconButton onClick={handleMore} >
                <ViewHeadlineOutlinedIcon />
                </IconButton>
                </div>
        </div>
        {showMore?<More /> : <></>}
        </div>
        
        
    )
}

export default Header
