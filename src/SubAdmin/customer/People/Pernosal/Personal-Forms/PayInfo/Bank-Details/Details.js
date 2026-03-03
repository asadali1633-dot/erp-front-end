import React, { useState } from 'react'
import style from '../../empPersonalForm.module.css'
import Heading from '../../../../../../../Components/Heading/Heading';
import { CiBank } from "react-icons/ci";
import { Table } from 'antd';




function Details() {

    const columnsPaySlip = [
        {
            title: "Account Holder Name",
            dataIndex: "common",
        },
        {
            title: "Account Type",
            dataIndex: "common",
        },
        {
            title: "Bank Name",
            dataIndex: "common",
        },
        {
            title: "Account Number",
            dataIndex: "common",
        },
        {
            title: "Branch Name",
            dataIndex: "common",
        },
        {
            title: "IBAN",
            dataIndex: "common",
        },
        {
            title: "Account Status",
            dataIndex: "common",
        },
        {
            title: "Last Deposit Date",
            dataIndex: "common",
        },
        {
            title: "Last Deposit Amount",
            dataIndex: "common",
        }
    ];

    const dataPaySlip = [
        {
            key: "1",
            common: "17-FEB-2022",
        },
    ];


    return (
        <>

            <div>

                {/* BANK DETAILS TABLE ====================== */}
                <div className={`${style.headerBox}`}>
                    <div>
                        <CiBank />
                        <Heading title={"Bank Details"} />
                    </div>
                </div>
                <Table
                    className='antdCustomeTable mt-2'
                    columns={columnsPaySlip}
                    dataSource={dataPaySlip}
                    pagination={false}
                />
            </div>
        </>
    )
}

export default Details