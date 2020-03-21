import React from 'react'

function Choice(props){
    return(
        <div className={props.className}>     
            <img src={props.image} alt="some choice"></img>
        </div>
    )

} export default Choice