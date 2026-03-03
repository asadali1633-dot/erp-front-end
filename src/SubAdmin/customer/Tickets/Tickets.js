import React, { useEffect, useState } from 'react'
import { message, Table } from 'antd';
import style from './Tickets.module.css'
import Heading from '../../../Components/Heading/Heading';
import { SearchBar } from '../../../Components/SearchBar/SearchBar';
import { OutLineButton } from '../../../Components/Button/Button';
import TicketForm from './Forms/TicketForm';
import * as ACTIONS from "../../../store/action/Tickets/index";
import { connect } from "react-redux"
import { useSelector } from "react-redux";

function Tickets({
    Red_Tickets,
    GetAllTickets,
}) {
    const accessToken = useSelector((state) => state.Red_Auth.accessToken);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [TicketsForm, setTicketForm] = useState(false)
    const [search, setSearch] = useState("");
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });
    const pagBody = {
        page: pagination.current,
        pageSize: pagination.pageSize,
        search: search || "",
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
        },
        {
            title: "Account Name",
            dataIndex: "account_name",
            render: (data) =>
                data ? <span>{data}</span>:<span>-</span>
        },
        {
            title: "Ticket Owner",
            dataIndex: "account_name",
            render: (data) =>
                data ? <span>{data}</span>:<span>-</span>
        },
        {
            title: "Subject",
            dataIndex: "subject",
            render: (data) =>
                data ? <span>{data}</span>:<span>-</span>
        },
        {
            title: "Description",
            dataIndex: "description",
            render: (data) =>
                data ? <span>{data}</span>:<span>-</span>
        },
        {
            title: "Email",
            dataIndex: "email",
            render: (data) =>
                data ? <span title={data}>{data.slice(0,10)}...</span>:<span>-</span>
        },
        {
            title: "Priority",
            dataIndex: "priority",
            render: (data) =>
                data == "High" ? 
                <span 
                    className='customer_payment_status'
                    style={{ background: "#ff0004" }}
                >{data}</span>:
                data == "Normal" || "Low"?
                <span 
                    className='customer_payment_status'
                    style={{ background: "#12da65" }}
                >{data}</span> : <span>-</span>
        },
        {
            title: "Activity status",
            dataIndex: "status",
            render: (data) =>
                data ? 
                <span  
                    className='customer_payment_status' 
                    style={{ background: "#12da65" }}
                >{data}</span> :
                <span>-</span>
        },
        {
            title: "Reply",
            dataIndex: "Reply",
            render: (data) =>
                data ? <span>{data}</span>:<span>-</span>
        },
        {
            title: "Created at",
            dataIndex: "created_at",
            render: (data) =>
                data ? <span title={data}>{data.slice(0,10)}</span>:<span>-</span>
        },
        {
            title: "Updated at",
            dataIndex: "updated_at",
            render: (data) =>
                data ? <span title={data}>{data.slice(0,10)}</span>:<span>-</span>
        },
    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: (keys) => setSelectedRowKeys(keys),
    };
    const handle = () => {
        setTicketForm(!TicketsForm)
    }

    useEffect(() => {
        GetAllTickets(pagBody, accessToken);
    }, [pagination.current, pagination.pageSize, search]);


    console.log("Red_Tickets",Red_Tickets)

    return (
        <>
            {contextHolder}
            <div className={`${style.tickets_TabTableBox}`}>
                <div className={`${style.tickets_tableHeader}`}>
                    <Heading title={"Tickets"} />
                    <div className={`${style.tickets_tableHeaderFlex}`}>
                        <SearchBar
                            className={"mx-2"}
                            placeholder={"Search"}
                        />
                        <OutLineButton title={"Create Ticket"} onClick={handle} />
                    </div>
                </div>
                <Table
                    className='antdCustomeTable'
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={Red_Tickets?.Tickets_Data?.[0]?.tickets?.map((item) => ({
                        ...item,
                        key: item.id,
                    }))}
                    loading={Red_Tickets?.loading}
                    scroll={{ x: 10 }}
                    pagination={{
                        current: pagination.current,
                        pageSize: pagination.pageSize,
                        total: Red_Tickets?.Tickets_Data?.[0]?.total || 0,
                        showSizeChanger: true,
                        pageSizeOptions: ["5", "10", "20", "50", "100"],
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} users`,
                        onChange: (page, pageSize) => {
                            setPagination({ current: page, pageSize });
                        },
                    }}
                />
            </div>

            {TicketsForm && (
                <TicketForm {...{ TicketsForm, setTicketForm, pagBody }} />
            )}
        </>
    )
}

function mapStateToProps({ Red_Tickets }) {
    return { Red_Tickets };
}
export default connect(mapStateToProps, ACTIONS)(Tickets);