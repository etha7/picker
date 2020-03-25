import React, {useState, useEffect} from 'react'
import { useSpring, animated, to as interpolate} from 'react-spring'
import { useQuery, gql, useMutation} from "@apollo/client";
import { useDrag } from 'react-use-gesture'
import { Rating } from './style.js'

const getCount_q = gql`
   query RemovedCount{
     removedCount @client
   }
`
const incrementCount_q = gql`
  mutation IncrementCount{
    incrementCount @client
  }
`

var offset = 10 //X offset between cards
const trans = (r, s) => `rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})` 

function Choice(props){

  const {loading, error, data} = useQuery(getCount_q)
  const [incrementCount] = useMutation(incrementCount_q)
  const [isGone, setGone] = useState(false)
  const [side, setSide] = useState(1)
  var count = 0;
  if(error){
    console.log(error)
  }
  if(!loading){
     count = data.removedCount;
  }
  
  //Set Animation data for choices
  const [pos, set] = useSpring(() => ({
    x: isGone ? (500 + window.innerWidth)*side: offset*(props.index - count),
    y: 0,  
    scale: 1, 
    rot: 0
  }))

  //Remove useEffect for production, for some reason causes issues
  useEffect(()=> {
    set({ x: isGone ? (500 + window.innerWidth)*side : offset*(props.index - count), scale: 1, })
  }, [set, isGone, count, props.index, side])


  //Create Gesture event listeners for dragging 
  const bind = useDrag(({ args: [index], down, movement: [mx,my], direction: [xDir], velocity, previous: [ox, oy]}) => {
    const trigger = velocity > 0.5;
    const dir = xDir < 0 ? -1 : 1 //current mouse movement 
    const side = mx < 0 ? -1 : 1  //offset from original x position
    if(!down && trigger && !isGone){
      incrementCount()
      setSide(side) 
      setGone(true)
    }
    set(() => { 
      const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : offset*(props.index - count) 
      const rot = !down ? 0 : mx / 100 + (isGone ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
      const scale = down ? 1.1 : 1 // Active cards lift up a bit
      return {x, rot, scale, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 }}
    })
  })

  //Only top choice should be pickable ie auto
  var pointerEvents = props.index - count === 0 ? "auto": "none"
  //Review
  var reviews = props.reviews
  var review
  var user
  var url
  if(reviews[0] === null){
    review = "No Review"
    user = ""
    url = ""
  }else{
    review = reviews[0].text
    user = reviews[0].user.name
    url = reviews[0].url
  }

  //Accessibility Details
  var wheelchair = props.attributes.wheelchair_accessible
  wheelchair = wheelchair === null ? "": wheelchair.value_code === "true" ? "Wheelchair Accessible" : "Not Wheelchair Accessible"

  var restrooms = props.attributes.gender_neutral_restrooms
  restrooms = restrooms === null ? "": restrooms.value_code === "true" ? "Gender Neutral Restrooms" : "No Gender Neutral Restrooms"
  
  var openToAll = props.attributes.open_to_all
  openToAll = openToAll === null ? "": openToAll.value_code === "true" ? "Open to All" : "Not Open to All"
  var access = [wheelchair, restrooms, openToAll]
  
    return( 
      <div style={{position: "absolute", pointerEvents: "none"}}> 
          <animated.div style={{...pos, pointerEvents}}>
            <animated.div {...bind(props.index)} className={props.className} style={{ transform: interpolate([pos.rot, pos.scale], trans)}}>
              <div className="cardContent">
                <img src={props.image} draggable={false} alt="some choice"></img>
                <div className="cardTextInfo">
                      <div>{props.name}</div>
                      <div>
                          <Rating rating={props.rating} review_count={props.review_count}></Rating>
                          <div style={{color: "grey"}}>{props.price} · {props.categories[0].title}</div>
                          <div className="accessibility">
                             {access.map((a, i) => <div key={i}> {a} · </div>)}                            
                          </div>
                      </div> 
                </div>
                <div className="location">{props.location.formatted_address}</div>
                <div className="review">{review} - <a href={url}><b>{user}</b></a></div>
             </div>  
            </animated.div>
          </animated.div>
      </div>
    )

} export default Choice