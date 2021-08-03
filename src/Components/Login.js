import React,{useState,useContext, useEffect} from 'react'
import Card from '@material-ui/core/Card';
import { Button, Container,TextField, Paper,Typography,CardContent,CardActions,makeStyles, Grid, CardMedia} from '@material-ui/core';
import { AuthContext } from '../context/AuthProvider';
import "./Login.css"
// import { Smartphone } from '@material-ui/icons';
// import logo from"../Components/logo.png";
import logo from "../logo.png";
import { Link, useHistory } from 'react-router-dom';
import Header from './Header';



 const Login=(props)=> {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const[message,setMessage]=useState("");
    let {login,currentUser}= useContext(AuthContext);
    const history =useHistory();

    useEffect(() => {
      console.log(currentUser)
      if(currentUser){
history.push("/")
      }
     
    }, [currentUser])
   const handleLogin= async(e)=>{
       // email,password.
       try{
           await login(email,password);
           console.log(props);
            history.push("/");
    }catch(err){
       setEmail("");
       setPassword("");
       setMessage(err.message);
       alert(err.message);
    }
           

    }

    let useStyles = makeStyles({
        centerDivs: {
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          width: "100vw",
        },
        carousal: { height: "10rem", backgroundColor: "lightgray" },
        fullWidth: {
          width: "100%",
        },
        centerElements: {
          display: "flex",
          flexDirection: "column",
        },
        mb: {
          marginBottom: "1rem",
        },
        padding: {
          paddingTop: "1rem",
          paddingBottom: "1rem",
        },
        alignCenter: {
          justifyContent: "center",
        },
      });
      let classes = useStyles();

    return (
      
        <div className="login">
         
            <Container>
                <Grid className="grid" container spacing={2} style={{justifyContent:"space-evenly"} } >
                <Grid item sm={5}>
                    <Paper className={classes.carousal} id="paper">couresel</Paper>
                </Grid>
                 
                 <Grid item sm={3}>
                 {/* login form */}
                 <Card className="card" className={classes.mb} variant="outlined">
              
                 <CardMedia
                image={logo}
                style={{ height: "5rem", backgroundSize: "contain" }}
              > </CardMedia>
               <CardContent className="class__name">
            {/* Email input */}
              <TextField  size='small'
              variant="outlined"  label="Email" 
              value={email}
               onChange={(e)=> setEmail(e.target.value)} 
               className = {classes.mb}/>
            {/* Password input */}
            
              <TextField  
              variant="outlined"  label="Password" size="small"
              value={password}
              type="Password"
               onChange={(e)=> setPassword(e.target.value)} 
               className = {classes.mb}/>
               </CardContent>

               <CardActions>
               <Button color="primary" variant="contained" 
              onClick={handleLogin} 
              className = {classes.fullWidth}>LOGIN</Button>
              
               </CardActions>
          </Card>
          <Card variant="outlined" className={classes.padding}>
              <Typography style={{ textAlign: "center" }}>
                  Dont't have an account ? 
                  <Button variant="contained"color="primary">
                  <Link style={{color:"white" }} to= "/Signup"> Signup</Link>
                  </Button>
              </Typography>
          </Card>
                 </Grid>

                </Grid>
            </Container>
        </div>
    )
}

export default Login
