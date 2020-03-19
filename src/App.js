import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Choice from './choice.js'
import config from './config.json'

var doof = null
function handleClick(){
  console.log("test0")
  console.log("test1")
  console.log(doof)
}

function App() {
  const [[isLoaded, images], setImage] = useState([false, []]);

  
  const params = [["location", "Mission Viejo, CA"]]
  const businessesURL = window.location.href+"businesses?"+params.map(t => encodeURI(t[0])+"="+encodeURI(t[1])+"&")
  useEffect(() => {
     fetch(businessesURL)
      .then(response => {doof = response; return response.json()})
      .then(body => body.businesses.map((business) =>business.image_url))
      .then(image_urls => setImage([true, image_urls]))
    });

  return (
    <div className="App">
      <header className="App-header" >
        <button onClick={handleClick}>test</button>
        <img src={logo} className="App-logo" alt="logo"/>
        <p>
          Having a hard time choosing a place to eat? Picker can help!
        </p>
      </header>
      {isLoaded ? images.map((image) => <Choice image={image} key={image}></Choice>) : <div>Loading choices!</div>}
    </div>
  );
}

export default App;
