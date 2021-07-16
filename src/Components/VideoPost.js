import React, { useEffect } from 'react';
import { useState } from 'react';
import { firebaseDb } from '../config/firebase';
import { Card, CardActions, Avatar,Typography} from '@material-ui/core';
import { CardHeader } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';
import { Container } from '@material-ui/core';

const VideoPost = (props) => {
  let [user,setUser]=useState(null);
  useEffect(()=>{
    let uid=props.postObj.uid;
    firebaseDb.collection("users").doc(uid)
    .get().then((doc)=>{
      let user =doc.data();
      setUser(user);
    });
  },[])

    return ( 
      <Container> 
        <Card style={{height:"600px",width:"300px"}} >
        {/* <CardHeader> */}
        <Avatar src={user? user.profileImageUrl:""} />
        <Typography variant="span">{user? user.username:""}</Typography>
        {/* </CardHeader> */}
        {/* <CardMedia> */}
        <div className="video-container">
        <Video src={props.postObj.videoLink} ></Video>
         </div>

        {/* </CardMedia> */}

      </Card>
      </Container>
     
     );
};
 
function Video(props) {
    return (
      <video style={{
          height:"80%",width:"100%",
      }} 
      muted={true}  loop={true} controls>
        <source src={props.src} type="video/mp4"></source>
      </video>
    );
  }
export default VideoPost;