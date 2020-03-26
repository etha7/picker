
import React, { useState } from 'react';
import {useMutation} from "@apollo/client";
import queries from './queries.js'
import { Button } from './style.js'


function Login(props){
    const [fields, setFields] = useState({username: "", password: ""})
    const [attemptLogin] = useMutation(queries.LOGIN);
    const [setLoggedIn] = useMutation(queries.SET_LOGGED_IN, {refetchQueries: [{query: queries.GET_LOGGED_IN, variables: {username: fields.username}}]})
    const [setUsername] = useMutation(queries.SET_USERNAME, {refetchQueries: [{query: queries.GET_USERNAME}]})

    const handleSubmit = async (event) => {
        event.preventDefault();
        var succeeded = await attemptLogin({variables: {username: fields.username, password: fields.password}})
        if(succeeded.data.login){
            setLoggedIn({variables: {username: fields.username, loggedIn: true}})
            setUsername({variables: {username: fields.username}})
        }
    }
    const handleChange = (event) =>{
        setFields({ ...fields, [event.target.name]: event.target.value})
    }

    return(
        <div className={props.className}>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input onChange={handleChange}value={fields.username} name="username"></input>
                <label>Password:</label>
                <input onChange={handleChange}value={fields.password} name="password"></input>
                <Button type="submit" draggable={false}>Login</Button>
            </form>
        </div>
    )
}

export default Login
