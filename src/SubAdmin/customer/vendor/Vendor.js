import React, { useState } from 'react'
import { Table } from 'antd';
import style from './vendor.module.css'
import Heading from '../../../Components/Heading/Heading';
import { SearchBar } from '../../../Components/SearchBar/SearchBar';
import { OutLineButton } from '../../../Components/Button/Button';
import VendorForm from './Forms/VendorForm';

function Vendor() {
    const [VendorsForm, setVendorsForm] = useState(false)

    const columns = [
        {
            title: "Name",
            dataIndex: "Name",
        },
        {
            title: "Vendor #",
            dataIndex: "Vendor",
        },
        {
            title: "City",
            dataIndex: "City",
        },
        {
            title: "Phone",
            dataIndex: "Phone",
        },
        {
            title: "State",
            dataIndex: "State",
        },
        {
            title: "Contact Email",
            dataIndex: "Contact_Email",
        },
        {
            title: "Status",
            dataIndex: "Status",
            render: (Priority) =>
                Priority == "Blacklist" ?
                    <span
                        className='customer_payment_status'
                        style={{ background: "#ff0004" }}
                    >{Priority}</span> :
                    Priority == "Approved" ?
                        <span
                            className='customer_payment_status'
                            style={{ background: "#12da65" }}
                        >{Priority}</span> : false
        },
    ];

    const data = [
        {
            key: "1",
            Name: "Microtech",
            Vendor: "VD-110=00234",
            City: "Karachi",
            Phone: "0300*******",
            State: "Sindh",
            Contact_Email: "info@microtech.net",
            Status: "Approved",
        },
        {
            key: "2",
            Name: "Microtech",
            Vendor: "VD-110=00234",
            City: "Karachi",
            Phone: "0300*******",
            State: "Sindh",
            Contact_Email: "info@microtech.net",
            Status: "Blacklist",
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
        setVendorsForm(!VendorsForm)
    }


    return (
        <>
            <div className={`${style.vendor_TabTableBox}`}>
                <div className={`${style.vendor_tableHeader}`}>
                    <Heading title={"Vendor"} />
                    <div className={`${style.vendor_tableHeaderFlex}`}>
                        <SearchBar
                            className={"mx-2"}
                            placeholder={"Search"}
                        />
                        <OutLineButton title={"Create Vendor"} onClick={handle} />
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

            {VendorsForm && (
                <VendorForm {...{ VendorsForm, setVendorsForm }} />
            )}
        </>
    )
}

export default Vendor