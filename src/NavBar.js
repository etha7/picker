import React from 'react';
import { useQuery, useMutation} from "@apollo/client";
import queries from './queries.js'


function NavBar(props){
    const usernameResult = useQuery(queries.GET_USERNAME)
    const username = usernameResult.loading ? "" : usernameResult.data.username
    const loggedIn_result = useQuery(queries.GET_LOGGED_IN, {variables: {username}})
    const [setLoggedIn] = useMutation(queries.SET_LOGGED_IN, {refetchQueries: [{query: queries.GET_LOGGED_IN, variables: {username}}]})
    const loggedIn = loggedIn_result.loading ? false : loggedIn_result.data.loggedIn
    const [setUsername] = useMutation(queries.SET_USERNAME, {refetchQueries: [{query: queries.GET_USERNAME}]})

   
    const logout = () =>{
        setLoggedIn({variables: {username, loggedIn: false}})
        setUsername({variables: {username: ""}})
    }

    var usernameDiv = username === ''? null : <div className="item">{username}</div>
    var logoutDiv = !loggedIn ? null : <div className="item" onClick={logout}>Logout</div>
    return(
        <div className={props.className}>
             {logoutDiv}
             {usernameDiv}
        </div>
    )
}

export default NavBar