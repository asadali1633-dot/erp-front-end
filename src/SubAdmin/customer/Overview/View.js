import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import { FormInput, FormInputTextArea } from '../../../Components/Inputs/Inputs';
import { Button } from '../../../Components/Button/Button';
import style from './Overview.module.css';
import * as ACTIONS from "../../../store/action/company/index";
import { connect } from "react-redux";
import { message } from 'antd';
import { useSelector } from "react-redux";
import Loader from '../../../Components/Loader/Loader';

function View({
  Red_Company,
  GetCompany,
  UpdateCompany
}) {
  const [form] = Form.useForm();
  const accessToken = useSelector((state) => state.Red_Auth.accessToken);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const pageLoader = Red_Company?.loading
  const [Datetype, setType] = useState({
    createdDate: "text",
    modifiedDate: "text"
  });


  useEffect(() => {
    if (accessToken) {
      GetCompany(accessToken);
    }
  }, [accessToken]);

  useEffect(() => {
    if (Red_Company?.compnayData?.[0]?.company) {
      form.setFieldsValue({
        ...Red_Company?.compnayData?.[0]?.company,
        created_at: Red_Company?.compnayData?.[0]?.company?.created_at.slice(0, 10),
        modified_date: Red_Company?.compnayData?.[0]?.company?.modified_date.slice(0, 10)
      });
    }
  }, [Red_Company, form]);


  const handleSubmit = async (values) => {
    setLoading(true);
    const isCheck = await UpdateCompany(values, accessToken);
    if (isCheck?.success) {
      setLoading(false);
      messageApi.success({
        type: 'success',
        content: isCheck?.message,
      });
      setTimeout(() => {
        GetCompany(accessToken);
      }, 1000);
      
    } else {
      setLoading(false);
      messageApi.error({
        type: 'error',
        content: isCheck?.message,
      });
    }
  };

  return (
    <>
      {contextHolder}
      {pageLoader && <Loader />}
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className={style.overview_TabPanelBox}
      >
        <div className={style.overview_body}>
          <div className={style.overview_inputBox}>
            <FormInput
              label={"Phone"}
              className="mx-1"
              type="number"
              name="phone"
              message={"phone Number is required"}
            />
            <FormInput
              label={"Whatsapp Number"}
              className="mx-1"
              type="text"
              name="whatsapp_no"
              message={"Whatsapp Number is required"}
            />
          </div>
          <div className={style.overview_inputBox}>
            <FormInput
              label={"Website URL"}
              className="mx-1"
              type="text"
              name="website_url"
              required
              message={"Website URL is required"}
            />
          </div>
          <div className={style.overview_inputBox}>
            <FormInput
              label={"Your Address"}
              className="mx-1"
              type="text"
              name="address"
              placeholder="Enter Your Address"
              required={false}
              message={"Address is required"}
            />
          </div>
          <div className={style.overview_inputBox}>
            <FormInput
              label={"Date Created"}
              className="mx-1"
              type={Datetype.createdDate}
              name="created_at"
              placeholder="Date Created"
              required={false}
              readOnly={true}
              message={"Date Created is required"}
            />
            <FormInput
              label={"Date Modified"}
              className="mx-1"
              type={Datetype.modifiedDate}
              name="modified_date"
              placeholder="Date Modified"
              required={false}
              readOnly={true}
              message={"Date Modified is required"}
            />
          </div>
        </div>
        <div className={style.overview_body}>
          <div className={style.overview_textBox}>
            <FormInputTextArea
              label={"Brief note"}
              className=""
              type="text"
              name="brief_note"
              required={false}
              message={"Enter brief note is required"}
            />
          </div>

          <Button
            className="w-25 m-right d-block"
            type="submit"
            title="Save"
            loading={loading}
          />
        </div>
      </Form>
    </>
  );
}

function mapStateToProps({ Red_Company }) {
  return { Red_Company };
}
export default connect(mapStateToProps, ACTIONS)(View);
