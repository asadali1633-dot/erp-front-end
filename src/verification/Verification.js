import React, { useState } from 'react';
import style from './Verification.module.css'
import Heading from '../Components/Heading/Heading'
import { Link } from 'react-router-dom'
import envelope from '../assests/images/icons/envelope.png'
import OtpInput from 'react-otp-input';
import { message } from 'antd';
import { Button } from '../Components/Button/Button';
import StaterHeader from '../Components/StarterHeader/StaterHeader';
import * as ACTIONS from "../store/action/Verification/index";
import { connect,useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { STEPS } from '../Routes/stepCookie';
import { setStep } from '../store/action/auth';

function Verification({
    Red_Verification,
    Verification,
    Verification_check
}) {
    const dispatch = useDispatch();
    let isCheck;
    let decideEmail;
    const accessToken = useSelector((state) => state.Red_Auth.accessToken);
    const [messageApi, contextHolder] = message.useMessage();
    const [loadingApi, contextHolderloading] = message.useMessage();
    const [loading, setloading] = useState(false);
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    const forgot_indentify = Cookies.get("forgot_indentify");
    const user_email = Cookies.get("user_email");
    const forgot_email = Cookies.get("forgot_email");
    const emailToUse = forgot_email ?? user_email;

    const handleOtpSubmit = async (e) => {
        loadingApi.open({
            type: 'loading',
            content: 'Please Wait..',
            duration: 0,
        });
        e.preventDefault();
        const data = {
            email:  !forgot_indentify ? user_email : forgot_email,
            domain : Cookies.get("domain")
        }
        isCheck = await Verification(data)
        if (isCheck?.success) {
            loadingApi.destroy()
            messageApi.success({
                type: 'success',
                content: isCheck?.message,
            });
        } else {
            loadingApi.destroy()
            messageApi.error({
                type: 'error',
                content: isCheck?.message,
            });
        }
    };

    const handleSubmit = async (e) => {
        setloading(true)
        e.preventDefault();
        const data = {
            email: emailToUse,
            otp: otp,
            domain : Cookies.get("domain")
        }
        const isCheck = await Verification_check(data)
        if (isCheck?.success) {
            setloading(false)
            messageApi.success({
                type: 'success',
                content: isCheck?.message,
            });
            if(!forgot_indentify){
                dispatch(setStep(STEPS.SUBSCRIPTIONS));
                setTimeout(() => {
                    navigate("/user-subscription-packages", {replace: true});
                }, 3000);
            }else{
                dispatch(setStep(STEPS.CHANGE_PASSWORD));
                setTimeout(() => {
                    navigate("/changePassword");
                }, 3000);
            }
        } else {
            setloading(false)
            messageApi.error({
                type: 'error',
                content: isCheck?.message,
            });
        }
    };

    return (
        <>
            <StaterHeader />
            {contextHolder}
            {contextHolderloading}

            <section className={style.verification_Section}>
                <div className="container">
                    <div className="row justify-content-center">
                        <form className={style.verification_mainBox} onSubmit={handleSubmit}>
                            <img src={envelope} alt="" />
                            <Heading className="mt-2" title="OTP Sent to Your Registered Email" />
                            <p>
                                A confirmation OTP has been sent to <Link>{emailToUse}</Link> . Please check your inbox and enter the OTP to verify your email address.
                            </p>
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={4}
                                renderInput={(props) => <input {...props} />}
                            />
                            <Button
                                className={"mt-5"}
                                type={"submit"}
                                title={"Submit OTP"}
                                loading={loading}
                            />
                            <p className={style.verification_newRequestOtp}>If you did not receive the OTP, please check your spam folder or
                                <Link onClick={handleOtpSubmit}> request</Link> a new one.
                            </p>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}


function mapStateToProps({ Red_Verification }) {
    return { Red_Verification };
}
export default connect(mapStateToProps, ACTIONS)(Verification)