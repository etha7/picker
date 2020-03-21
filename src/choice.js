import React from 'react'

function Choice(props){
    return(
        <div className={props.className} style={{width: (props.width)+"vh"}}>     
            <img src={props.image} alt="some choice"></img>
        </div>
    )

} export default Choice