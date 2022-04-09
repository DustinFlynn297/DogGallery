import React, { useState, useCallback, useEffect } from 'react';
import DogsList from './components/DogsList';
import './App.css'

function App() {
  const [dogNames, setDogNames] = useState([]);
  const [dogs, setDogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  


  //get all dog names
  const fetchAllDogsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try{
      const response = await fetch('https://dog.ceo/api/breeds/list/all');
      if (!response.ok) {
        throw new Error('Something went wrong while fetching all dog breeds!');
      }
      const data = await response.json();      

      const dogsKeys = Object.keys(data.message);   
        

      setDogNames(dogsKeys);         
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchAllDogsHandler();
  }, [fetchAllDogsHandler])
  //get and image for each breed by iterating over each dog name in allDogs and using that name to plug into the random dog URL below

  const fetchDogImage = useCallback(async (dogNames) => {    
    setIsLoading(true);
    setError(null);
    const imgData = [];
    for (let dog in dogNames) {
      try{
        const dogImageUrl = await fetch(`https://dog.ceo/api/breed/${dogNames[dog]}/images/random`); 
        if(!dogImageUrl.ok) {
          throw new Error('Something went wrong while fetching dog images');
        }           

        const dogUrlJson = await dogImageUrl.json();
        const data = dogUrlJson.message;
        
        imgData.push(data);
        setDogs(imgData);
        
          
      } catch (error) {
        setError(error.message);        
      }
      
    }
    
    setIsLoading(false);
  },[]);


  useEffect(() => {
    fetchDogImage(dogNames);
  }, [fetchDogImage, dogNames]);
  

  let content = <p>Found no dogs.</p>;  

  if (dogNames.length > 0) {  
    content = <DogsList dogNames={dogNames} dogUrls={dogs}/>;
  }

  if (error) {
    content = <p>{error}</p>
  }

  if (isLoading) {
    content = <p id="js_loading">Loading</p>;
  }
  
  
  
    
  return (
    <React.Fragment>                 
      <div>{content}</div>   
     
    </React.Fragment>
  );  
}

export default App;
