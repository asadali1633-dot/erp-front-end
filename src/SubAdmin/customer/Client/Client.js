import React, { useEffect, useState } from 'react'
import { message, Modal, Popconfirm, Space, Table } from 'antd';
import style from './Client.module.css'
import Heading from '../../../Components/Heading/Heading';
import { SearchBar } from '../../../Components/SearchBar/SearchBar';
import { OutLineButton } from '../../../Components/Button/Button';
import ClientForm from './Forms/ClientForm';
import * as ACTIONS from '../../../store/action/clients/index';
import { connect, useSelector } from 'react-redux';
import { BiEditAlt } from "react-icons/bi";
import Loader from '../../../Components/Loader/Loader';
import FileView from './Forms/FileView';
import { RiDeleteBin6Line } from "react-icons/ri";

function Client({
    Red_Clients,
    GetAllClientithPage,
    getClientById,
    deleteClients
}) {
    const accessToken = useSelector((state) => state.Red_Auth.accessToken);
    const [ClientModalForm, setClientForm] = useState(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const tableData = Red_Clients?.GetAllClient?.[0]
    const editData = Red_Clients?.SingleClient
    const [loading, setLoading] = useState(false)
    const [fileModal, setFileModal] = useState(null);
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
            title: 'Docs',
            key: 'Docs',
            render: (data) => (
                <Space size="middle">
                    <button className="editTableButton"
                        onClick={() => fileActions(data?.id, data)}><BiEditAlt /></button>
                </Space>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (data) => (
                <Space size="middle">
                    <button className="editTableButton"
                        onClick={() => UserAction(data?.id)}><BiEditAlt /></button>
                    <Popconfirm
                        title="Delete the Client"
                        description="Are you sure to delete the Client?"
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

    const fileActions = async (id, data) => {
        setLoading(true);
        try {
            await getClientById(id, accessToken);
            setCode({
                mode: "Edit",
                code: id
            });
            let attachmentsArray = [];
            let msaDocArray = [];
            let taxCertArray = [];
            if (data.attachments) {
                try {
                    let parsed = typeof data.attachments === 'string'
                        ? JSON.parse(data.attachments)
                        : data.attachments;
                    if (Array.isArray(parsed)) {
                        attachmentsArray = parsed;
                    } else if (typeof parsed === 'string' && parsed.trim()) {
                        attachmentsArray = [parsed];
                    }
                } catch (e) {
                    if (data.attachments.trim()) attachmentsArray = [data.attachments];
                }
            }
            if (data.msa_document && data.msa_document.trim()) {
                msaDocArray = [data.msa_document];
            }
            if (data.tax_exemption_certificate && data.tax_exemption_certificate.trim()) {
                taxCertArray = [data.tax_exemption_certificate];
            }
            setFileModal({
                attachments: attachmentsArray,
                msa_document: msaDocArray,
                tax_exemption_certificate: taxCertArray
            });

        } catch (error) {
            console.error("Error fetching client:", error);
        } finally {
            setLoading(false);
        }
    };
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
        selectedRowKeys,
        onChange: (keys) => setSelectedRowKeys(keys),
    };

    const handleConfirmDelete = async (id) => {
        messageApi.loading({
            type: 'loading',
            content: "Please wait a moment",
        });
        const isCheck = await deleteClients(id, accessToken);
        if (isCheck?.success) {
            messageApi.success({
                type: 'success',
                content: isCheck?.message,
            });
            GetAllClientithPage(pageBody, accessToken);
        } else {
            messageApi.error({
                type: 'error',
                content: isCheck?.message,
            });
        }
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
                    <div className={`${style.headFlex}`}>
                        <Heading title={"Client"} />
                        {selectedRowKeys.length > 0 && (
                            <Popconfirm
                                title={`Delete ${selectedRowKeys.length} selected Client(s)?`}
                                onConfirm={() => handleConfirmDelete(selectedRowKeys)}
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
                <ClientForm {...{ ClientModalForm, setClientForm, code, setCode, pageBody, editData }} />
            )}
            {fileModal && (
                <FileView {...{ fileModal, setFileModal, code, pageBody }} />
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