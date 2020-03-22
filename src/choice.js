import React from 'react'
import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'

function Choice(props){
    const [pos, set] = useSpring(() => ({
        x: 0,
        y: 0
      }))
      const bind = useDrag(({ down, movement: [mx,my] }) => {
        set({
          x: down ? mx : 0,
          y: down ? my : 0
        })
      })

    return(
        <animated.div {...bind()} className={props.className} style={pos}>     
            <img src={props.image} draggable={false} alt="some choice"></img>
        </animated.div>
    )

} export default Choice