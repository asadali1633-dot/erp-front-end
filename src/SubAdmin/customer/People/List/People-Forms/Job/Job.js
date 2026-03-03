import React, { useState } from 'react'
import style from '../empPersonalForm.module.css'
import Heading from '../../../../../../Components/Heading/Heading';
import { Table } from 'antd';
import { CgShoppingBag } from "react-icons/cg";



function Job() {

    const columns = [
        {
            title: "Effective Date",
            dataIndex: "Effective_Date",
        },
        {
            title: "Employment Status",
            dataIndex: "Employment_Status",
        },
        {
            title: "Employee Tax Type",
            dataIndex: "Employee_Tax_Type",
        },
        {
            title: "Reports to",
            dataIndex: "Reports_to",
        },
    ];

    const data = [
        {
            key: "1",
            Effective_Date: "17-FEB-2022",
            Employment_Status: "Full Time",
            Employee_Tax_Type: "W2",
            Reports_to: "Asad Ali",
        },
    ];

    const columns1 = [
        {
            title: "Effective Date",
            dataIndex: "Effective_Date",
        },
        {
            title: "Location",
            dataIndex: "Location",
        },
        {
            title: "Division",
            dataIndex: "Division",
        },
        {
            title: "Department",
            dataIndex: "Department",
        },
        {
            title: "Job Title",
            dataIndex: "Job_Title",
        },
        {
            title: "Reports to",
            dataIndex: "Reports_to",
        }
    ];

    const data1 = [
        {
            key: "1",
            Effective_Date: "17-FEB-2022",
            Location: "Pakistan",
            Division: "US",
            Department: "Design",
            Job_Title: "Design Manager",
            Reports_to: "Asad Ali",
        },
        {
            key: "2",
            Effective_Date: "17-FEB-2022",
            Location: "Pakistan",
            Division: "US",
            Department: "Design",
            Job_Title: "Design Manager",
            Reports_to: "Asad Ali",
        },
        {
            key: "3",
            Effective_Date: "17-FEB-2022",
            Location: "Pakistan",
            Division: "US",
            Department: "Design",
            Job_Title: "Design Manager",
            Reports_to: "Asad Ali",
        },
    ];


    return (
        <>

            <div>
                <div className={`${style.headerBox} ${style.firstHeaderJob}`}>
                    <div>
                        <CgShoppingBag />
                        <Heading title={"Job"} />
                    </div>
                </div>

                <div className='mt-2'>
                    <div className={`${style.headerBox} ${style.secondHeaderJob} mb-2`}>
                        <div className='mt-2'>
                            <CgShoppingBag />
                            <Heading title={"Employement Status"} />
                        </div>
                    </div>
                    <Table
                        className='antdCustomeTable antdEducationTable'
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                    />
                </div>

                <div className='mt-3'>
                    <div className={`${style.headerBox} ${style.thirdHeaderJob} mb-3`}>
                        <div className='mb-2'>
                            <CgShoppingBag />
                            <Heading title={"Job Information"} />
                        </div>
                    </div>
                    <Table
                        className='antdCustomeTable antdEducationTable'
                        columns={columns1}
                        dataSource={data1}
                        pagination={false}
                    />
                </div>
            </div>
        </>
    )
}

export default Job