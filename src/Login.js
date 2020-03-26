
import React, { useState } from 'react';
import {useMutation} from "@apollo/client";
import queries from './queries.js'
import { Button } from './style.js'


function Login(props){
    const [fields, setFields] = useState({username: "", password: ""})
    const [badUsername, setBadUsername] = useState(false)
    // For Refetching
    const getLoggedIn_q = {query: queries.GET_LOGGED_IN, variables: {username: fields.username}} 
    const getUserName_q = {query: queries.GET_LOGGED_IN}
    // Manage state for button presses
    const [attemptLogin] = useMutation(queries.LOGIN);
    const [setLoggedIn] = useMutation(queries.SET_LOGGED_IN, {refetchQueries: [getLoggedIn_q]})
    const [setUsername] = useMutation(queries.SET_USERNAME, {refetchQueries: [getUserName_q]})
    const [createUser] = useMutation(queries.CREATE_USER,{refetchQueries: [getLoggedIn_q, getUserName_q]})

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
        if(event.target.name === 'username'){
            setBadUsername(false)
        }
    }
    const handleCreate = async (event) =>{
        if(fields.username === '' || fields.password === ''){
            return
        }
        const result = await createUser({variables: {username: fields.username, password: fields.password}})
        console.log(result)
        if(result.data.createUser){
            setLoggedIn({variables: {username: fields.username, loggedIn: true}})
            setUsername({variables: {username: fields.username}})
        }else{
            setBadUsername(true)
        }
    }
    
    return(
        <div className={props.className}>
            <form onSubmit={handleSubmit}>
                {!badUsername ? null : <div className="error">Username is taken.</div>}
                <label>Username:</label>
                <input onChange={handleChange}value={fields.username} name="username"></input>
                <label>Password:</label>
                <input onChange={handleChange}value={fields.password} name="password"></input>
                <div className="buttons"> 
                    <Button type="submit" draggable={false}>Login</Button>
                    <Button onClick={handleCreate} draggable={false}>Create Account</Button>
                </div>
            </form>

        </div>
    )
}

export default Login
