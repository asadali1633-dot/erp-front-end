import React, { useState } from 'react'
import style from './form.module.css'
import { Dropdown, Form, Modal, Space } from 'antd';
import { FormInput } from '../../../../Components/Inputs/Inputs';
import { SelectInput } from '../../../../Components/Select/Select';
import { ActionButton, Button } from '../../../../Components/Button/Button';
import * as ACTIONS from "../../../../store/action/hardware/index";
import { connect } from "react-redux";
import { message, Button as Buttttton } from 'antd';
import { useSelector } from "react-redux";
import CustomDate from '../../../../Components/Date/CustomDate';
import CreateBrand from './CreateBrand';
import QRCODE from '../../../../Components/QR/BARCODE'
import { Country, State, City } from "country-state-city";
import UploadFile from '../../../../Components/File/UploadFile';
import Year from '../../../../Components/Date/Year';
import Menu_dropdown from '../../../../Components/Menu_dropdown/Menu_dropdown';


function BasicItems({
  Red_Assets,
  setCode, code,
  pagBody,
  assetsType, setAssetsType
}) {
  const [form] = Form.useForm();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [singleInput, setSingleInput] = useState(false)
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setloading] = useState(false);
  const [textFields, setTextFields] = useState([]);
  const [dateFields, setDateFields] = useState([]);
  const codes = ["PK", "IN", "US", "AS"];
  let selectedCities = [];
  codes.forEach((code) => {
    const cities = City.getCitiesOfCountry(code);
    selectedCities = [...selectedCities, ...cities];
  });


  const handleOk = () => {
    setAssetsType(false);
  };
  const handleCancel = () => {
    setAssetsType(false);
  };

  const handleMenuSelect = (key) => {
    if (key === 'text') {
      addTextField();
    } else if (key === 'date') {
      addDateField();
    }
    setDropdownVisible(true);
  };

  const addTextField = () => {
    setTextFields([
      ...textFields,
      {
        id: Date.now(),
        name: `text_field_${Date.now()}`,
        label: 'New Text Field',
      }
    ]);
  };

  const addDateField = () => {
    setDateFields([
      ...dateFields,
      {
        id: Date.now(),
        name: `date_field_${Date.now()}`,
        label: 'New Date Field',
      }
    ]);
  };

  return (
    <>
      <Modal
        title=""
        closable={{ 'aria-label': 'Custom Close Button' }}
        className='modalBgColor'
        open={assetsType}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={"100%"}
      >
        <Form
          form={form}
          className={`${style.form_modalMainBox} mt-3`}
          layout="vertical"
        // onFinish={code?.mode == "Edit" ? handleUpdateSubmit : handleSubmit}
        >
          <div className={style.modalHardwareScroll}>
            <div className={`${style.QR_box} justify-content-between`}>
              <div className='d-flex align-items-center'>
                <h5 className="mx-1">Basic Items Asset Form</h5>
                <QRCODE
                  value={"HW-1013883"}
                />
              </div>
              <Dropdown
                overlay={<Menu_dropdown onSelect={handleMenuSelect} />}
                trigger={['click']}
                open={dropdownVisible}
                onOpenChange={setDropdownVisible}
              >
                <ActionButton
                  type="button"
                  className={`${style.basicItems_rightButtonAddNew} w-auto`}
                  title={"Add New Field +"}
                />
              </Dropdown>
            </div>
            <h5 className={`${style.form_checkBoxHeading} mx-1`}>Basic Details</h5>
            <div className={style.form_inputBox}>
              <FormInput
                className="mx-1"
                label={"Assets Tag/ID"}
                name="ID Number"
                type={"number"}
                placeholder="Assets Tag/ID"
                required={true}
                message={"Please Enter a ID"}
              />
              <SelectInput
                label={"Brand Manufacturer"}
                className={"mx-1"}
                name="brand_manufacturer"
                placeholder="Brand / Manufacturer"
                message="Please Select a Brand / Manufacturer"
                required={true}
                showSearch={true}
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <button onClick={() => { setSingleInput(true) }} className='simpleButtonAction'>Create</button>
                  </>
                )}
                options={Red_Assets?.BrandsManufacturer?.[0]?.brands?.map((item) => ({
                  value: item.id,
                  label: item.brand_manufacturer,
                }))}
              />
            </div>

            {/* {textFields.map(field => (
                <div key={field.id} style={{ marginBottom: '15px' }}>
                      <FormInput
                        className="mx-1"
                        label={field.label}
                        name={field.name}
                        type={"text"}
                        placeholder={`Enter ${field.label}`}
                        required={true}
                        message={`Please Enter ${field.label}`}
                      />
                </div>
            ))} */}
          </div>
          <div className={style.hard_modalBtns}>
            <Button type="submit" className={"mx-1 mt-2 w-auto"} title={code?.mode == "Edit" ? "Save" : "Save"} loading={loading} />
            <Button type="submit" className={"mx-1 mt-2 w-auto"} title={code?.mode == "Edit" ? "Save" : "Create & New"} loading={loading} />
          </div>
        </Form>
      </Modal>

      <CreateBrand {...{ singleInput, setSingleInput }} />

    </>
  )
}



function mapStateToProps({ Red_Assets }) {
  return { Red_Assets };
}
export default connect(mapStateToProps, ACTIONS)(BasicItems);