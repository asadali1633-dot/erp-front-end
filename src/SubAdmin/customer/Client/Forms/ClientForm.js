import React, { useEffect, useState } from 'react'
import style from './form.module.css'
import { Form, Modal, Table, message, Button as AntdButton } from 'antd';
import { FormInput, FormInputTextArea } from '../../../../Components/Inputs/Inputs';
import { SelectInput } from '../../../../Components/Select/Select';
import { ActionButton, Button, ShowMore } from '../../../../Components/Button/Button';
import { Country, State, City } from "country-state-city";
import CustomDate from '../../../../Components/Date/CustomDate';
import UploadFile from '../../../../Components/File/UploadFile';
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import * as CLIENTS_ACTIONS from "../../../../store/action/clients/index";
import * as ASSETS_ACTIONS from "../../../../store/action/hardware/index";
import { connect, useSelector } from 'react-redux';
import dayjs from "dayjs";
import baseUrl from '../../../../config.json'
import { IoCopyOutline } from "react-icons/io5";
import MultipleUploads from '../../../../Components/File/MultipleUploads';


function ClientForm({
    ClientModalForm,
    setClientForm,
    getBarCode,
    code, setCode,
    Red_Clients,
    CreateClientFun,
    GetClientList,
    Red_Assets,
    GetAllEmpList,
    pageBody,
    GetAllClientithPage,
    getClientById,
    editData,
    UpdateClient
}) {
    const [form] = Form.useForm();
    const countries = Country.getAllCountries();
    const [loading, setloading] = useState(false);
    const codes = ["PK", "IN", "US", "AS"];
    const client_code = Red_Clients?.identifier?.[0]?.data?.client_code
    const clientList = Red_Clients?.ClientList?.[0]?.data
    const users = Red_Assets?.Users?.[0]?.data
    const provinces = codes.flatMap((code) => State.getStatesOfCountry(code));
    const accessToken = useSelector((state) => state.Red_Auth.accessToken);
    const [messageApi, contextHolder] = message.useMessage();
    const [showMore, setShowMore] = useState(false);
    const [accountManagerId, setAccountManagerId] = useState(null);
    const [accountManagerType, setAccountManagerType] = useState(null);
    const [secondaryManagerId, setSecondaryManagerId] = useState(null);
    const [secondaryManagerType, setSecondaryManagerType] = useState(null);

    let selectedCities = [];
    codes.forEach((code) => {
        const cities = City.getCitiesOfCountry(code);
        selectedCities = [...selectedCities, ...cities];
    });




    const toggleShowMore = () => {
        setShowMore(!showMore);
    };
    const handleOk = () => {
        setClientForm(false);
        setShowMore(false)
        form.resetFields();
        setCode({
            mode: null,
            code: null
        })
    };
    const handleCancel = () => {
        setClientForm(false);
        setShowMore(false)
        form.resetFields();
        setCode({
            mode: null,
            code: null
        })
    };


    const fetchClientCode = async () => {
        try {
            const response = await fetch(`${baseUrl.baseUrl}/api/client/id/unique`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            const res = await response.json();
            if (res.success) {
                form.setFieldsValue({ client_id: res.data.client_code });
            } else {
                console.error("Client code fetch failed:", res.message);
            }
        } catch (err) {
            console.error("Error:", err);
        }
    };

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
                client_id: data.client_code,
                client_type: data.client_type,
                company_name: data.company_name,
                trading_name: data.trading_name,
                registration_number: data.registration_number,
                ntn: data.ntn,
                strn: data.strn,
                website: data.website,
                industry: data.industry,
                client_since: data.client_since ? dayjs(data.client_since) : null,
                status: data.status,
                client_source: data.client_source,
                parent_client: data.parent_client_id,
                language: data.language,
                currency: data.currency,
                billing_address_line1: data.billing_address_line1,
                billing_address_line2: data.billing_address_line2,
                billing_city: data.billing_city,
                state: data.billing_state,
                billing_postal_code: data.billing_postal_code,
                country: data.billing_country,
                payment_terms: data.payment_terms,
                credit_limit: data.credit_limit,
                credit_currency: data.credit_currency,
                credit_risk_rating: data.credit_risk_rating,
                credit_check_date: data.credit_check_date ? dayjs(data.credit_check_date) : null,
                credit_check_reference: data.credit_check_reference,
                payment_method: data.payment_method,
                bank_account_details: data.bank_account_details,
                tax_exemption_certificate: null,
                invoicing_delivery_method: data.invoicing_delivery_method,
                invoice_emails: data.invoice_emails,
                dunning_contact: data.dunning_contact,
                msa_reference: data.msa_reference,
                msa_start_date: data.msa_start_date ? dayjs(data.msa_start_date) : null,
                msa_end_date: data.msa_end_date ? dayjs(data.msa_end_date) : null,
                msa_document: null,
                nda_signed: data.nda_signed,
                nda_date: data.nda_date ? dayjs(data.nda_date) : null,
                nda_expiry: data.nda_expiry ? dayjs(data.nda_expiry) : null,
                preferred_status: data.preferred_status,
                total_lifetime_revenue: data.total_lifetime_revenue,
                number_of_quotes: data.number_of_quotes,
                number_of_projects: data.number_of_projects,
                number_of_service_orders: data.number_of_service_orders,
                number_of_assets: data.number_of_assets,
                last_quote_date: data.last_quote_date ? dayjs(data.last_quote_date) : null,
                last_invoice_date: data.last_invoice_date ? dayjs(data.last_invoice_date) : null,
                last_project_date: data.last_project_date ? dayjs(data.last_project_date) : null,
                last_service_date: data.last_service_date ? dayjs(data.last_service_date) : null,
                next_followup_date: data.next_followup_date ? dayjs(data.next_followup_date) : null,
                // account_manager_id: data?.account_manager_id,
                // secondary_account_manager_id: data?.secondary_account_manager_id,
                account_manager_id: data?.account_manager_type && data?.account_manager_id
                    ? `${data.account_manager_type}_${data.account_manager_id}`
                    : null,

                secondary_account_manager_id: data?.secondary_account_manager_type && data?.secondary_account_manager_id
                    ? `${data.secondary_account_manager_type}_${data.secondary_account_manager_id}`
                    : null,
                internal_notes: data.internal_notes,
                gdpr_consent_date: data.gdpr_consent_date ? dayjs(data.gdpr_consent_date) : null,
                marketing_opt_out: data.marketing_opt_out,
                contacts: contactsToSet,
                shipping_addresses: shippingToSet,
                created_by: data?.created_by_employee_id || data?.created_by_super_admin_id,
            }
            form.setFieldsValue(formValues);
        }
    }

    const handleForm = async (values) => {
        setloading(true);
        const formData = new FormData();
        Object.keys(values).forEach(key => {
            if (key === 'msa_document') return;
            if (key === 'tax_exemption_certificate') return;
            if (key === 'attachments') return;
            if (key === 'account_manager_id') return;
            if (key === 'secondary_account_manager_id') return;
            let val = values[key];
            if (val === undefined || val === null || val === '') return;
            if (Array.isArray(val)) val = JSON.stringify(val);
            formData.append(key, val);
        });
        if (values.msa_document && values.msa_document.originFileObj) {
            formData.append("msa_document", values.msa_document.originFileObj);
        }
        if (values.tax_exemption_certificate && values.tax_exemption_certificate.originFileObj) {
            formData.append("tax_exemption_certificate", values.tax_exemption_certificate.originFileObj);
        }
        if (values.attachments && Array.isArray(values.attachments) && values.attachments.length > 0) {
            values.attachments.forEach(file => {
                if (file.originFileObj) {
                    formData.append('attachments', file.originFileObj);
                }
            });
        }
        if (values?.account_manager_id) {
            const parts = values.account_manager_id.split("_");
            const id = parts.pop();
            const type = parts.join("_");

            formData.append("account_manager_type", type);
            formData.append("account_manager_id", id);
        }
        if (values?.secondary_account_manager_id) {
            const parts = values.secondary_account_manager_id.split("_");
            const id = parts.pop();
            const type = parts.join("_");

            formData.append("secondary_account_manager_type", type);
            formData.append("secondary_account_manager_id", id);
        }

        if (code?.mode !== "Edit") {
            const isCheck = await CreateClientFun(formData, accessToken);
            if (isCheck?.success) {
                messageApi.success({
                    type: "success",
                    content: isCheck?.message,
                });
                setClientForm(false);
                form.resetFields();
                setloading(false);
                setShowMore(false)
                GetAllClientithPage(pageBody, accessToken);
            } else {
                setloading(false);
                messageApi.error({
                    type: "error",
                    content: isCheck?.message,
                });
            }
        } else {
            const isCheck = await UpdateClient(code?.code, formData, accessToken);
            if (isCheck?.success) {
                messageApi.success({
                    type: "success",
                    content: isCheck?.message,
                });
                setClientForm(false);
                form.resetFields();
                setloading(false);
                GetAllClientithPage(pageBody, accessToken);
            } else {
                setloading(false);
                messageApi.error({
                    type: "error",
                    content: isCheck?.message,
                });
            }
        }

    };

    const handleCopy = () => {
        const billing_address_line1 = form.getFieldValue('billing_address_line1');
        const billing_address_line2 = form.getFieldValue('billing_address_line2');
        const billing_city = form.getFieldValue('billing_city')
        const billing_state = form.getFieldValue('state')
        const billing_postal_code = form.getFieldValue('billing_postal_code')
        const billing_country = form.getFieldValue('country')

        if (billing_address_line1 || billing_address_line2 || billing_city || billing_country || billing_state || billing_postal_code) {
            form.setFieldValue(['shipping_addresses', 0, 'address_line1'], billing_address_line1 || '');
            form.setFieldValue(['shipping_addresses', 0, 'address_line2'], billing_address_line2 || '');
            form.setFieldValue(['shipping_addresses', 0, 'city'], billing_city || '');
            form.setFieldValue(['shipping_addresses', 0, 'state_province'], billing_state || '');
            form.setFieldValue(['shipping_addresses', 0, 'postal_code'], billing_postal_code || '');
            form.setFieldValue(['shipping_addresses', 0, 'country'], billing_country || '');
            messageApi.success('Billing address copied to shipping address');
        } else {
            messageApi.warning('Billing address is empty');
        }
    }

    const fetchingData = () => {
        if (ClientModalForm) {
            if (code?.mdoe !== "Edit") {
                fetchClientCode();
            }
            form.resetFields();

            GetClientList(accessToken);
            GetAllEmpList(accessToken);
        }
    }

    useEffect(() => {
        fetchingData()
    }, [ClientModalForm, accessToken, form]);

    useEffect(() => {
        if (code?.mode == "Edit") {
            getClientById(code?.code, accessToken)
        }
    }, [code, accessToken])


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
                    initialValues={{ contacts: [{}], shipping_addresses: [{}] }}
                    onFinish={handleForm}>
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
                                required={true}
                                message={"Client ID is auto-generated"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Client Type"}
                                placeholder="Select client type"
                                name="client_type"
                                required={false}
                                showSearch={true}
                                message={"Please select client type"}
                                options={[
                                    { value: "Accounting & Legal", label: "Accounting & Legal" },
                                    { value: "Advertising", label: "Advertising" },
                                    { value: "Aerospace", label: "Aerospace" },
                                    { value: "Agriculture", label: "Agriculture" },
                                    { value: "Automotive", label: "Automotive" },
                                    { value: "Banking & Finance", label: "Banking & Finance" },
                                    { value: "Biotechnology", label: "Biotechnology" },
                                    { value: "Broadcasting", label: "Broadcasting" },
                                    { value: "Busniess Services", label: "Busniess Services" },
                                    { value: "Commidities & Chemical", label: "Commidities & Chemical" },
                                    { value: "Cummunications", label: "Cummunications" },
                                    { value: "Computer & Hightech", label: "Computer & Hightech" },
                                    { value: "Constructions", label: "Contructions" },
                                    { value: "Education", label: "Education" },
                                    { value: "Textile", label: "Textile" },
                                    { value: "Defense", label: "Defense" },
                                    { value: "Energy", label: "Energy" },
                                    { value: "Entertainment", label: "Entertainment" },
                                    { value: "Goverment", label: "Goverment" },
                                    { value: "Healthcare & Life Sciences", label: "Healthcare & Life Sciences" },
                                    { value: "Insurance", label: "Insurance" },
                                    { value: "Manufacturing", label: "Manufacturing" },
                                    { value: "Marketing", label: "Marketing" },
                                    { value: "Media", label: "Media" },
                                    { value: "Non-profit & Hight Ed", label: "Non-profit & Hight Ed" },
                                    { value: "Pharmaceuticals", label: "Pharmaceuticals" },
                                    { value: "Photography", label: "Photography" },
                                    { value: "Professional Services & Consulting", label: "Professional Services & Consulting" },
                                    { value: "Real Estate", label: "Real Estate" },
                                    { value: "Resturant & Catering", label: "Resturant & Catering" },
                                    { value: "Retail & Wholesale", label: "Retail & Wholesale" },
                                    { value: "Sports", label: "Sports" },
                                    { value: "Transportation", label: "Transportation" },
                                    { value: "Travel & Luxury", label: "Travel & Luxury" },
                                    { value: "Engineering", label: "Engineering" },
                                    { value: "Others", label: "Others" },
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
                                label={"STRN"}
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
                                label={"Client Since"}
                                name="client_since"
                                placeholder="Date of creation"
                                required={false}
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
                                required={false}
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
                                options={clientList?.map((item) => ({
                                    value: item.id,
                                    label: `${item.company_name} (${item.client_code})`
                                }))}
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
                                required={false}
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


                        <div style={{ display: showMore ? 'block' : 'none'}}>
                            <Form.List name="contacts">
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
                                                        required={false}
                                                        message="First name is required"
                                                    />
                                                    <FormInput
                                                        className="mx-1"
                                                        label="Last Name"
                                                        name={[field.name, 'last_name']}
                                                        placeholder="Enter last name"
                                                        required={false}
                                                        message="Last name is required"
                                                    />
                                                    <FormInput
                                                        className="mx-1"
                                                        label="Job Title"
                                                        name={[field.name, 'job_title']}
                                                        placeholder="Enter job title"
                                                        required={false}
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
                                                        required={false}
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
                                                        required={false}
                                                        message="Mobile number is required"
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
                                    placeholder="Enter address line 1"
                                    required={false}
                                    message={"Please enter address line 1"}
                                />

                                <FormInput
                                    className="mx-1"
                                    label={"Address Line 2"}
                                    name="billing_address_line2"
                                    placeholder="Enter address line 2 (optional)"
                                    required={false}
                                    message={""}
                                />
                                <SelectInput
                                    className="mx-1"
                                    showSearch={true}
                                    name="billing_city"
                                    label="City"
                                    message="City is required"
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
                                    name="state"
                                    label="Province"
                                    message="Province is required"
                                    required={false}
                                    classNameColor={`${style.inputDefaultBg}`}
                                    options={provinces?.map((item) => ({
                                        value: `${item.countryCode}-${item.name}`,
                                        label: item.name,
                                    }))}
                                />

                                <FormInput
                                    className="mx-1"
                                    label={"Postal / Zip Code"}
                                    name="billing_postal_code"
                                    placeholder="Enter postal or zip code"
                                    required={false}
                                    message={"Please enter postal/zip code"}
                                />

                                <SelectInput
                                    className="mx-1"
                                    showSearch={true}
                                    name="country"
                                    label="Country"
                                    message="Country is required"
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
                                                <h5 className={`${style.form_checkBoxHeading} mx-1`}>
                                                    Shipping Address #{index + 1}
                                                    {index === 0 && (
                                                        <>
                                                            <CiSquarePlus
                                                                style={{ cursor: 'pointer', marginLeft: '8px', fontSize: '24px', verticalAlign: 'middle' }}
                                                                onClick={() => add()}
                                                            />
                                                            <a
                                                                onClick={handleCopy}
                                                                className={"mx-1"}
                                                                style={{ fontSize: "12px", color: "#0000EE" }}
                                                            >Copy Billing Address</a>
                                                        </>

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
                                                        required={false}
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
                                                        required={false}
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
                                                        required={false}
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
                            <div className={style.form_inputBox}>2
                                <CustomDate
                                    className="mx-1"
                                    label={"Date/Time"}
                                    name="activity_datetime"
                                    placeholder="Select date and time"
                                    required={false}
                                    message={"Please select date and time"}
                                    showTime={true}
                                    allowToday={true}
                                />

                                <SelectInput
                                    className="mx-1"
                                    label={"Type"}
                                    placeholder="Select activity type"
                                    name="activity_type"
                                    required={false}
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
                                    required={false}
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
                                    name="account_manager_id"
                                    required={false}
                                    showSearch={true}
                                    value={accountManagerId}
                                    message={"Please select primary account manager"}
                                    options={users?.map((item) => ({
                                        value: `${item.user_type}_${item.id}`,
                                        label: `${item.name || ''} - ${item.email || ''} (${item.user_type})`
                                    }))}
                                />

                                <SelectInput
                                    className="mx-1"
                                    label={"Secondary Account Manager"}
                                    placeholder="Select secondary account manager"
                                    name="secondary_account_manager_id"
                                    required={false}
                                    showSearch={true}
                                    value={secondaryManagerId}
                                    message={"Select secondary account manager if applicable"}
                                    options={users?.map((item) => ({
                                        value: `${item.user_type}_${item.id}`,
                                        label: `${item.name || ''} - ${item.email || ''} (${item.user_type})`
                                    }))}
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
                                    options={users?.map((item) => ({
                                        value: item.id,
                                        label: `${item.name || ''} - ${item.email || ''}`
                                    }))}
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

                                <MultipleUploads
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
                            title={loading ? "Loading" : code?.mode == "Edit" ? "Update Client" : "Create"} loading={loading}
                        />
                    </div>
                </Form>
            </Modal>
        </>
    )
}

function mapStateToProps(state) {
    return {
        Red_Clients: state.Red_Clients,
        Red_Assets: state.Red_Assets,
    };
}
const AllActions = {
    ...CLIENTS_ACTIONS,
    ...ASSETS_ACTIONS,
};
export default connect(mapStateToProps, AllActions)(ClientForm);