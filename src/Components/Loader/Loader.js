import React from 'react'
import { Spin } from 'antd'
import './loader.css'

function Loader() {
    return (
        <>
             <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "black",
                    zIndex: 2000, // modal se upar
                    }}
                    >
                    <span class="loader"></span>
                {/* <Spin size="large" /> */}
            </div> 
        </>
    )
}

export default Loader