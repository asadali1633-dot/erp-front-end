import React, { useState } from "react";
import style from "./userModule.module.css";
import Heading from "../Components/Heading/Heading";
import { FormInput, FormPasswordInput } from "../Components/Inputs/Inputs";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../Components/Button/Button";
import squreBox from "../assests/images/Usermodule/squreBox.png";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { message, Form } from "antd";
import * as ACTIONS from "../store/action/signin/index";
import { connect, useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { setLoading, setStep } from "../store/action/auth";
import { STEPS } from "../Routes/stepCookie";
import logo from '../assests/images/logo.png'
import bg from '../assests/images/Usermodule/bg.png'

function SignIn({ SignIn, setModule }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setloading] = useState(false);


  const handleSubmit = async (values) => {
    try {
      setloading(true);
      dispatch(setLoading(true));
      const isCheck = await SignIn(values);
      if (isCheck?.success) {
        messageApi.success(isCheck?.message);
        Cookies.set("refresh_token", isCheck?.refreshToken, { expires: 1 })
        Cookies.set("owner_id", isCheck?.payload?.id, { expires: 1 })
        Cookies.remove("user_email");
        Cookies.remove("domain");
        Cookies.remove("forgot_email");
        Cookies.remove("forgot_indentify");
        dispatch(setStep(STEPS.DASHBOARD));
        setTimeout(() => {
          navigate("/CustomerInfo")
        }, 3000);
      } else {
        console.log("first", isCheck)
        messageApi.error(isCheck?.message);
      }
    } catch (err) {
      console.error(err);
      messageApi.error("Server error");
    } finally {
      dispatch(setLoading(false));
      setloading(false);
    }
  };


  return (
    <>
      {contextHolder}
      <section className={style.userModule_Section}>
        <div className="container-fluid">
          <div className="row p-0">
            <div className="col-lg-8 p-0" id={style.userModule_bg} style={{
              backgroundImage: `url(${bg})`,
              backgroundSize: "cover",
              backgroundPosition: "bottom",
            }}>
              <img className={style.logo} src={logo} alt="" />
            </div>
            <div className="col-lg-4 p-0">
              <div className={style.userBox}>
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleSubmit}
                  className={style.inputBox}
                >
                  <Heading title="Login"  
                      classNameColor={`${style.headingColorDefault}`}
                    />
                   <FormInput
                      classNameColor={`${style.inputDefaultBg}`}
                      className="mt-2"
                      type="text"
                      name="domain"
                      placeholder="Enter Your Domain"
                      required={true}
                      message={"Domain is required for login"}
                    />
                  <FormInput
                    className="mt-2"
                    type="email"
                    name="email"
                     classNameColor={`${style.inputDefaultBg}`}
                    placeholder="Email"
                    required={true}
                    message={"Email is required"}
                  />
                  <FormPasswordInput
                    className="mt-2"
                    type="password"
                    name="password"
                     classNameColor={`${style.inputDefaultBg}`}
                    placeholder="Password"
                    required={true}
                    message={"Password is required"}
                    eye={true}
                  />
                  <Link to={"/EmailScreenPassword"} className="mt-2 d-block">
                    Forget Password?
                  </Link>
                  <Button
                    className={`${style.userButton} mt-2`}
                    type="submit"
                    title="Login"
                    loading={loading}
                  />

                  <span className={style.AccountLink}>
                    For Demo Please contact asad@itracks.co
                    {/* <Link></Link> */}
                  </span>
                </Form>

                <div className={style.userSqureBoxImg}>
                  <img src={squreBox} alt="" className="img-fluid" />
                  <div className={style.userIconBox}>
                    {/* <AiOutlineYoutube /> */}
                    <Link to="https://www.facebook.com/itRacksofficial" target="_blank">
                      <FaFacebookF />
                    </Link>
                    <Link to="https://www.linkedin.com/company/i.t-racks/" target="_blank">
                      <FaLinkedinIn />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function mapStateToProps({ Red_SignIn }) {
  return { Red_SignIn };
}
export default connect(mapStateToProps, ACTIONS)(SignIn);
