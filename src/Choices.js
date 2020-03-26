import React from 'react';
import { useQuery } from "@apollo/client";
import queries from './queries.js'
import {Choice, Loading} from './style.js'

function Choices(props){
    const limit= props.limit
    const location = props.location
    var results
    const {loading, error, data} = useQuery(queries.SEARCH, {variables: {location, limit}})

    if(error){
        return (""+error)
    }    
    if(!loading){
        var business = data.search.business
        var business_data = business.map((b) => { return {image: b.photos[0], ...b} })
        business_data.reverse()
        results = business_data.map((bd, i) => <Choice index={business_data.length - i - 1} {...bd} key={bd.name}></Choice>) 
      }else{
        results = <Loading></Loading> 
      }
    return(
        <div className="Choices"> 
            {results}
        </div>
    )
}

export default Choices
