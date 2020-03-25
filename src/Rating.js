import React from 'react';


function Rating(props){
        const stars = new Array(5)
        var rating = props.rating
        var fullIndex = Math.floor(rating)
        for (let index = 0; index < stars.length; index++) {
            if(index < fullIndex){
               stars[index] = <div className="star" key={index}>★</div>;
            }
            else if (index === fullIndex && (rating*10)%10 === 5){
               stars[index] = <div className="star_half" key={index}>★</div>
            }
            else{
               stars[index] = <div className="star_empty" key={index}>★</div>
            }
        }
        return (
        <div className={props.className}>{stars} {props.review_count}</div>
        )
}

export default Rating