import React, { useEffect, useState } from 'react'
import { message, Space, Table } from 'antd';
import style from './Client.module.css'
import Heading from '../../../Components/Heading/Heading';
import { SearchBar } from '../../../Components/SearchBar/SearchBar';
import { OutLineButton } from '../../../Components/Button/Button';
import ClientForm from './Forms/ClientForm';
import * as ACTIONS  from '../../../store/action/clients/index';
import { connect, useSelector } from 'react-redux';

function Client({
    Red_Clients,
    GetAllClientithPage
}) {
    const accessToken = useSelector((state) => state.Red_Auth.accessToken);
    const [ClientModalForm, setClientForm] = useState(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const tableData = Red_Clients?.GetAllClient?.[0]
    const [search, setSearch] = useState("");
    const [code, setCode] = useState({
        mode: "",
        code: null
    })

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });
    const pageBody = {
        page: pagination.current || 1,
        pageSize: pagination.pageSize || 10,
        search: search || "",
    };

    const columns = [
        {
            title: "SN",
            key: "SN",
            render: (_, __, index) => (  
                <span>{index + 1}</span>
            )
        },
        {
            title: "client_code",
            dataIndex: "client_code",
            render: (data) =>
                data ? <span>{data}</span> : <span>-</span>
        },
        {
            title: "Client Type",
            dataIndex: "client_type",
            render: (data) =>
                data ? <span>{data}</span> : <span>-</span>
        },
        {
            title: "Company Name",
            dataIndex: "company_name",
            render: (data) =>
                data ? <span>{data}</span> : <span>-</span>
        },
        {
            title: "Trading Name",
            dataIndex: "trading_name",
            render: (data) =>
                data ? <span>{data}</span> : <span>-</span>
        },
        {
            title: "Billing Country",
            dataIndex: "billing_country",
            render: (data) =>
                data ? <span>{data}</span> : <span>-</span>
        },
        {
            title: "Billing City",
            dataIndex: "billing_city",
            render: (data) =>
                data ? <span>{data}</span> : <span>-</span>
        },
        {
            title: "status",
            dataIndex: "status",
            render: (data) =>
                data ? <span>{data}</span> : <span>-</span>
        },
        {
            title: 'Action',
            key: 'action',
            render: (data) => (
                <Space size="middle">
                    
                </Space>
            ),
        },
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
            // console.log("selectedRowKeys:", selectedRowKeys, "selectedRows:", selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === "Disabled User",
            name: record.name,
        }),
    };
    const handle = () => {
        setClientForm(!ClientModalForm)
    }
    useEffect(() => {
        GetAllClientithPage(pageBody, accessToken);
    }, [pagination.current, pagination.pageSize, search]);

    console.log("Red_Clients",Red_Clients)


    return (
        <>
            {contextHolder}
            <div className={`${style.PurchaseOrder_TabTableBox}`}>
                <div className={`${style.PurchaseOrder_tableHeader}`}>
                    <Heading title={"Client"} />
                    <div className={`${style.PurchaseOrder_tableHeaderFlex}`}>
                        <SearchBar
                            className={"mx-2"}
                            placeholder={"Search"}
                        />
                        <OutLineButton title={"Create Client"} onClick={handle} />
                    </div>
                </div>
                {/* <Table
                    className='antdCustomeTable'
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                /> */}
                <Table
                    className='antdCustomeTable'
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={tableData?.data?.map((item) => ({
                        ...item,
                        key: item.id,
                    }))}
                    loading={Red_Clients?.loading}
                    scroll={{ x: 10 }}
                    pagination={{
                        current: pagination.current,
                        pageSize: pagination.pageSize,
                        total: tableData?.total || 0,
                        showSizeChanger: true,
                        pageSizeOptions: ["5", "10", "20", "50", "100"],
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} users`,
                        onChange: (page, pageSize) => {
                            setPagination({ current: page, pageSize });
                        },
                    }}
                />
            </div>

            {setClientForm && (
                <ClientForm {...{ ClientModalForm, setClientForm,code, setCode }} />
            )}
        </>
    )
}

function mapStateToProps(state) {
    return {
        Red_Clients: state.Red_Clients,

    };
}
const AllActions = {
    ...ACTIONS,
};
export default connect(mapStateToProps, AllActions)(Client);