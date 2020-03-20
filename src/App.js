import React, {useState, useEffect} from 'react';

// Import graphQL
import { Query, ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client"
import  gql  from "graphql-tag";
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
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
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 10px 10px 0px grey;
  transition: 0.3s;
  border-radius: 5% 5% 5% 5%;
  margin-bottom: 2%;

  &:hover{
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

//Main application
function App() {

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
  return (
    <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header" >
            <img src={logo} className="App-logo" alt="logo"/>
            <p>
              Having a hard time choosing a place to eat? Picker can help!
            </p>
          </header>
          <Query query={app_query} variables={{location}}>
          {({ loading, error, data }) => { 
                if(error){
                  return ("Error"+error)
                }
                if(!loading){
                  var business = data.search.business
                  var images = business.map((b) => b.photos[0])   
                  return(images.map((image) => <StyledChoice image={image} key={image}></StyledChoice>))
                }else{
                  return( <div>Loading!</div>)
                }
          }}
          </Query>
          </div>
    </ApolloProvider>
  );
}

export default App;
