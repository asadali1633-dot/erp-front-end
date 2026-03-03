import React, { useRef, useState } from "react";
import style from "./Register.module.css";
import StaterHeader from "../Components/StarterHeader/StaterHeader";
import Heading from "../Components/Heading/Heading";
import { Link, useNavigate } from "react-router-dom";
import imgDemo from "../assests/images/icons/imageDemo.png";
import { FormInput } from "../Components/Inputs/Inputs";
import { SelectInput } from "../Components/Select/Select";
import { Country, State, City } from "country-state-city";
import { Button } from "../Components/Button/Button";
import * as ACTIONS from "../store/action/company/index";
import { connect, useDispatch, useSelector } from "react-redux";
import { message, Form } from "antd";
import { STEPS } from "../Routes/stepCookie";
import { setStep } from "../store/action/auth";
import Cookies from "js-cookie";

function Register({ companyRegistration }) {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const accessToken = useSelector((state) => state.Red_Auth.accessToken);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [file, setFile] = useState(null);
  const [form] = Form.useForm();
  const countries = Country.getAllCountries();
  const codes = ["PK", "IN", "US", "AS"];
  const provinces = codes.flatMap((code) => State.getStatesOfCountry(code));
  let selectedCities = [];
  codes.forEach((code) => {
    const cities = City.getCitiesOfCountry(code);
    selectedCities = [...selectedCities, ...cities];
  });

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleSubmit = async (values) => {

    if (!file) {
      messageApi.error({
        type: "error",
        content: "Please select a company logo.",
      });
      return;
    }

    setloading(true);
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    formData.append("image", file);

    const isCheck = await companyRegistration(formData, accessToken);
    if (isCheck?.success) {
      setloading(false);
      messageApi.success({
        type: "success",
        content: isCheck?.message,
      });
      dispatch(setStep(STEPS.SUBSCRIPTIONS));
      setTimeout(() => {
        navigate("/user-subscription-packages", { replace: true });
      }, 3000);
    } else {
      setloading(false);
      messageApi.error({
        type: "error",
        content: isCheck?.message,
      });
    }
  };

  //  Cookies.remove("auth_step");
  return (
    <>
      <StaterHeader />
      {contextHolder}
      <section className={style.company_profileSection}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <Form
                form={form}
                layout="vertical"
                className={style.company_profileImageBox}
                onFinish={handleSubmit}
              >
                <Heading title={"Company Information"} />
                <div className={style.company_profileImageInnerBox}>
                  <div className={style.company_profileImageInputBox}>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                    <img
                      src={file ? URL.createObjectURL(file) : imgDemo}
                      alt="preview"
                    />
                  </div>
                  <div className="mx-3">
                    <h5>Upload your company logo</h5>
                    <p>
                      Proin nunc egestas non lorem tempus dolor tincidunt
                      pharetra imperdie
                    </p>
                    <Link to="#" onClick={handleClick}>
                      Upload
                    </Link>
                  </div>
                </div>
                <hr />

                <div className={style.company_profileInputBox}>
                  <div className={style.company_profileInnerInputBox}>
                    <FormInput
                      className="mt-2 mx-1"
                      type="text"
                      name="company"
                      placeholder="Company"
                      required
                      message={"company is required"}
                    />
                    <FormInput
                      className="mt-2 mx-1"
                      type="text"
                      name="domain"
                      placeholder="Domain"
                      required
                      message={"Domain is required"}
                    />
                  </div>

                  <div className={style.company_profileInnerInputBox}>
                    <FormInput
                      className="mt-2 mx-1"
                      type="text"
                      name="ntn_vat"
                      placeholder="NTN / VAT"
                      required
                      message={"NTN / VAT is required"}
                    />
                    <FormInput
                      className="mt-2 mx-1"
                      type="number"
                      name="phone"
                      placeholder="Phone Number"
                      required
                      message={"Phone Number is required"}
                    />
                  </div>

                  <div className={style.company_profileInnerInputBox}>
                    <FormInput
                      className="mt-2 mx-1"
                      type="text"
                      name="address"
                      placeholder="Address"
                      required
                      message={"Address is required"}
                    />
                  </div>

                  <div className={style.company_profileInnerInputBox}>
                    <SelectInput
                      className="mt-2 mx-1"
                      showSearch={true}
                      name="state_province"
                      placeholder="Province"
                      message={"Province is required"}
                      required
                      options={provinces?.map((item) => ({
                        value: `${item.countryCode}-${item.name}`,
                        label: item.name,
                      }))}
                    />
                    <SelectInput
                      className="mt-2 mx-1"
                      showSearch={true}
                      name="country"
                      placeholder="Country"
                      message={"Country is required"}
                      required
                      options={countries?.map((item) => ({
                        value: `${item.isoCode}-${item.name}`,
                        label: item.name,
                      }))}
                    />
                  </div>

                  <div className={style.company_profileInnerInputBox}>
                    <SelectInput
                      className="mt-2 mx-1"
                      showSearch={true}
                      name="city"
                      placeholder="City"
                      message={"City is required"}
                      required
                      options={selectedCities?.map((item) => ({
                        value: `${item.stateCode}-${item.name}`,
                        label: item.name,
                      }))}
                    />
                  </div>

                  <Button type="submit" title="Continue" loading={loading} />
                </div>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function mapStateToProps({ Red_Company }) {
  return { Red_Company };
}
export default connect(mapStateToProps, ACTIONS)(Register);
