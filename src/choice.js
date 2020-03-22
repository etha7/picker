import React from 'react'
import { useSpring, animated, to as interpolate} from 'react-spring'
import { useDrag } from 'react-use-gesture'


function Choice(props){
  var gone = props.gone
  //Set Animation data for choices
  const [pos, set] = useSpring(() => ({
    x: 0,
    y: 0,  
    scale: 1, 
    rot: 0
  }))

  const trans = (r, s) => `rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`


  const bind = useDrag(({ args: [index], down, movement: [mx,my], direction: [xDir], velocity }) => {
    const trigger = velocity > 0.2;
    const dir = xDir < 0 ? -1 : 1 
    if(!down && trigger) gone.add(index)
    set(() => { 
      const isGone = gone.has(index)
      const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0 
      const rot = !down ? 0 : mx / 100 + (isGone ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
      const scale = down ? 1.1 : 1 // Active cards lift up a bit
      return {x, rot, scale, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 }}
    })
  })
    return(
      <animated.div style={pos}>
        <animated.div {...bind(props.index)} className={props.className} style={{ transform: interpolate([pos.rot, pos.scale], trans)}}>     
            <img src={props.image} draggable={false} alt="some choice"></img>
        </animated.div>
      </animated.div>
    )

} export default Choice