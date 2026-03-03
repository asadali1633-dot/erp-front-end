import React, { useState } from 'react'
import style from '../../empPersonalForm.module.css'
import { FaToolbox } from "react-icons/fa6";
import Heading from '../../../../../../../Components/Heading/Heading';
import { Table } from 'antd';


function AssetsDetails() {


    const columns = [
        {
            title: "Asset ID",
            dataIndex: "common",
        },
        {
            title: "Asset Name",
            dataIndex: "common",
        },
        {
            title: "Category",
            dataIndex: "common",
        },
        {
            title: "Assigned Date",
            dataIndex: "common",
        },
        {
            title: "Warranty Until",
            dataIndex: "common",
        },
        {
            title: "Condition",
            dataIndex: "common",
        },
        {
            title: "Serial Number",
            dataIndex: "common",
        },
        {
            title: "Model/Version",
            dataIndex: "common",
        },
        {
            title: "Purchase Value",
            dataIndex: "common",
        },
        {
            title: "Insurance Policy #",
            dataIndex: "common",
        },
        {
            title: "Status",
            dataIndex: "common",
        },
    ];

    const data = [
        {
            key: "1",
            common: "1234-XXXX-5678",
        }
    ];


    return (
        <>

            <div>
                <div className={style.headerBox}>
                    <div>
                        <FaToolbox />
                        <Heading title={"Assets Details"} />
                    </div>
                </div>
                <div className='mt-2'>
                    <Table
                        className='antdCustomeTable antdEducationTable'
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                    />
                </div>
            </div>


        </>
    )
}

export default AssetsDetails