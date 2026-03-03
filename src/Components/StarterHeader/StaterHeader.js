import React from 'react'
import style from '../StarterHeader/StaterHeader.module.css'
import logo from '../../assests/images/logo.png'


function StaterHeader() {
  return (
    <>
        <header className={style.header}>
            <img src={logo} alt="" />
        </header>
    </>
  )
}

export default StaterHeader