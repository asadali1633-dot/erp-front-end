import React, { useState } from 'react'
import style from './list.module.css'
import { Tabs, Dropdown } from "antd";
import Profile from './People-Profile/Profile';
import EditPeople from './People-Forms/EditList/EditPeople';
import Education from './People-Forms/Education/Education';
import Qualification from './People-Forms/Qualification/Qualification';
import Experiance from './People-Forms/Experiance/Experiance';


function Info({
    emptId
}) {
    const [activeTab, setActiveTab] = useState("1");


    const items = [
        {
            key: "1",
            label: "Personal",
            children: (
                <div className={style.pers_flexOfEmp}>
                    <div className={style.pers_EmpProfile}>
                        <Profile {...{emptId}}/>
                    </div>
                    <div className={`${style.pers_EmpForm} mx-2 w-100`}>
                        <EditPeople {...{emptId}}/>
                    </div>
                </div>
            )
        },
        {
            key: "2",
            label: "Education",
            children: (
                <div className={style.pers_flexOfEmp}>
                    <div className={style.pers_EmpProfile}>
                        <Profile {...{emptId}}/>
                    </div>
                    <div className={`${style.pers_EmpForm} mx-2 w-100`}>
                        <Education {...{emptId}}/>
                    </div>
                </div>
            ),
        },
        {
            key: "3",
            label: "Qualification",
            children: (
                <div className={style.pers_flexOfEmp}>
                    <div className={style.pers_EmpProfile}>
                        <Profile {...{emptId}}/>
                    </div>
                    <div className={`${style.pers_EmpForm} mx-2 w-100`}>
                        <Qualification {...{emptId}}/>
                    </div>
                </div>
            ),
        },
        {
            key: "4",
            label: "Job Experiance",
            children: (
                <div className={style.pers_flexOfEmp}>
                    <div className={style.pers_EmpProfile}>
                        <Profile {...{emptId}}/>
                    </div>
                    <div className={`${style.pers_EmpForm} mx-2 w-100`}>
                        <Experiance {...{emptId}}/>
                    </div>
                </div>
            ),
        },
    ];
    return (
        <>
            <Tabs
                activeKey={activeTab}
                onChange={(key) => setActiveTab(key)}
                items={items}
            />
        </>
    )
}

export default Info