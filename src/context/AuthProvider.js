import React, { useState,useEffect, children } from 'react';
import {firebaseAuth} from "../config/firebase";

// context api
export const AuthContext=React.createContext();

export function AuthProvider({children}){
   const [currentUser,setCurrentUser] =useState(null);

   function login(email,password){
     return firebaseAuth.signInWithEmailAndPassword(email,password);
   }

   function signOut(){
       return firebaseAuth.signOut();
   }

   function Signup(email,password){
    return firebaseAuth.createUserWithEmailAndPassword(email,password);
   }
//    useeffect
useEffect(()=>{
    // event attached kia h tht jb bhi firebase ki auth in state chng 
    // hogi toh func cl kr dio. logout-><-login
    firebaseAuth.onAuthStateChanged(user =>{
        // console.log("inside wuth state changed",user);
        setCurrentUser(user);
    })
},[]);

let value={
    currentUser:currentUser,
    signOut:signOut,
    login:login,
    Signup:Signup,
};
return     <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>


// authprovider is exported from this  with children which is passed to others.
}