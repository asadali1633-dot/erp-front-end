import React, { useEffect, useState } from 'react'
import { message, Space, Table } from 'antd';
import style from './Client.module.css'
import Heading from '../../../Components/Heading/Heading';
import { SearchBar } from '../../../Components/SearchBar/SearchBar';
import { OutLineButton } from '../../../Components/Button/Button';
import ClientForm from './Forms/ClientForm';
import * as ACTIONS  from '../../../store/action/clients/index';
import { connect, useSelector } from 'react-redux';
import { BiEditAlt } from "react-icons/bi";
import Loader from '../../../Components/Loader/Loader';

function Client({
    Red_Clients,
    GetAllClientithPage,
    getClientById
}) {
    const accessToken = useSelector((state) => state.Red_Auth.accessToken);
    const [ClientModalForm, setClientForm] = useState(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const tableData = Red_Clients?.GetAllClient?.[0]
    const editData = Red_Clients?.SingleClient
    const [loading, setLoading] = useState(false);
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
                    <button className={`${style.hardware_editBtn}`}
                        onClick={() => UserAction(data?.id)}><BiEditAlt /></button>
                    {/* <Popconfirm
                        title="Delete the Hardware"
                        description="Are you sure to delete the Hardware?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => {
                            handleConfirmDelete(data?.id)
                        }}
                    >
                        <button className={`${style.hardware_deleteBtn}`}><MdDeleteOutline /></button>
                    </Popconfirm> */}
                </Space>
            ),
        },
    ];

    const UserAction = async (id) => {
        setLoading(true);
        try {
            await getClientById(id, accessToken);
            setCode({
                mode: "Edit",
                code: id
            });
            setClientForm(true);
        } catch (error) {
            console.error("Error fetching client:", error);
        } finally {
            setLoading(false);
        }
    };
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
        setLoading(true);
        setClientForm(!ClientModalForm)
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }
    useEffect(() => {
        GetAllClientithPage(pageBody, accessToken);
    }, [pagination.current, pagination.pageSize, search]);



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

            {loading && <Loader />}
            {setClientForm && (
                <ClientForm {...{ ClientModalForm, setClientForm,code, setCode,pageBody,editData }} />
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