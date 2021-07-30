import React, {useContext, useEffect,useState } from 'react';
import { firebaseDb,timestamp } from '../config/firebase';
import { Card, Avatar,Typography,TextField,Button,makeStyles} from '@material-ui/core';
import "./VideoPost.css"
import { Container } from '@material-ui/core';
import ReactDOM from 'react-dom';
import {AuthContext} from "../context/AuthProvider"
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';


const VideoPost = (props) => {
  let [user,setUser]=useState(null);
  let[comment,setComment]=useState("");
  let [commentList, setCommentList] = useState([]);
  const [likescount,setLikesCount]=useState(null);
  let [isLiked, setIsLiked] = useState(false);
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
 const toogleLikeIcon =async()=>{
 if(isLiked){
  //  post is already liked so unlike the post.
  // in postdoc remove your uid in the likes array.
 let postDoc=props.postObj;
 let filteredlikes=postDoc.likes.filter(uid=>{
   if(uid==currentUser.uid){
     return false;
   }else return true;
 });
 postDoc.likes=filteredlikes;
 await firebaseDb.collection("posts").doc(postDoc.pid).set(postDoc);
  setIsLiked(false);
  likescount==1 ? setLikesCount(null) : setLikesCount(likescount-1);
 }
 
 else{
  let postDoc=props.postObj;
  postDoc.likes.push(currentUser.uid)
 await firebaseDb.collection("posts").doc(postDoc.pid).set(postDoc);
  setIsLiked(true);
  likescount==null ? setLikesCount(1) : setLikesCount(likescount+1);
 }
 }

  useEffect(async ()=> {
    // console.log(props);
    let uid=props.postObj.uid;
    let doc = await firebaseDb.collection("users").doc(uid).get();
    let user =doc.data();
    
    let commentList=props.postObj.comments;
    let likes=props.postObj.likes;
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
      if(likes.includes(currentUser.uid)){
        setIsLiked(true);
        setLikesCount(likes.length);
      }else{
        if(likes.length)
        setLikesCount(likes.length);
      }
 
        setUser(user);
        setCommentList(updatedCommentList);
      
    
  },[])
  console.log(isLiked);

    return ( 
      <Container> 
        <Card className="reels__card" style={{height:"500px",width:"300px"}} >
       
       <div className="user__details">
        <Avatar src={user? user.profileImageUrl:""} />
        <Typography className="user__name" variant="span">{user? user.username:""}</Typography>
       </div>

        <div className="video_container">
        <Video src={props.postObj.videoLink} ></Video>
         </div>
  
         <div>
           {isLiked ? (<FavoriteIcon onClick={()=>toogleLikeIcon()} style={{color:"red"}}></FavoriteIcon>) : 
          ( <FavoriteBorderIcon onClick={()=>toogleLikeIcon()}></FavoriteBorderIcon>)}
         </div>
         {likescount && ( 
          <div>
            <Typography variant="p">Liked by {likescount} others</Typography>
          </div>        
          ) }
   <input className="addComment" placeholder="Add a comment" size="small" 
    value={comment}
    onChange={(e) => {
      setComment(e.target.value);
    }}
   ></input>
   <Button variant="outlined" size="small"
    onClick={addCommentToCommentList}
    >
      Post</Button>
     
   {commentList.map((commentObj)=>{
     return (
      <>
      <div className="comment__section">
      <Avatar src={commentObj.profilePic} className="user__pic"></Avatar>
      <Typography className="comment" variant="p">{commentObj.comment}</Typography>
      {/* <IconButton>
      <DeleteIcon className="delete__icon"/>
      </IconButton> */}
      </div>
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
      muted={true}  loop={true} controls onEnded={handleAutoScroll} onClick={(e)=>{console.log(timestamp())}}>
        <source src={props.src} type="video/mp4"></source>
      </video>
    );
  }
export default VideoPost;