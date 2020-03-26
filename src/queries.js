import {gql} from '@apollo/client';

const GET_RATINGS = gql`
               query Ratings{
                   ratings @client
               }
            `
const GET_LOGIN_STATES = gql`
   query GetLoginStates{
      loginStates @client
   }
`
const LOGIN = gql`
   mutation Login($username: String!, $password: String!) {
       login(username: $username, password: $password)
   }
`
const SET_LOGGED_IN = gql`
   mutation SetLoggedIn($username: String!, $loggedIn: Boolean!){
       setLoggedIn(username: $username, loggedIn: $loggedIn) @client
   }
`
const GET_LOGGED_IN = gql`
query GetLoggedIn($username: String!){
loggedIn(username: $username) @client
} 
`
const SET_USERNAME = gql`
mutation SetUsername($username : String!){
    setUsername(username: $username) @client
}
`
const GET_USERNAME = gql`
query GetUsername{
  username @client
} 
`

const GET_REMOVED_COUNT = gql`
query RemovedCount{
  removedCount @client
}
`

const SEARCH = gql`
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

const CREATE_USER = gql`
   mutation CreateUser($username: String!, $password: String!){
     createUser(username: $username, password: $password)
   }
`

const queries = {
    GET_USERNAME,
    SET_USERNAME,
    GET_LOGIN_STATES,
    GET_LOGGED_IN,
    SET_LOGGED_IN,
    GET_REMOVED_COUNT,
    GET_RATINGS,
    LOGIN, 
    SEARCH,
    CREATE_USER
}
export default queries;