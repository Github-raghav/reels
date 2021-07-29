import React, {useContext, useEffect,useState } from 'react';
import { firebaseDb } from '../config/firebase';
import { Card, CardActions, Avatar,Typography,TextField,Button,makeStyles} from '@material-ui/core';

import { Container } from '@material-ui/core';
import ReactDOM from 'react-dom';
import {AuthContext} from "../context/AuthProvider"


const VideoPost = (props) => {
  let [user,setUser]=useState(null);
  let[comment,setComment]=useState("");
  let [commentList, setCommentList] = useState([]);
  let { currentUser } = useContext(AuthContext);


  const useStyles = makeStyles({
    videoContainerSize: {
      height: "50%",
    },
  });
  let classes = useStyles();
    const addCommentToCommentList=async(e)=>{
      let profilePic;
      console.log(profilePic);
      if(currentUser.uid==user.userId){
        console.log(currentUser);
        profilePic=user.profileImageUrl;
        // console.log(user.profileImageUrl);
      }else{
        let doc=await firebaseDb.collection("users").doc(currentUser.uid).get();
        let user=doc.data();
        profilePic=user.profileImageUrl;
      }
      let newCommentList=[...commentList,{
        profilePic:profilePic,
        comment:comment,
      }]
      // add comments in firebase
      let postObject=props.postObj;
      postObject.comments.push({uid:currentUser.uid , comment:comment})
    // it will set a new postobject in firebase with updated comments.
      await  firebaseDb.collection("posts").doc(postObject.pid).set(postObject);
      setCommentList(newCommentList);
      setComment("");
    }


  useEffect(async ()=> {
    // console.log(props);
    let uid=props.postObj.uid;
    let doc = await firebaseDb.collection("users").doc(uid).get();
    let user =doc.data();
    
    let commentList=props.postObj.comments;
    // console.log(commentList);
    // console.log(props.postObj);
    let updatedCommentList=[];
     
      for (let i = 0; i < commentList.length; i++) {
        let commentObj = commentList[i];
        let doc = await firebaseDb.collection("users").doc(commentObj.uid).get();
        let data=doc.data();
        let commentUserPic = data.profileImageUrl;
        updatedCommentList.push({
          profilePic: commentUserPic,
          comment: commentObj.comment,
        });
        console.log(commentObj);

      }
 
        setUser(user);
        setCommentList(updatedCommentList);
      
        // console.log(updatedCommentList);
  },[])


    return ( 
      <Container> 
        <Card style={{height:"500px",width:"300px"}} >
    
        <Avatar src={user? user.profileImageUrl:""} />
        <Typography variant="span">{user? user.username:""}</Typography>
        <div className="video-container">
        <Video src={props.postObj.videoLink} ></Video>
         </div>
   <TextField variant="outlined" label="Add a comment" size="smalll"
    value={comment}
    onChange={(e) => {
      setComment(e.target.value);
    }}
   ></TextField>
   <Button variant="outlined" color="secondary" 
    onClick={addCommentToCommentList}
    >
      Post</Button>
     
   {commentList.map((commentObj)=>{
     return (
      <>
      
      <Avatar src={commentObj.profilePic}></Avatar>
      <Typography variant="p">{commentObj.comment}</Typography>
      </>
     );

   })}
      </Card>
      </Container>
     
     );
};
 

function Video(props) {
  const handleAutoScroll=(e)=>{
  console.log(e);
  let next=ReactDOM.findDOMNode(e.target).parentNode.parentNode.parentNode.nextSibling;
  if(next){
    next.scollIntoView({behaviour :"smooth"});
    e.target.muted="true";
  }
  };
    return (
      <video style={{
          height:"100%",width:"100%",
      }} 
      muted={true}  loop={true} controls onEnded={handleAutoScroll} onClick={(e)=>{}}>
        <source src={props.src} type="video/mp4"></source>
      </video>
    );
  }
export default VideoPost;