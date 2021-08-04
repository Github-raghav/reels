import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Profile from "./Components/Profile";
// import Feed from "./Components/Feed";
import Feed from './Components/Feed';
import { AuthContext, AuthProvider } from './context/AuthProvider';
import { Redirect } from 'react-router';
import { firebaseAuth } from './config/firebase';
import SideBar from './Components/SideBar';
import signOut from "./context/AuthProvider"
import Widgets from './Components/Widgets';




function App() {

  const { currentUser } = useContext(AuthContext);
  const[showSideBar,setShowSideBar]=useState(true);
  // const[showRightBar,setShowRightBar]=useState(true);
  
  const handleSideBar=()=>{
    // if(currentUser && Profile){
    //   setShowSideBar(false);
    // }
  }
  return (
    <>

<Router>
 <div className="App">
 {currentUser  ? <Header/> :
          <></>}
        <div className="app__body">
            {currentUser && showSideBar   ? <SideBar/> 
             :
          <></>}
           
        <Switch>
          <Route path="/login" component={Login} exact></Route>
          <Route path="/Signup" component={Signup} exact></Route>
          <PrivateRoute path="/" comp={Feed} exact></PrivateRoute>
          <PrivateRoute path="/profile" comp={Profile} setShowSideBar={setShowSideBar}  exact ></PrivateRoute>
        </Switch>
          
         {currentUser && showSideBar ? <Widgets/> 
             :
          <></>}
         </div>

</div>
      </Router>



    </>
  );
}

function PrivateRoute(props) { // privateroute m comp m feed milta jisme kuch comp hte h inspect m dekho(compnents)
  // comp:componen this is a alias(comp ka naam compnent k dia)
  let { comp: Component, path,setShowSideBar } = props;
  // feed ?? jb login ho or path m / ho.
  let { currentUser } = useContext(AuthContext);
  console.log(currentUser)
  //  let {currentUser}=true;
  return currentUser ? (<Route path={path}  render={props=>{return <Component {...props} setShowSideBar={setShowSideBar}
 /> }}></Route>
  ) : (
    <Redirect to="/login"></Redirect>
  );
}



export default App;
