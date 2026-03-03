import React, { useEffect, useState } from 'react'
import style from './form.module.css'
import { Form, Modal } from 'antd';
import { FormInput } from '../../../../Components/Inputs/Inputs';
import { SelectInput } from '../../../../Components/Select/Select';
import { Button } from '../../../../Components/Button/Button';
import * as ACTIONS from "../../../../store/action/software/index";
import { connect } from "react-redux";
import { message } from 'antd';
import { useSelector } from "react-redux";
import { RadioButton } from '../../../../Components/RadioButton';
import CustomDate from '../../../../Components/Date/CustomDate';

function SoftareForm({
    softwareForm,
    setSoftwareForm,
    CreateSoftwareFun,
    SoftwareGetByid,
    Red_Software,
    GetAllSoftware,
    UpdateSoftware,
    code,
    setCode,
    pagBody
}) {
    const accessToken = useSelector((state) => state.Red_Auth.accessToken)
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setloading] = useState(false);
    const [form] = Form.useForm();
    const [Licensetype, setLicensetype] = useState([
        { key: "Perpetual", label: "Perpetual" },
        { key: "Subscription", label: "Subscription" },
        { key: "Open Source", label: "Open Source" },
    ]);
    const [DeploymentMethod, setDeploymentMethod] = useState([
        { key: "Standalone", label: "Standalone" },
        { key: "Server", label: "Server" },
        { key: "Cloud", label: "Cloud" },
    ]);

    const handleSubmit = async (values) => {
        setloading(true);
        const isCheck = await CreateSoftwareFun(values, accessToken);
        if (isCheck?.success) {
            messageApi.success(isCheck?.message);
            form.resetFields();
            setTimeout(() => {
                GetAllSoftware(pagBody, accessToken);
                setSoftwareForm(false);
            }, 2000);
        } else {
            messageApi.error(isCheck?.message);
        }
        setloading(false);
    };

    const handleUpdateSubmit = async (values) => {
        setloading(true);
        const isCheck = await UpdateSoftware(values, accessToken, code?.code);
        if (isCheck?.success) {
            messageApi.success(isCheck?.message);
            form.resetFields();
            setTimeout(() => {
                GetAllSoftware(pagBody, accessToken);
                setSoftwareForm(false);
            }, 2000);
        } else {
            messageApi.error(isCheck?.message);
        }
        setloading(false);
    };

    const FormData = () => {
        if (code?.mode === "Edit") {
            SoftwareGetByid(code?.code, accessToken)
        }
    }
    const setValues = () => {
        const data = Red_Software?.softwareSingle?.[0]?.software;
        if (data) {
            form.setFieldsValue(data);
        }
    }

    const handleOk = () => {
        setSoftwareForm(false);
        setCode({
            mode: "",
            code: null
        })
    };
    const handleCancel = () => {
        setSoftwareForm(false);
        setCode({
            mode: "",
            code: null
        })
    };
    useEffect(() => {
        FormData()
    }, [code, accessToken]);

    useEffect(() => {
        if (code?.mode === "Edit") {
            setValues();
        } else {
            form.resetFields();
        }
    }, [Red_Software?.softwareSingle, code?.mode]);
    return (
        <>
            {contextHolder}
            <Modal
                title=""
                closable={{ 'aria-label': 'Custom Close Button' }}
                className='modalBgColor'
                open={softwareForm}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    className={style.form_modalMainBox}
                    form={form}
                    layout="vertical"
                    onFinish={code?.mode == "Edit" ? handleUpdateSubmit : handleSubmit}
                >
                    <h5 className='mx-1'>New Asset Form Software</h5>
                    <div className={style.form_inputBox}>
                        <FormInput
                            className={`mx-1`}
                            type={"text"}
                            name={"software_name"}
                            placeholder={"Software Name"}
                            message={"Software Name is required"}
                            required={true}
                        />
                        <FormInput
                            className={`mx-1`}
                            type={"text"}
                            name={"package_name"}
                            placeholder={"Package"}
                            message={"Package is required"}
                            required={true}
                        />
                    </div>
                    <div className={`${style.form_inputBox} mt-1`}>
                        <FormInput
                            className={`mx-1`}
                            type={"text"}
                            name={"vendor_name"}
                            placeholder={"Vendor Name"}
                            message={"Vendor is required"}
                            required={true}
                        />
                        <FormInput
                            className={`mx-1`}
                            type={"text"}
                            name={"no_of_license_purchased"}
                            placeholder={"No of License Purchased"}
                            message={"License Purchased is required"}
                            required={true}
                        />
                    </div>
                    <h5 className={`${style.form_checkBoxHeading} mx-1`}>License type</h5>
                    <RadioButton
                        name="license_type"
                        label=""
                        required={true}
                        message="Please select a license type!"
                        className={`${style.form_checkBox} form_checkBox`}
                        options={Licensetype.map((l) => ({ label: l.label, value: l.key }))}
                    />
                    <div className={`${style.form_inputBox} mt-1`}>
                        <CustomDate
                            className={`mx-1`}
                            name={"renewal_date_1"}
                            placeholder={"Renewal Date"}
                            message={"Renewal Date is required"}
                            required={true}
                            allowToday={true}
                        />
                        <CustomDate
                            className={`mx-1`}
                            name={"license_expiry"}
                            placeholder={"License Expiry"}
                            message={"License Expiry is required"}
                            required={true}
                            allowToday={true}
                        />
                    </div>
                    <h5 className={`${style.form_checkBoxHeading} mx-1`}>Deployment Method</h5>
                    <RadioButton
                        name="deployment_method"
                        label=""
                        required={true}
                        message="Please select a deployment method!"
                        className={`${style.form_checkBox} form_checkBox`}
                        options={DeploymentMethod.map((l) => ({ label: l.label, value: l.key }))}
                    />
                    <div className={`${style.form_inputBox} mt-1`}>
                        <FormInput
                            className={`mx-1`}
                            type={"text"}
                            name={"license_cost_per_user"}
                            message={"License cost is required"}
                            placeholder={"License cost per user"}
                            required={true}
                            allowToday={true}
                        />
                        <CustomDate
                            className={`mx-1`}
                            name={"renewal_date_2"}
                            placeholder={"Renewal Date"}
                            message={"Renewal Date is required"}
                            required={true}
                            allowToday={true}
                        />
                    </div>
                    <div className={`${style.form_inputBox} mt-1`}>
                        <FormInput
                            className={`mx-1`}
                            type={"text"}
                            name={"po_number"}
                            placeholder={"PO"}
                            message={"PO is required"}
                            required={true}
                        />
                        <CustomDate
                            className={`mx-1`}
                            name={"record_date"}
                            placeholder={"Date"}
                            message={"Date is required"}
                            required={true}
                            allowToday={true}
                        />
                    </div>
                    <Button type="submit" title={code?.mode == "Edit" ? "Save" : "Create"} loading={loading} />
                </Form>
            </Modal>
        </>
    )
}


function mapStateToProps({ Red_Software }) {
    return { Red_Software };
}
export default connect(mapStateToProps, ACTIONS)(SoftareForm);