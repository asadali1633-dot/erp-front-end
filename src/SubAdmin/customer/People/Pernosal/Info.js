import React, { useEffect, useState } from 'react'
import { Tabs, Dropdown } from "antd";
import Personal from './Personal';
import EmpProfile from './Personal-Forms/Profile/EmpProfile.js';
import style from './personal.module.css'
import Job from './Personal-Forms/Job/Job.js';
import Timeoff from './Personal-Forms/Time_off/Timeoff.js';
import PayInfo from './Personal-Forms/PayInfo/PayInfo.js';
import AssetsTabs from './Personal-Forms/Assets/AssetsTabs.js';



function Info() {
const [activeTab, setActiveTab] = useState("Personal");



 



    const items = [
        {
            key: "Personal",
            label: "Personal",
            children: <Personal />,
        },
        {
            key: "Job",
            label: "Job",
            children: (
                <div className={style.pers_flexOfEmp}>
                    <div className={style.pers_EmpProfile}>
                        <EmpProfile />
                    </div>
                    <div className={`${style.pers_EmpForm} mx-2 w-100`}>
                        <Job />
                    </div>
                </div>
            ),
        },
        {
            key: "Time_off",
            label: "Time off",
            children: (
                <div className={style.pers_flexOfEmp}>
                    <div className={style.pers_EmpProfile}>
                        <EmpProfile />
                    </div>
                    <div className={`${style.pers_EmpForm} mx-2 w-100`}>
                        <Timeoff />
                    </div>
                </div>
            )
        },
        {
            key: "Pay_info",
            label: "Pay Info",
            children: <PayInfo />
        },
        {
            key: "Performance",
            label: "Performance",
            children: "Performance",
        },
        {
            key: "Time_sheet",
            label: "Time Sheet",
            children: "Time Sheet",
        },
        {
            key: "Assets_dash",
            label: "Assets",
            children: <AssetsTabs />
        },
        {
            key: "Company",
            label: "Company",
            children: "Company",
        },
        {
            key: "Org_chart",
            label: "Org Chart",
            children: "Org Chat",
        }
    ];
    return (
        <>
            <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={items}
            />
        </>
    )
}

export default Info