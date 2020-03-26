import styled from 'styled-components'
import {default as sNavBar} from './NavBar.js'
import {default as sChoice} from './choice.js'
import {default as sChoices}from './Choices.js'
import {default as sRating} from './Rating.js'
import {default as sLogin } from './Login.js'
import {default as sLoading} from './Loading.js'

export const Loading = styled(sLoading)``

export const Login = styled(sLogin)`
  form {
    padding: 30px;
    display: flex; 
    flex-direction: column;
    justify-content: flex-start;
    width: 55vw;
    min-width: 300px;
    background: #fff;
    box-shadow: 0 10px 10px 0px grey;
    border-radius: 2%;
    border-style: solid;
    border-width: thin;
    border-color: lightgrey;
    border-radius: 5px;
    input {
      margin-top: 5px;
    }
  }

`

export const NavBar = styled(sNavBar)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  height: 10vh;
  width: 100%;
  background: white;
  position: sticky;
  top: 0;

  border-style: solid;
  border-width: thin;
  border-color: lightgrey;
  .item{
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;

    border-left-style: solid;
    border-right-style: solid;
    border-width: thin;
    border-color: lightgrey;

    padding-left: 10px;
    padding-right: 10px;
  }
  .item:hover{
    background: lightgrey;
  }
`
export const Choices = styled(sChoices)``

export const Choice = styled(sChoice)`

  width: 55vw;
  min-width: 300px;
  background: #fff;
  box-shadow: 0 10px 10px 0px grey;
  border-radius: 2%;
  border-style: solid;
  border-width: thin;
  border-color: lightgrey;
  border-radius: 5px;
  margin-bottom: 10vh;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-family: "arial";
  font-size: large;
  border-style: solid;
  border-width: thin;
  border-color: lightgrey;
  border-radius: 3px;


  &:hover, &:active{
    box-shadow: 0 20px 20px 0px grey;
  }  
  img {
    height: 50vh;
    width: 100%;
    position: relative;
    border-radius: 0 0 0px 0px;
    margin-bottom: 3px;
  }
  .cardContent {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: left;
  }
  .cardTextInfo {
    display: flex;
    flex-direction: column;
    align-items: left;
    margin-left: 3px;
  }
  .location{
    padding-left: 1vw;
    padding-right: 1vw;
    max-width: 200px;
    font-size: small;
    color: lightgrey;
  }
  .review {
    font-size: medium;
    margin-left: 3px;
    margin-right: 1vw;
    margin-top: 3px;
    margin-bottom: 1vh;
    border-top-style: solid;
    border-width: thin;
    border-color: lightgrey;
    border-radius: 3px;
  }
  .accessibility {
    color: lightgrey;
    font-size: small;
    display: flex;
    flex-direction: row;
    div {
      margin-left: 3px;
    }
  }
`

export const Rating = styled(sRating)`
  display: flex;
  flex-direction: row;
  color: lightgrey;

  .star {
    font-size: 20px;
    color: white;
    background-color: red;
    border-radius: 10%;
    padding: 5px;
    margin: 2px;
  }
  .star_half {
    font-size: 20px;
    color: white;
    background: linear-gradient(90deg, red 50%, lightgrey 50%);;
    border-radius: 10%;
    padding: 5px;
    margin: 2px;
  }
  .star_empty {
    font-size: 20px;
    color: white;
    background-color: lightgrey;
    border-radius: 10%;
    padding: 5px;
    margin: 2px;
  }

`

export const Paragraph = styled.p`
  background-color: #fff;
  border-radius: 5%;
  padding: 20px;
  box-shadow: 0 10px 10px 0px grey;
`

export const Button = styled.button`
  width: 50%;
  background-color: lightskyblue;
  box-shadow: 0 5px 5px 0px grey;
  margin-top: 1vh;
  font-size: 1.5em;
  border: none;
  outline: none;
  text-shadow: 0px 1px 1px #4d4d4d;
	color: white;
	font: 'LeagueGothicRegular';
  &:hover{
    box-shadow: 0 7px 7px 0px grey;
  }
  &:active{
    box-shadow: inset 0 5px 5px 0px grey;

  }
`