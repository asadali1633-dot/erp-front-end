import React, { useState } from 'react'
import style from '../../empPersonalForm.module.css'
import Heading from '../../../../../../../Components/Heading/Heading';
import { MdOutlinePayments } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { FaFileAlt } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { Table } from 'antd';




function PaySlip() {

    const columnsPaySlip = [
        {
            title: "Pay Period Display",
            dataIndex: "common",
        },
        {
            title: "Pay Date",
            dataIndex: "common",
        },
        {
            title: "Payslip ID/Number",
            dataIndex: "common",
        },
        {
            title: "Gross Earnings",
            dataIndex: "common",
        },
        {
            title: "Total Deductions",
            dataIndex: "common",
        },
        {
            title: "Net Pay",
            dataIndex: "common",
        },
        {
            title: "Payment Method",
            dataIndex: "common",
        },
        {
            title: "Deposit Date",
            dataIndex: "common",
        },
        {
            title: "Bank Reference No",
            dataIndex: "common",
        }
    ];

    const dataPaySlip = [
        {
            key: "1",
            common: "17-FEB-2022",
        },
    ];

    const columnsEarnings = [
        {
            title: "Basic Salary",
            dataIndex: "common",
        },
        {
            title: "House Rent Allowance",
            dataIndex: "common",
        },
        {
            title: "Travel Allowance",
            dataIndex: "common",
        },
        {
            title: "Meal Allowance",
            dataIndex: "common",
        },
        {
            title: "Special Allowance",
            dataIndex: "common",
        },
        {
            title: "Overtime Hours",
            dataIndex: "common",
        },
        {
            title: "Overtime Amount",
            dataIndex: "common",
        },
        {
            title: "Bonus/Incentive",
            dataIndex: "common",
        },
        {
            title: "Total Earnings",
            dataIndex: "common",
        }
    ];

    const dataEarnings = [
        {
            key: "1",
            common: "Amount deposited",
        },
    ];

    const columnsDeduc = [
        {
            title: "Income Tax (TDS)",
            dataIndex: "common",
        },
        {
            title: "Provident Fund (PF)",
            dataIndex: "common",
        },
        {
            title: "Health (Insurance)",
            dataIndex: "common",
        },
        {
            title: "Loan Recovery",
            dataIndex: "common",
        },
        {
            title: "Salary Advance Recovery",
            dataIndex: "common",
        },
        {
            title: "Other Deductions",
            dataIndex: "common",
        },
        {
            title: "Total Deductions",
            dataIndex: "common",
        },
    ];

    const dataDeduc = [
        {
            key: "1",
            common: "Amount deposited",
        },
    ];

    const columnsYear = [
        {
            title: "YTD Gross Earnings",
            dataIndex: "common",
        },
        {
            title: "YTD Tax Paid",
            dataIndex: "common",
        },
        {
            title: "YTD Net Pay Received",
            dataIndex: "common",
        },
        {
            title: "YTD Retirement Contributions",
            dataIndex: "common",
        },
        {
            title: "Remaining Tax Exemption",
            dataIndex: "common",
        },
        {
            title: "Leave Balance Affecting Pay",
            dataIndex: "common",
        },
    ];

    const dataYear = [
        {
            key: "1",
            common: "Available tax savings",
        },
    ];

    const columnsActions = [
        {
            title: "Download PDF",
            dataIndex: "common",
            render: (data) =>
                data ? <span className={style.download_button}><FaDownload /></span> : <span>-</span>
        },
        {
            title: "Download Simplified",
            dataIndex: "common",
            render: (data) =>
                data ? <span className={style.download_button}><FaDownload /></span> : <span>-</span>
        },
        {
            title: "Compare with Previous",
            dataIndex: "common",
            render: (data) =>
                data ? <span className={style.download_button}><FaDownload /></span> : <span>-</span>
        },
        {
            title: "Report Issue",
            dataIndex: "common",
            render: (data) =>
                data ? <span className={style.download_button}><FaDownload /></span> : <span>-</span>
        },
        {
            title: "Request Duplicate",
            dataIndex: "common",
            render: (data) =>
                data ? <span className={style.download_button}><FaDownload /></span> : <span>-</span>
        }
    ];

    const dataActions = [
        {
            key: "1",
            common: "Available tax savings",
        },
    ];



    return (
        <>

            <div>

                {/* PAYSLIP TABLE ====================== */}
                <div className={`${style.headerBox}`}>
                    <div>
                        <MdOutlinePayments />
                        <Heading title={"Pay Info"} />
                    </div>
                </div>
                <Table
                    className='antdCustomeTable mt-2'
                    columns={columnsPaySlip}
                    dataSource={dataPaySlip}
                    pagination={false}
                />


                {/* EARNING BREAKDOWN TABLE ====================== */}
                <div className={`${style.headerBox} mt-3`}>
                    <div>
                        <MdOutlinePayments />
                        <Heading title={"Earnings Breakdown"} />
                    </div>
                </div>
                <Table
                    className='antdCustomeTable mt-2'
                    columns={columnsEarnings}
                    dataSource={dataEarnings}
                    pagination={false}
                />


                {/* DEDUCTIONS BREAKDOWN TABLE ====================== */}
                <div className={`${style.headerBox} mt-3`}>
                    <div>
                        <MdOutlinePayments />
                        <Heading title={"Deductions Breakdown"} />
                    </div>
                </div>
                <Table
                    className='antdCustomeTable mt-2'
                    columns={columnsDeduc}
                    dataSource={dataDeduc}
                    pagination={false}
                />

                {/* YEAR-TO-DATE SUMMARY TABLE ====================== */}
                <div className={`${style.headerBox} mt-3`}>
                    <div>
                        <CiViewList />
                        <Heading title={"Year-to-Date Summary"} />
                    </div>
                </div>
                <Table
                    className='antdCustomeTable mt-2'
                    columns={columnsYear}
                    dataSource={dataYear}
                    pagination={false}
                />

                {/* DOWNLOAD PDF TABLE ====================== */}
                <div className={`${style.headerBox} mt-3`}>
                    <div>
                        <FaFileAlt />
                        <Heading title={"Actions"} />
                    </div>
                </div>
                <Table
                    className='antdCustomeTable mt-2 my-5'
                    columns={columnsActions}
                    dataSource={dataActions}
                    pagination={false}
                />
            </div>
        </>
    )
}

export default PaySlip