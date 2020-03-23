import React, {useState} from 'react';
// Import graphQL
import { useQuery, ApolloProvider, ApolloClient, InMemoryCache, HttpLink, gql} from "@apollo/client";
import { resolvers} from './resolvers';
import { typeDefs } from './typeDefs';

//Import Styling
import logo from './logo.svg';
import styled from 'styled-components'
import './App.css';
import Choice from './choice.js'

//Initialize GraphQL
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: window.location.origin.toString()+"/graphql" 
});

const client = new ApolloClient({cache, resolvers, typeDefs, link})


//Initialize the cache
var query = gql`
query RemovedCount{
  removedCount @client
}
`
client.writeQuery({
  query,
  data: {
    removedCount: 0,
  } 
});


//Initialize Styling
const StyledChoice = styled(Choice)`
  height: 50vh;


  background: #fff;
  box-shadow: 0 10px 10px 0px grey;
  border-radius: 5%;
  
  display: flex;
  align-items: center;
  justify-content: center;


  &:hover, &:active{
    box-shadow: 0 20px 20px 0px grey;
  }  
  img {
    height: 80%;
    width: 80%;
    position: relative;
  }
`
const StyledP = styled.p`
  background-color: #fff;
  border-radius: 5%;
  padding: 20px;
  box-shadow: 0 10px 10px 0px grey;
`


/*
 * Main - The main component of the app. Holds the choices of where to eat. 
 * 
 */
function Main() {
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
  const {loading, error, data} = useQuery(app_query, {variables: {location}})
  var choices;
  if(error){
    return (""+error)
  }
  if(!loading){
    var business = data.search.business
    var images = business.map((b) => b.photos[0])
    images = images.reverse() 
    choices =  images.map((image, i) => 
              <StyledChoice index={i} image={image} key={image}>
              </StyledChoice>) 
  }else{
      choices = <img src={logo} className="App-logo" alt="logo"/>
  }
    return(
          <div className="App">
            <header className="App-header" >
              <StyledP>
                Having a hard time picking a place to eat? Picker can help!
              </StyledP>
            </header>
            <div className="Choices">
            {choices}
            </div>
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
