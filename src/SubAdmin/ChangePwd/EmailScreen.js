import React, { useState } from 'react'
import Cookies from "js-cookie";
import style from './password.module.css'
import Heading from '../../Components/Heading/Heading'
import { connect, useDispatch, useSelector } from "react-redux";
import { message } from 'antd';
import { Form } from 'antd';
import { Button } from '../../Components/Button/Button';
import { FormInput } from '../../Components/Inputs/Inputs';
import * as ACTIONS from "../../store/action/ForgotPassword/index";
import { MdMarkEmailUnread } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { setStep } from '../../store/action/auth';
import { STEPS } from '../../Routes/stepCookie';



function EmailScreen({
    Red_ForgotPassord,
    EmailCall
}) {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const accessToken = useSelector((state) => state.Red_Auth.accessToken);
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (values) => {
        setloading(true);
        const isCheck = await EmailCall(values);
        if (isCheck?.success) {
            Cookies.set("forgot_email", values?.email, { expires: 1 })
            Cookies.set("forgot_indentify", "forgot_indentify", { expires: 1 })
            messageApi.success(isCheck?.message);
            dispatch(setStep(STEPS.OTP));
             setTimeout(() => {
                navigate("/user-verification");
            }, 3000);
        } else {
            messageApi.error(isCheck?.message);
        }
        setloading(false);
    };
    return (
        <>
        {contextHolder}
            <section className={style.pwd_section}>
                <div className={style.pwd_box}>
                    <span>
                        <MdMarkEmailUnread />
                    </span>
                    <Heading 
                        className="mt-2 text-left" 
                        classNameColor={`${style.headingColorDefault}`}
                        title="Enter Your Email For Password" 
                    />
                    <Form
                        form={form}
                        className={style.form_modalMainBox}
                        layout="vertical"
                        onFinish={handleSubmit}
                    >
                        <div className={style.form_inputBox}>
                            <FormInput
                                classNameColor={`${style.inputDefaultBg}`}
                                className="mx-1"
                                type="text"
                                name="domain"
                                placeholder="Enter Your Domain"
                                required={true}
                                message={"Domain is required for login"}
                            />
                            <FormInput
                                className="mt-2 mx-1"
                                name="email"
                                classNameColor={`${style.inputDefaultBg}`}
                                placeholder="Enter Your Email"
                                required={true}
                                type={"email"}
                                message={"Please Enter Your Email"}
                            />
                        </div>
                        <Button type="submit" className={"mt-2 mx-1"} title={loading ? "Loading" : "Submit"} loading={loading} />
                    </Form>
                </div>
            </section>
        </>
    )
}

function mapStateToProps({ Red_ForgotPassord }) {
    return { Red_ForgotPassord };
}
export default connect(mapStateToProps, ACTIONS)(EmailScreen);