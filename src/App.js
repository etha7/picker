import React, {useState} from 'react';
// Import graphQL
import { useQuery, ApolloProvider, ApolloClient, InMemoryCache, HttpLink, gql} from "@apollo/client";
import { resolvers} from './resolvers';
import { typeDefs } from './typeDefs';

//Import Styling
import logo from './logo.svg';
import './App.css';
import {Choice, Paragraph} from './style.js'

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

query = gql`
query Ratings{
  ratings @client
}
`
client.writeQuery({
  query,
  data: {
    ratings: {},
  } 
});


/*
 * Main - The main component of the app. Holds the choices of where to eat. 
 * 
 */
function Main() {
  const location = "Mission Viejo, CA"
  var limit = 5
  var app_query = gql`
    query Choices($location: String!, $limit: Int!){
    search( location: $location,
            limit: $limit) {
        total
        business {
            name
            url
            photos
            rating
            price
            review_count
            reviews {
              text
              user {
                name
              }
              url
            }
            categories {
              title
            }
            location{
              formatted_address
            }
            attributes{
              wheelchair_accessible {
                name_code
                value_code
              }
              gender_neutral_restrooms {
                name_code
                value_code
              }
              open_to_all {
                name_code
                value_code
              }
            }
        }
    }
   }`
  const {loading, error, data} = useQuery(app_query, {variables: {location, limit}})
  var choices;
  if(error){
    return (""+error)
  }
  if(!loading){
    var business = data.search.business
    var business_data = business.map((b) => { return {image: b.photos[0], ...b} })
    business_data.reverse()
    choices =  business_data.map((bd, i) => 
              <Choice index={business_data.length - i - 1} {...bd} key={bd.name}>
              </Choice>) 
  }else{
      choices = <img src={logo} className="App-logo" alt="Loading!"/>
  }
    return(
          <div className="App">
            <header className="App-header" >
              <Paragraph>
                Having a hard time picking a place to eat? Picker can help!
              </Paragraph>
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
