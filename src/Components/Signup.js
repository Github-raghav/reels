import React,{useContext, useState} from 'react'
import { Button } from '@material-ui/core';
import { AuthContext } from '../context/AuthProvider';
import { firebaseDb, firebaseStorage } from '../config/firebase';

const Signup=(props)=> {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const[username,setUsername]=useState("");
    const[profileImage,setProfileImage]=useState(null);
    const[message,setMessage]=useState("");
    const{Signup}=useContext(AuthContext);

    const handleFileSubmit=(e)=>{
//    file-blob == file[0]
      let fileObj= e.target.files[0];
    //   console.log(fileObj);
       setProfileImage(fileObj);
    };

    const handlesignUP=async()=>{
        try{
       let response=await Signup(email,password);
    //    console.log(response);
        
       let uid=response.user.uid  // user naam ki  collection m add hojaega.
    //    u are signed up.
  const uploadPhotoObject= firebaseStorage.ref(`/profilePhotos/${uid}/image.jpg`).put(profileImage);
  console.log(uploadPhotoObject);
  uploadPhotoObject.on(`state_changed` ,fun1,fun2,fun3);
// to track the progress of upload
  function fun1(snapshot){
// snapshot info- bytes transfered and total byted, allow us to show % of download
let progress=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
console.log(progress);
  }
//   to show error
  function fun2(error){
console.log(error);
  }
//   to show success of upload.
 async function  fun3(){
let profileImageUrl=await uploadPhotoObject.snapshot.ref.getDownloadURL();
            
// console.log(profileImageUrl);
// db=>collection=>doc=>email,pass,profileimage
 firebaseDb.collection("users").doc(uid).set({
 email:email,
 userId:uid,
 username:username,
 profileImageUrl:profileImageUrl,
 })}

 props.history.push("/feed");
        }catch(err){
            setMessage(err.message);
            alert(err.message);
        }
       };

    return (
        <div className="signup">
             <h1> SignUp Page</h1>
          <form>
              <h1>Username</h1>
              <input 
               placeholder="Username"
               value={username}
               onChange={(e)=> setUsername(e.target.value)}
               />
              <h1>Email</h1>
              <input 
              type="text"
               placeholder="Email"
               value={email}
               onChange={(e)=> setEmail(e.target.value)}
               />
              <h1>Password</h1>
              <input type="password" placeholder="password" value={password}
               onChange={(e)=> setPassword(e.target.value)}/> 
              <br></br>
              <div>
                  Profile Image
                  <input type="file" accept="image/*" 
               onChange={(e)=> {handleFileSubmit (e)}}/> 
              </div>
              <h1></h1>
              <Button color="primary" variant="outlined"  onClick={handlesignUP} >SIGNUP</Button>
              
              
          </form>
        </div>
    )
}

export default Signup
