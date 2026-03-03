import React, { use, useEffect, useState } from 'react'
import { Space, Table } from 'antd';
import style from './list.module.css'
import Heading from '../../../../Components/Heading/Heading';
import { SearchBar } from '../../../../Components/SearchBar/SearchBar';
import { OutLineButton } from '../../../../Components/Button/Button';
import * as EMP_ACTIONS from "../../../../store/action/emp/index";
import { connect } from "react-redux";
import { message } from 'antd';
import { useSelector } from "react-redux";
import { Popconfirm } from 'antd';
import { RiDeleteBinLine } from "react-icons/ri";
import HrPersonalForm from './People-Forms/Hr-form/HrPersonalForm';
import { Tabs, Dropdown } from "antd";
import { Link } from 'react-router-dom';
import Profile from './People-Profile/Profile';
import EditPeople from './People-Forms/EditList/EditPeople';
import Job from './People-Forms/Job/Job';
import Timeoff from './People-Forms/Time_off/Timeoff';
import Info from './Info';


function Personal({
    GetPeopleDataWithPage,
    deleteEmp,
    Red_Emp,
    showPeopleTabs,
    setShowPeopleTabs,
}) {
    const accessToken = useSelector((state) => state.Red_Auth.accessToken);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [search, setSearch] = useState("");
    const tableData = Red_Emp?.EmpData?.[0]?.employees
    const [personalForm, setPersonalForm] = useState(false)
    const [activeTab, setActiveTab] = useState("1");
    const [emptId, setEmpId] = useState(null)

    const [code, setCode] = useState({
        mode: "",
        code: null
    })
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });
    const pageBody = {
        page: pagination.current,
        pageSize: pagination.pageSize,
        search: search || "",
    };

    const columns = [
        {
            title: "Emp Id",
            dataIndex: "emp_id",
            render: (data) =>
                data ? <span>{data}</span> : <span>-</span>
        },
        {
            title: "Name",
            render: (data) =>
                data ? <Link to="" onClick={() => {
                    setShowPeopleTabs(true)
                    setEmpId(data?.id)
                }}
                >{`${data?.first_name} ${data?.last_name}`}</Link> : <span>-</span>
        },
        {
            title: "Email",
            dataIndex: "email",
            render: (data) =>
                data ? <span>{data}</span> : <span>-</span>
        },
        {
            title: "Phone",
            dataIndex: "mobile_number",
            render: (data) =>
                data ? <span>{data}</span> : <span>-</span>
        },
        {
            title: "Whatsapp",
            dataIndex: "whatsapp_number",
            render: (data) =>
                data ? <span>{data}</span> : <span>-</span>
        },
        {
            title: "Role",
            dataIndex: "role_name",
            render: (data) =>
                data ? <span>{data}</span> : <span>-</span>
        },
        {
            title: "Designation",
            dataIndex: "designation_name",
            render: (data) =>
                data ? <span>{data}</span> : <span>-</span>
        },
        {
            title: "Department",
            dataIndex: "department_name",
            render: (data) =>
                data ? <span>{data}</span> : <span>-</span>
        },
        {
            title: 'Action',
            key: 'action',
            render: (data) => (
                <Space size="middle">
                    <Popconfirm
                        title="Delete the Employe"
                        description="Are you sure to delete the Employe?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => {
                            handleConfirmDelete(data?.id)
                        }}
                    >
                        <button className={`${style.pers_deleteBtn}`}><RiDeleteBinLine /></button>
                    </Popconfirm>
                </Space>
            ),
        },


    ];

    const items = [
        {
            key: "1",
            label: "Personal",
            children: <Info {...{emptId}}/>
        },
        {
            key: "2",
            label: "Job",
             children: (
                <div className={style.pers_flexOfEmp}>
                    <div className={style.pers_EmpProfile}>
                        <Profile {...{emptId}}/>
                    </div>
                    <div className={`${style.pers_EmpForm} mx-2 w-100`}>
                        <Job {...{emptId}}/>
                    </div>
                </div>
            )
        },
        {
            key: "3",
            label: "Time off",
             children: (
                <div className={style.pers_flexOfEmp}>
                    <div className={style.pers_EmpProfile}>
                        <Profile {...{emptId}}/>
                    </div>
                    <div className={`${style.pers_EmpForm} mx-2 w-100`}>
                        <Timeoff {...{emptId}}/>
                    </div>
                </div>
            )
        },
        {
            key: "4",
            label: "Pay Info",
            children: "Pay Info",
        },
        {
            key: "5",
            label: "Performance",
            children: "Performance",
        },
        {
            key: "6",
            label: "Time Sheet",
            children: "Time Sheet",
        },
        {
            key: "7",
            label: "Assets",
            children: "Assets",
        },
        {
            key: "8",
            label: "Company",
            children: "Company",
        },
        {
            key: "9",
            label: "Org Chart",
            children: "Org Chat",
        }
    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: (keys) => setSelectedRowKeys(keys),
    };

    const handleConfirmDelete = async (id) => {
        messageApi.loading({
            type: 'loading',
            content: "Please wait a moment",
        });
        const isCheck = await deleteEmp(id, accessToken);
        if (isCheck?.success) {
            messageApi.success({
                type: 'success',
                content: isCheck?.message,
            });
            setTimeout(() => {
                GetPeopleDataWithPage(pageBody, accessToken);
            }, 1000);
        } else {
            messageApi.error({
                type: 'error',
                content: isCheck?.message,
            });
        }
    };
    const handle = () => {
        setPersonalForm(!personalForm)
    }

    useEffect(() => {
        GetPeopleDataWithPage(pageBody, accessToken);
    }, [pagination.current, pagination.pageSize, search,showPeopleTabs]);


    return (
        <>
            {contextHolder}


            {
                showPeopleTabs ?
                    <Tabs
                        activeKey={activeTab}
                        onChange={(key) => setActiveTab(key)}
                        items={items}
                    /> :
                    <div className={`${style.pers_TabTableBox}`}>
                        <div className={`${style.pers_tableHeader}`}>
                            <div className={`${style.pers_headFlex}`}>
                                <Heading title={"Peoples"} />
                                {selectedRowKeys.length > 0 && (
                                    <Popconfirm
                                        title={`Delete ${selectedRowKeys.length} selected Employe(s)?`}
                                        onConfirm={() => handleConfirmDelete(selectedRowKeys)}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <button className={`${style.pers_deleteBtn}`}><RiDeleteBinLine /></button>
                                    </Popconfirm>
                                )}
                            </div>
                            <div className={`${style.pers_tableHeaderFlex}`}>
                                <SearchBar
                                    className="mx-2"
                                    placeholder="Search"
                                    value={search}
                                    onChange={(e) => { setSearch(e.target.value) }}
                                />
                                <OutLineButton title={"Create Employe"} onClick={handle} />
                            </div>
                        </div>
                        <Table
                            className='antdCustomeTable'
                            rowSelection={rowSelection}
                            columns={columns}
                            dataSource={tableData?.map((item) => ({
                                ...item,
                                key: item.id,
                            }))}
                            loading={Red_Emp?.loading}
                            scroll={{ x: 10 }}
                            pagination={{
                                current: pagination.current,
                                pageSize: pagination.pageSize,
                                total: Red_Emp?.EmpData?.[0]?.total || 0,
                                showSizeChanger: true,
                                pageSizeOptions: ["5", "10", "20", "50", "100"],
                                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} users`,
                                onChange: (page, pageSize) => {
                                    setPagination({ current: page, pageSize });
                                },
                            }}
                        />
                    </div>
            }


            {personalForm && (
                <HrPersonalForm {...{ personalForm, setPersonalForm, code, setCode, pageBody }} />
            )}
        </>
    )
}

function mapStateToProps(state) {
    return {
        Red_Emp: state.Red_Emp,

    };
}
const AllActions = {
    ...EMP_ACTIONS,
};
export default connect(mapStateToProps, AllActions)(Personal);