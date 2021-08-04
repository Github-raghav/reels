import React, { useEffect } from 'react'
import  './Widgets.css';
import InfoIcon from "@material-ui/icons/Info";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { Avatar } from '@material-ui/core';

function Widgets(props) {
  
    // useEffect(()=>{
    //   console.log(props)
    // },[])


    return (
        <div className="widgets">
            <div className="widgets__top"> 

            <div className="widgets__header">
                <h2>Trending Feeds</h2>
                <InfoIcon/>
            </div>

         <div className="article" >
         <div className="widgets__articleLeft">
            <FiberManualRecordIcon/>
            </div>
            <div className="widgets__articleRight">
                <h4>Tesla accquires 1100arc in Gujrat.</h4>
                <FiberManualRecordIcon/>
                <h4>Bitcoin breaks $22k.#Cryto.</h4>
                <FiberManualRecordIcon/>
                <h4>Tesla accquires 1100arc in Gujrat.</h4>
                <FiberManualRecordIcon/>
                <h4>Apple to start its assembling :Hydrabad.</h4>
                <FiberManualRecordIcon/>
                <h4>Tesla hits new highs.</h4>
            </div>
        </div>
            </div>
          <div className="widgets__bottom">
         <div className="suggestions">
             <h4>Suggestions For You</h4>
             <div className="user">
                 <div className="user__Details">
             <Avatar/> 
             <p>Rahul grover</p>
                 </div>
             <div className="user__Details">
             <Avatar/> 
             <p>Jatin Ahuja</p>
              </div>
             <div className="user__Details">
             <Avatar/> 
             <p>Gaurav Bansal</p>
                 </div> 
             <div className="user__Details">
             <Avatar/> 
             <p>Harsh Goel</p>
                </div>
             </div>
             </div>
          </div>
       
        </div>
        
    );
}

export default Widgets;
