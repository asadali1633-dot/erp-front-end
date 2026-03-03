import React, { useEffect, useState } from 'react'
import { FormInput } from '../../../../../../Components/Inputs/Inputs'
import style from '../empPersonalForm.module.css'
import { FaAddressBook } from "react-icons/fa6";
import Heading from '../../../../../../Components/Heading/Heading';
import { Form, message, Modal, Space } from 'antd';
import { Button, OutLineButton } from '../../../../../../Components/Button/Button';
import * as QUA_ACTIONS from "../../../../../../store/action/qualification/index";
import * as EMP_ACTIONS from "../../../../../../store/action/emp/index"
import { Table } from 'antd';
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import UploadFile from '../../../../../../Components/File/UploadFile';
import CustomDate from '../../../../../../Components/Date/CustomDate';
import { BiEditAlt } from "react-icons/bi";
import PdfIcon from '../../../../../../Components/PdfIcon/index'
import baseUrl from '../../../../../../config.json'
import { Country, State, City } from "country-state-city";
import { SelectInput } from '../../../../../../Components/Select/Select';


function Qualification({
    Red_Qualification,
    Red_Emp,

    SuperAdminCreateQualification,
    getSuperAdminQua,
    getSuperAdminQuaById,
    SuperAdminUpdateQua,
    // =======================
    EmployeeCreateQua,
    getMyQua,
    getQuaById,
    EmployeeUpdateQua
}) {
    const [messageApi, contextHolder] = message.useMessage();
    const accessToken = useSelector((state) => state.Red_Auth.accessToken);
    const empData = Red_Emp?.GetUserLoginTime?.[0]?.data
    const selectId = empData?.id

    const quadata = 
    empData?.user_type === "Super_admin" ?
    Red_Qualification?.superAdminQuaData?.[0]?.data :
    Red_Qualification?.QuaMyData?.[0]?.data

    const oneQua = 
    empData?.user_type === "Super_admin" ? 
    Red_Qualification?.SinglesuperAdminQuaData?.[0]?.data :
    Red_Qualification?.QuaSingleData?.[0]?.data

    const [form] = Form.useForm();
    const [modal, setmodal] = useState(false)
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
            title: "Certification (No)",
            dataIndex: "certification_no",
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
            title: "Completed Date",
            dataIndex: "completed_date",
            render: (data) =>
                data ? <span>{data?.slice(0,10)}</span> : <span>-</span>
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
        setmodal(true)
        setCode({
            mode: "Edit",
            code: id
        })
        if (empData?.user_type === "Super_admin") {
            await getSuperAdminQuaById(id,accessToken);
        } else {
            await getQuaById(id,accessToken);
        }
    }

    const setValues = () => {
        const Data = oneQua;
        if (Data) {
            form.setFieldsValue({
                ...Data,
                file: Data?.certificate_file
            });
        }
    }

    const handleQualification = async (values) => {
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
            const isCheck = await SuperAdminCreateQualification(formData, accessToken);
            if (isCheck?.success) {
                messageApi.success(isCheck?.message);
                getSuperAdminQua(accessToken);
            } else {
                messageApi.error(isCheck?.message);
            }
        }else{
            formData.append("user_id", selectId)
            const isCheck = await EmployeeCreateQua(formData, accessToken);
            if (isCheck?.success) {
                messageApi.success(isCheck?.message);
                getMyQua(selectId,accessToken);
            } else {
                messageApi.error(isCheck?.message);
            }
        }
        setloading(false);
    };

    const handleUpdateQualification = async (values) => {
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
            const isCheck = await SuperAdminUpdateQua(code.code,formData, accessToken);
            if (isCheck?.success) {
                messageApi.success(isCheck?.message);
                getSuperAdminQua(accessToken);
            } else {
                messageApi.error(isCheck?.message);
            }
        }else{
            const isCheck = await EmployeeUpdateQua(code.code,formData, accessToken);
            if (isCheck?.success) {
                messageApi.success(isCheck?.message);
                getMyQua(selectId,accessToken);
            } else {
                messageApi.error(isCheck?.message);
            }
        }
        setloading(false);
    };


    const handleCancel = () => {
        setmodal(false);
        form.resetFields();
        setCode({
            mode: "",
            code: null
        })
    };

    const handleOk = () => {
        setmodal(false);
        setCode({
            mode: "",
            code: null
        })
    };

    useEffect(() => {
        if (code?.mode === "Edit") {
            setValues();
        } else {
            form.resetFields();
        }
    }, [oneQua, code?.mode]);


    const typeRecognize = async () => {
        if (empData?.user_type === "Super_admin") {
            await getSuperAdminQua(accessToken);
        } else {
            await getMyQua(selectId,accessToken);
        }
    }

    useEffect(() => {
        typeRecognize()
    }, [accessToken])

    return (
        <>
            {contextHolder}
            <div>
                <div className={style.headerBox}>
                    <div>
                        <FaAddressBook />
                        <Heading title={"Qualification"} />
                    </div>
                    <Button title={"Add"} add={true} className={"w-auto"} onClick={() => { setmodal(true) }} />
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
                            code.mode == "Edit" ? handleUpdateQualification: handleQualification 
                        }
                    >
                        <Heading title={"Add Qualification"} />
                        <div className={style.emp_inputbox}>
                            <FormInput
                                label={"Certification | license (No)"}
                                className={"mx-1 inputFlexBox"}
                                className2={"w-25"}
                                name="certification_no"
                                placeholder="Certification | license (No)"
                                message="Please Enter a Certification or license (No)"
                                required={true}
                            />
                            <FormInput
                                label={"Institute Name"}
                                className={"mx-1 inputFlexBox"}
                                name="institute_name"
                                placeholder="Institute Name"
                                message="Please Enter a Institute Name"
                                required={true}
                            />
                        </div>
                        <div className={style.emp_inputbox}>
                            <CustomDate
                                label="Completed Date"
                                className="mx-1 inputFlexBox"
                                name="completed_date"
                                placeholder="Completed Date"
                                message="Please Enter Completed Date"
                                allowToday
                                required
                            />
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
                        </div>
                        <div className={`${style.emp_inputbox} mt-2`}>
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
                            <Button title={"Save"} type={"submit"} loading={loading} />
                        </div>

                    </Form>
                </Modal>
                <div className='mt-2'>
                    <Table
                        className='antdCustomeTable antdEducationTable'
                        columns={columns}
                        dataSource={quadata}
                        pagination={false}
                        loading={Red_Qualification?.loading}
                    />
                </div>
            </div>
        </>
    )
}



function mapStateToProps(state) {
    return {
        Red_Qualification: state.Red_Qualification,
        Red_Emp: state.Red_Emp,
    };
}
const AllActions = {
    ...EMP_ACTIONS,
    ...QUA_ACTIONS,
};
export default connect(mapStateToProps, AllActions)(Qualification);