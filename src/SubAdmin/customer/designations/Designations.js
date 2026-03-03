import React, { useEffect, useState } from "react";
import style from './form.module.css'
import { Form, message, Modal } from 'antd';
import { useSelector } from "react-redux";
import { FormInput } from "../../../Components/Inputs/Inputs";
import * as ACTIONS from "../../../store/action/designations/index";
import { Button } from "../../../Components/Button/Button";
import { connect } from "react-redux";


const Designations = ({
    designation,
    setDesignation,
    CreateDesignationFun,
    GetAllDesignations,
}) => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const accessToken = useSelector((state) => state.Red_Auth.accessToken);
    const [loading, setloading] = useState(false);
    const handleOk = () => {
        setDesignation(false);
    };
    const handleCancel = () => {
        setDesignation(false);
    };

    const handleSubmit = async (values) => {
        setloading(true);
        const isCheck = await CreateDesignationFun(values, accessToken);
        if (isCheck?.success) {
            messageApi.success({
                type: "success",
                content: isCheck?.message,
            });
            GetAllDesignations(accessToken)
            setloading(false);
            setDesignation(false);
        } else {
            setloading(false);
            messageApi.error({
                type: "error",
                content: isCheck?.message,
            });
        }
    };

    useEffect(() => {
        GetAllDesignations(accessToken)
    }, [])
    


    return (
        <>
            {contextHolder}
            <Modal
                title=""
                closable={{ 'aria-label': 'Custom Close Button' }}
                className='modalBgColor'
                open={designation}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    form={form}
                    className={style.form_modalMainBox}
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    <h5 className="mx-1">Designations</h5>
                    <div className={`${style.inputBox}`}>
                        <FormInput
                            className="mx-1"
                            name="designation"
                            placeholder="Please Enter a Designations"
                            required={true}
                            message={"Please Enter a Designations"}
                        />
                    </div>
                    <Button type="submit" className={"mt-2"} title={loading ? "Loading" : "Create"} loading={loading} />
                </Form>
            </Modal>
        </>
    )
};

function mapStateToProps({ Red_Designations }) {
    return { Red_Designations };
}
export default connect(mapStateToProps, ACTIONS)(Designations);