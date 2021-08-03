import React,{useState,useEffect} from 'react'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { Button,ButtonBase } from '@material-ui/core';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { firebaseDb, firebaseStorage, timestamp } from '../config/firebase';
import { uuid } from 'uuidv4';
import VideoPost from './VideoPost';
import Header from './Header';
import "./Feed.css"
import SideBar from './SideBar';

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

 let conditionObject={
  root:null,
  threshold:"0.6",
}
function cb(entries){
  entries.forEach(entry =>{
      let child=entry.target.children[0];

      child.play().then(function () {
          if(entry.isIntersecting==false){
              child.pause();
          }
      })
  })
}

 useEffect(() => {
  // code which will run when the component loads
  
  let observerObject = new IntersectionObserver(cb, conditionObject);
  let elements = document.querySelectorAll(".video-container");

  elements.forEach((el) => {
    observerObject.observe(el); //Intersection Observer starts observing each video element
  });
}, [posts]);



  useEffect(()=>{
  // get all posts of firebase
  // onsnapshot=listens means kbhi bhi posts ka collection change hota h n
  // post update hoga tb humesha yeh func chlega.jitne bhi updates hue hongay
  // uska snapshot lega nd then setposts krega
  // let unsub=firebaseDb.collection("posts").orderBy("createdAt","desc").onSnapshot((doc)=>{
  //    let arr=[];
  //    doc.forEach((x)=>{
  //     arr.push( x.data());
  //    }) 
  //   console.log(arr);
  //   setPosts(arr);
  // })
  // .then((snapshot) =>{
  //  let allPosts=snapshot.docs.map((doc)=>{
  //     return doc.data();
  //   });
  // });
  // return unsub;
  // },[]);
  firebaseDb
  .collection("posts")
  .orderBy("createdAt", "desc")
  .onSnapshot((snapshot) => {
    let allPosts = snapshot.docs.map((doc) => {
      return doc.data();
    });
    setPosts(allPosts);
  });
}, []);

    return (
        <div className="feed">
           
          
          {/* <Button color="primary" variant="outlined"
            onClick={handleLogOut}>LOGOUT</Button> */}
            <div>
             
              {/* <input type="file"  onChange={handleInputFile}/> */}
            
              {/* <Input className="input__file" type="file" variant="outlined" placeholder="file" size="small" onChange={handleInputFile}/> */}
            {/* <label>
            <Button color="secondary" onClick={handleUploadFile} startIcon={<PhotoCameraIcon/>}>upload</Button>
            </label> */}
            </div>
            <div className="feeds-video-list">
               {posts.map(postObj =>{
                 return <VideoPost key={postObj.pid} postObj={postObj} ></VideoPost>
               })}
            </div>
        </div>
    );
}

export default Feed; 