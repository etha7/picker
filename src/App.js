import React, { useState, useEffect } from 'react';

// Import graphQL
import { useQuery, ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
//import { persistCache } from 'apollo-cache-persist';
import { localResolvers as resolvers } from './resolvers';
import { localTypeDefs as typeDefs } from './typeDefs';
import queries from './queries.js' //query constants
import { Paragraph, NavBar, Login, Choices, Loading } from './style.js' //styled components
import './App.css';

/*
 * Main - The main component of the app. Holds the choices of where to eat. 
 */
function Main() {
  const location = "Mission Viejo, CA"
  var limit = 5
  const usernameResult = useQuery(queries.GET_USERNAME)
  var username = usernameResult.loading ? "" : usernameResult.data.username
  const loginResult = useQuery(queries.GET_LOGGED_IN, {variables: {username}, skip: usernameResult.loading})
  var loggedIn = loginResult.loading || usernameResult.loading? false: loginResult.data.loggedIn
  var results;

  if(!loginResult.loading && !usernameResult.loading){
    if(loggedIn){
      results = <Choices limit={limit} location={location}></Choices>
    }else{
      results = <Login></Login>
    }
  }else{
    results = <Loading></Loading>
  }
    return(
      <div>
          <NavBar></NavBar>
          <div className="App">
            <div className="title">Picker</div>
            <header className="App-header" >
              <Paragraph>
                Having a hard time picking a place to eat? Picker can help!
              </Paragraph>
            </header>
            <div className="Content"> 
              {results}
            </div>
          </div>
      </div>
    ) 
}
// Main application
function App() {

    // Setup local apollo client
    const [client, setClient] = useState(undefined)
    useEffect(()=>{
        // Initialize GraphQL
        const cache = new InMemoryCache();
        const link = new HttpLink({
          uri: window.location.origin.toString()+"/graphql" 
        });
        const client = new ApolloClient({cache, resolvers, typeDefs, link})
        setClient(client) // TODO REMOVE FOR PERSISTENCE

        const init = () => {
            client.writeQuery({
              query: queries.GET_REMOVED_COUNT,
              data: {
                removedCount: 0,
              } 
            });
            client.writeQuery({
              query: queries.GET_LOGIN_STATES,
              data: {
                loginStates: null,
              } 
            });
            client.writeQuery({
              query: queries.GET_USERNAME,
              data: {
                username: ""
              }
            })
        }
        init()

        /*persistCache({
          cache,
          storage: window.localStorage
        }).then(() => {
           client.onResetStore(async () => {init()})
           setClient(client)
          })*/
    }, [])


    if(client === undefined) return (<div>Loading...</div>)
    //client.resetStore()
    return(
        <ApolloProvider client={client}>
        <Main></Main>
        </ApolloProvider>
    ) 
}
export default App;
