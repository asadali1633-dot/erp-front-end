import React, { useEffect, useState } from 'react'
import { FormInput, FormInputTextArea } from '../../../../../../Components/Inputs/Inputs'
import style from '../empPersonalForm.module.css'
import { FaAddressBook } from "react-icons/fa6";
import Heading from '../../../../../../Components/Heading/Heading';
import { SelectInput } from '../../../../../../Components/Select/Select';
import { Form, message, Modal, Space } from 'antd';
import { Button, OutLineButton } from '../../../../../../Components/Button/Button';
import { Table } from 'antd';
import { useSelector } from 'react-redux';
import { connect } from "react-redux";
import * as EXPER_ACTIONS from "../../../../../../store/action/experiance/index";
import * as EMP_ACTIONS from "../../../../../../store/action/emp/index"
import CustomDate from '../../../../../../Components/Date/CustomDate';
import UploadFile from '../../../../../../Components/File/UploadFile';
import PdfIcon from '../../../../../../Components/PdfIcon/index'
import baseUrl from '../../../../../../config.json'
import { BiEditAlt } from "react-icons/bi";
import { GiClick } from "react-icons/gi";



function Experiance({
    SuperAdminCreateExper,
    getSuperAdminExper,
    getSuperAdminExperById,
    SuperAdminUpdateExper,
    // ====================
    EmployeeCreateExper,
    getMyExper,
    getExperById,
    EmployeeUpdateExper,
    Red_Experiance,
    Red_Emp
}) {
    const [messageApi, contextHolder] = message.useMessage();
    const accessToken = useSelector((state) => state.Red_Auth.accessToken);
    const empData = Red_Emp?.GetUserLoginTime?.[0]?.data

    const experdata = 
    empData?.user_type === "Super_admin" ? 
    Red_Experiance?.SuperAdminExperiance?.[0]?.data :
    Red_Experiance?.getMyExper?.[0]?.data

    const oneExper = 
    empData?.user_type === "Super_admin" ? 
    Red_Experiance?.singleSuperAdminExperiance?.[0]?.data :
    Red_Experiance?.singleExperDataEmp?.[0]?.data

    const selectId = empData?.id
    const [form] = Form.useForm();
    const [modal, setmodal] = useState(false)
    const [loading, setloading] = useState(false);
    const [reasonText,setreasonText] = useState(null)
    const [dutyText,setdutyText] = useState(null)
    const [Working,setWorking] = useState("0")
    const [code, setCode] = useState({
        mode: "",
        code: null
    })


    const columns = [
        {
            title: "SN",
            key: "SN",
            render: (_, __, index) => (  
                <span>{index + 1}</span>
            )
        },
        {
            title: "Company Name",
            dataIndex: "company_name",
            render: (data) =>
                data ? <span>{data}</span> : <span>-</span>
        },
        {
            title: "Industry",
            dataIndex: "industry",
            render: (data) =>
                data ? <span>{data}</span> : <span>-</span>
        },
        {
            title: "Employment Type",
            dataIndex: "employment_type",
            render: (data) =>
                data ? <span>{data}</span> : <span>-</span>
        },
        {
            title: "Designation",
            dataIndex: "job_title",
            render: (data) =>
                data ? <span>{data}</span> : <span>-</span>
        },
        {
            title: "Currently Working",
            dataIndex: "currently_working",
            render: (data) =>
                data === 0 ? <span>{"No"}</span> : <span>{"Yes"}</span>
        },
        {
            title: "Start Date",
            dataIndex: "start_date",
            render: (data) =>
                data ? <span>{data?.slice(0, 10)}</span> : <span>-</span>
        },
        {
            title: "End Date",
            dataIndex: "end_date",
            render: (data) =>
                data ? <span>{data?.slice(0, 10)}</span> : <span>-</span>
        },
        {
            title: "Duty",
            dataIndex: "responsibilities",
            render: (data) =>
                data ? 
                <span 
                    onClick={()=>{setdutyText(data)}} 
                    className={`${style.personal_editBtn}`}
                    >
                        <GiClick/>
                    </span> : 
                <span>-</span>
        },
        {
            title: "Reason For Leaving",
            dataIndex: "reason_for_leaving",
            render: (data) =>
                data ? 
                <span 
                    onClick={()=>{setreasonText(data)}} 
                    className={`${style.personal_editBtn}`}
                    >
                        <GiClick/>
                    </span> : 
                <span>-</span>
        },
        {
            title: "Documents (PDF)",
            dataIndex: "document_file",
            render: (data) =>
                data ? (
                    <a href={`${baseUrl.baseUrl}${data}`}
                        target="_blank"
                    > <PdfIcon /></a>
                ) : (<span>-</span>)
        },
        {
            title: 'Action',
            key: 'action',
            render: (data) => (
                <Space size="middle">
                    <button className={`${style.personal_editBtn}`}
                        onClick={() => UserAction(data?.id)}><BiEditAlt /></button>
                </Space>
            ),
        },
    ];

    const UserAction = async (id) => {
        form.resetFields();
        setmodal(true)
        setCode({
            mode: "Edit",
            code: id
        })
        if (empData?.user_type === "Super_admin") {
            await getSuperAdminExperById(id,accessToken);
        } else {
            await getExperById(id,accessToken);
        }
    }

    const setValues = () => {
        const Data = oneExper;
        console.log("Data",Data)
        if (Data) {
            form.setFieldsValue({
                ...Data,
                file: Data?.document_file,
                start_date: Data?.start_date?.slice(0,10),
                end_date: Data?.end_date?.slice(0,10),
                currently_working: Data?.currently_working === 0 ? "No" : "Yes"

            });
        }
    }

    const handleExperiance = async (values) => {
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
            if (key !== "file") {
                formData.append(key, values[key]);
            }
        });
        if (values.file?.originFileObj) {
            formData.append("file", values.file.originFileObj);
        }
        setloading(true);
         if(empData.user_type === "Super_admin"){
            const isCheck = await SuperAdminCreateExper(formData, accessToken);
            if (isCheck?.success) {
                messageApi.success(isCheck?.message);
                getSuperAdminExper(accessToken);
            } else {
                messageApi.error(isCheck?.message);
            }
        }else{
            formData.append("user_id", selectId)
            const isCheck = await EmployeeCreateExper(formData, accessToken);
            if (isCheck?.success) {
                messageApi.success(isCheck?.message);
                getMyExper(selectId,accessToken);
            } else {
                messageApi.error(isCheck?.message);
            }
        }
        setloading(false);
    };

    const handleUpdateExperiance = async (values) => {
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
            if (key !== "file") {
                formData.append(key, values[key]);
            }
        });
        if (values.file?.originFileObj) {
            formData.append("file", values.file.originFileObj);
        }
        setloading(true);
         if(empData.user_type === "Super_admin"){
            const isCheck = await SuperAdminUpdateExper(code.code,formData, accessToken);
            if (isCheck?.success) {
                messageApi.success(isCheck?.message);
                getSuperAdminExper(accessToken);
            } else {
                messageApi.error(isCheck?.message);
            }
        }else{
            const isCheck = await EmployeeUpdateExper(code.code,formData, accessToken);
            if (isCheck?.success) {
                messageApi.success(isCheck?.message);
                getMyExper(selectId,accessToken);
            } else {
                messageApi.error(isCheck?.message);
            }
        }
        setloading(false);
    };
    

    useEffect(() => {
        if (code?.mode === "Edit") {
            setValues();
        } else {
            form.resetFields();
        }
    }, [oneExper, code?.mode]);

    const typeRecognize = async () => {
        if (empData?.user_type === "Super_admin") {
            await getSuperAdminExper(accessToken);
        } else {
            await getMyExper(selectId,accessToken);
        }
    }

    useEffect(() => {
        typeRecognize()
    }, [accessToken])

    
    const handleCancel = () => {
        setmodal(false);
        setdutyText(null)
        setreasonText(null)
        form.resetFields();
        setCode({
            mode: "",
            code: null
        })
    };

    const handleOk = () => {
        setmodal(false);
        setdutyText(null)
        setreasonText(null)
        form.resetFields();
        setCode({
            mode: "",
            code: null
        })
    };

    return (
        <>
            {contextHolder}
            <div>
                <div className={style.headerBox}>
                    <div>
                        <FaAddressBook />
                        <Heading title={"Job Experiance"} />
                    </div>
                    <Button title={"Add"} add={true} className={"w-auto"} onClick={() => { setmodal(true) }} loading={loading} />
                </div>
                <Modal
                    title=""
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    className='modalBgColor personalFormModal'
                    open={modal}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={
                            code.mode == "Edit" ? handleUpdateExperiance: handleExperiance
                        }
                    >
                        <Heading title={"Job Experiance"} />
                        <div className={style.emp_inputbox}>
                            <FormInput
                                label={"Company Name"}
                                className={"mx-1 inputFlexBox"}
                                className2={"w-25"}
                                name="company_name"
                                placeholder="Company Name"
                                message="Please Enter a Company Name"
                                required={true}
                            />
                            <SelectInput
                                className="mx-1 inputFlexBox"
                                label={"Industry"}
                                name="industry"
                                placeholder="Select a Industry"
                                message="Please Select a Industry"
                                showSearch={false}
                                required={true}
                                options={[
                                    { value: "IT", label: "IT" },
                                    { value: "Banking", label: "Banking" },
                                    { value: "Education", label: "Education" },
                                    { value: "Manufacturing", label: "Manufacturing" },
                                    { value: "others", label: "others" },
                                ]}
                            />
                        </div>
                        <div className={style.emp_inputbox}>
                            <FormInput
                                label={"Job Title | Designation"}
                                className={"mx-1 inputFlexBox"}
                                className2={"w-25"}
                                name="job_title"
                                placeholder="Job Title | Designation"
                                message="Please Enter a Job Title or Designation"
                                required={true}
                            />
                            <SelectInput
                                className="mx-1 inputFlexBox"
                                label={"Employment Type"}
                                name="employment_type"
                                placeholder="Select a Employment Type"
                                message="Please Select a Employment Type"
                                showSearch={false}
                                required={true}
                                options={[
                                    { value: "Full-time", label: "Full-time" },
                                    { value: "Part-time", label: "Part-time" },
                                    { value: "Contract", label: "Contract" },
                                    { value: "Internship", label: "Internship" },
                                    { value: "Freelance", label: "Freelance" },

                                ]}
                            />
                        </div>
                        <div className={style.emp_inputbox}>
                            <CustomDate
                                label="Start Date"
                                className="mx-1 inputFlexBox"
                                name="start_date"
                                placeholder="Start Date"
                                message="Please Select a Start Date"
                                allowToday
                                required
                            />
                             <SelectInput
                                className="mx-1 inputFlexBox"
                                label={"Currently Working"}
                                name="currently_working"
                                placeholder="Currently Working"
                                message="Please Select a Currently Working"
                                required={true}
                                showSearch={false}
                                onChange={(value) => setWorking(value)}
                                options={[
                                    { value: "1", label: "Yes" },
                                    { value: "0", label: "No" },
                                ]}
                            />
                        </div>
                        <div className={style.emp_inputbox}>
                            {Working === "0" && (
                                <CustomDate
                                    label="End Date"
                                    className="mx-1 inputFlexBox"
                                    name="end_date"
                                    placeholder="End Date"
                                    message="Please Select a End Date"
                                    allowToday
                                    required
                                />
                            )}
                            <UploadFile
                                className="mx-1 inputFlexBox"
                                label={"Documents"}
                                name="file"
                                title={"Documents Upload (PDF)"}
                                required={true}
                                multiple={false}
                                accept=".pdf"
                                message={"Please Select a Documents"}
                            />
                        </div>
                        <div className={style.emp_inputbox}>
                            <FormInputTextArea
                                label={"Responsibilities"}
                                type="text"
                                className={"mx-1"}
                                name="responsibilities"
                                placeholder="Enter Responsibilities"
                                required={true}
                                message={"Enter Responsibilities is required"}
                            />
                        </div>
                        <div className={style.emp_inputbox}>
                            <FormInputTextArea
                                label={"Reason for Leaving"}
                                type="text"
                                className={"mx-1"}
                                name="reason_for_leaving"
                                placeholder="Enter Reason for Leaving"
                                required={true}
                                message={"Enter Reason for Leaving is required"}
                            />
                        </div>
                        <div className={`${style.emp_buttonBox} mt-2`}>
                            <Button title={"Save"} type={"submit"} className={"mx-1"} loading={loading} />
                        </div>

                    </Form>
                </Modal>
                
                <div className='mt-2'>
                    <Table
                        className='antdCustomeTable antdEducationTable'
                        columns={columns}
                        dataSource={experdata}
                        pagination={false}
                        loading={Red_Experiance?.loading}
                    />
                </div>
            </div>

            <Modal
                title=""
                closable={{ 'aria-label': 'Custom Close Button' }}
                className='modalBgColor'
                open={reasonText}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <Heading title={"Reason For Leaving"} />
               <div className={style.simpleTextModal}>
                    <p>
                        {reasonText}
                    </p>
               </div>
            </Modal>

            <Modal
                title=""
                closable={{ 'aria-label': 'Custom Close Button' }}
                className='modalBgColor'
                open={dutyText}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <Heading title={"Responsibilities"} />
               <div className={style.simpleTextModal}>
                    <p>
                        {dutyText}
                    </p>
               </div>
            </Modal>
        </>
    )
}

function mapStateToProps(state) {
    return {
        Red_Experiance: state.Red_Experiance,
        Red_Emp: state.Red_Emp,
    };
}
const AllActions = {
    ...EMP_ACTIONS,
    ...EXPER_ACTIONS,
};
export default connect(mapStateToProps, AllActions)(Experiance);