import React, { useState } from 'react'
import style from './form.module.css'
import { Form, Modal } from 'antd';
import { FormInput, FormInputTextArea } from '../../../../Components/Inputs/Inputs';
import { SelectInput } from '../../../../Components/Select/Select';
import { Button } from '../../../../Components/Button/Button';
import CustomDate from '../../../../Components/Date/CustomDate';
import { Country, State, City } from "country-state-city";

function TicketForm({
    VendorsForm,
    setVendorsForm
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
        setVendorsForm(false);
    };
    const handleCancel = () => {
        setVendorsForm(false);
    };
    return (
        <>
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
                // onFinish={handleForm}
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
                                name="vendor_id"
                                placeholder="Auto-generated (e.g., VEND-001)"
                                required={false}
                                readOnly={true}
                                message={"Vendor ID is auto-generated"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Vendor Type"}
                                placeholder="Select Vendor Type"
                                name="vendor_type"
                                required={true}
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
                                required={true}
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
                            <FormInput
                                className="mx-1"
                                label={"Industry / Sector"}
                                name="industry"
                                placeholder="e.g., IT, Healthcare, Manufacturing"
                                required={true}
                                message={"Industry is required"}
                            />
                            <CustomDate
                                className="mx-1"
                                label={"Vendor Since"}
                                name="vendor_since"
                                placeholder="Select date"
                                required={true}
                                message={"Please select vendor since date"}
                                allowToday={true}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Status"}
                                placeholder="Select Status"
                                name="status"
                                required={true}
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
                                required={true}
                                message={"Please specify preferred status"}
                                options={[
                                    { value: "Yes", label: "Yes" },
                                    { value: "No", label: "No" },
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
                                options={[]}
                            />
                            <SelectInput
                                className="mx-1"
                                label={"Currency Preference"}
                                placeholder="Default currency for POs"
                                name="currency_preference"
                                required={true}
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


                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Contact Details</h5>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Solutation"}
                                placeholder="Select Solutation"
                                name="Solutation"
                                required={true}
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
                                name="first_name"
                                placeholder="Enter first name"
                                required={true}
                                message={"First name is required"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Last Name"}
                                name="last_name"
                                placeholder="Enter last name"
                                required={true}
                                message={"Last name is required"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Job Title"}
                                name="job_title"
                                placeholder="Enter job title"
                                required={true}
                                message={"Job title is required"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                className="mx-1"
                                label={"Email"}
                                name="email"
                                type="email"
                                placeholder="Enter email address"
                                required={true}
                                message={"Email is required"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Phone (Direct)"}
                                name="phone_direct"
                                type="tel"
                                placeholder="Enter direct phone number"
                                required={false}
                                message={"Enter direct phone number"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Mobile"}
                                name="mobile"
                                type="tel"
                                placeholder="Enter mobile number"
                                required={true}
                                message={"Mobile number is required"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Addresses</h5>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Address Type"}
                                placeholder="Select Address Type"
                                name="address_type"
                                required={true}
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
                                name="address_line1"
                                placeholder="Enter address line 1"
                                required={true}
                                message={"Address line 1 is required"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Address Line 2"}
                                name="address_line2"
                                placeholder="Enter address line 2 (optional)"
                                required={false}
                                message={""}
                            />
                            <SelectInput
                                className="mx-1"
                                showSearch={true}
                                name="state_province"
                                label="Province"
                                message={"Province is required"}
                                required={true}
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
                                name="country"
                                label="Country"
                                message={"Country is required"}
                                required={true}
                                classNameColor={`${style.inputDefaultBg}`}
                                options={countries?.map((item) => ({
                                    value: `${item.isoCode}-${item.name}`,
                                    label: item.name,
                                }))}
                            />
                            <FormInput
                                label={"Postal Code"}
                                className={"mx-1 inputFlexBox"}
                                name="postal_code"
                                placeholder="Postal Code"
                                required={false}
                            />
                            <SelectInput
                                className="mx-1"
                                showSearch={true}
                                name="city"
                                label="City"
                                message={"City is required"}
                                required={true}
                                classNameColor={`${style.inputDefaultBg}`}
                                options={selectedCities?.map((item) => ({
                                    value: `${item.stateCode}-${item.name}`,
                                    label: item.name,
                                }))}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Financial & Payment</h5>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Default Payment Terms"}
                                placeholder="Select Payment Terms"
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
                                    { value: "Other", label: "Other" },
                                ]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Payment Method Preference"}
                                placeholder="Select Payment Method"
                                name="payment_method"
                                required={true}
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
                                required={true}
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
                                required={true}
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
                                required={true}
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
                                required={true}
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

export default TicketForm