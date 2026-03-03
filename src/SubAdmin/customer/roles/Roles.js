import React, { useEffect, useState } from "react";
import style from './form.module.css'
import { Form, message, Modal } from 'antd';
import { useSelector } from "react-redux";
import { FormInput } from "../../../Components/Inputs/Inputs";
import * as ACTIONS from "../../../store/action/role/index";
import { Button } from "../../../Components/Button/Button";
import { connect } from "react-redux";


const Roles = ({
    role,
    setRole,
    CreateRoleFun,
    GetAllRoles,
}) => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const accessToken = useSelector((state) => state.Red_Auth.accessToken);
    const [loading, setloading] = useState(false);
    const handleOk = () => {
        setRole(false);
    };
    const handleCancel = () => {
        setRole(false);
    };

    const handleSubmit = async (values) => {
        setloading(true);
        const isCheck = await CreateRoleFun(values, accessToken);
        if (isCheck?.success) {
            messageApi.success({
                type: "success",
                content: isCheck?.message,
            });
            GetAllRoles(accessToken)
            setloading(false);
            setRole(false);
        } else {
            setloading(false);
            messageApi.error({
                type: "error",
                content: isCheck?.message,
            });
        }
    };

    useEffect(() => {
        GetAllRoles(accessToken)
    }, [])
    


    return (
        <>
            {contextHolder}
            <Modal
                title=""
                closable={{ 'aria-label': 'Custom Close Button' }}
                className='modalBgColor'
                open={role}
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
                    <h5 className="mx-1">Roles</h5>
                    <div className={`${style.inputBox}`}>
                        <FormInput
                            className="mx-1"
                            name="roles"
                            placeholder="Please Enter a role"
                            required={true}
                            message={"Please Enter a role"}
                        />
                    </div>
                    <Button type="submit" className={"mt-2"} title={loading ? "Loading" : "Create"} loading={loading} />
                </Form>
            </Modal>
        </>
    )
};

function mapStateToProps({ Red_Role }) {
    return { Red_Role };
}
export default connect(mapStateToProps, ACTIONS)(Roles);