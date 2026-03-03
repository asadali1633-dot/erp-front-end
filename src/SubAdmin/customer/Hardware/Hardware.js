import React, { useEffect, useState } from 'react'
import { message, Space, Table } from 'antd';
import style from './hardware.module.css'
import Heading from '../../../Components/Heading/Heading';
import { SearchBar } from '../../../Components/SearchBar/SearchBar';
import { OutLineButton } from '../../../Components/Button/Button';
import HardwareForm from './Forms/HardwareForm';
import * as ACTIONS from "../../../store/action/hardware/index";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { Popconfirm } from 'antd';
import { MdDeleteOutline } from 'react-icons/md';
import { BiEditAlt } from "react-icons/bi";
import ChosenType from './Forms/ChosenType';
import Loader from '../../../Components/Loader/Loader';
import Laptop_desktop from './Forms/Laptop_desktop';
import ServerForm from './Forms/ServerForm';
import Tablet_Phone from './Forms/Tablet_Phone';
import CarForm from './Forms/Car'
import FurnitureOfficeAssets from './Forms/FurnitureOfficeAssets';
import Bikecycle from './Forms/Bikecycle';
import NetworkDevice from './Forms/NetworkDevice';


function Hardware({
    Red_Assets,
    GetAllHardware,
    DeleteHardware,
    HardwareGetByid
}) {

    const accessToken = useSelector((state) => state.Red_Auth.accessToken);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [choseType,setChoseType] = useState(false)
    const [assetsType,setAssetsType] = useState(null)
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const EditAssetsData =  Red_Assets?.HardwareSingleData?.[0]?.data
    const otherItems = ["Keyboard", "Mouse", "Monitor"];
    const lap_desk = ["Laptop", "Desktop"];
    const server = ["Server"];
    const Network = ["Network_Device"];
    const Car = ["Car"];
    const Furniture = ["Furniture"]
    const motorBike = ["Bicycle"]
    const tablet_phone = ["Tablet","Phone"]

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
            title: "id",
            dataIndex: "id",
             render: (data) =>
                data ? <span>{data+1}</span>:<span>-</span>
        },
        {
            title: "Name",
            dataIndex: "name",
            render: (data) =>
                data ? <span>{data}</span>:<span>-</span>
        },
        {
            title: "Asset Tag",
            dataIndex: "asset_tag",
            render: (data) =>
                data ? <span>{data}</span>:<span>-</span>
        },
        {
            title: "Asset Type",
            dataIndex: "category_name",
            render: (data) =>
                data ? <span>{data}</span>:<span>-</span>
        },
        {
            title: "Assigned to",
            key: "assigned_to",
            render: (data) =>
                data ? <span>{data?.employee_name || data?.super_admin_name}</span>:<span>-</span>
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

    const rowSelection = {
        selectedRowKeys,
        onChange: (keys) => setSelectedRowKeys(keys),
    };

    const handle = () => {
        setChoseType(!choseType)
    }

    const UserAction = (id) => {
        setCode({
            mode: "Edit",
            code: id
        });
        setLoading(true);
        HardwareGetByid(id, accessToken);
    };



    const handleConfirmDelete = async (id) => {
        messageApi.loading({
            type: 'loading',
            content: "Please wait a moment",
        });
        const isCheck = await DeleteHardware(id, accessToken);
        if (isCheck?.success) {
            messageApi.success({
                type: 'success',
                content: isCheck?.message,
            });
            setTimeout(() => {
                GetAllHardware(pagBody, accessToken);
            }, 1000);
        } else {
            messageApi.error({
                type: 'error',
                content: isCheck?.message,
            });
        }
    };
    
    useEffect(() => {
        const editData = Red_Assets?.HardwareSingleData?.[0]?.data;
        if (editData && code?.mode === "Edit" && loading) {
            setAssetsType(editData?.category_name);
            setLoading(false);
        }
    }, [Red_Assets?.HardwareSingleData, code, loading]);
    useEffect(() => {
        GetAllHardware(pagBody, accessToken);
    }, [pagination.current, pagination.pageSize, search]);

    return (
        <>
            {contextHolder}
            <div className={`${style.hardware_TabTableBox}`}>
                <div className={`${style.hardware_tableHeader}`}>
                    <div className={`${style.hardware_headFlex}`}>
                        <Heading title={"Hardware"} />
                        {selectedRowKeys.length > 0 && (
                            <Popconfirm
                                title={`Delete ${selectedRowKeys.length} selected hardware(s)?`}
                                onConfirm={() => handleConfirmDelete(selectedRowKeys)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <button className={`${style.hardware_deleteBtn}`}><MdDeleteOutline /></button>
                            </Popconfirm>
                        )}
                    </div>
                    <div className={`${style.hardware_tableHeaderFlex}`}>
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
                    dataSource={Red_Assets?.hardwareData?.[0]?.data.map((item) => ({
                        ...item,
                        key: item.id,
                    }))}
                    loading={Red_Assets?.loading}
                    scroll={{ x: 10 }}
                    pagination={{
                        current: pagination.current,
                        pageSize: pagination.pageSize,
                        total: Red_Assets?.hardwareData?.[0]?.total || 0,
                        showSizeChanger: true,
                        pageSizeOptions: ["5", "10", "20", "50", "100"],
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} users`,
                        onChange: (page, pageSize) => {
                            setPagination({ current: page, pageSize });
                        },
                    }}
                />
            </div>

            {
                choseType && (
                    <ChosenType {...{
                            choseType,
                            setChoseType,
                            setCode,
                            code,
                            pagBody,
                        }}
                    />
                ) 
            }
            {loading && <Loader />}
            {!loading && lap_desk.includes(assetsType) && (
                <Laptop_desktop {...{setCode, code, pagBody,assetsType,setAssetsType,EditAssetsData}}/>
            )}
            {!loading && tablet_phone.includes(assetsType) && (
                <Tablet_Phone {...{setCode, code, pagBody,assetsType,setAssetsType,EditAssetsData}}/>
            )}
            {!loading && server.includes(assetsType) && (
                <ServerForm {...{setCode, code, pagBody,assetsType,setAssetsType,EditAssetsData}}/>
            )}
            {!loading && Car.includes(assetsType) && (
                <CarForm {...{setCode, code, pagBody,assetsType,setAssetsType,EditAssetsData}}/>
            )}
            {!loading && Furniture.includes(assetsType) && (
                <FurnitureOfficeAssets {...{setCode, code, pagBody,assetsType,setAssetsType,EditAssetsData}}/>
            )}
            {!loading && motorBike.includes(assetsType) && (
                <Bikecycle {...{setCode, code, pagBody,assetsType,setAssetsType,EditAssetsData}}/>
            )}
            {!loading && Network.includes(assetsType) && (
                <NetworkDevice {...{setCode, code, pagBody,assetsType,setAssetsType,EditAssetsData}}/>
            )}
            
        </>
    )
}

function mapStateToProps({ Red_Assets }) {
    return { Red_Assets };
}
export default connect(mapStateToProps, ACTIONS)(Hardware);