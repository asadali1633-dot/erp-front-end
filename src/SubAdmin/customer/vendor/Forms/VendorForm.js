import React, { useState, useEffect } from 'react'
import style from './form.module.css'
import { Form, Modal, message } from 'antd';
import { FormInput, FormInputTextArea } from '../../../../Components/Inputs/Inputs';
import { SelectInput } from '../../../../Components/Select/Select';
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { ActionButton, Button, ShowMore } from '../../../../Components/Button/Button';
import CustomDate from '../../../../Components/Date/CustomDate';
import { Country, State, City } from "country-state-city";
import { connect, useSelector } from 'react-redux';
import * as VENDORS_ACTIONS from "../../../../store/action/vendors/index";
import baseUrl from '../../../../config.json'
import dayjs from "dayjs";


function VendorForm({
    VendorsForm,
    setVendorsForm,
    code, setCode,
    Red_Vendors,
    CreateVendorFun,
    GetVendorList,
    GetAllVendorWithPage,
    pageBody,
    editData,
    UpdateVendor
}) {
    const [form] = Form.useForm();
    const countries = Country.getAllCountries();
    const accessToken = useSelector((state) => state.Red_Auth.accessToken);
    const vendorsList = Red_Vendors?.VendorListSimple?.[0]?.data
    const [loading, setloading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const codes = ["PK", "IN", "US", "AS"];
    const provinces = codes.flatMap((code) => State.getStatesOfCountry(code));
    const [showMore, setShowMore] = useState(false);

    let selectedCities = [];
    codes.forEach((code) => {
        const cities = City.getCitiesOfCountry(code);
        selectedCities = [...selectedCities, ...cities];
    });

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    const handleOk = () => {
        setVendorsForm(false);
        setCode({
            mode: null,
            code: null
        });
    };
    const handleCancel = () => {
        setVendorsForm(false);
        setCode({
            mode: null,
            code: null
        });
    };


    const fetchVendorCode = async () => {
        try {
            const response = await fetch(`${baseUrl.baseUrl}/api/vendor/id/unique`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            const res = await response.json();
            if (res.success) {
                form.setFieldsValue({ vendor_code: res.data.vendor_code });
            } else {
                console.error("Vendor code fetch failed:", res.message);
            }
        } catch (err) {
            console.error("Error:", err);
        }
    }

    const editFuntionData = () => {
        if (editData && code?.mode === "Edit") {
            const data = editData?.[0]?.data;
            if (!data) return;
            let contactsToSet = [];
            if (data.contacts && Array.isArray(data.contacts) && data.contacts.length > 0) {
                contactsToSet = data.contacts;
            } else {
                contactsToSet = [{}];
            }
            let shippingToSet = [];
            if (data.shipping_addresses && Array.isArray(data.shipping_addresses) && data.shipping_addresses.length > 0) {
                shippingToSet = data.shipping_addresses;
            } else {
                shippingToSet = [{}];
            }
            const formValues = {
                ...data,
                vendor_since: data?.vendor_since ? dayjs(data.vendor_since) : null,
                preferred_vendor: data?.preferred_vendor == 0 ? "No" : "Yes",
                parent_vendor: data?.parent_vendor_id,
                contacts: contactsToSet,
                shipping_addresses: shippingToSet,
            }
            form.setFieldsValue(formValues);
        }
    }

    const handleForm = async (values) => {
        setloading(true);

        let contactsArray = values.contacts || [];
        contactsArray = contactsArray.filter(contact =>
            contact.solutation?.trim() ||
            contact.first_name?.trim() ||
            contact.last_name?.trim() ||
            contact.job_title?.trim() ||
            contact.email?.trim() ||
            contact.phone_direct?.trim() ||
            contact.mobile?.trim() ||
            contact.is_primary?.trim()
        );

        let shippingArray = values.shipping_addresses || [];
        shippingArray = shippingArray.filter(addr =>
            addr.address_type?.trim() ||
            addr.address_line1?.trim() ||
            addr.address_line2?.trim() ||
            addr.state_province?.trim() ||
            addr.country?.trim() ||
            addr.postal_code?.trim() ||
            addr.city?.trim() ||
            addr.default_shipping?.trim() ||
            addr.contact_person?.trim() ||
            addr.phone_location?.trim() ||
            addr.notes?.trim()
        );
        const payload = {
            ...values,
            contacts: JSON.stringify(contactsArray),
            shipping_addresses: JSON.stringify(shippingArray)
        }

        if (code?.mode !== "Edit") {
            const isCheck = await CreateVendorFun(payload, accessToken);
            if (isCheck?.success) {
                messageApi.success({
                    type: "success",
                    content: isCheck?.message,
                });
                setVendorsForm(false);
                form.resetFields();
                setloading(false);
                GetAllVendorWithPage(pageBody, accessToken);
            } else {
                setloading(false);
                messageApi.error({
                    type: "error",
                    content: isCheck?.message,
                });
            }
        } else {
            const isCheck = await UpdateVendor(code?.code, payload, accessToken);
            if (isCheck?.success) {
                messageApi.success({
                    type: "success",
                    content: isCheck?.message,
                });
                setVendorsForm(false);
                form.resetFields();
                setloading(false);
                GetAllVendorWithPage(pageBody, accessToken);
            } else {
                setloading(false);
                messageApi.error({
                    type: "error",
                    content: isCheck?.message,
                });
            }
        }

    };

    useEffect(() => {
        if (code?.mode !== "Edit") {
            fetchVendorCode();
        }
    }, [VendorsForm, accessToken]);

    useEffect(() => {
        GetVendorList(accessToken)
    }, [VendorsForm, accessToken])

    useEffect(() => {
        editFuntionData()
    }, [editData, code, form]);


    return (
        <>
            {contextHolder}
            <Modal
                title=""
                closable={{ 'aria-label': 'Custom Close Button' }}
                className={`${style.form_modalWidth} modalBgColor`}
                open={VendorsForm}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                width={"100%"}
            >
                <Form
                    form={form}
                    className={`${style.form_modalMainBox} mt-3`}
                    layout="vertical"
                    initialValues={{ contacts: [{}], shipping_addresses: [{}] }}
                    onFinish={handleForm}
                >
                    <div className={style.modalHardwareScroll}>
                        <div className={style.QR_box}>
                            <h5 className="mx-1">New Vendor Form</h5>
                        </div>
                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Basic Information</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                className="mx-1"
                                label={"Vendor ID"}
                                name="vendor_code"
                                placeholder="Auto-generated (e.g., VEND-001)"
                                required={false}
                                readOnly={false}
                                message={"Vendor ID is auto-generated"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Vendor Type"}
                                placeholder="Select Vendor Type"
                                name="vendor_type"
                                required={false}
                                message={"Please select vendor type"}
                                options={[
                                    { value: "Company", label: "Company" },
                                    { value: "Individual", label: "Individual" },
                                    { value: "Government", label: "Government" },
                                    { value: "Non-profit", label: "Non-profit" },
                                ]}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Company Name"}
                                name="company_name"
                                placeholder="Enter company name"
                                required={false}
                                message={"Company name is required"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Trading Name / DBA"}
                                name="trading_name"
                                placeholder="Trading name or Doing Business As"
                                required={false}
                                message={"Enter trading name if applicable"}
                            />
                        </div>
                        <div className={style.form_inputBox}>
                            <FormInput
                                className="mx-1"
                                label={"NTN No"}
                                name="ntn_no"
                                placeholder="National Tax Number"
                                required={false}
                                message={"Enter NTN number"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"STRN"}
                                name="strn"
                                placeholder="Sales Tax Registration Number"
                                required={false}
                                message={"Enter STRN"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Website"}
                                name="website"
                                placeholder="https://example.com"
                                required={false}
                                message={"Enter website URL"}
                            />
                        </div>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Industry / Sector"}
                                placeholder="Select industry"
                                name="industry"
                                required={false}
                                message={"Please select industry/sector"}
                                options={[
                                    { value: "IT", label: "IT" },
                                    { value: "Healthcare", label: "Healthcare" },
                                    { value: "Manufacturing", label: "Manufacturing" },
                                    { value: "Education", label: "Education" },
                                    { value: "Finance", label: "Finance" },
                                    { value: "Retail", label: "Retail" },
                                    { value: "Construction", label: "Construction" },
                                    { value: "Energy", label: "Energy" },
                                    { value: "Telecommunications", label: "Telecommunications" },
                                    { value: "Transportation", label: "Transportation" },
                                    { value: "Other", label: "Other" },
                                ]}
                            />
                            <CustomDate
                                className="mx-1"
                                label={"Vendor Since"}
                                name="vendor_since"
                                placeholder="Select date"
                                required={false}
                                message={"Please select vendor since date"}
                                allowToday={false}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Status"}
                                placeholder="Select Status"
                                name="status"
                                required={false}
                                message={"Please select status"}
                                options={[
                                    { value: "Active", label: "Active" },
                                    { value: "Inactive", label: "Inactive" },
                                    { value: "Blacklisted", label: "Blacklisted" },
                                    { value: "Prospect", label: "Prospect" },
                                ]}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <SelectInput
                                className="mx-1"
                                label={"Preferred Vendor"}
                                placeholder="Is this a preferred vendor?"
                                name="preferred_vendor"
                                required={false}
                                message={"Please specify preferred status"}
                                options={[
                                    { value: 1, label: "Yes" },
                                    { value: 0, label: "No" },
                                ]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Parent Vendor"}
                                placeholder="Select parent vendor (if any)"
                                name="parent_vendor"
                                required={false}
                                showSearch={true}
                                message={"Select parent vendor for corporate groups"}
                                options={vendorsList?.map((item) => ({
                                    value: item.id,
                                    label: `${item.company_name} (${item.vendor_code})`
                                }))}
                            />
                            <SelectInput
                                className="mx-1"
                                label={"Currency Preference"}
                                placeholder="Default currency for POs"
                                name="currency_preference"
                                required={false}
                                message={"Please select default currency"}
                                options={[
                                    { value: "USD", label: "USD - US Dollar" },
                                    { value: "EUR", label: "EUR - Euro" },
                                    { value: "GBP", label: "GBP - British Pound" },
                                    { value: "INR", label: "INR - Indian Rupee" },
                                    { value: "PKR", label: "PKR - Pakistani Rupee" },
                                    { value: "AED", label: "AED - UAE Dirham" },
                                    { value: "SAR", label: "SAR - Saudi Riyal" },
                                    { value: "other", label: "Other" },
                                ]}
                            />
                        </div>


                        <div style={{ display: showMore ? 'block' : 'none' }}>
                            <Form.List name="contacts">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map((field, index) => (
                                            <div key={field.key} style={{ marginBottom: '30px', borderBottom: '1px dashed #ccc', paddingBottom: '20px' }}>
                                                <h5 className={style.form_checkBoxHeading}>
                                                    Contact Details #{index + 1}
                                                    {index === 0 && (
                                                        <CiSquarePlus
                                                            style={{ cursor: 'pointer', marginLeft: '8px', fontSize: '24px', verticalAlign: 'middle' }}
                                                            onClick={() => add()}
                                                        />
                                                    )}

                                                    {index > 0 && (
                                                        <CiSquareMinus
                                                            style={{ cursor: 'pointer', marginLeft: '8px', color: '#ff4d4f', fontSize: '24px', verticalAlign: 'middle' }}
                                                            onClick={() => remove(field.name)}
                                                        />
                                                    )}
                                                </h5>

                                                <div className={style.form_inputBox}>
                                                    <SelectInput
                                                        className="mx-1"
                                                        label={"Solutation"}
                                                        placeholder="Select Solutation"
                                                        name={[field.name, 'solutation']}
                                                        required={false}
                                                        message={"Please select solutation"}
                                                        options={[
                                                            { value: "Mr.", label: "Mr." },
                                                            { value: "Ms.", label: "Ms." },
                                                            { value: "Mrs.", label: "Mrs." },
                                                            { value: "Dr.", label: "Dr." },
                                                            { value: "Prof.", label: "Prof." },
                                                            { value: "Engr.", label: "Engr." },
                                                            { value: "Other", label: "Other" },
                                                        ]}
                                                    />

                                                    <FormInput
                                                        className="mx-1"
                                                        label={"First Name"}
                                                        name={[field.name, 'first_name']}
                                                        placeholder="Enter first name"
                                                        required={false}
                                                        message={"First name is required"}
                                                    />

                                                    <FormInput
                                                        className="mx-1"
                                                        label={"Last Name"}
                                                        name={[field.name, 'last_name']}
                                                        placeholder="Enter last name"
                                                        required={false}
                                                        message={"Last name is required"}
                                                    />

                                                    <FormInput
                                                        className="mx-1"
                                                        label={"Job Title"}
                                                        name={[field.name, 'job_title']}
                                                        placeholder="Enter job title"
                                                        required={false}
                                                        message={"Job title is required"}
                                                    />
                                                </div>
                                                <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                                                    <FormInput
                                                        className="mx-1"
                                                        label={"Email"}
                                                        name={[field.name, 'email']}
                                                        type="email"
                                                        placeholder="Enter email address"
                                                        required={false}
                                                        message={"Email is required"}
                                                    />

                                                    <FormInput
                                                        className="mx-1"
                                                        label={"Phone (Direct)"}
                                                        name={[field.name, 'phone_direct']}
                                                        type="tel"
                                                        placeholder="Enter direct phone number"
                                                        required={false}
                                                        message={"Enter direct phone number"}
                                                    />

                                                    <FormInput
                                                        className="mx-1"
                                                        label={"Mobile"}
                                                        name={[field.name, 'mobile']}
                                                        type="tel"
                                                        placeholder="Enter mobile number"
                                                        required={false}
                                                        message={"Mobile number is required"}
                                                    />
                                                    <SelectInput
                                                        className="mx-1"
                                                        label="Primary Contact"
                                                        name={[field.name, 'is_primary']}
                                                        required={false}
                                                        message="Please select primary contact"
                                                        options={[
                                                            { value: 1, label: "Yes" },
                                                            { value: 0, label: "No" },
                                                        ]}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </Form.List>
                            <h5 className={`${style.form_checkBoxHeading} mx-1`}>Billing Address</h5>
                            <div className={style.form_inputBox}>
                                <FormInput
                                    className="mx-1"
                                    label={"Address Line 1"}
                                    name="billing_address_line1"
                                    placeholder="Enter Billing address line 1"
                                    required={false}
                                />

                                <FormInput
                                    className="mx-1"
                                    label={"Address Line 2"}
                                    name="billing_address_line2"
                                    placeholder="Billing Enter address line 2"
                                    required={false}
                                    message={""}
                                />
                                <SelectInput
                                    className="mx-1"
                                    showSearch={true}
                                    name="billing_city"
                                    label="City"
                                    message={"City is required"}
                                    required={false}
                                    classNameColor={`${style.inputDefaultBg}`}
                                    options={selectedCities?.map((item) => ({
                                        value: `${item.stateCode}-${item.name}`,
                                        label: item.name,
                                    }))}
                                />

                            </div>
                            <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                                <SelectInput
                                    className="mx-1"
                                    showSearch={true}
                                    name="billing_state"
                                    label="Province"
                                    message={"Province is required"}
                                    required={false}
                                    classNameColor={`${style.inputDefaultBg}`}
                                    options={provinces?.map((item) => ({
                                        value: `${item.countryCode}-${item.name}`,
                                        label: item.name,
                                    }))}
                                />
                                <FormInput
                                    label={"Postal Code"}
                                    className={"mx-1 inputFlexBox"}
                                    name="billing_postal_code"
                                    placeholder="Postal Code"
                                    required={false}
                                />
                                <SelectInput
                                    className="mx-1"
                                    showSearch={true}
                                    name="billing_country"
                                    label="Country"
                                    message={"Country is required"}
                                    required={false}
                                    classNameColor={`${style.inputDefaultBg}`}
                                    options={countries?.map((item) => ({
                                        value: `${item.isoCode}-${item.name}`,
                                        label: item.name,
                                    }))}
                                />

                            </div>
                            <Form.List name="shipping_addresses">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map((field, index) => (
                                            <div key={field.key} style={{ marginBottom: '30px', borderBottom: '1px dashed #ccc', paddingBottom: '20px' }}>
                                                <h5 className={style.form_checkBoxHeading}>
                                                    Shipping Addresses #{index + 1}
                                                    {index === 0 && (
                                                        <CiSquarePlus
                                                            style={{ cursor: 'pointer', marginLeft: '8px', fontSize: '24px', verticalAlign: 'middle' }}
                                                            onClick={() => add()}
                                                        />
                                                    )}

                                                    {index > 0 && (
                                                        <CiSquareMinus
                                                            style={{ cursor: 'pointer', marginLeft: '8px', color: '#ff4d4f', fontSize: '24px', verticalAlign: 'middle' }}
                                                            onClick={() => remove(field.name)}
                                                        />
                                                    )}
                                                </h5>
                                                <div className={style.form_inputBox}>
                                                    <SelectInput
                                                        className="mx-1"
                                                        label={"Address Type"}
                                                        placeholder="Select Address Type"
                                                        name={[field.name, 'address_type']}
                                                        required={false}
                                                        message={"Please select address type"}
                                                        options={[
                                                            { value: "Headquarters", label: "Headquarters" },
                                                            { value: "Warehouse", label: "Warehouse" },
                                                            { value: "Billing", label: "Billing" },
                                                            { value: "Shipping", label: "Shipping" },
                                                            { value: "Other", label: "Other" },
                                                        ]}
                                                    />

                                                    <FormInput
                                                        className="mx-1"
                                                        label={"Address Line 1"}
                                                        name={[field.name, 'address_line1']}
                                                        placeholder="Enter address line 1"
                                                        required={false}
                                                        message={"Address line 1 is required"}
                                                    />

                                                    <FormInput
                                                        className="mx-1"
                                                        label={"Address Line 2"}
                                                        name={[field.name, 'address_line2']}
                                                        placeholder="Enter address line 2 (optional)"
                                                        required={false}
                                                        message={""}
                                                    />
                                                    <SelectInput
                                                        className="mx-1"
                                                        showSearch={true}
                                                        name={[field.name, 'state_province']}
                                                        label="Province"
                                                        message={"Province is required"}
                                                        required={false}
                                                        classNameColor={`${style.inputDefaultBg}`}
                                                        options={provinces?.map((item) => ({
                                                            value: `${item.countryCode}-${item.name}`,
                                                            label: item.name,
                                                        }))}
                                                    />
                                                </div>
                                                <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                                                    <SelectInput
                                                        className="mx-1"
                                                        showSearch={true}
                                                        name={[field.name, 'country']}
                                                        label="Country"
                                                        message={"Country is required"}
                                                        required={false}
                                                        classNameColor={`${style.inputDefaultBg}`}
                                                        options={countries?.map((item) => ({
                                                            value: `${item.isoCode}-${item.name}`,
                                                            label: item.name,
                                                        }))}
                                                    />
                                                    <FormInput
                                                        label={"Postal Code"}
                                                        className={"mx-1 inputFlexBox"}
                                                        name={[field.name, 'postal_code']}
                                                        placeholder="Postal Code"
                                                        required={false}
                                                    />
                                                    <SelectInput
                                                        className="mx-1"
                                                        showSearch={true}
                                                        name={[field.name, 'city']}
                                                        label="City"
                                                        message={"City is required"}
                                                        required={false}
                                                        classNameColor={`${style.inputDefaultBg}`}
                                                        options={selectedCities?.map((item) => ({
                                                            value: `${item.stateCode}-${item.name}`,
                                                            label: item.name,
                                                        }))}
                                                    />
                                                    <SelectInput
                                                        className="mx-1"
                                                        label="Default Shipping"
                                                        placeholder="Is this the default shipping address?"
                                                        name={[field.name, 'default_shipping']}
                                                        required={false}
                                                        message="Please select default shipping preference"
                                                        options={[
                                                            { value: "Yes", label: "Yes" },
                                                            { value: "No", label: "No" },
                                                        ]}
                                                    />
                                                </div>
                                                <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                                                    <FormInput
                                                        className="mx-1"
                                                        label="Contact Person at this location"
                                                        name={[field.name, 'contact_person']}
                                                        placeholder="Enter contact person name"
                                                        required={false}
                                                        message="Enter contact person"
                                                    />

                                                    <FormInput
                                                        className="mx-1"
                                                        label="Phone at this location"
                                                        name={[field.name, 'phone_location']}
                                                        type="tel"
                                                        placeholder="Enter phone number"
                                                        required={false}
                                                        message="Enter phone number"
                                                    />

                                                    <FormInput
                                                        className="mx-1"
                                                        label="Notes"
                                                        name={[field.name, 'notes']}
                                                        placeholder="Any additional notes about this address"
                                                        multiline={true}
                                                        rows={3}
                                                        required={false}
                                                        message="Enter notes if any"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </Form.List>
                            <h5 className={`${style.form_checkBoxHeading} mx-1`}>Financial & Payment</h5>
                            <div className={style.form_inputBox}>
                                <SelectInput
                                    className="mx-1"
                                    label={"Default Payment Terms"}
                                    placeholder="Select Payment Terms"
                                    name="payment_terms"
                                    required={false}
                                    message={"Please select payment terms"}
                                    options={[
                                        { value: "Due on Receipt", label: "Due on Receipt" },
                                        { value: "Net 15", label: "Net 15" },
                                        { value: "Net 30", label: "Net 30" },
                                        { value: "Net 45", label: "Net 45" },
                                        { value: "Net 60", label: "Net 60" },
                                        { value: "2/10 Net 30", label: "2/10 Net 30" },
                                        { value: "EOM", label: "End of Month" },
                                        { value: "COD", label: "Cash on Delivery" },
                                        { value: "Other", label: "Other" },
                                    ]}
                                />

                                <SelectInput
                                    className="mx-1"
                                    label={"Payment Method Preference"}
                                    placeholder="Select Payment Method"
                                    name="payment_method"
                                    required={false}
                                    message={"Please select payment method"}
                                    options={[
                                        { value: "Bank Transfer", label: "Bank Transfer" },
                                        { value: "Cheque", label: "Cheque" },
                                        { value: "Credit Card", label: "Credit Card" },
                                        { value: "Cash", label: "Cash" },
                                        { value: "PayPal", label: "PayPal" },
                                        { value: "Other", label: "Other" },
                                    ]}
                                />

                                <FormInput
                                    className="mx-1"
                                    label={"Bank Account Name"}
                                    name="bank_account_name"
                                    placeholder="Enter account holder name"
                                    required={false}
                                    message={"Enter bank account name"}
                                />

                                <FormInput
                                    className="mx-1"
                                    label={"Bank Name"}
                                    name="bank_name"
                                    placeholder="Enter bank name"
                                    required={false}
                                    message={"Enter bank name"}
                                />
                            </div>
                            <div className={style.form_inputBox}>
                                <FormInput
                                    className="mx-1"
                                    label={"Bank Account Number"}
                                    name="bank_account_number"
                                    placeholder="Enter account number"
                                    required={false}
                                    message={"Enter bank account number"}
                                />
                                <FormInput
                                    className="mx-1"
                                    label={"SWIFT / IBAN"}
                                    name="swift_iban"
                                    placeholder="Enter SWIFT code or IBAN"
                                    required={false}
                                    message={"Enter SWIFT/IBAN"}
                                />

                                <SelectInput
                                    className="mx-1"
                                    label={"Currency"}
                                    placeholder="Select Currency"
                                    name="currency"
                                    required={false}
                                    message={"Please select currency"}
                                    options={[
                                        { value: "USD", label: "USD - US Dollar" },
                                        { value: "EUR", label: "EUR - Euro" },
                                        { value: "GBP", label: "GBP - British Pound" },
                                        { value: "INR", label: "INR - Indian Rupee" },
                                        { value: "PKR", label: "PKR - Pakistani Rupee" },
                                        { value: "AED", label: "AED - UAE Dirham" },
                                        { value: "SAR", label: "SAR - Saudi Riyal" },
                                        { value: "Other", label: "Other" },
                                    ]}
                                />

                                <FormInput
                                    className="mx-1"
                                    label={"Credit Limit"}
                                    name="credit_limit"
                                    type="number"
                                    placeholder="Enter credit limit"
                                    required={false}
                                    message={"Enter credit limit if applicable"}
                                />
                            </div>
                            <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                                <FormInput
                                    className="mx-1"
                                    label={"Current Outstanding Balance"}
                                    name="outstanding_balance"
                                    type="number"
                                    placeholder="Auto-calculated from POs/invoices"
                                    required={false}
                                    readOnly={true}
                                    message={"Outstanding balance is auto-calculated"}
                                />

                                <FormInput
                                    className="mx-1"
                                    label={"Tax ID / VAT Number"}
                                    name="tax_id"
                                    placeholder="Enter Tax ID or VAT number"
                                    required={false}
                                    message={"Enter Tax ID/VAT for compliance"}
                                />
                            </div>

                            <h5 className={`${style.form_checkBoxHeading} mx-1`}>Procurement & Performance</h5>
                            <div className={style.form_inputBox}>
                                <SelectInput
                                    className="mx-1"
                                    label={"Vendor Category"}
                                    placeholder="Select Vendor Category"
                                    name="vendor_category"
                                    required={false}
                                    message={"Please select vendor category"}
                                    options={[
                                        { value: "Hardware", label: "Hardware" },
                                        { value: "Software", label: "Software" },
                                        { value: "Services", label: "Services" },
                                        { value: "Raw Materials", label: "Raw Materials" },
                                        { value: "Consulting", label: "Consulting" },
                                        { value: "Logistics", label: "Logistics" },
                                        { value: "Other", label: "Other" },
                                    ]}
                                />

                                <SelectInput
                                    className="mx-1"
                                    label={"Product/Service Categories Supplied"}
                                    placeholder="Select categories"
                                    name="product_categories"
                                    required={false}
                                    isMulti={true}
                                    message={"Please select at least one category"}
                                    options={[
                                        { value: "Hardware", label: "Hardware" },
                                        { value: "Software", label: "Software" },
                                        { value: "Services", label: "Services" },
                                        { value: "Raw Materials", label: "Raw Materials" },
                                        { value: "Consulting", label: "Consulting" },
                                        { value: "Logistics", label: "Logistics" },
                                        { value: "Other", label: "Other" },
                                    ]}
                                />

                                <FormInput
                                    className="mx-1"
                                    label={"Minimum Order Value"}
                                    name="min_order_value"
                                    type="number"
                                    step="0.01"
                                    placeholder="Enter minimum order value"
                                    required={false}
                                    message={"Enter minimum order amount"}
                                />

                                <FormInput
                                    className="mx-1"
                                    label={"Lead Time (days)"}
                                    name="lead_time"
                                    type="number"
                                    min="0"
                                    step="1"
                                    placeholder="Typical delivery lead time in days"
                                    required={false}
                                    message={"Lead time is required"}
                                />

                                <FormInput
                                    className="mx-1"
                                    label={"Shipping Method Preferred"}
                                    name="shipping_method"
                                    placeholder="e.g., FedEx, DHL, Air Freight, Sea Freight"
                                    required={false}
                                    message={"Enter preferred shipping method"}
                                />
                            </div>
                            <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                                <FormInput
                                    className="mx-1"
                                    label={"Performance Rating"}
                                    name="performance_rating"
                                    type="number"
                                    min="1"
                                    max="5"
                                    step="0.1"
                                    placeholder="Average rating from reviews (1-5)"
                                    required={false}
                                    message={"Enter rating between 1 and 5"}
                                />

                                <FormInput
                                    className="mx-1"
                                    label={"On-Time Delivery %"}
                                    name="on_time_delivery"
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="0.1"
                                    placeholder="On-time delivery percentage"
                                    required={false}
                                    message={"Enter percentage (0-100)"}
                                />

                                <FormInput
                                    className="mx-1"
                                    label={"Quality Rating"}
                                    name="quality_rating"
                                    type="number"
                                    min="1"
                                    max="5"
                                    step="0.1"
                                    placeholder="Quality rating (1-5)"
                                    required={false}
                                    message={"Enter rating between 1 and 5"}
                                />
                                <SelectInput
                                    className="mx-1"
                                    label={"Contractor / Subcontractor"}
                                    placeholder="Select contractor type"
                                    name="contractor_type"
                                    required={false}
                                    message={"Select if applicable"}
                                    options={[
                                        { value: "Contractor", label: "Contractor" },
                                        { value: "Subcontractor", label: "Subcontractor" },
                                        { value: "Both", label: "Both" },
                                        { value: "Not Applicable", label: "Not Applicable" },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={style.vendor_modalBtns}>
                        <ShowMore
                            type="link"
                            onClick={toggleShowMore}
                            className={"mx-1 mt-5"}
                            title={showMore ? 'Show Less' : 'Show More'}
                        />
                        <ActionButton
                            className={"mx-1 mt-2 w-auto"}
                            title={loading ? "Loading" : code?.mode == "Edit" ? "Update Vendor" : "Create"} loading={loading}
                        />
                    </div>
                </Form>
            </Modal>
        </>
    )
}


function mapStateToProps(state) {
    return {
        Red_Vendors: state.Red_Vendors,
    };
}
const AllActions = {
    ...VENDORS_ACTIONS,
};
export default connect(mapStateToProps, AllActions)(VendorForm);