import React from 'react';
import { useQuery, gql, useMutation} from "@apollo/client";
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

function NavBar(props){
    var variables = {username: props.username}
    const loggedIn_result = useQuery(GET_LOGGED_IN, {variables})
    const [setLoggedIn] = useMutation(SET_LOGGED_IN, {refetchQueries: [{query: GET_LOGGED_IN, variables}]})
    
    const loggedIn = loggedIn_result.loading ? false : loggedIn_result.data.loggedIn
    return(
        <div className={props.className}>
            <div className="item" onClick={() => {
                    setLoggedIn({variables: {username: props.username, loggedIn: !loggedIn}})
             }}>{loggedIn ? "Logout" : "Login"}</div>
        </div>
    )
}

export default NavBar