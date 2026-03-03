import React, { useState } from 'react'
import style from '../../empPersonalForm.module.css'
import { LuLayoutDashboard } from "react-icons/lu";
import { LiaLaptopSolid } from "react-icons/lia";
import { CiMobile3 } from "react-icons/ci";
import { BsTools } from "react-icons/bs";
import { GiSofa } from "react-icons/gi";
import { FaCar } from "react-icons/fa";
import { PiMotorcycleFill } from "react-icons/pi";
import Heading from '../../../../../../../Components/Heading/Heading';

function Dashboard() {
    return (
        <>
            <div>
                <div className={style.headerBox}>
                    <div>
                        <LuLayoutDashboard />
                        <Heading title={"Assets Dashboard Overview"} />
                    </div>
                </div>
                <div className="container p-0">
                    <div className="row">
                        <div className='mt-3'>
                            <Heading
                                title={"Assets Summary"}
                                className={style.subHeading}
                            />
                        </div>
                        <div className={`${style.assestDashbord_box} col-2 mx-2`}>
                            <h6>Total Assets Assigned</h6>
                            <p>05</p>
                        </div>
                        <div className={`${style.assestDashbord_box} col-2 mx-2`}>
                            <h6>Total Asset Value</h6>
                            <p>50,000</p>
                        </div>
                        <div className={`${style.assestDashbord_box} col-2 mx-2`}>
                            <h6>Issues/Repair Pending</h6>
                            <p>02</p>
                        </div>
                         <div className={`${style.assestDashbord_box} col-2 mx-2`}>
                            <h6>Insurance Status</h6>
                            <p>Insured</p>
                        </div>
                    </div>
                </div>

                <div className={`${style.secondHeaderJob} p-0 mt-3`}>
                    <div className="row">
                        <div className={`pt-2`}>
                            <Heading
                                title={"Asset Categories Summary"}
                                className={style.subHeading}
                            />
                        </div>
                        <div className={`${style.assestDashbord_boxDetails} col-2 mx-2`}>
                            <h6>Laptop/Computers</h6>
                            <p><LiaLaptopSolid/> 03</p>
                        </div>
                        <div className={`${style.assestDashbord_boxDetails} col-2 mx-2`}>
                            <h6>Mobile Devices</h6>
                            <p><CiMobile3/> 02</p>
                        </div>
                        <div className={`${style.assestDashbord_boxDetails} col-2 mx-2`}>
                            <h6>Equipment/Tools</h6>
                            <p><BsTools/> 0</p>
                        </div>
                        <div className={`${style.assestDashbord_boxDetails} col-2 mx-2`}>
                            <h6>Furniture</h6>
                            <p><GiSofa/> 0</p>
                        </div>
                        <div className={`${style.assestDashbord_boxDetails} col-2 mx-2`}>
                            <h6>Car</h6>
                            <p><FaCar/> 01</p>
                        </div>
                        <div className={`${style.assestDashbord_boxDetails} col-2 mt-2 mx-2`}>
                            <h6>Bike</h6>
                            <p><PiMotorcycleFill/> 01</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard