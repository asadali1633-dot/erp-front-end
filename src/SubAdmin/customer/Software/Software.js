import React, { useEffect, useState } from 'react'
import { Popconfirm, Space, Table } from 'antd';
import style from './Software.module.css'
import Heading from '../../../Components/Heading/Heading';
import { SearchBar } from '../../../Components/SearchBar/SearchBar';
import { OutLineButton } from '../../../Components/Button/Button';
import SoftareForm from './Forms/SoftareForm';
import * as ACTIONS from "../../../store/action/software/index";
import { connect } from "react-redux";
import { message } from 'antd';
import { useSelector } from "react-redux";
import { MdDeleteOutline } from 'react-icons/md';
import { BiEditAlt } from "react-icons/bi";

function Software({
    GetAllSoftware,
    Red_Software,
    DeleteSoftware
}) {
    const accessToken = useSelector((state) => state.Red_Auth.accessToken);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [softwareForm, setSoftwareForm] = useState(false)
    const [search, setSearch] = useState("");
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });

    const [code, setCode] = useState({
        mode: "",
        code: null
    })
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
            title: "Name",
            dataIndex: "software_name",
            render: (data) =>
                data ? <span>{data}</span> : <span>-</span>
        },
        {
            title: "Vendor name",
            dataIndex: "vendor_name",
            render: (data) =>
                data ? <span>{data}</span> : <span>-</span>
        },
        {
            title: "Package Name",
            dataIndex: "package_name",
            render: (data) =>
                data ? <span>{data}</span> : <span>-</span>
        },
        {
            title: "License Purchased",
            dataIndex: "no_of_license_purchased",
            render: (data) =>
                data ? <span>{data}</span> : <span>-</span>
        },
        {
            title: "License type",
            dataIndex: "license_type",
            render: (data) =>
                data ? <span>{data}</span> : <span>-</span>
        },
        {
            title: "Renewal Date",
            dataIndex: "renewal_date_1",
            render: (data) =>
                data ? <span>{data?.slice(0, 10)}</span> : <span>-</span>
        },
        {
            title: "License Expiry",
            dataIndex: "license_expiry",
            render: (data) =>
                data ? <span>{data?.slice(0, 10)}</span> : <span>-</span>
        },
        {
            title: "Deployment Method",
            dataIndex: "deployment_method",
            render: (data) =>
                data ? <span>{data}</span> : <span>-</span>
        },
        {
            title: "License cost",
            dataIndex: "license_cost_per_user",
            render: (data) =>
                data ? <span>{data}</span> : <span>-</span>
        },
        {
            title: "Renewal Date",
            dataIndex: "renewal_date_2",
            render: (data) =>
                data ? <span>{data?.slice(0, 10)}</span> : <span>-</span>
        },
        {
            title: "PO Number",
            dataIndex: "po_number",
            render: (data) =>
                data ? <span>{data}</span> : <span>-</span>
        },
        {
            title: "Date",
            dataIndex: "record_date",
            render: (data) =>
                data ? <span>{data?.slice(0, 10)}</span> : <span>-</span>
        },
        {
            title: "Created at",
            dataIndex: "created_at",
            render: (data) =>
                data ? <span>{data?.slice(0, 10)}</span> : <span>-</span>
        },
        {
            title: "Updated at",
            dataIndex: "created_at",
            render: (data) =>
                data ? <span>{data?.slice(0, 10)}</span> : <span>-</span>
        },
        {
            title: 'Action',
            key: 'action',
            render: (data) => (
                <Space size="middle">
                    <button className={`${style.software_editBtn}`}
                        onClick={() => UserAction(data?.id)}><BiEditAlt /></button>
                    <Popconfirm
                        title="Delete the Software"
                        description="Are you sure to delete the Software?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => {
                            handleConfirmDelete(data?.id)
                        }}
                    >
                        <button className={`${style.software_deleteBtn}`}><MdDeleteOutline /></button>
                    </Popconfirm>
                </Space>
            ),
        },

    ];

    const handleConfirmDelete = async (id) => {
        messageApi.loading({
            type: 'loading',
            content: "Please wait a moment",
        });
        const isCheck = await DeleteSoftware(id, accessToken);
        if (isCheck?.success) {
            messageApi.success({
                type: 'success',
                content: isCheck?.message,
            });
            setTimeout(() => {
                GetAllSoftware(pagBody, accessToken);
            }, 1000);
        } else {
            messageApi.error({
                type: 'error',
                content: isCheck?.message,
            });
        }
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: (keys) => setSelectedRowKeys(keys),
    };

    const handle = () => {
        setSoftwareForm(!softwareForm)
    }
    const UserAction = (id) => {
        setSoftwareForm(!softwareForm)
        setCode({
            mode: "Edit",
            code: id
        })
    }


    useEffect(() => {
        GetAllSoftware(pagBody, accessToken);
    }, [pagination.current, pagination.pageSize, search]);


    return (
        <>
        {contextHolder}
            <div className={`${style.software_TabTableBox}`}>
                <div className={`${style.software_tableHeader}`}>
                    <div className={`${style.software_headFlex}`}>
                        <Heading title={"software"} />
                        {selectedRowKeys.length > 0 && (
                            <Popconfirm
                                title={`Delete ${selectedRowKeys.length} selected software(s)?`}
                                onConfirm={() => handleConfirmDelete(selectedRowKeys)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <button className={`${style.software_deleteBtn}`}><MdDeleteOutline /></button>
                            </Popconfirm>
                        )}
                    </div>
                    <div className={`${style.software_tableHeaderFlex}`}>
                        <SearchBar
                            className={"mx-2"}
                            placeholder={"Search"}
                            value={search}
                            onChange={(e) => { setSearch(e.target.value) }}
                        />
                        <OutLineButton title={"Add asset"} onClick={handle} />
                    </div>
                </div>
                <Table
                    className='antdCustomeTable'
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={Red_Software?.softwareData?.[0]?.software?.map((item) => ({
                        ...item,
                        key: item.id,
                    }))}
                    loading={Red_Software?.loading}
                    scroll={{ x: 10 }}
                    pagination={{
                        current: pagination.current,
                        pageSize: pagination.pageSize,
                        total: Red_Software?.softwareData?.[0]?.total || 0,
                        showSizeChanger: true,
                        pageSizeOptions: ["5", "10", "20", "50", "100"],
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} users`,
                        onChange: (page, pageSize) => {
                            setPagination({ current: page, pageSize });
                        },
                    }}
                />
            </div>

            {softwareForm && (
                <SoftareForm {...{ softwareForm, setSoftwareForm, code, setCode, pagBody }} />
            )}
        </>
    )
}


function mapStateToProps({ Red_Software }) {
    return { Red_Software };
}
export default connect(mapStateToProps, ACTIONS)(Software);