import React, { useState } from 'react'
import style from './userModule.module.css'
import Heading from '../Components/Heading/Heading'
import { FormInput, FormPasswordInput, SuffixEmail } from '../Components/Inputs/Inputs'
import { Link, replace, useNavigate } from 'react-router-dom'
import { Button } from '../Components/Button/Button'
import squreBox from '../assests/images/Usermodule/squreBox.png'
import { AiOutlineYoutube } from "react-icons/ai";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { message, Form } from 'antd';
import * as ACTIONS from "../store/action/signup/index";
import { connect, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { clearStepCookie, STEPS } from '../Routes/stepCookie'
import logo from '../assests/images/logo.png'
import bg from '../assests/images/Usermodule/bg.png'
import { setAccessToken, setStep } from '../store/action/auth'
import { Country, State, City } from "country-state-city";
import { SelectInput } from '../Components/Select/Select'
import UploadFile from '../Components/File/UploadFile'
import { CLEAR_STEP } from '../store/action/types'

function SignUp({
    setModule,
    Red_SignUp,
    SignUp
}) {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();
    const countries = Country.getAllCountries();
    const codes = ["PK", "IN", "US", "AS"];
    const provinces = codes.flatMap((code) => State.getStatesOfCountry(code));
    const [domain, setDomain] = useState("");
    let selectedCities = [];
    codes.forEach((code) => {
        const cities = City.getCitiesOfCountry(code);
        selectedCities = [...selectedCities, ...cities];
    });

    const handleSubmit = async (values) => {
        setloading(true);
        // ${domain}
        const finalEmail = `${values.email}`;
        const formData = new FormData();
         if (values.password !== values.confirmpassword) {
            messageApi.error({ content: "Password and confirm password do not match!" });
            setloading(false);
            return;
        }
        Object.keys(values).forEach((key) => {
            if (key !== "logo" && key !== "email") {
                formData.append(key, values[key]);
            }
        });
        if (values.logo?.originFileObj) {
            formData.append("logo", values.logo.originFileObj);
        }
        if (values.email) {
            formData.append("email", finalEmail);
        }
       

        const isCheck = await SignUp(formData);
        if (isCheck?.success) {
            messageApi.success({
                type: 'success',
                content: isCheck?.message,
            });
            setloading(false);
            Cookies.set("domain", values?.domain, { expires: 1 })
            Cookies.set("user_email", finalEmail, { expires: 1 })
            Cookies.remove("forgot_email");
            Cookies.remove("forgot_indentify");
            dispatch(setAccessToken(isCheck.accessToken));
            dispatch(setStep(STEPS.OTP))
            setTimeout(() => {
                navigate("/user-verification", { replace: true });
            }, 3000);

        } else {
            setloading(false);
            messageApi.error({
                type: 'error',
                content: isCheck?.message,
            });
        }
    };

    


    return (
        <>
            {contextHolder}
            <section className={style.userModule_Section}>
                <div className="container-fluid">
                    <div className="row p-0">
                        <div className="col-lg-6 p-0" id={style.userModule_bg} style={{
                            backgroundImage: `url(${bg})`,
                            backgroundSize: "cover",
                            backgroundPosition: "bottom",
                        }}>
                            <img className={style.logo} src={logo} alt="" />
                        </div>

                        <div className="col-lg-6 p-0">
                            <div className={style.userBox}>
                                <Form
                                    form={form}
                                    className={style.inputBox}
                                    layout="vertical"
                                    onFinish={handleSubmit}
                                >
                                    <Heading title="Create Your Account" 
                                        className={"mx-1"} 
                                        classNameColor={`${style.headingColorDefault}`}
                                    />
                                    <div className={style.inputFlexBox}>
                                        <FormInput
                                            className="mt-2 mx-1"
                                            type="text"
                                            name="firstName"
                                            placeholder="First name"
                                            required={true}
                                            classNameColor={`${style.inputDefaultBg}`}
                                            message={"First Name is required"}
                                        />
                                        <FormInput
                                            className="mt-2 mx-1"
                                            type="text"
                                            name="lastName"
                                            placeholder="Last Name"
                                            required={true}
                                            classNameColor={`${style.inputDefaultBg}`}
                                            message={"Last Name is required"}
                                        />
                                    </div>

                                    <div className={style.inputFlexBox}>
                                        <FormPasswordInput
                                            className="mt-2 mx-1"
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            required={true}
                                            classNameColor={`${style.inputDefaultBg}`}
                                            message={"Password is required"}
                                            eye={true}
                                        />
                                         <FormPasswordInput
                                            className="mt-2 mx-1"
                                            type="password"
                                            name="confirmpassword"
                                            placeholder="Confirm Password"
                                            required={true}
                                            classNameColor={`${style.inputDefaultBg}`}
                                            message={"Confirm Password is required"}
                                            eye={true}
                                        />
                                    </div>
                                    <Heading title="Company Info" 
                                        className={"mt-2 mx-1"}
                                        classNameColor={`${style.headingColorDefault}`}
                                    />
                                    <div className={style.inputFlexBox}>
                                        <FormInput
                                            className="mx-1"
                                            type="text"
                                            name="company"
                                            placeholder="Company"
                                            required={true}
                                            classNameColor={`${style.inputDefaultBg}`}
                                            message={"company is required"}
                                        />
                                        <FormInput
                                            className="mx-1"
                                            type="text"
                                            name="domain"
                                            placeholder="Domain"
                                            required={true}
                                            classNameColor={`${style.inputDefaultBg}`}
                                            message={"Domain is required"}
                                            onChange={(e) => setDomain(`@${e.target.value}`)}
                                        />
                                    </div>
                                    <div className={style.inputFlexBox}>
                                        {/* <SuffixEmail
                                            className="mt-2 mx-1"
                                            type="text"
                                            name="email"
                                            placeholder="Username (e.g Alex.wilson)"
                                            required={true}
                                            message={"Username is required"}
                                            domain={domain}
                                            // classNameColor={`${style.inputDefaultBg}`}
                                        /> */}
                                        <FormInput
                                            className="mt-2 mx-1"
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            required={true}
                                            classNameColor={`${style.inputDefaultBg}`}
                                            message={"Email is required"}
                                        />
                                    </div>
                                    <div className={style.inputFlexBox}>
                                        <FormInput
                                            className="mt-2 mx-1"
                                            type="text"
                                            name="ntn_vat"
                                            placeholder="NTN / VAT"
                                            required={true}
                                            classNameColor={`${style.inputDefaultBg}`}
                                            message={"NTN / VAT is required"}
                                        />
                                        <FormInput
                                            className="mt-2 mx-1"
                                            type="number"
                                            name="phone"
                                            placeholder="Phone Number"
                                            required={true}
                                            classNameColor={`${style.inputDefaultBg}`}
                                            message={"Phone Number is required"}
                                        />
                                    </div>
                                    <div className={style.inputFlexBox}>
                                        <FormInput
                                            className="mt-2 mx-1"
                                            type="text"
                                            name="address"
                                            placeholder="Address"
                                            required={true}
                                            classNameColor={`${style.inputDefaultBg}`}
                                            message={"Address is required"}
                                        />
                                    </div>
                                    <div className={style.inputFlexBox}>
                                        <UploadFile
                                            className="mx-1 mt-2 inputFlexBox"
                                            name="logo"
                                            title={"Company-logo"}
                                            required={true}
                                            multiple={false}
                                            accept="image/jpeg,image/png"
                                            classNameColor={`${style.inputDefaultBg}`}
                                        />
                                        <SelectInput
                                            className="mt-2 mx-1"
                                            showSearch={true}
                                            name="state_province"
                                            placeholder="Province"
                                            message={"Province is required"}
                                            required={true}
                                            classNameColor={`${style.inputDefaultBg}`}
                                            options={provinces?.map((item) => ({
                                                value: `${item.countryCode}-${item.name}`,
                                                label: item.name,
                                            }))}
                                        />
                                    </div>
                                    <div className={style.inputFlexBox}>
                                        <SelectInput
                                            className="mt-2 mx-1"
                                            showSearch={true}
                                            name="country"
                                            placeholder="Country"
                                            message={"Country is required"}
                                            required={true}
                                            classNameColor={`${style.inputDefaultBg}`}
                                            options={countries?.map((item) => ({
                                                value: `${item.isoCode}-${item.name}`,
                                                label: item.name,
                                            }))}
                                        />
                                        <SelectInput
                                            className="mt-2 mx-1"
                                            showSearch={true}
                                            name="city"
                                            placeholder="City"
                                            message={"City is required"}
                                            required={true}
                                            classNameColor={`${style.inputDefaultBg}`}
                                            options={selectedCities?.map((item) => ({
                                                value: `${item.stateCode}-${item.name}`,
                                                label: item.name,
                                            }))}
                                        />
                                    </div>
                                    <div className={style.inputFlexBox}>
                                        <Button
                                            className={`${style.userButton} mt-2 mx-1`}
                                            type="submit"
                                            title="Sign Up"
                                            loading={loading}
                                        />
                                    </div>
                                    <span className={style.AccountLink}>
                                        Already have an account?
                                        <Link to="" className="mx-2" onClick={() => setModule("Login")}>
                                            Sign in
                                        </Link>
                                    </span>
                                </Form>

                                <div className={style.userSqureBoxImg}>
                                    <img src={squreBox} alt="" className='img-fluid' />
                                    {/* <div className={style.userIconBox}>
                                        <AiOutlineYoutube />
                                        <FaFacebookF />
                                        <FaLinkedinIn />
                                        <FaInstagram />
                                        <FaXTwitter />
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

function mapStateToProps({ Red_SignUp }) {
    return { Red_SignUp };
}
export default connect(mapStateToProps, ACTIONS)(SignUp);
