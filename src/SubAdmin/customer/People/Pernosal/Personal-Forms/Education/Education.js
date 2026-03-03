import React, { useEffect, useState } from 'react'
import { FormInput } from '../../../../../../Components/Inputs/Inputs'
import style from '../empPersonalForm.module.css'
import { CiEdit } from "react-icons/ci";
import { FaAddressBook } from "react-icons/fa6";
import Heading from '../../../../../../Components/Heading/Heading';
import { SelectInput } from '../../../../../../Components/Select/Select';
import { Form, Modal, Space } from 'antd';
import { Button, OutLineButton } from '../../../../../../Components/Button/Button';
import { Table } from 'antd';
import * as EDU_ACTIONS from "../../../../../../store/action/education/index";
import * as EMP_ACTIONS from "../../../../../../store/action/emp/index"
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { BiEditAlt } from "react-icons/bi";
import { message } from 'antd';
import PdfIcon from '../../../../../../Components/PdfIcon/index'
import UploadFile from '../../../../../../Components/File/UploadFile';
import baseUrl from '../../../../../../config.json'
import { Country, State, City } from "country-state-city";


function Education({
    Red_Education,
    Red_Emp,
    // ===============
    SuperAdminCreateEducation,
    getSuperAdminEducation,
    getSuperAdminEducationById,
    SuperAdminUpdateEducation,
    // ========================
    EmployeeCreateEducation,
    getMyEdu,
    getEduById,
    EmployeeUpdateEducation
}) {

    const [messageApi, contextHolder] = message.useMessage();
    const accessToken = useSelector((state) => state.Red_Auth.accessToken);
    const [form] = Form.useForm();
    const empData = Red_Emp?.GetUserLoginTime?.[0]?.data
    
    const edudata = 
    empData?.user_type === "Super_admin" ?
    Red_Education?.SuperAdminEdducationData?.[0]?.data :
    Red_Education?.myEducation?.[0]?.data

    const oneEdu = 
    empData?.user_type === "Super_admin" ?
    Red_Education?.getSuperAdminSingleEducation?.[0]?.data :
    Red_Education?.singleEducation?.[0]?.data

    const selectId = empData?.id
    const [edumodal, setedumodal] = useState(false)
    const [loading, setloading] = useState(false);
    const codes = ["PK", "IN", "US", "AS"];
    let selectedCities = [];
    codes.forEach((code) => {
        const cities = City.getCitiesOfCountry(code);
        selectedCities = [...selectedCities, ...cities];
    });
    const [code, setCode] = useState({
        mode: "",
        code: null
    })


    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            render: (data) =>
                data ? <span>{data}</span> : <span>-</span>
        },
        {
            title: "Institute Name",
            dataIndex: "institute_name",
            render: (data) =>
                data ? <span>{data}</span> : <span>-</span>
        },
        {
            title: "Level",
            dataIndex: "level",
            render: (data) =>
                data ? <span>{data}</span> : <span>-</span>
        },
        {
            title: "Board",
            dataIndex: "board",
            render: (data) =>
                data ? <span>{data}</span> : <span>-</span>
        },
        {
            title: "Completed Year",
            dataIndex: "completed_year",
            render: (data) =>
                data ? <span>{data}</span> : <span>-</span>
        },
        {
            title: "City",
            dataIndex: "city",
            render: (data) =>
                data ? <span>{data}</span> : <span>-</span>
        },
        {
            title: "Certificate (PDF)",
            dataIndex: "certificate_file",
            render: (data) =>
                data ? (
                    <a  href={`${baseUrl.baseUrl}${data}`}
                        target="_blank"
                    > <PdfIcon /></a>
                    ) : (<span>-</span> )
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
        setedumodal(true)
        setCode({
            mode: "Edit",
            code: id
        })
        if (empData?.user_type === "Super_admin") {
            await getSuperAdminEducationById(id,accessToken);
        } else {
            await getEduById(id,accessToken);
        }
    }

    const typeRecognize = async () => {
        if (empData?.user_type === "Super_admin") {
            await getSuperAdminEducation(accessToken);
        } else {
            await getMyEdu(selectId,accessToken);
        }
    }

    const setValues = () => {
        const Data = oneEdu
        if (Data) {
            form.setFieldsValue({
                ...Data,
                 file: Data?.certificate_file
            });
        }
    }

    useEffect(() => {
        if (code?.mode === "Edit") {
            setValues();
        } else {
            form.resetFields();
        }
    }, [oneEdu, code?.mode]);

    useEffect(() => {
        typeRecognize()
    }, [accessToken])


     const handleCancel = () => {
        setedumodal(false);
        form.resetFields();
        setCode({
            mode: "",
            code: null
        })
    };

    const handleOk = () => {
        setedumodal(false);
        setCode({
            mode: "",
            code: null
        })
    };


    const handleEducation = async (values) => {
        const formData = new FormData();
        formData.append("level", values.level);
        formData.append("institute_name", values.institute_name);
        formData.append("board", values.board);
        formData.append("completed_year", values.completed_year);
        formData.append("city", values.city);
        if (values.file?.originFileObj) {
            formData.append("file", values.file.originFileObj);
        }
        setloading(true);
        if(empData.user_type === "Super_admin"){
            const isCheck = await SuperAdminCreateEducation(formData, accessToken);
            if (isCheck?.success) {
                messageApi.success(isCheck?.message);
                getSuperAdminEducation(accessToken);
            } else {
                messageApi.error(isCheck?.message);
            }
        }else{
            formData.append("user_id", selectId)
            const isCheck = await EmployeeCreateEducation(formData, accessToken);
            if (isCheck?.success) {
                messageApi.success(isCheck?.message);
                getMyEdu(selectId,accessToken);
            } else {
                messageApi.error(isCheck?.message);
            }
        }
        setloading(false);
    };

    const handleUpdateEducation = async (values) => {
        const formData = new FormData();
        formData.append("level", values.level);
        formData.append("institute_name", values.institute_name);
        formData.append("board", values.board);
        formData.append("completed_year", values.completed_year);
        formData.append("city", values.city);
        if (values.file?.originFileObj) {
            formData.append("file", values.file.originFileObj);
        }

        setloading(true);
        if(empData.user_type === "Super_admin"){
            const isCheck = await SuperAdminUpdateEducation(code.code,formData, accessToken);
            if (isCheck?.success) {
                messageApi.success(isCheck?.message);
                getSuperAdminEducation(accessToken);
            } else {
                messageApi.error(isCheck?.message);
            }
        }else{
            const isCheck = await EmployeeUpdateEducation(code.code,formData, accessToken);
            if (isCheck?.success) {
                messageApi.success(isCheck?.message);
                getMyEdu(selectId,accessToken);
            } else {
                messageApi.error(isCheck?.message);
            }
        }
        setloading(false);
    };


    return (
        <>
            {contextHolder}
            <div>
                <div className={style.headerBox}>
                    <div>
                        <FaAddressBook />
                        <Heading title={"Education"} />
                    </div>
                    <Button title={"Add"} add={true} className={"w-auto"} onClick={() => { setedumodal(true) }} loading={loading} />
                </div>
                <Modal
                    title=""
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    className='modalBgColor personalFormModal'
                    open={edumodal}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={
                            code.mode == "Edit" ? handleUpdateEducation: handleEducation 
                        }
                    >
                        <Heading title={"Add Education"} />
                        <div className={style.emp_inputbox}>
                            <SelectInput
                                className="mx-1 inputFlexBox"
                                label={"Level"}
                                name="level"
                                placeholder="Select a level"
                                message="Please Select a level"
                                required={true}
                                showSearch={false}
                                options={[
                                    { value: "Matric", label: "Matric" },
                                    { value: "O-level", label: "O-Level" },
                                    { value: "A-level", label: "A-Level" },
                                    { value: "college", label: "College" },
                                    { value: "Intermediate", label: "Intermediate" },
                                    { value: "Bachelor", label: "Bachelor" },
                                    { value: "Master", label: "Master" },
                                    { value: "Diploma", label: "Diploma" },
                                    { value: "PhD", label: "PhD" },
                                    { value: "MPhil", label: "MPhil" },
                                    { value: "Others", label: "Others" },

                                ]}
                            />
                            <FormInput
                                label={"School | College | University"}
                                className={"mx-1 inputFlexBox"}
                                name="institute_name"
                                placeholder="School Name"
                                message="Please Enter a School | College | University"
                                required={true}
                            />
                        </div>
                        <div className={style.emp_inputbox}>
                            <FormInput
                                label={"Board / Examination"}
                                className={"mx-1 inputFlexBox"}
                                name="board"
                                placeholder="Board / Examination"
                                message="Please Enter a Board / Examination"
                                required={true}
                            />
                            <FormInput
                                label={"Completed Year"}
                                className={"mx-1 inputFlexBox"}
                                name="completed_year"
                                placeholder="Completed Year"
                                message={"Please Enter a Completed Year"}
                                required={true}
                            />
                        </div>
                        <div className={`${style.emp_inputbox} mt-2`}>
                            <SelectInput
                                label="City"
                                className="mx-1 inputFlexBox"
                                showSearch={true}
                                name="city"
                                placeholder="City"
                                message={"City is required"}
                                required={true}
                                classNameColor={`${style.inputDefaultBg}`}
                                options={selectedCities?.map((item) => ({
                                    value: `${item.name}`,
                                    label: item.name,
                                }))}
                            />
                            <UploadFile
                                className="mx-1 inputFlexBox"
                                label={"Certificate File"}
                                name="file"
                                title={"File Upload (PDF)"}
                                required={true}
                                multiple={false}
                                accept=".pdf"
                                message={"Please Select a Certificate File"}
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
                        dataSource={edudata}
                        pagination={false}
                        loading={Red_Education?.loading}
                    />
                </div>
            </div>
        </>
    )
}

function mapStateToProps(state) {
    return {
        Red_Education: state.Red_Education,
        Red_Emp: state.Red_Emp,
    };
}
const AllActions = {
    ...EMP_ACTIONS,
    ...EDU_ACTIONS,
};
export default connect(mapStateToProps, AllActions)(Education);