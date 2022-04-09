import React from 'react';

import Dog from './Dog';
import '../App.css';
const DogsList = (props) => {
    return( 
      
      <section id="js_gallery">
        {props.dogUrls.map((dogUrl) => (
          <Dog dogUrl={dogUrl} />
        ))};
        {console.log(props.dogNames)}
        {props.dogNames.map((dog) => (
          <Dog dogName={dog} />
        ))};

        
      </section>    
      
      );
}

export default DogsList;