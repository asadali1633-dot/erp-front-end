import React, { use, useEffect, useState } from 'react'
import style from './personal.module.css'
import * as EMP_ACTIONS from "../../../../store/action/emp/index";
import { connect } from "react-redux";
import { message } from 'antd';
import { useSelector } from "react-redux";
import EmpPersonalFrom from './Personal-Forms/Personal_info/EmpPersonalFrom.js';
import EmpProfile from './Personal-Forms/Profile/EmpProfile.js'
import { Tabs, Dropdown } from "antd";
import Education from './Personal-Forms/Education/Education.js';
import Qualification from './Personal-Forms/Qualification/Qualification.js';
import Experiance from './Personal-Forms/Experiance/Experiance.js';


function Personal({
    GetPeopleDataWithPage,
    getUserLoginTime,
    deleteEmp,
    Red_Emp,
    EmpGetByid
}) {

    const empData = Red_Emp?.GetUserLoginTime?.[0]?.data
    const selectId = empData?.id
    const [messageApi, contextHolder] = message.useMessage();
    const accessToken = useSelector((state) => state.Red_Auth.accessToken);
    const [activeTab, setActiveTab] = useState("1");



    const items = [
        {
            key: "1",
            label: "Personal",
            children: (
                <div className={style.pers_flexOfEmp}>
                    <div className={style.pers_EmpProfile}>
                        <EmpProfile />
                    </div>
                    <div className={`${style.pers_EmpForm} mx-2 w-100`}>
                        <EmpPersonalFrom />
                    </div>
                </div>
            ),
        },
        {
            key: "2",
            label: "Education",
            children: (
                <div className={style.pers_flexOfEmp}>
                    <div className={style.pers_EmpProfile}>
                        <EmpProfile />
                    </div>
                    <div className={`${style.pers_EmpForm} mx-2 w-100`}>
                        <Education />
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
                        <EmpProfile />
                    </div>
                    <div className={`${style.pers_EmpForm} mx-2 w-100`}>
                        <Qualification />
                    </div>
                </div>
            ),
        },
        {
            key: "4",
            label: "Job Experiance",
            children: (
                <div className={`${style.pers_flexOfEmp}`}>
                    <div className={style.pers_EmpProfile}>
                        <EmpProfile />
                    </div>
                    <div className={`${style.pers_EmpForm} mx-2`}>
                        <Experiance />
                    </div>
                </div>
            ),
        }


    ];


    return (
        <>
            {contextHolder}


            <Tabs
                className={`${style.personalTabs}`}
                style={{ width: "100%" }}
                activeKey={activeTab}
                onChange={setActiveTab}
                items={items}
            />

        </>
    )
}

function mapStateToProps(state) {
    return {
        Red_Emp: state.Red_Emp,

    };
}
const AllActions = {
    ...EMP_ACTIONS,
};
export default connect(mapStateToProps, AllActions)(Personal);