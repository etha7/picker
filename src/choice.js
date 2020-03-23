import React, {useState, useEffect} from 'react'
import { useSpring, animated, to as interpolate} from 'react-spring'
import { useQuery, gql, useMutation} from "@apollo/client";

import { useDrag } from 'react-use-gesture'

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


var offset = 30 //X offset between cards

function Choice(props){

  const {loading, error, data} = useQuery(getCount_q)
  const [incrementCount, incLoading] = useMutation(incrementCount_q)
  const [isGone, setGone] = useState(false)
  const [side, setSide] = useState(1)
  var count = 0;
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

  /*
  useEffect(()=> {
    set({ x: isGone ? (500 + window.innerWidth)*side : offset*(props.index - count), scale: 1, })
 }, [set, isGone, count, props.index, side])
*/
  const trans = (r, s) => `rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`


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
      const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0 //cards shift to replace removed top card
      const rot = !down ? 0 : mx / 100 + (isGone ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
      const scale = down ? 1.1 : 1 // Active cards lift up a bit
      return {x, rot, scale, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 }}
    })
  })
    //Position absolute needs to be on the element that isn't dragged. It serves as the origin where
    //the dragged part of the component will return to 
    return( 
      <div style={{position: "absolute", pointerEvents: "none"}}> 
          <animated.div style={{...pos, pointerEvents: "auto"}}>
            <animated.div {...bind(props.index)} className={props.className} style={{ transform: interpolate([pos.rot, pos.scale], trans)}}>     
                <img src={props.image} draggable={false} alt="some choice"></img>
            </animated.div>
          </animated.div>
      </div>
    )

} export default Choice