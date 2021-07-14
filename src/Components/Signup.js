import React,{useContext, useState} from 'react'
import { Button,CardActions,makeStyles ,Container,Typography, Card,CardMedia,CardContent,TextField} from '@material-ui/core';
import { AuthContext } from '../context/AuthProvider';
import { firebaseDb, firebaseStorage } from '../config/firebase';
import "./Signup.css";
import logo from "../logo.png";
import { CloudUpload } from '@material-ui/icons';
import InputLabel from '@material-ui/core/InputBase';

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
 postsCreated:[],
 })}

 props.history.push("/feed");
        }catch(err){
            setMessage(err.message);
            alert(err.message);
        }
       };

    return (
        <div className="signup">
             {/* <h1> SignUp Page</h1> */}
          <Container>
          <Card className="card">
           <CardMedia
           image={logo}
                style={{ height: "5rem", backgroundSize: "contain" }}>
                 
           </CardMedia>
           <Typography className="text"><h3>Sign up to see photos and videos of your friends</h3> </Typography>
           <CardContent>
             {/* username */}
           <TextField className="txt__field" size='small'
              variant="outlined"  label="username" 
              value={username}
              onChange={(e)=> setUsername(e.target.value)}
              //  className = {classes.mb}
               />
               <br></br>
               <br></br>
               {/* Email */}
 
               <TextField  className="txt__field" size='small'
              variant="outlined"  label="Email" 
              value={email}
               onChange={(e)=> setEmail(e.target.value)} 
              //  className = {classes.mb}
               />
               <br></br>
               <br></br>
       {/* password */}

       <TextField   className="txt__field" size='small'
              variant="outlined"  label="Password" 
              value={password}
              type="password"
              onChange={(e)=> setPassword(e.target.value)} 
              //  className = {classes.mb}
               />
           </CardContent>
          <CardActions>
         {/* upload button */}
         <div>    
           {/* <Button color="secondary" focused={true}  variant="outlined"  
            style={{left:"60px" ,alignItems:"center"}} */}
            <InputLabel  
                   color="secondary" 
                   variant="outlined"
                   type="file" accept="eimage/*" 
               onChange={(e)=> {handleFileSubmit (e)}}/> 
              {/* type="file" accept="eimage/*" 
             onChange={(e)=> {handleFileSubmit(e)}} startIcon={<CloudUpload/>} */}
             {/* > */}
        
             {/* </Button>      */}
            
          </div>

         {/* sign up button */}
         <Button color="primary" variant="outlined"  
         style={{left:"10px" ,alignItems:"center"}}
         onClick={handlesignUP} >SIGNUP</Button> 
          </CardActions>
          </Card>

          </Container>
               
             
              
              <div>
                  {/* Profile Image
                  <Button   className="btn" focused={true}  color="secondary"  variant="outlined">
                  <InputLabel  
                   color="secondary" 
                   variant="outlined"
                   type="file" accept="eimage/*" 
               onChange={(e)=> {handleFileSubmit (e)}}/> 
                  </Button> */}
                  
              </div>
               
              
              
              
          
        </div>
    )
}

export default Signup
