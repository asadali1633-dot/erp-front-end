import React, { useState } from 'react'
import { Table } from 'antd';
import style from './Quotation.module.css'
import Heading from '../../../Components/Heading/Heading';
import { SearchBar } from '../../../Components/SearchBar/SearchBar';
import { OutLineButton } from '../../../Components/Button/Button';
import QuotationForm from './Forms/QuotationForm';

function Quotation() {
    const [QuotationModal, setQuotationModal] = useState(false)

    const columns = [
        {
            title: "Name",
            dataIndex: "Name",
        },
        {
            title: "Purchase Order",
            dataIndex: "Purchase_Order",
        },
        {
            title: "Amount",
            dataIndex: "Amount",
        },
        {
            title: "Vendor Name",
            dataIndex: "Vendor_Name",
        },
        {
            title: "Date",
            dataIndex: "Date",
        },
        {
            title: "Due date",
            dataIndex: "Due_date",
        },
        {
            title: "Activity status",
            dataIndex: "Activity_status"
        },
        // {
        //     title: "Status",
        //     dataIndex: "Status",
        //     render : (Priority) =>
        //         Priority == "Close" ? 
        //         <span 
        //             className='customer_payment_status'
        //             style={{background: "#ff0004"}}
        //         >{Priority}</span> :
        //         Priority == "Open" ? 
        //         <span
        //              className='customer_payment_status'
        //              style={{background: "#12da65"}}
        //         >{Priority}</span> : false
        // },
    ];

    const data = [
        {
            key: "1",
            Name: "Computer is slow",
            Purchase_Order: "PO-ITC-11102212",
            Amount: "100,000",
            Vendor_Name: "Microtech",
            Date: "27 Feb 2025",
            Due_date: "27 Feb 2025",
            Activity_status: "Last reply Asad",
            // Status: "Open"
        },
        {
            key: "2",
            Name: "Computer is slow",
            Purchase_Order: "PO-ITC-11102212",
            Amount: "100,000",
            Vendor_Name: "Microtech",
            Date: "27 Feb 2025",
            Due_date: "27 Feb 2025",
            Activity_status: "Last reply Asad ",
            // Status: "Close"
        },
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log("selectedRowKeys:", selectedRowKeys, "selectedRows:", selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === "Disabled User",
            name: record.name,
        }),
    };
    const handle = () => {
        setQuotationModal(!QuotationModal)
    }


    return (
        <>
            <div className={`${style.PurchaseOrder_TabTableBox}`}>
                <div className={`${style.PurchaseOrder_tableHeader}`}>
                    <Heading title={"Quotation"} />
                    <div className={`${style.PurchaseOrder_tableHeaderFlex}`}>
                        <SearchBar
                            className={"mx-2"}
                            placeholder={"Search"}
                        />
                        <OutLineButton title={"Create Quotation"} onClick={handle} />
                    </div>
                </div>
                <Table
                    className='antdCustomeTable'
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                />
            </div>

            {QuotationModal && (
                <QuotationForm {...{ QuotationModal, setQuotationModal }} />
            )}
        </>
    )
}

export default Quotation