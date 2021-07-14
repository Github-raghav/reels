import React,{useState,useEffect} from 'react'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { Button } from '@material-ui/core';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { firebaseDb, firebaseStorage } from '../config/firebase';
import { uuid } from 'uuidv4';
// import { CommentSharp } from '@material-ui/icons';
// import ChatIcon from '@material-ui/icons/Chat';

const Feed=(props)=> {
  let {signOut}=useContext(AuthContext);
  const[videoFile,setVideoFile]=useState(null);
  const{currentUser}=useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  const handleLogOut=async()=>{
   try{

     await signOut();
     props.history.push("/login");
   }catch(err){
     console.log(err);
   }
  }

  const handleInputFile= (e)=>{
      let file=e.target.files[0];
      console.log(file);
      setVideoFile(file);
  }
 const handleUploadFile= async()=>{
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
    commments:[],
    likes:[],
   videoLink:videoUrl,
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
        <div className="feed">
          <h1>  hello from feed</h1>
          <Button color="primary" variant="outlined"
            onClick={handleLogOut}>LOGOUT</Button>
            <div>
              <input type="file" onChange={handleInputFile}/>
            <label>
            <Button color="secondary" onClick={handleUploadFile} startIcon={<PhotoCameraIcon/>}>upload</Button>
            </label>
            </div>
            

        </div>
    )
}

export default Feed; 