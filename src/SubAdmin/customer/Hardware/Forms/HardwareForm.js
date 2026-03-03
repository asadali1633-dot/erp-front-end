import React, { useEffect, useState } from 'react'
import style from './form.module.css'
import { Form, Modal } from 'antd';
import { FormInput } from '../../../../Components/Inputs/Inputs';
import { SelectInput } from '../../../../Components/Select/Select';
import { RadioButton } from '../../../../Components/RadioButton';
import { Button } from '../../../../Components/Button/Button';
import * as ACTIONS from "../../../../store/action/hardware/index";
import { connect } from "react-redux";
import { message } from 'antd';
import { useSelector } from "react-redux";
import CreateBrand from './CreateBrand';
import CreateDepart from './CreateDepart';
import CustomDate from '../../../../Components/Date/CustomDate';
import { Country, State, City } from "country-state-city";
import QRCODE from '../../../../Components/QR/BARCODE';


function HardwareForm({
    hardwareForm,
    setHardwareForm,
    Red_Assets,
    CreateHardwareFun,
    GetAllEmpList,
    GetAllBrandsManufacturer,
    HardwareGetByid,
    UpdateAssets,
    GetAllHardware,
    GetAllDepartments,
    pagBody,
    setCode,
    code
}) {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setloading] = useState(false);
    const [singleInput, setSingleInput] = useState(false)
    const [depart, setDepart] = useState(false)
    const accessToken = useSelector((state) => state.Red_Auth.accessToken);
    const hardwareData = Red_Assets?.HardwareSingleData?.[0]?.hardware
    const codes = ["PK", "IN", "US", "AS"];
    let selectedCities = [];
    codes.forEach((code) => {
        const cities = City.getCitiesOfCountry(code);
        selectedCities = [...selectedCities, ...cities];
    });
    const [Datetype, setDateType] = useState({
        date: "text",
        purcahseDate: "text",
        warranty_expire: "text",
        purcahseDate2: "text"
    });
    const [location, setLocation] = useState([
        { key: "Office", label: "Office" },
        { key: "Store", label: "Store" },
    ]);
    const [status, setStatus] = useState([
        { key: "in_use", label: "In use" },
        { key: "in_stock", label: "In Stock" },
        { key: "under_repair", label: "Under Repair" },
        { key: "retired", label: "Retired" },
    ]);

    const handleOk = () => {
        form.resetFields();
        setHardwareForm(false);
        setCode({
            mode: "",
            code: null
        })
    };
    const handleCancel = () => {
        form.resetFields();
        setHardwareForm(false);
        setCode({
            mode: "",
            code: null
        })
    };


    const handleSubmit = async (values) => {
        setloading(true);
        const isCheck = await CreateHardwareFun(values, accessToken);
        if (isCheck?.success) {
            messageApi.success({
                type: "success",
                content: isCheck?.message,
            });
            setTimeout(() => {
                GetAllHardware(pagBody, accessToken);
                setHardwareForm(false);
            }, 2000);
            setloading(false);
        } else {
            setloading(false);
            messageApi.error({
                type: "error",
                content: isCheck?.message,
            });
        }
    };
    const handleUpdateSubmit = async (values) => {
        setloading(true);
        const isCheck = await UpdateAssets(values, accessToken, code?.code);
        if (isCheck?.success) {
            messageApi.success(isCheck?.message);
            form.resetFields();
            setTimeout(() => {
                GetAllHardware(pagBody, accessToken);
                setHardwareForm(false);
            }, 2000);
            setloading(false);
        } else {
            messageApi.error(isCheck?.message);
        }
        setloading(false);
    };

    const FormData = () => {
        if (code?.mode === "Edit") {
            HardwareGetByid(code?.code, accessToken)
        }
    }
    const setValues = () => {
        const Data = Red_Assets?.HardwareSingleData?.[0]?.hardware;
        if (Data) {
            form.setFieldsValue({
                ...Data,
                record_date: Data?.record_date?.slice(0, 10),
                purchase_date: Data?.purchase_date?.slice(0, 10),
                warranty_expire: Data?.warranty_expire?.slice(0, 10),
                purchase_date_2: Data?.purchase_date_2?.slice(0, 10),
                brand_manufacturer: Data?.brand_id,
                assigned_to_depart: Data?.department_id,
                assigned_to_emp: Data?.employee_id,
            });
        }
    }
    useEffect(() => {
        FormData()
    }, [code, accessToken]);


    useEffect(() => {
        if (code?.mode === "Edit") {
            setValues();
        } else {
            form.resetFields();
        }
    }, [Red_Assets?.HardwareSingleData, code?.mode]);

    useEffect(() => {
        if(hardwareForm == true){
            GetAllBrandsManufacturer(accessToken)
            GetAllDepartments(accessToken)
        }
        GetAllEmpList(accessToken)
        GetAllBrandsManufacturer(accessToken)
        GetAllDepartments(accessToken)
    }, [accessToken,hardwareForm])

    return (
        <>
            {contextHolder}
            <Modal
                title=""
                closable={{ 'aria-label': 'Custom Close Button' }}
                className='modalBgColor'
                open={hardwareForm}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                width={"100%"}
            >
                <Form
                    form={form}
                    className={`${style.form_modalMainBox} mt-3`}
                    layout="vertical"
                    onFinish={code?.mode == "Edit" ? handleUpdateSubmit : handleSubmit}
                >
                <div className={style.modalHardwareScroll}>
                   <div className={style.QR_box}>
                    <h5 className="mx-1">New Asset Form Hardware</h5>
                    <QRCODE  
                        value={"HW-1013883"}
                    />
                   </div>
                    <div className={style.form_inputBox}>
                        <FormInput
                            className="mx-1"
                            label={"ID Number"}
                            name="ID Number"
                            type={"number"}
                            placeholder="ID Number"
                            required={true}
                            message={"Please Enter a ID Number"}
                        />
                        <SelectInput
                            className="mx-1"
                            label={"Asset Type"}
                            placeholder="Asset Type"
                            name="asset_type"
                            required={true}
                            message={"Please Select a Asset Type"}
                            options={[
                                { value: "Laptop", label: "Laptop" },
                                { value: "Desktop", label: "Desktop" },
                                { value: "Monitor", label: "Monitor" },
                                { value: "Keyboard", label: "Keyboard" },
                                { value: "Mouse", label: "Mouse" },
                                { value: "Phone", label: "Phone" },
                                { value: "Tablet", label: "Tablet" },
                                { value: "Server", label: "Server" },
                                { value: "Network Device", label: "Network Device" },
                                { value: "Others", label: "Others" },
                            ]}
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
                        <FormInput
                            label={"Model Number"}
                            className="mx-1"
                            name="model no"
                            placeholder="Model Number"
                            required={true}
                            message={"Please Enter a Model Number"}
                            type={"number"}
                        />
                    </div>
                    <div className={style.form_inputBox}>
                        <FormInput
                            label={"Serial Number"}
                            className="mx-1"
                            name="model no"
                            placeholder="Serial Number"
                            type={"number"}
                            required={true}
                            message={"Please Enter a Serial Number"}
                        />
                        <CustomDate
                            label={"Date of Acquisition"}
                            className={`mx-1`}
                            name={"purchase_date"}
                            placeholder={"Purchase Date"}
                            message={"Please Enter a Purchase Date"}
                            required={true}
                            allowToday={true}
                        />
                        <FormInput
                            label={"Purchase Order Number"}
                            className="mx-1"
                            name="model no"
                            placeholder="Purchase Order Number"
                            required={true}
                            message={"Please Enter a Purchase Order Number"}
                            type={"number"}
                        />
                         <FormInput
                            label={"Request Ticket/Reference Number"}
                            className="mx-1"
                            name="model no"
                            placeholder="Request Ticket/Reference Number"
                            required={true}
                            message={"Please Enter a Request Ticket/Reference Number"}
                            type={"number"}
                        />
                        <SelectInput
                            label="Location/City"
                            className="mx-1 inputFlexBox"
                            showSearch={true}
                            name="city"
                            placeholder="Location/City"
                            message={"Location/City is required"}
                            required={true}
                            classNameColor={`${style.inputDefaultBg}`}
                            options={selectedCities?.map((item) => ({
                                value: `${item.name}`,
                                label: item.name,
                            }))}
                        />
                    </div>
                        
                    <h5 className={`${style.form_checkBoxHeading} mx-1`}>Hardware Specifications</h5>
                    <div className={style.form_inputBox}>
                        <SelectInput
                            className="mx-1"
                            label={"CPU | Processor"}
                            placeholder="CPU | Processor"
                            name="CPU | Processor"
                            required={true}
                            message={"Please Select a CPU | Processor"}
                            options={[]}
                        />
                        <SelectInput
                            className="mx-1"
                            label={"RAM | Memory"}
                            placeholder="RAM | Memory"
                            name="RAM | Memory"
                            required={true}
                            message={"Please Select a RAM | Memory"}
                            options={[]}
                        />
                        <SelectInput
                            className="mx-1"
                            label={"Storage (HDD | SSD)"}
                            placeholder="Storage (HDD | SSD)"
                            name="Storage (HDD | SSD)"
                            required={true}
                            message={"Please Select a Storage (HDD | SSD)"}
                            options={[]}
                        />
                        <SelectInput
                            className="mx-1"
                            label={"Operating System"}
                            placeholder="Operating System"
                            name="Operating System"
                            required={true}
                            message={"Please Select a Operating System"}
                            options={[]}
                        />
                        <FormInput
                            label={"OS License Key (if stored)"}
                            className="mx-1"
                            name="model no"
                            placeholder="OS License Key (if stored)"
                            required={true}
                            message={"Please Enter a OS License Key"}
                        />
                    </div>
                    <div className={style.form_inputBox}>
                        <FormInput
                            label={"Network (MAC Address(es), Wi-Fi, Ethernet)"}
                            className="mx-1"
                            name="model no"
                            placeholder="OS License Key (if stored)"
                            required={true}
                            message={"Please Enter a OS License Key"}
                        />
                        <FormInput
                            label={"Graphics Card"}
                            className="mx-1"
                            name="model no"
                            placeholder="Graphics Card"
                            required={true}
                            message={"Please Enter a Graphics Card"}
                        />
                        <SelectInput
                            className="mx-1"
                            label={"Screen Size"}
                            placeholder="Screen Size"
                            name="Screen Size"
                            required={true}
                            message={"Please Select a Screen Size"}
                            options={[]}
                        />
                        <SelectInput
                            className="mx-1"
                            label={"Peripherals Included"}
                            placeholder="Peripherals Included"
                            name="Peripherals Included"
                            required={true}
                            message={"Please Select a Peripherals Included"}
                            options={[]}
                        />
                    </div>

                    <h5 className={`${style.form_checkBoxHeading} mx-1`}>Financial & Procurement</h5>
                    <div className={style.form_inputBox}>
                        <FormInput
                            label={"Cost Center/Department"}
                            className="mx-1"
                            name="model no"
                            placeholder="Cost Center/Department"
                            required={true}
                            message={"Cost Center/Department"}
                        />
                        <FormInput
                            label={"Business Justification/Purpose"}
                            className="mx-1"
                            name="model no"
                            placeholder="Business Justification/Purpose"
                            required={true}
                            message={"Please Enter a Business Justification/Purpose"}
                        />
                        <FormInput
                            label={"Vendor/Supplier Name"}
                            className="mx-1"
                            name="model no"
                            placeholder="Vendor/Supplier Name"
                            required={true}
                            message={"Please Enter a Vendor/Supplier Name"}
                        />
                        <FormInput
                            label={"Purchase Cost"}
                            className="mx-1"
                            name="model no"
                            placeholder="Purchase Cost"
                            required={true}
                            message={"Please Enter a Purchase Cost"}
                        />
                    </div>
                    <div className={style.form_inputBox}>
                        <CustomDate
                            label={"Warranty Start Date"}
                            className={`mx-1`}
                            name={"Warranty Start Date"}
                            placeholder={"Warranty Start Date"}
                            message={"Please Enter a Warranty Start Date"}
                            required={true}
                            allowToday={true}
                        />
                        <CustomDate
                            label={"Warranty End Date"}
                            className={`mx-1`}
                            name={"Warranty End Date"}
                            placeholder={"Warranty End Date"}
                            message={"Please Enter a Warranty End Date"}
                            required={true}
                            allowToday={true}
                        />
                         <FormInput
                            label={"Expected Lifespan"}
                            className="mx-1"
                            name="model no"
                            placeholder="Expected Lifespan"
                            required={true}
                            message={"Expected Lifespan"}
                        />
                    </div>

                    <h5 className={`${style.form_checkBoxHeading} mx-1`}>Assignment & Location</h5>
                    <div className={style.form_inputBox}>
                        <SelectInput
                            className="mx-1"
                            label={"Assigned To (User's Name)"}
                            placeholder="Assigned To (User's Name)"
                            name="Assigned To (User's Name)"
                            required={true}
                            message={"Please Select a assigned to"}
                            options={[]}
                        />
                        <FormInput
                            label={"User's Employee ID/Username"}
                            className="mx-1"
                            name="model no"
                            placeholder="User's Employee ID/Username"
                            required={true}
                            message={"User's Employee ID/Username is required"}
                        />
                        <CustomDate
                            label={"Assigned Date"}
                            className={`mx-1`}
                            name={"Assigned Date"}
                            placeholder={"Assigned Date"}
                            message={"Please Enter a Assigned Date"}
                            required={true}
                            allowToday={true}
                        />
                    </div>
                    <div className={style.form_inputBox}>
                        <SelectInput
                            className="mx-1"
                            label={"Department/Cost Center"}
                            placeholder="Department/Cost Center"
                            name="Department/Cost Center"
                            required={true}
                            message={"Please Select a Department/Cost Center"}
                            options={[]}
                        />
                        <SelectInput
                            className="mx-1"
                            label={"Physical Location"}
                            placeholder="Physical Location"
                            name="Physical Location"
                            required={true}
                            message={"Please Select a Physical Location"}
                            options={[]}
                        />
                        <SelectInput
                            className="mx-1"
                            label={"Status"}
                            placeholder="Status"
                            name="Status"
                            required={true}
                            message={"Please Select a Status"}
                            options={[]}
                        />
                    </div>

                    <h5 className={`${style.form_checkBoxHeading} mx-1`}>Software & Compliance</h5>
                    <div className={style.form_inputBox}>
                        <FormInput
                            label={"Primary User Software Licenses"}
                            className="mx-1"
                            name="model no"
                            placeholder="Primary User Software Licenses"
                            required={true}
                            message={"Primary User Software Licenses is required"}
                        />
                         <FormInput
                            label={"Security Software Installed"}
                            className="mx-1"
                            name="model no"
                            placeholder="Security Software Installed"
                            required={true}
                            message={"Security Software Installed is required"}
                        />
                    </div>

                    <h5 className={`${style.form_checkBoxHeading} mx-1`}>Lifecycle & Management</h5>
                    <div className={style.form_inputBox}>
                        <SelectInput
                            className="mx-1"
                            label={"Owned vs. Leased"}
                            placeholder="Owned vs. Leased"
                            name="Owned vs. Leased"
                            required={true}
                            message={"Please Select a Owned vs. Leased"}
                            options={[]}
                        />
                        <CustomDate
                            label={"Lease Expiry Date (if applicable)"}
                            className={`mx-1`}
                            name={"Assigned Date"}
                            placeholder={"Lease Expiry Date (if applicable)"}
                            message={"Please Enter a Lease Expiry Date"}
                            required={true}
                            allowToday={true}
                        />
                        <CustomDate
                            label={"Next Scheduled Maintenance Date"}
                            className={`mx-1`}
                            name={"Assigned Date"}
                            placeholder={"Next Scheduled Maintenance Date"}
                            message={"Please Enter a Maintenance Date"}
                            required={true}
                            allowToday={true}
                        />
                        <CustomDate
                            label={"Decommission/Disposal Date (Future)"}
                            className={`mx-1`}
                            name={"Decommission/Disposal Date (Future)"}
                            placeholder={"Decommission/Disposal Date (Future)"}
                            message={"Please Enter a Date (Future)"}
                            required={true}
                            allowToday={true}
                        />
                    </div>
                     <div className={style.form_inputBox}>
                        <SelectInput
                            className="mx-1"
                            label={"Disposal Method "}
                            placeholder="Disposal Method "
                            name="Disposal Method "
                            required={true}
                            message={"Please Select a Disposal Method "}
                            options={[]}
                        />
                        <FormInput
                            label={"Depreciation Value"}
                            className="mx-1"
                            name="model no"
                            placeholder="Depreciation Value"
                            required={true}
                            message={"User's Employee Depreciation Value"}
                        />
                         <SelectInput
                            className="mx-1"
                            label={"Parent Asset"}
                            placeholder="Parent Asset"
                            name="Parent Asset"
                            required={true}
                            message={"Please Select a Parent Asset"}
                            options={[]}
                        />
                        
                    </div>
                </div>
                <div className={style.hard_modalBtns}>
                    <Button type="submit" className={"mx-1 mt-2 w-auto"} title={code?.mode == "Edit" ? "Save" : "Create"} loading={loading} />
                    <Button type="submit" className={"mx-1 mt-2 w-auto"} title={code?.mode == "Edit" ? "Save" : "Create/Create New"} loading={loading} />
                </div>
                </Form>
            </Modal>

            <CreateBrand {...{ singleInput, setSingleInput }} />
            <CreateDepart {...{ depart, setDepart }} />

        </>
    )
}

function mapStateToProps({ Red_Assets }) {
    return { Red_Assets };
}
export default connect(mapStateToProps, ACTIONS)(HardwareForm);