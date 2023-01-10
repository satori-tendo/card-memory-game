import React from 'react'
import s from './Game.module.scss'


const Card = (props) => {

    const [disabled, setDisabled] = useState(false)

    const onClick = () => {
        
    }

  return (
    <button className={() => props.classNameCard(props.card)} disabled={disabled}
        key={props.card} onClick={() => checkCard(props.card)}></button>
  )
}

export default Card