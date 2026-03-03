import React, { useState } from 'react'
import style from './password.module.css'
import Heading from '../../Components/Heading/Heading'
import { connect, useDispatch } from "react-redux";
import { message } from 'antd';
import * as ACTIONS from "../../store/action/ForgotPassword/index";
import { Form } from 'antd';
import { Button } from '../../Components/Button/Button';
import { FormPasswordInput } from '../../Components/Inputs/Inputs';
import { MdOutlineScreenLockRotation as Lock } from "react-icons/md";
import { useWatch } from "antd/es/form/Form";
import PasswordGenerator from '../PasswordGenerator/PasswordGenerator';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import { setStep } from '../../store/action/auth';
import { STEPS } from '../../Routes/stepCookie';



function Password({
    Red_ForgotPassord,
    ForgotPasswordCall
}) {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setloading] = useState(false);
    const password = useWatch("new_password", form) || "";
    const cpassword = useWatch("confirm_password", form) || "";
    const navigate = useNavigate();
    const rules = {
        length: password.length >= 8,
        upper: /[A-Z]/.test(password),
        lower: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password),
    };
    const isValidPassword = Object.values(rules).every(Boolean);
    const getRuleClass = (rule) => {
        if (password.length === 0) return style.default;
        return rule ? style.green : style.red;
    };

    const getStrength = () => {
        if (!password) return "";
        const score = Object.values(rules).filter(Boolean).length;
        if (score <= 2) return "Weak";
        if (score === 3 || score === 4) return "Medium";
        if (score === 5) return "Strong";
    };

    const getStrengthClass = () => {
        const strength = getStrength();
        if (strength === "Weak") return style.weak;
        if (strength === "Medium") return style.medium;
        if (strength === "Strong") return style.strong;
        return "";
    };

    const handleSubmit = async (values) => {
        const payload = {
            email:  Cookies.get("forgot_email"),
            new_password:  values.new_password,
            domain: Cookies.get("domain"),
        }
        setloading(true);
        const isCheck = await ForgotPasswordCall(payload);
        if (isCheck?.success) {
            Cookies.remove("forgot_email");
            Cookies.remove("forgot_indentify");
            Cookies.remove("user_email");
            messageApi.success(isCheck?.message);
            dispatch(setStep(STEPS.LOGIN));
            setTimeout(() => {
                navigate("/");
            }, 3000);
        } else {
            messageApi.error(isCheck?.message);
        }
        setloading(false);
    };



    return (
        <section className={style.pwd_section}>
            {contextHolder}
            <div className={style.pwd_box}>
                <span className={style.lockBox}>
                    <Lock />
                </span>
                <Heading className="mt-2" title="Change Your Password" />
                <Form
                    form={form}
                    className={style.form_modalMainBox}
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    <div className={style.form_inputBox}>
                        <FormPasswordInput
                            className="mx-1"
                            name="new_password"
                            placeholder="New Password"
                            required={true}
                            type={"password"}
                            message={"Please Enter a New Password"}
                            eye={true}
                        />
                        <FormPasswordInput
                            className="mx-1"
                            name="confirm_password"
                            placeholder="Confirm Password"
                            required={true}
                            type={"password"}
                            message={"Please Enter a Confirm Password"}
                            eye={true}
                        />
                        {password.length > 0 && (
                            <p className={getStrengthClass()}>{getStrength()}</p>
                        )}
                        <PasswordGenerator className={style.password_generator}
                            onGenerate={(generatedPassword) => {
                                form.setFieldsValue({
                                    new_password: generatedPassword,
                                    confirm_password: generatedPassword,
                                });
                            }}
                        />
                    </div>

                    <div className={style.password_rules}>
                        <p>Password Requirements:</p>
                        <ul>
                            <li className={getRuleClass(rules.length)}>
                                Minimum 8 characters
                            </li>

                            <li className={getRuleClass(rules.upper)}>
                                At least one uppercase letter
                            </li>

                            <li className={getRuleClass(rules.lower)}>
                                At least one lowercase letter
                            </li>

                            <li className={getRuleClass(rules.number)}>
                                At least one number
                            </li>

                            <li className={getRuleClass(rules.special)}>
                                At least one special character
                            </li>
                        </ul>
                        {password.length > 0 && Object.values(rules).some(rule => !rule) && (
                            <p style={{ color: "red" }}>
                                Password does not meet all requirements.
                            </p>
                        )}
                    </div>
                    <Button 
                        type="submit" 
                        title={"Change"} 
                        loading={loading}
                        disabled={
                            !isValidPassword ||          
                            password !== cpassword
                        }
                    />
                </Form>
            </div>
        </section>
    )
}

function mapStateToProps({ Red_ForgotPassord }) {
    return { Red_ForgotPassord };
}
export default connect(mapStateToProps, ACTIONS)(Password);