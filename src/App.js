import React, {useState, useEffect} from 'react';

// Import graphQL
import { useQuery, ApolloProvider, ApolloClient, InMemoryCache, HttpLink, gql} from "@apollo/client";

//Import Styling
import logo from './logo.svg';
import styled, { css } from 'styled-components'
import './App.css';
import Choice from './choice.js'

//Initialize GraphQL
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: window.location.origin.toString()+"/graphql" 
});
const client = new ApolloClient({cache, link})

//Initialize Styling
const StyledChoice = styled(Choice)`
  background: #fff;
  height: 50vh;
  width: 70vh;
  position: relative;
  box-shadow: 0 10px 10px 0px grey;
  border-radius: 5% 5% 5% 5%;
  margin-bottom: 2%;
  transform-origin: 50%, 50%, 0px;

  &:hover, &:active{
    box-shadow: 0 20px 20px 0px grey;
  }  
  img {
    height: 80%;
    width: 80%;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
`
function Main() {
  const [gone] = useState(() => new Set())

  const location = "Mission Viejo, CA"
  var app_query = gql`
    query Choices($location: String!){
    search( location: $location,
            limit: 5) {
        total
        business {
            name
            url
            photos
        }
    }
   }`
  const {loading, error, data } = useQuery(app_query, {variables: {location}})
  var choices;
  if(error){
    return (""+error)
  }
  if(!loading){
    console.log(gone)

    var business = data.search.business
    var images = business.map((b) => b.photos[0])  
    choices =  images.map((image, i) => <StyledChoice length={images.length} gone={gone} index={i} image={image} key={image}></StyledChoice>) 
  }else{
      choices = <img src={logo} className="App-logo" alt="logo"/>
  }

    return(
          <div className="App">
            <header className="App-header" >
              <p>
                Having a hard time choosing a place to eat? Picker can help!
              </p>
            </header>
            {choices}
            </div>
    ) 
}
//Main application
function App() {
    return(
        <ApolloProvider client={client}>
        <Main></Main>
        </ApolloProvider>
    ) 
}

export default App;
