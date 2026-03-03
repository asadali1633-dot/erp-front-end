import React from 'react'
import style from '../Heading/Heading.module.css'

function Heading({
  title,
  className,
  classNameColor
}) {
  return (
    <h5 className={` ${classNameColor} ${style.Heading} ${className}`}>{title}</h5>
  )
}

export default Heading