import styled from 'styled-components'
import {default as sChoice} from './choice.js'
import {default as sRating} from './Rating.js'


export const Choice = styled(sChoice)`

  width: 55vw;
  min-width: 300px;
  background: #fff;
  box-shadow: 0 10px 10px 0px grey;
  border-radius: 2%;
  border-style: solid;
  border-width: thin;
  border-color: lightgrey;
  border-radius: 3px;

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
    border-radius: 0 0 5px 5px;
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
  }
  .location{
    padding-left: 1vw;
    padding-right: 1vw;
    max-width: 200px;
    font-size: small;
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