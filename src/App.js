import React,{useContext,useEffect} from 'react';
import { BrowserRouter as Router,Route, Switch } from 'react-router-dom';
// import './App.css';
import Header from './Components/Header';
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Profile from "./Components/Profile";
// import Feed from "./Components/Feed";
import Feed from './Components/Feed';
import { AuthContext, AuthProvider } from './context/AuthProvider';
import { Redirect } from 'react-router';



function App() {
  return (
    <AuthProvider> 
    <Router> 
    <div className="App">
      <Header></Header>
      {/* switch sees ki only component is loaded at a time */}
      <Switch> 
        <Route path="/login" component={Login} exact></Route>
        <Route path="/Signup" component={Signup} exact></Route>
        <PrivateRoute path="/feed" comp={Feed} exact> </PrivateRoute>
        <PrivateRoute path="/profile" comp={Profile} ></PrivateRoute>
        
      </Switch>
    </div>
    </Router>
    </AuthProvider>
  );
}

function PrivateRoute(props){ // privateroute m comp m feed milta jisme kuch comp hte h inspect m dekho(compnents)
    // comp:componen this is a alias(comp ka naam compnent k dia)
  let {comp : Component,path}=props;
  // feed ?? jb login ho or path m / ho.
 let {currentUser}= useContext(AuthContext );
//  let {currentUser}=true;
  return currentUser ?(<Route path={path} component={Component}></Route>
  ):(
    <Redirect to="/login"></Redirect>
  );
}

// function PrivateRoute(props) {
//   let { comp: Component, path } = props;
//   // Feeds ?? loggedIn and path="/"
//   let { currentUser } = useContext(AuthContext);
//   // let currentUser = true;
//   return currentUser ? (
//     <Route path={path} component={Component}></Route>
//   ) : (
//     <Redirect to="/login"></Redirect>
//   );
// }

export default App;
