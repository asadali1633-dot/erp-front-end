import { Tabs } from 'antd';
import React, { useState } from 'react'
import style from '../../personal.module.css'
import EmpProfile from '../Profile/EmpProfile';
import Job from '../Job/Job';
import PaySlip from './PaySlip/PaySlip';
import Details from './Bank-Details/Details';
import Reimbursements from './Reimbursements/Reimbursements';

function PayInfo() {
    const [activeTab, setActiveTab] = useState("1");


    const items = [
        {
            key: "1",
            label: "Pay Slips",
            children: (
                <div className={style.pers_flexOfEmp}>
                    <div className={style.pers_EmpProfile}>
                        <EmpProfile />
                    </div>
                    <div className={`${style.pers_EmpForm} mx-2 w-100`}>
                        <PaySlip />
                    </div>
                </div>
            ),
        },
        {
            key: "2",
            label: "Bank Details",
            children: (
                <div className={style.pers_flexOfEmp}>
                    <div className={style.pers_EmpProfile}>
                        <EmpProfile />
                    </div>
                    <div className={`${style.pers_EmpForm} mx-2 w-100`}>
                        <Details />
                    </div>
                </div>
            ),
        },
        {
            key: "3",
            label: "Tax Settings",
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
            key: "4",
            label: "Reimbursements",
            children: (
                <div className={style.pers_flexOfEmp}>
                    <div className={style.pers_EmpProfile}>
                        <EmpProfile />
                    </div>
                    <div className={`${style.pers_EmpForm} mx-2 w-100`}>
                        <Reimbursements />
                    </div>
                </div>
            ),
        },
        {
            key: "5",
            label: "Deductions",
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
            key: "6",
            label: "Pay History",
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
            key: "7",
            label: "Benifits Elections",
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

export default PayInfo