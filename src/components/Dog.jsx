import React from 'react';
import '../App.css'



const Dog = (props) => {
  return (
    <div id="js_gallery">
    <img className="js_img" key= {props.dogName}  src={props.dogUrl} alt={props.dogName} />
    <div className="bottom_left">
      <div className="js_name">{props.dogName}</div>
    </div>
    </div>
      
    
           
    
      
  );
};

export default Dog;