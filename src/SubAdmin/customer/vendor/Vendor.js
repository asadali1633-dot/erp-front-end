import React, { useEffect, useState } from 'react'
import { Popconfirm, Space, Table,message } from 'antd';
import style from './vendor.module.css'
import Heading from '../../../Components/Heading/Heading';
import { SearchBar } from '../../../Components/SearchBar/SearchBar';
import { OutLineButton } from '../../../Components/Button/Button';
import VendorForm from './Forms/VendorForm';
import * as ACTIONS from '../../../store/action/vendors/index';
import { connect, useSelector } from 'react-redux';
import Loader from '../../../Components/Loader/Loader';
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";


function Vendor({
    GetAllVendorWithPage,
    Red_Vendors,
    getVendorById,
    deleteVendors
}) {
    const accessToken = useSelector((state) => state.Red_Auth.accessToken);
    const tableData = Red_Vendors?.VendorListWithPage?.[0]
    const editData = Red_Vendors?.VendorSingle
    const [VendorsForm, setVendorsForm] = useState(false)
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setloading] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
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


    const handle = () => {
        setloading(true);
        setVendorsForm(!VendorsForm)
        setTimeout(() => {
            setloading(false);
        }, 1000);
    }

    const columns = [
        {
            title: "SN",
            key: "SN",
            render: (_, __, index) => (
                <span>{index + 1}</span>
            )
        },
        {
            title: "Vendor Type",
            dataIndex: "vendor_type",
            render: (data) =>
                data ? <span>{data}</span> : <span>-</span>
        },
        {
            title: "Vendor Code",
            dataIndex: "vendor_code",
            render: (data) =>
                data ? <span>{data}</span> : <span>-</span>
        },
        {
            title: "Compamy Name",
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
            title: "Trading Name",
            dataIndex: "trading_name",
            render: (data) =>
                data ? <span>{data}</span> : <span>-</span>
        },
        {
            title: "Preferred Vendor",
            dataIndex: "preferred_vendor",
            render: (data) =>
                data == 1 ? <span>{"Yes"}</span> : data == 0 ? "No" : "-"
        },
        {
            title: "Rating",
            dataIndex: "performance_rating",
            render: (data) =>
                data ? <span>{data}</span> : <span>-</span>
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (data) =>
                data ? <span>{data}</span> : <span>-</span>
        },
        {
            title: "Currency",
            dataIndex: "currency_preference",
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
            title: 'Action',
            key: 'action',
            render: (data) => (
                <Space size="middle">
                    <button className="editTableButton"
                        onClick={() => UserAction(data?.id)}><BiEditAlt /></button>
                    <Popconfirm
                        title="Delete the Vendor"
                        description="Are you sure to delete the Vendor?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => {
                            handleConfirmDelete(data?.id)
                        }}
                    >
                        <RiDeleteBin6Line className='deleteTableButton' style={{ color: "red" }} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: (keys) => setSelectedRowKeys(keys),
    };

    const UserAction = async (id) => {
        setloading(true);
        try {
            await getVendorById(id, accessToken);
            setCode({
                mode: "Edit",
                code: id
            });
            setVendorsForm(true);
        } catch (error) {
            console.error("Error fetching client:", error);
        } finally {
            setloading(false);
        }
    };

    const handleConfirmDelete = async (id) => {
        messageApi.loading({
            type: 'loading',
            content: "Please wait a moment",
        });
        const isCheck = await deleteVendors(id, accessToken);
        if (isCheck?.success) {
            messageApi.success({
                type: 'success',
                content: isCheck?.message,
            });
            GetAllVendorWithPage(pageBody, accessToken);
        } else {
            messageApi.error({
                type: 'error',
                content: isCheck?.message,
            });
        }
    };


    useEffect(() => {
        GetAllVendorWithPage(pageBody, accessToken);
    }, [pagination.current, pagination.pageSize, search]);


    return (
        <>
            {contextHolder}
            <div className={`${style.vendor_TabTableBox}`}>
                <div className={`${style.vendor_tableHeader}`}>
                    <div className={`${style.headFlex}`}>
                        <Heading title={"Vendor"} />
                        {selectedRowKeys.length > 0 && (
                            <Popconfirm
                                title={`Delete ${selectedRowKeys.length} selected Vendor(s)?`}
                                onConfirm={() => handleConfirmDelete(selectedRowKeys)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <RiDeleteBin6Line className='deleteTableButton' style={{ color: "red" }} />
                            </Popconfirm>
                        )}
                    </div>
                    <div className={`${style.vendor_tableHeaderFlex}`}>
                        <SearchBar
                            className={"mx-2"}
                            placeholder={"Search"}
                            onChange={(e) => { setSearch(e.target.value) }}
                        />
                        <OutLineButton title={"Create Vendor"} onClick={handle} />
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
                    loading={Red_Vendors?.loading}
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
            {VendorsForm && (
                <VendorForm {...{ VendorsForm, setVendorsForm, code, setCode, editData, pageBody }} />
            )}
        </>
    )
}


function mapStateToProps(state) {
    return {
        Red_Vendors: state.Red_Vendors,

    };
}
const AllActions = {
    ...ACTIONS,
};
export default connect(mapStateToProps, AllActions)(Vendor);