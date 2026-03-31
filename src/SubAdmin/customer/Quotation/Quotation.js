import React, { useEffect, useState } from 'react'
import { Space, Table } from 'antd';
import style from './Quotation.module.css'
import Heading from '../../../Components/Heading/Heading';
import { SearchBar } from '../../../Components/SearchBar/SearchBar';
import { OutLineButton } from '../../../Components/Button/Button';
import QuotationForm from './Forms/QuotationForm';
import { connect, useSelector } from 'react-redux';
import * as QUOTE_ACTIONS from "../../../store/action/quote/index";
import { BiEditAlt } from "react-icons/bi";
import Loader from '../../../Components/Loader/Loader';

function Quotation({
    Red_Quote,
    GetAllQuotewithPage,
    getQuoteById
}) {
    const accessToken = useSelector((state) => state.Red_Auth.accessToken);
    const tableData = Red_Quote?.getAllDataWithPage?.[0]
    const editData = Red_Quote?.GetByIdData
    const [QuotationModal, setQuotationModal] = useState(false)
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
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
            title: "Quote No",
            dataIndex: "quotation_number",
            render: (data) =>
                data ? <span>{data}</span> : <span>-</span>
        },
        {
            title: "Customer Name",
            dataIndex: "customer_name",
            render: (data) =>
                data ? <span>{data}</span> : <span>-</span>
        },
        {
            title: "Revision Number",
            dataIndex: "revision_number",
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
            dataIndex: "currency",
            render: (data) =>
                data ? <span>{data}</span> : <span>-</span>
        },
        {
            title: "Payment Terms",
            dataIndex: "payment_terms",
            render: (data) =>
                data ? <span>{data}</span> : <span>-</span>
        },
        {
            title: "Quote Date",
            dataIndex: "quote_date",
            render: (data) =>
                data ? <span>{data?.slice(0,10)}</span> : <span>-</span>
        },
        {
            title: "Valid Until",
            dataIndex: "valid_until",
            render: (data) =>
                data ? <span>{data?.slice(0,10)}</span> : <span>-</span>
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
            await getQuoteById(id, accessToken);
            setCode({
                mode: "Edit",
                code: id
            });
            setQuotationModal(true);
        } catch (error) {
            console.error("Error fetching client:", error);
        } finally {
            setLoading(false);
        }
    };

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

    useEffect(() => {
        GetAllQuotewithPage(pageBody, accessToken);
    }, [pagination.current, pagination.pageSize, search]);


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
                    loading={Red_Quote?.loading}
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
            {QuotationModal && (
                <QuotationForm {...{
                    QuotationModal,
                    setQuotationModal, code, setCode,
                    QuotationModal, setQuotationModal,
                    pageBody,
                    editData
                }} />
            )}
        </>
    )
}


function mapStateToProps(state) {
    return {
        Red_Quote: state.Red_Quote,
    };
}
const AllActions = {
    ...QUOTE_ACTIONS,
};
export default connect(mapStateToProps, AllActions)(Quotation);