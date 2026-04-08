import React, { useEffect, useState } from 'react'
import { Popconfirm, Space, Table } from 'antd';
import style from './Invoice.module.css'
import Heading from '../../../Components/Heading/Heading';
import { SearchBar } from '../../../Components/SearchBar/SearchBar';
import { OutLineButton } from '../../../Components/Button/Button';
import InvoiceForm from './Forms/InvoiceForm';
import * as INVOICE_ACTIONS from "../../../store/action/invoice/index";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";
import { connect, useSelector } from 'react-redux';
import Loader from '../../../Components/Loader/Loader';

function Invoice({
    Red_Invoice,
    GetAllInVoiceWithPage,
    getInvoiceById
}) {
    const [InvoiceModal, setInvoiceModal] = useState(false)
    const accessToken = useSelector((state) => state.Red_Auth.accessToken);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const tableData = Red_Invoice?.getAllDataWithPage?.[0]
    const editData = Red_Invoice?.getSingleData?.[0]?.data
    const [loading, setLoading] = useState(false)
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
            title: "Customer Name",
            dataIndex: "customer_name",
            render: (data) =>
                data ? <span>{data}</span> : <span>-</span>
        },
        {
            title: "Invoice Date",
            dataIndex: "invoice_date",
            render: (data) =>
                data ? <span>{data?.slice(0,10)}</span> : <span>-</span>
        },
        {
            title: "Due Date",
            dataIndex: "due_date",
            render: (data) =>
                data ? <span>{data?.slice(0,10)}</span> : <span>-</span>
        },
        {
            title: "Currency",
            dataIndex: "currency",
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
            title: "Total Amount",
            dataIndex: "total_amount",
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
                        title="Delete the Invoice"
                        description="Are you sure to delete the Invoice?"
                        okText="Yes"
                        cancelText="No"
                        // onConfirm={() => {
                        //     handleConfirmDelete(data?.id)
                        // }}
                    >
                        <RiDeleteBin6Line className='deleteTableButton' style={{ color: "red" }} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];


    const handle = () => {
        setLoading(true);
        setInvoiceModal(!InvoiceModal)
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: (keys) => setSelectedRowKeys(keys),
    };
    

    const UserAction = async (id) => {
        setLoading(true);
        try {
            await getInvoiceById(id, accessToken);
            setCode({
                mode: "Edit",
                code: id
            });
            setInvoiceModal(true);
        } catch (error) {
            console.error("Error fetching client:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        GetAllInVoiceWithPage(pageBody, accessToken);
    }, [pagination.current, pagination.pageSize, search]);


    return (
        <>
            <div className={`${style.PurchaseOrder_TabTableBox}`}>
                <div className={`${style.PurchaseOrder_tableHeader}`}>
                    <div className={`${style.headFlex}`}>
                        <Heading title={"Invoice"} />
                        {selectedRowKeys.length > 0 && (
                            <Popconfirm
                                title={`Delete ${selectedRowKeys.length} selected Client(s)?`}
                                // onConfirm={() => handleConfirmDelete(selectedRowKeys)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <RiDeleteBin6Line className='deleteTableButton' style={{ color: "red" }} />
                            </Popconfirm>
                        )}
                    </div>
                    <div className={`${style.PurchaseOrder_tableHeaderFlex}`}>
                        <SearchBar
                            className={"mx-2"}
                            placeholder={"Search"}
                        />
                        <OutLineButton title={"Create Invoice"} onClick={handle} />
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
                    loading={Red_Invoice?.loading}
                    scroll={{ x: 10 }}
                    pagination={{
                        current: pagination.current,
                        pageSize: pagination.pageSize,
                        total: tableData?.data?.total || 0,
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
            {InvoiceModal && (
                <InvoiceForm {...{ InvoiceModal, setInvoiceModal,code, setCode,pageBody,editData }} />
            )}
        </>
    )
}


function mapStateToProps(state) {
    return {
        Red_Invoice: state.Red_Invoice,
    };
}
const AllActions = {
    ...INVOICE_ACTIONS,
};
export default connect(mapStateToProps, AllActions)(Invoice);