import React from 'react'
import PdfIcon from '../../assests/images/icons/pdf.png'

function index() {
  return (
    <>
        <img  
            style={{
                height: "25px",
                margin: "6px 0",
                cursor: 'pointer'
            }}
            src={PdfIcon} 
            alt="" 
        />
    </>
  )
}

export default index