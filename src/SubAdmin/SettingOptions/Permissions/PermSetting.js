import React, { useEffect, useState } from 'react';
import style from '../css/perm.module.css'
import * as PERMISSIONS_ACTIONS from "../../../store/action/permission/index";
import { connect } from "react-redux"
import { useSelector } from "react-redux";
import { SearchBar } from '../../../Components/SearchBar/SearchBar';
import Heading from '../../../Components/Heading/Heading';
import { Popconfirm, Space, Table } from 'antd';
import UserImage from '../../../assests/images/personal/user.png'
import { PiTreeViewBold as PermVieIcon } from "react-icons/pi";
import PermModal from './modals/PermModal';
import FilterBox from '../../../Components/Filter/FilterBox';
import { IoIosCloseCircleOutline as Close } from "react-icons/io";



function PermSetting({
    modals, setmodals,
    GetAllPerm,
    Red_Perm
}) {
    const accessToken = useSelector((state) => state.Red_Auth.accessToken);
    const [filters, setFilters] = useState([]);
    const [search, setSearch] = useState("");
    const [permModal, setpermModal] = useState(false)
    const [modulesData, setmodulesData] = useState()
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });
    const pagBody = {
        page: pagination.current,
        pageSize: pagination.pageSize,
        search: search || "",
    };

    const filterOptions = [
        { label: 'Access', value: 'access' },
        { label: 'Denied', value: 'denied' },
    ];


    const columns = [
        {
            title: "Profile",
            dataIndex: "image",
            render: (data) =>
                data ? <img src={data} alt="" /> : <img src={UserImage} alt="" className={style.perm_image} />
        },
        {
            title: "Employe ID",
            dataIndex: "emp_id",
            render: (data) =>
                data ? <span>{data}</span> : <span>-</span>
        },
        {
            title: "Name",
            dataIndex: "name",
            render: (data) =>
                data ? <span>{data?.slice(0, 10)}</span> : <span>-</span>
        },
        {
            title: "Email",
            dataIndex: "email",
            render: (data) =>
                data ? <span title={data}>{data?.slice(0, 10)}...</span> : <span>-</span>
        },
        {
            title: "Gender",
            dataIndex: "gender",
            render: (data) =>
                data ? <span>{data}</span> : <span>-</span>
        },
        {
            title: "Role",
            dataIndex: "role",
            render: (data) =>
                data ? <span>{data?.name}</span> : <span>-</span>
        },
        {
            title: "Designation",
            dataIndex: "designation",
            render: (data) =>
                data ? <span>{data?.name}</span> : <span>-</span>
        },
        {
            title: "Department",
            dataIndex: "department",
            render: (data) =>
                data ? <span>{data?.name}</span> : <span>-</span>
        },
        {
            title: "Access | Denied",
            key: "action",
            render: (data) => (
                <>
                    <button title='click here'
                        onClick={() => { handleData(data) }}
                        className={style.perm_action_view}>
                        <PermVieIcon />
                    </button>
                </>
            )
        }

    ];

    const handleData = (data) => {
        setpermModal(true)
        setmodulesData(data)
    }
    const handleCancel = () => {
        setmodals(false)
    }
    useEffect(() => {
        GetAllPerm(pagBody, accessToken);
    }, [pagination.current, pagination.pageSize, search])

    return (
        <>
            <section className={style.perm_PermissionModal}>
                <div className={style.perm_cencelBtn}>
                    <Close onClick={handleCancel} />
                    <button onClick={handleCancel}>Cancel</button>
                </div>
                <div className={style.perm_searchPanel}>
                    <Heading title={"Permissions"} />
                    <div className={style.perm_searchPanelInput}>
                        <SearchBar
                            className={"mx-2"}
                            placeholder={"Search"}
                            value={search}
                            onChange={(e) => { setSearch(e.target.value) }}
                        />
                        <FilterBox
                            title="Filter"
                            options={filterOptions}
                            value={filters}
                            onChange={(vals) => setFilters(vals)}
                        />

                    </div>
                </div>
                <div className={style.perm_tableBox}>
                    <Table
                        className='antdCustomeTable'
                        columns={columns}
                        dataSource={Red_Perm?.data?.[0]?.employees?.map((item) => ({
                            ...item,
                            key: item.id,
                        }))}
                        loading={Red_Perm?.loading}
                        scroll={{ x: 5 }}
                        pagination={{
                            current: pagination.current,
                            pageSize: pagination.pageSize,
                            total: Red_Perm?.data?.[0]?.total || 0,
                            showSizeChanger: true,
                            pageSizeOptions: ["5", "10", "20", "50", "100"],
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} users`,
                            onChange: (page, pageSize) => {
                                setPagination({ current: page, pageSize });
                            },
                        }}
                    />
                </div>
            </section>

            {
                permModal ?
                    <PermModal {...{ permModal, setpermModal, modulesData, setmodulesData,pagBody }} /> : null
            }
        </>
    )
}


function mapStateToProps(state) {
    return {
        Red_Perm: state.Red_Permission,
    };
}
const AllActions = {
    ...PERMISSIONS_ACTIONS,
};
export default connect(mapStateToProps, AllActions)(PermSetting);
