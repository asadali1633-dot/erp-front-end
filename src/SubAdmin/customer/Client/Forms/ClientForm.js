import React, { useState } from 'react'
import style from './form.module.css'
import { Form, Modal, Table } from 'antd';
import { FormInput, FormInputTextArea } from '../../../../Components/Inputs/Inputs';
import { SelectInput } from '../../../../Components/Select/Select';
import { Button } from '../../../../Components/Button/Button';
import { LuArrowDownUp } from "react-icons/lu";
import { HiDotsVertical } from "react-icons/hi";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Country, State, City } from "country-state-city";
import CustomDate from '../../../../Components/Date/CustomDate';
import UploadFile from '../../../../Components/File/UploadFile';
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";

function ClientForm({
    ClientModalForm,
    setClientForm
}) {
    const [form] = Form.useForm();
    const countries = Country.getAllCountries();
    const codes = ["PK", "IN", "US", "AS"];
    const provinces = codes.flatMap((code) => State.getStatesOfCountry(code));
    let selectedCities = [];
    codes.forEach((code) => {
        const cities = City.getCitiesOfCountry(code);
        selectedCities = [...selectedCities, ...cities];
    });

    const handleOk = () => {
        setClientForm(false);
    };
    const handleCancel = () => {
        setClientForm(false);
    };

    const columns = [
        {
            title: "SKU/ Model",
            dataIndex: "SKU_Model",
            render: () => (
                <div>
                    <FormInput
                        className=""
                        type="text"
                        placeholder="Type here"
                        required
                    />
                    <FormInput
                        className="mt-1"
                        type="text"
                        placeholder="Type here"
                        required
                    />
                </div>
            ),
        },
        {
            title: "Description",
            dataIndex: "Description",
            render: () => (
                <div>
                    <FormInput
                        className=""
                        type="text"
                        placeholder="Type here"
                        required
                    />
                    <FormInput
                        className="mt-1"
                        type="text"
                        placeholder="Type here"
                        required
                    />
                </div>
            ),
        },
        {
            title: "Unit Cost",
            dataIndex: "Unit Cost",
            render: () => (
                <div>
                    <FormInput
                        className=""
                        type="text"
                        placeholder="Type here"
                        required
                    />
                    <FormInput
                        className="mt-1"
                        type="text"
                        placeholder="Type here"
                        required
                    />
                </div>
            ),
        },
        {
            title: "Quantity",
            dataIndex: "Quantity",
            render: () => (
                <div>
                    <FormInput
                        className=""
                        type="text"
                        placeholder="Type here"
                        required
                    />
                    <FormInput
                        className="mt-1"
                        type="text"
                        placeholder="Type here"
                        required
                    />
                </div>
            ),
        },
        {
            title: "Tax",
            dataIndex: "Tax",
            render: () => (
                <div>
                    <FormInput
                        className=""
                        type="text"
                        placeholder="Type here"
                        required
                    />
                    <FormInput
                        className="mt-1"
                        type="text"
                        placeholder="Type here"
                        required
                    />
                </div>
            ),
        },
        {
            title: "Total",
            dataIndex: "Total",
            render: () => (
                <div>
                    <FormInput
                        className=""
                        type="text"
                        placeholder="Type here"
                        required
                    />
                    <FormInput
                        className="mt-1"
                        type="text"
                        placeholder="Type here"
                        required
                    />
                </div>
            ),
        },
        {
            title: (
                <LuArrowDownUp style={{ fontSize: "22px", cursor: "pointer" }} />
            ),
            dataIndex: "yah",
            render: () => (
                <div className={`${style.form_dotsIcons}`}>
                    <HiDotsVertical />
                    <HiDotsVertical />
                </div>
            ),
        },
    ];

    // 👇 sirf ek dummy row do
    const data = [
        { key: "1" }
    ];
    return (
        <>
            <Modal
                title=""
                closable={{ 'aria-label': 'Custom Close Button' }}
                className={`${style.form_modalWidth} modalBgColor`}
                open={ClientModalForm}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                width={"100%"}
            >
                <Form
                    form={form}
                    className={`${style.form_modalMainBox} mt-3`}
                    layout="vertical"
                // onFinish={handleForm}
                >
                    <div className={style.modalHardwareScroll}>
                        <div className={style.QR_box}>
                            <h5 className="mx-1">Client Form</h5>
                        </div>
                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Basic Information</h5>
                        <div className={style.form_inputBox}>
                            {/* Basic Information */}
                            <FormInput
                                className="mx-1"
                                label={"Client ID"}
                                name="client_id"
                                placeholder="Auto-generated (e.g., IT-001)"
                                required={false}
                                readOnly={true}
                                message={"Client ID is auto-generated"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Client Type"}
                                placeholder="Select client type"
                                name="client_type"
                                required={true}
                                message={"Please select client type"}
                                options={[
                                    { value: "Individual", label: "Individual" },
                                    { value: "Company", label: "Company" },
                                    { value: "Government", label: "Government" },
                                    { value: "Non-profit", label: "Non-profit" },
                                ]}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Company Name"}
                                name="company_name"
                                placeholder="Enter legal company name (if company)"
                                required={false}
                                message={"Enter company name if applicable"}
                            />
                        </div>
                        <div className={style.form_inputBox}>
                            <FormInput
                                className="mx-1"
                                label={"Trading Name / DBA"}
                                name="trading_name"
                                placeholder="Enter trading name (if different)"
                                required={false}
                                message={"Enter trading name if applicable"}
                            />
                            <FormInput
                                className="mx-1"
                                label={"Registration Number"}
                                name="registration_number"
                                placeholder="Company registration / VAT ID / Tax ID"
                                required={false}
                                message={"Enter registration number if applicable"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"National Tax Number (NTN)"}
                                name="ntn"
                                placeholder="Enter NTN for invoicing compliance"
                                required={false}
                                message={"Enter NTN if applicable"}
                            />
                        </div>
                        <div className={style.form_inputBox}>
                            <FormInput
                                className="mx-1"
                                label={"Website"}
                                name="website"
                                type="url"
                                placeholder="https://example.com"
                                required={false}
                                message={"Enter website URL if applicable"}
                            />

                            {/* Industry & Client Details */}
                            <SelectInput
                                className="mx-1"
                                label={"Industry / Sector"}
                                placeholder="Select industry"
                                name="industry"
                                required={true}
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
                                label={"Client Since"}
                                name="client_since"
                                placeholder="Date of creation"
                                required={true}
                                readOnly={true}
                                message={"Client since date is auto-set"}
                                allowToday={true}
                            />
                        </div>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Status"}
                                placeholder="Select client status"
                                name="status"
                                required={true}
                                message={"Please select status"}
                                options={[
                                    { value: "Active", label: "Active" },
                                    { value: "Inactive", label: "Inactive" },
                                    { value: "Prospect", label: "Prospect" },
                                    { value: "Blacklisted", label: "Blacklisted" },
                                ]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Client Source"}
                                placeholder="Select client source"
                                name="client_source"
                                required={false}
                                message={"Please select how client was acquired"}
                                options={[
                                    { value: "Referral", label: "Referral" },
                                    { value: "Website", label: "Website" },
                                    { value: "Trade Show", label: "Trade Show" },
                                    { value: "Cold Call", label: "Cold Call" },
                                    { value: "Social Media", label: "Social Media" },
                                    { value: "Advertisement", label: "Advertisement" },
                                    { value: "Existing Client", label: "Existing Client" },
                                    { value: "Other", label: "Other" },
                                ]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Parent Client"}
                                placeholder="Select parent client (if any)"
                                name="parent_client"
                                required={false}
                                showSearch={true}
                                message={"Select parent client for corporate groups"}
                                options={[]} // Will be populated from Client DB
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <SelectInput
                                className="mx-1"
                                label={"Language Preference"}
                                placeholder="Select language"
                                name="language"
                                required={false}
                                message={"Select preferred language for communications"}
                                options={[
                                    { value: "English", label: "English" },
                                    { value: "Spanish", label: "Spanish" },
                                    { value: "French", label: "French" },
                                    { value: "German", label: "German" },
                                    { value: "Chinese", label: "Chinese" },
                                    { value: "Arabic", label: "Arabic" },
                                    { value: "Hindi", label: "Hindi" },
                                    { value: "Urdu", label: "Urdu" },
                                    { value: "Other", label: "Other" },
                                ]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Currency Preference"}
                                placeholder="Select default currency"
                                name="currency"
                                required={true}
                                message={"Please select default currency for quotes/invoices"}
                                options={[
                                    { value: "USD", label: "USD - US Dollar" },
                                    { value: "EUR", label: "EUR - Euro" },
                                    { value: "GBP", label: "GBP - British Pound" },
                                    { value: "INR", label: "INR - Indian Rupee" },
                                    { value: "PKR", label: "PKR - Pakistani Rupee" },
                                    { value: "AED", label: "AED - UAE Dirham" },
                                    { value: "SAR", label: "SAR - Saudi Riyal" },
                                    { value: "CAD", label: "CAD - Canadian Dollar" },
                                    { value: "AUD", label: "AUD - Australian Dollar" },
                                    { value: "JPY", label: "JPY - Japanese Yen" },
                                    { value: "CNY", label: "CNY - Chinese Yuan" },
                                    { value: "Other", label: "Other" },
                                ]}
                            />
                        </div>

                        <Form>
                            <Form.List name="contacts" initialValue={[{}]}>
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map((field, index) => (
                                            <div key={field.key} style={{ marginBottom: '30px', borderBottom: '1px dashed #ccc', paddingBottom: '20px' }}>
                                                <h5 className={style.form_checkBoxHeading}>
                                                    Point of Contact Details #{index + 1}
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
                                                    <FormInput
                                                        className="mx-1"
                                                        label="First Name"
                                                        name={[field.name, 'first_name']}
                                                        placeholder="Enter first name"
                                                        required
                                                        message="First name is required"
                                                    />
                                                    <FormInput
                                                        className="mx-1"
                                                        label="Last Name"
                                                        name={[field.name, 'last_name']}
                                                        placeholder="Enter last name"
                                                        required
                                                        message="Last name is required"
                                                    />
                                                    <FormInput
                                                        className="mx-1"
                                                        label="Job Title"
                                                        name={[field.name, 'job_title']}
                                                        placeholder="Enter job title"
                                                        required
                                                        message="Job title is required"
                                                    />
                                                    <FormInput
                                                        className="mx-1"
                                                        label="Department"
                                                        name={[field.name, 'department']}
                                                        placeholder="Enter department"
                                                        required={false}
                                                        message="Enter department if applicable"
                                                    />
                                                </div>
                                                <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                                                    <FormInput
                                                        className="mx-1"
                                                        label="Email"
                                                        name={[field.name, 'email']}
                                                        type="email"
                                                        placeholder="Enter email address"
                                                        required
                                                        message="Email is required"
                                                    />
                                                    <FormInput
                                                        className="mx-1"
                                                        label="Phone (Direct)"
                                                        name={[field.name, 'phone_direct']}
                                                        type="tel"
                                                        placeholder="Enter direct phone number"
                                                        required={false}
                                                        message="Enter direct phone number"
                                                    />
                                                    <FormInput
                                                        className="mx-1"
                                                        label="Mobile"
                                                        name={[field.name, 'mobile']}
                                                        type="tel"
                                                        placeholder="Enter mobile number"
                                                        required
                                                        message="Mobile number is required"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </Form.List>
                        </Form>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Billing Address</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                className="mx-1"
                                label={"Address Line 1"}
                                name="address_line1"
                                placeholder="Enter address line 1"
                                required={false}
                                message={"Please enter address line 1"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Address Line 2"}
                                name="address_line2"
                                placeholder="Enter address line 2 (optional)"
                                required={false}
                                message={""}
                            />

                            <FormInput
                                className="mx-1"
                                label={"City"}
                                name="city"
                                placeholder="Enter city"
                                required={false}
                                message={"Please enter city"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                className="mx-1"
                                label={"State / Province"}
                                name="state"
                                placeholder="Enter state or province"
                                required={false}
                                message={"Please enter state/province"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Postal / Zip Code"}
                                name="postal_code"
                                placeholder="Enter postal or zip code"
                                required={false}
                                message={"Please enter postal/zip code"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Country"}
                                placeholder="Select country"
                                name="country"
                                required={false}
                                showSearch={true}
                                message={"Please select country"}
                                options={[
                                    { value: "United States", label: "United States" },
                                    { value: "Canada", label: "Canada" },
                                    { value: "United Kingdom", label: "United Kingdom" },
                                    { value: "Australia", label: "Australia" },
                                    { value: "Germany", label: "Germany" },
                                    { value: "France", label: "France" },
                                    { value: "India", label: "India" },
                                    { value: "Pakistan", label: "Pakistan" },
                                    { value: "UAE", label: "United Arab Emirates" },
                                    { value: "Saudi Arabia", label: "Saudi Arabia" },
                                    { value: "China", label: "China" },
                                    { value: "Japan", label: "Japan" },
                                    { value: "Singapore", label: "Singapore" },
                                    { value: "Malaysia", label: "Malaysia" },
                                    { value: "Other", label: "Other" },
                                ]}
                            />
                        </div>
                        
                        <Form.List name="shipping_addresses" initialValue={[{}]}>
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map((field, index) => (
                                        <div key={field.key} style={{ marginBottom: '30px', borderBottom: '1px dashed #ccc', paddingBottom: '20px' }}>
                                            <h5 className={`${style.form_checkBoxHeading} mx-1`}>
                                                Shipping Address #{index + 1}
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
                                                <FormInput
                                                    className="mx-1"
                                                    label="Address Name / Identifier"
                                                    name={[field.name, 'address_name']}
                                                    placeholder="e.g., Headquarters, Warehouse A"
                                                    required={false}
                                                    message="Enter address identifier"
                                                />

                                                <FormInput
                                                    className="mx-1"
                                                    label="Address Line 1"
                                                    name={[field.name, 'address_line1']}
                                                    placeholder="Enter address line 1"
                                                    required={false}
                                                    message="Please enter address line 1"
                                                />

                                                <FormInput
                                                    className="mx-1"
                                                    label="Address Line 2"
                                                    name={[field.name, 'address_line2']}
                                                    placeholder="Enter address line 2 (optional)"
                                                    required={false}
                                                    message=""
                                                />

                                                <SelectInput
                                                    className="mx-1"
                                                    showSearch={true}
                                                    name={[field.name, 'city']}
                                                    label="City"
                                                    message="City is required"
                                                    required={true}
                                                    classNameColor={`${style.inputDefaultBg}`}
                                                    options={selectedCities?.map((item) => ({
                                                        value: `${item.stateCode}-${item.name}`,
                                                        label: item.name,
                                                    }))}
                                                />
                                            </div>
                                            <div className={style.form_inputBox}>
                                                <SelectInput
                                                    className="mx-1"
                                                    showSearch={true}
                                                    name={[field.name, 'state_province']}
                                                    label="Province"
                                                    message="Province is required"
                                                    required={true}
                                                    classNameColor={`${style.inputDefaultBg}`}
                                                    options={provinces?.map((item) => ({
                                                        value: `${item.countryCode}-${item.name}`,
                                                        label: item.name,
                                                    }))}
                                                />

                                                <FormInput
                                                    label="Postal / Zip Code"
                                                    className="mx-1 inputFlexBox"
                                                    name={[field.name, 'postal_code']}
                                                    placeholder="Postal Code"
                                                    required={false}
                                                />

                                                <SelectInput
                                                    className="mx-1"
                                                    showSearch={true}
                                                    name={[field.name, 'country']}
                                                    label="Country"
                                                    message="Country is required"
                                                    required={true}
                                                    classNameColor={`${style.inputDefaultBg}`}
                                                    options={countries?.map((item) => ({
                                                        value: `${item.isoCode}-${item.name}`,
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

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Financial & Credit</h5>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Default Payment Terms"}
                                placeholder="Select payment terms"
                                name="payment_terms"
                                required={true}
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
                                ]}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Credit Limit"}
                                name="credit_limit"
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="Maximum outstanding balance allowed"
                                required={false}
                                message={"Enter credit limit if applicable"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Credit Currency"}
                                placeholder="Select credit currency"
                                name="credit_currency"
                                required={false}
                                message={"Please select credit currency"}
                                options={[
                                    { value: "USD", label: "USD - US Dollar" },
                                    { value: "EUR", label: "EUR - Euro" },
                                    { value: "GBP", label: "GBP - British Pound" },
                                    { value: "INR", label: "INR - Indian Rupee" },
                                    { value: "PKR", label: "PKR - Pakistani Rupee" },
                                    { value: "AED", label: "AED - UAE Dirham" },
                                    { value: "Other", label: "Other" },
                                ]}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Current Outstanding Balance"}
                                name="outstanding_balance"
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="Auto-calculated from unpaid invoices"
                                required={false}
                                readOnly={true}
                                message={"Outstanding balance is auto-calculated"}
                            />
                        </div>
                        <div className={style.form_inputBox}>
                            <FormInput
                                className="mx-1"
                                label={"Available Credit"}
                                name="available_credit"
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="Auto-calculated (Credit Limit - Outstanding)"
                                required={false}
                                readOnly={true}
                                message={"Available credit is auto-calculated"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Credit Risk Rating"}
                                placeholder="Select risk rating"
                                name="credit_risk_rating"
                                required={false}
                                message={"Please select credit risk rating"}
                                options={[
                                    { value: "Low", label: "Low" },
                                    { value: "Medium", label: "Medium" },
                                    { value: "High", label: "High" },
                                ]}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Credit Check Date"}
                                name="credit_check_date"
                                placeholder="Select last credit check date"
                                required={false}
                                message={"Select date of last credit check"}
                                allowToday={true}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Credit Check Reference"}
                                name="credit_check_reference"
                                placeholder="Enter credit check reference number"
                                required={false}
                                message={"Enter credit check reference if applicable"}
                            />
                        </div>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Payment Method Preference"}
                                placeholder="Select payment method"
                                name="payment_method"
                                required={false}
                                message={"Please select preferred payment method"}
                                options={[
                                    { value: "Bank Transfer", label: "Bank Transfer" },
                                    { value: "Credit Card", label: "Credit Card" },
                                    { value: "Cheque", label: "Cheque" },
                                    { value: "Cash", label: "Cash" },
                                    { value: "Direct Debit", label: "Direct Debit" },
                                    { value: "Other", label: "Other" },
                                ]}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Bank Account Details (if direct debit)"}
                                name="bank_account_details"
                                placeholder="Enter bank account details for direct debit"
                                multiline={true}
                                rows={2}
                                required={false}
                                message={"Enter bank account details if direct debit"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"NTN"}
                                name="ntn"
                                placeholder="National Tax Number"
                                required={false}
                                message={"Enter NTN if applicable"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"STRN"}
                                name="strn"
                                placeholder="Sales Tax Registration Number"
                                required={false}
                                message={"Enter STRN if applicable"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <UploadFile
                                className="mx-1 inputFlexBox"
                                label={"Tax Exemption Certificate"}
                                name="tax_exemption_certificate"
                                title={"Upload Certificate"}
                                required={false}
                                multiple={false}
                                accept=".pdf,.jpg,.jpeg,.png"
                                message={"Upload tax exemption certificate if applicable"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Invoicing Delivery Method"}
                                placeholder="Select invoicing method"
                                name="invoicing_delivery_method"
                                required={false}
                                message={"Please select invoicing delivery method"}
                                options={[
                                    { value: "Email", label: "Email" },
                                    { value: "Postal", label: "Postal" },
                                    { value: "EDI", label: "EDI" },
                                    { value: "Portal", label: "Client Portal" },
                                ]}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Invoice Email Recipients"}
                                name="invoice_emails"
                                type="email"
                                placeholder="Enter comma-separated email addresses"
                                required={false}
                                message={"Enter email addresses for invoices"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Dunning / Reminder Contact"}
                                placeholder="Select reminder contact"
                                name="dunning_contact"
                                required={false}
                                showSearch={true}
                                message={"Select who receives overdue notices"}
                                options={[]}
                            />

                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Contracts & Agreements</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                className="mx-1"
                                label={"Master Service Agreement Reference"}
                                name="msa_reference"
                                placeholder="Enter MSA reference number"
                                required={false}
                                message={"Enter MSA reference if applicable"}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"MSA Start Date"}
                                name="msa_start_date"
                                placeholder="Select MSA start date"
                                required={false}
                                message={"Select MSA start date"}
                                allowToday={true}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"MSA End Date"}
                                name="msa_end_date"
                                placeholder="Select MSA end date"
                                required={false}
                                message={"Select MSA end date"}
                                allowToday={true}
                            />

                            <UploadFile
                                className="mx-1 inputFlexBox"
                                label={"MSA Document"}
                                name="msa_document"
                                title={"Upload MSA Document"}
                                required={false}
                                multiple={false}
                                accept=".pdf,.doc,.docx"
                                message={"Upload MSA document if available"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <SelectInput
                                className="mx-1"
                                label={"NDA Signed"}
                                placeholder="Has NDA been signed?"
                                name="nda_signed"
                                required={false}
                                message={"Please select if NDA is signed"}
                                options={[
                                    { value: "Yes", label: "Yes" },
                                    { value: "No", label: "No" },
                                ]}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"NDA Date"}
                                name="nda_date"
                                placeholder="Select NDA signing date"
                                required={false}
                                message={"Select NDA date if signed"}
                                allowToday={true}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"NDA Expiry"}
                                name="nda_expiry"
                                placeholder="Select NDA expiry date"
                                required={false}
                                message={"Select NDA expiry date if applicable"}
                                allowToday={true}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Preferred Vendor / Partner Status"}
                                placeholder="Is this a preferred vendor/partner?"
                                name="preferred_status"
                                required={false}
                                message={"Please select preferred status"}
                                options={[
                                    { value: "Yes", label: "Yes" },
                                    { value: "No", label: "No" },
                                ]}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Communication Log</h5>
                        <div className={style.form_inputBox}>
                            <CustomDate
                                className="mx-1"
                                label={"Date/Time"}
                                name="activity_datetime"
                                placeholder="Select date and time"
                                required={true}
                                message={"Please select date and time"}
                                showTime={true}
                                allowToday={true}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Type"}
                                placeholder="Select activity type"
                                name="activity_type"
                                required={true}
                                message={"Please select activity type"}
                                options={[
                                    { value: "Call", label: "Call" },
                                    { value: "Email", label: "Email" },
                                    { value: "Meeting", label: "Meeting" },
                                    { value: "Site Visit", label: "Site Visit" },
                                    { value: "Other", label: "Other" },
                                ]}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Subject"}
                                name="subject"
                                placeholder="Enter subject/title"
                                required={true}
                                message={"Subject is required"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Notes"}
                                name="notes"
                                placeholder="Enter detailed notes"
                                multiline={true}
                                rows={4}
                                required={false}
                                message={"Enter notes"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <SelectInput
                                className="mx-1"
                                label={"NDA Signed"}
                                placeholder="Has NDA been signed?"
                                name="nda_signed"
                                required={false}
                                message={"Please select if NDA is signed"}
                                options={[
                                    { value: "Yes", label: "Yes" },
                                    { value: "No", label: "No" },
                                ]}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"NDA Date"}
                                name="nda_date"
                                placeholder="Select NDA signing date"
                                required={false}
                                message={"Select NDA date if signed"}
                                allowToday={true}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"NDA Expiry"}
                                name="nda_expiry"
                                placeholder="Select NDA expiry date"
                                required={false}
                                message={"Select NDA expiry date if applicable"}
                                allowToday={true}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Preferred Vendor / Partner Status"}
                                placeholder="Is this a preferred vendor/partner?"
                                name="preferred_status"
                                required={false}
                                message={"Please select preferred status"}
                                options={[
                                    { value: "Yes", label: "Yes" },
                                    { value: "No", label: "No" },
                                ]}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Integration Links</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                className="mx-1"
                                label={"Total Lifetime Revenue"}
                                name="total_lifetime_revenue"
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="Auto-calculated from paid invoices"
                                required={false}
                                readOnly={true}
                                message={"Total lifetime revenue is auto-calculated"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Number of Quotes"}
                                name="number_of_quotes"
                                type="number"
                                min="0"
                                step="1"
                                placeholder="Count of quotations sent"
                                required={false}
                                readOnly={true}
                                message={"Number of quotes is auto-calculated"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Number of Projects"}
                                name="number_of_projects"
                                type="number"
                                min="0"
                                step="1"
                                placeholder="Count of projects for this client"
                                required={false}
                                readOnly={true}
                                message={"Number of projects is auto-calculated"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Number of Service Orders"}
                                name="number_of_service_orders"
                                type="number"
                                min="0"
                                step="1"
                                placeholder="Count of service orders"
                                required={false}
                                readOnly={true}
                                message={"Number of service orders is auto-calculated"}
                            />
                        </div>
                        <div className={style.form_inputBox}>
                            <FormInput
                                className="mx-1"
                                label={"Number of Assets Deployed"}
                                name="number_of_assets"
                                type="number"
                                min="0"
                                step="1"
                                placeholder="Count of assets assigned to client"
                                required={false}
                                readOnly={true}
                                message={"Number of assets is auto-calculated"}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Last Quote Date"}
                                name="last_quote_date"
                                placeholder="Auto-filled from latest quote"
                                required={false}
                                readOnly={true}
                                message={"Last quote date is auto-filled"}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Last Invoice Date"}
                                name="last_invoice_date"
                                placeholder="Auto-filled from latest invoice"
                                required={false}
                                readOnly={true}
                                message={"Last invoice date is auto-filled"}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Last Project Date"}
                                name="last_project_date"
                                placeholder="Auto-filled from latest project"
                                required={false}
                                readOnly={true}
                                message={"Last project date is auto-filled"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <CustomDate
                                className="mx-1"
                                label={"Last Service Date"}
                                name="last_service_date"
                                placeholder="Auto-filled from latest service order"
                                required={false}
                                readOnly={true}
                                message={"Last service date is auto-filled"}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Next Follow-up Date"}
                                name="next_followup_date"
                                placeholder="Select or auto-suggested follow-up date"
                                required={false}
                                readOnly={false}
                                message={"Set next follow-up date"}
                                allowToday={true}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Administrative</h5>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Account Manager / Sales Rep"}
                                placeholder="Select account manager"
                                name="account_manager"
                                required={true}
                                showSearch={true}
                                message={"Please select primary account manager"}
                                options={[]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Secondary Account Manager"}
                                placeholder="Select secondary account manager"
                                name="secondary_account_manager"
                                required={false}
                                showSearch={true}
                                message={"Select secondary account manager if applicable"}
                                options={[]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Created By"}
                                name="created_by"
                                placeholder="Auto-filled with current user"
                                required={false}
                                readOnly={true}
                                showSearch={true}
                                message={"Created by is auto-filled"}
                                options={[]}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Created Date"}
                                name="created_date"
                                placeholder="Auto-filled with current date/time"
                                required={false}
                                readOnly={true}
                                showTime={true}
                                message={"Created date is auto-filled"}
                            />
                        </div>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Last Modified By"}
                                name="last_modified_by"
                                placeholder="Auto-filled with current user"
                                required={false}
                                readOnly={true}
                                showSearch={true}
                                message={"Last modified by is auto-filled"}
                                options={[]}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Last Modified Date"}
                                name="last_modified_date"
                                placeholder="Auto-filled with current date/time"
                                required={false}
                                readOnly={true}
                                showTime={true}
                                message={"Last modified date is auto-filled"}
                            />

                            <UploadFile
                                className="mx-1 inputFlexBox"
                                label={"Attachments"}
                                name="attachments"
                                title={"Upload Files"}
                                required={false}
                                multiple={true}
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                message={"Upload contracts, forms, correspondence"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Notes / Internal Remarks"}
                                name="internal_notes"
                                placeholder="Enter internal notes (not visible to client)"
                                multiline={true}
                                rows={4}
                                required={false}
                                message={"Enter internal remarks"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <CustomDate
                                className="mx-1"
                                label={"GDPR / Privacy Consent Date"}
                                name="gdpr_consent_date"
                                placeholder="Select consent date"
                                required={false}
                                message={"Select date when privacy consent was obtained"}
                                allowToday={true}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Marketing Email Opt-out"}
                                placeholder="Has client opted out of marketing emails?"
                                name="marketing_opt_out"
                                required={false}
                                message={"Please select marketing email preference"}
                                options={[
                                    { value: "Yes", label: "Yes - Opted Out" },
                                    { value: "No", label: "No - Can Receive Marketing" },
                                ]}
                            />
                        </div>
                    </div>
                    <div className={style.vendor_modalBtns}>
                        <Button
                            title={"Submit"}
                            className={"mx-1 mt-2 w-auto"}
                        />
                    </div>
                </Form>
            </Modal>
        </>
    )
}

export default ClientForm