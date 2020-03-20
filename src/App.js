import React, {useState, useEffect} from 'react';
import { Query, ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client"
import  gql  from "graphql-tag";
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';


import logo from './logo.svg';
import './App.css';
import Choice from './choice.js'
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: window.location.origin.toString()+"/graphql" 
});
const client = new ApolloClient({cache, link})
function App() {
  const [[isLoaded, images], setImages] = useState([false, []]);

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
                console.log(loading)
                if(error){
                  return ("Error"+error)
                }
                if(!loading){
                  var business = data.search.business
                  var images = business.map((b) => b.photos[0])   
                  return(images.map((image) => <Choice image={image} key={image}></Choice>))
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
