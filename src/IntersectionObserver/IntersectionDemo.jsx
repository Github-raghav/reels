import React,{useEffect}  from 'react';
import v1 from "./v1.mp4";
import v2 from "./v2.mp4";
import v3 from "./v3.mp4";
import v4 from "./v4.mp4";
import v5 from "./v5.mp4";
import  "./Intersection.css";
import { func } from 'prop-types';

// import all the videos
const IntersectionDemo =()=>{
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
      }, []);

    return (
        <div> 
        <div className="video-container">
       <Video src={v1} id="a"></Video>
        </div>
        <div className="video-container">
        <Video src={v2} id="b"></Video>
        </div>
        <div className="video-container">
        <Video src={v3} id="c"></Video>
        </div>
        <div className="video-container">
        <Video src={v4} id="d"></Video>
        </div>
        <div className="video-container">
        <Video src={v5} id="e"></Video>
        </div>
        </div>
    );
}

// function video(props){
//     return(
//         <video className="video-styles"  muted={true} id={props.id}  loop={true}>
//              <source src={props.src} type="video/mp4"></source>  </video>
//     );
// }

function Video(props) {
    return (
      <video className="video-styles" muted={true} id={props.id} loop={true}>
        <source src={props.src} type="video/mp4"></source>
      </video>
    );
  }
export default IntersectionDemo;