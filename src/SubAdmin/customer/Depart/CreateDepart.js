import React, { useEffect, useState } from "react";
import style from './form.module.css'
import { Form, message, Modal } from 'antd';
import { useSelector } from "react-redux";
import * as ACTIONS from "../../../store/action/departments";
import { connect } from "react-redux";
import { FormInput } from "../../../Components/Inputs/Inputs";
import { Button } from "../../../Components/Button/Button";


const CreateDepart = ({
    depart,
    setDepart,
    CreateDepartFun,
    GetAllDepartments,
}) => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const accessToken = useSelector((state) => state.Red_Auth.accessToken);
    const [loading, setloading] = useState(false);
    const handleOk = () => {
        setDepart(false);
    };
    const handleCancel = () => {
        setDepart(false);
    };

    const handleSubmit = async (values) => {
        setloading(true);
        const isCheck = await CreateDepartFun(values, accessToken);
        if (isCheck?.success) {
            messageApi.success({
                type: "success",
                content: isCheck?.message,
            });
            GetAllDepartments(accessToken)
            setloading(false);
            setDepart(false);
        } else {
            setloading(false);
            messageApi.error({
                type: "error",
                content: isCheck?.message,
            });
        }
    };

    useEffect(() => {
        GetAllDepartments(accessToken)
    }, [])
    


    return (
        <>
            {contextHolder}
            <Modal
                title=""
                closable={{ 'aria-label': 'Custom Close Button' }}
                className='modalBgColor'
                open={depart}
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
                    <h5 className="mx-1">Department</h5>
                    <div className={`${style.inputBox}`}>
                        <FormInput
                            className="mx-1"
                            name="department"
                            placeholder="Please Enter a department"
                            required={true}
                            message={"Please Enter a department"}
                        />
                    </div>
                    <Button type="submit" className={"mt-2"} title={loading ? "Loading" : "Create"} loading={loading} />
                </Form>
            </Modal>
        </>
    )
};

function mapStateToProps({ Red_Depart }) {
    return { Red_Depart };
}
export default connect(mapStateToProps, ACTIONS)(CreateDepart);