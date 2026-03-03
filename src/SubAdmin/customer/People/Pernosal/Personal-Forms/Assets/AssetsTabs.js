import { Tabs } from 'antd';
import React, { useState } from 'react'
import style from '../../personal.module.css'
import EmpProfile from '../Profile/EmpProfile';
import AssetsDetails from './AssetsDetails/AssetsDetails';
import Dashboard from './Dashboard/Dashboard';

function AssetsTabs() {
    const [activeTab, setActiveTab] = useState("1");


    const items = [
        {
            key: "1",
            label: "Dashborad",
            children: (
                <div className={style.pers_flexOfEmp}>
                    <div className={style.pers_EmpProfile}>
                        <EmpProfile />
                    </div>
                    <div className={`${style.pers_EmpForm} mx-2 w-100`}>
                        <Dashboard />
                    </div>
                </div>
            ),
        },
        {
            key: "2",
            label: "Assets Details",
            children: (
                <div className={style.pers_flexOfEmp}>
                    <div className={style.pers_EmpProfile}>
                        <EmpProfile />
                    </div>
                    <div className={`${style.pers_EmpForm} mx-2 w-100`}>
                        <AssetsDetails />
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

export default AssetsTabs