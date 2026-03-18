import React, { useEffect, useRef, useState } from 'react'
import style from './form.module.css'
import { Form, Modal, Table } from 'antd';
import { FormInput, FormInputTextArea } from '../../../../Components/Inputs/Inputs';
import { SelectInput } from '../../../../Components/Select/Select';
import { Button } from '../../../../Components/Button/Button';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CustomDate from '../../../../Components/Date/CustomDate';
import UploadFile from '../../../../Components/File/UploadFile';




function QuotationForm({
    QuotationModal,
    setQuotationModal
}) {
    const [form] = Form.useForm();
    const lastAddedRef = useRef(false);
    const itemsValue = Form.useWatch('items', form);
    const handleOk = () => {
        setQuotationModal(false);
    };
    const handleCancel = () => {
        setQuotationModal(false);
    };
    const addRow = () => {
        if (!itemsValue || itemsValue.length === 0) return;
        const lastItem = itemsValue[itemsValue.length - 1];
        const hasAnyValue = lastItem && Object.values(lastItem).some(
            val => val && String(val).trim() !== ''
        );
        if (hasAnyValue && !lastAddedRef.current) {
            form.setFieldsValue({
                items: [...itemsValue, {}]
            });
            lastAddedRef.current = true;
        } else if (!hasAnyValue) {
            lastAddedRef.current = false;
        }
    }

    useEffect(() => {
        addRow()
    }, [itemsValue, form]);

    const columns = [
        {
            title: "Product ID",
            width: 300,
            render: (_, record) => (
                <SelectInput
                    placeholder="Select product"
                    name={[record.field.name, 'product_id']}
                    required={false}
                    showSearch={true}
                    message={"Select product if ordering from catalog"}
                    options={[]}
                />
            ),
        },
        {
            title: "Description",
            width: 300,
            render: (_, record) => (
                <FormInput
                    name={[record.field.name, 'description']}
                    placeholder="Item description"
                    required={true}
                    message={"Description is required"}
                />
            ),
        },
        {
            title: "Quantity",
            width: 100,
            render: (_, record) => (
                <FormInput
                    name={[record.field.name, 'quantity']}
                    type="number"
                    placeholder="quantity"
                    required={true}
                    message={"Quantity is required"}
                />
            ),
        },
        {
            title: "Unit of Measure",
            width: 200,
            render: (_, record) => (
                <SelectInput
                    placeholder="Select unit"
                    name={[record.field.name, 'uom']}
                    required={true}
                    message={"Please select unit of measure"}
                    options={[
                        { value: "Each", label: "Each" },
                        { value: "Box", label: "Box" },
                        { value: "Pallet", label: "Pallet" },
                        { value: "Kg", label: "Kilogram" },
                        { value: "Lb", label: "Pound" },
                        { value: "Meter", label: "Meter" },
                        { value: "Foot", label: "Foot" },
                        { value: "Liter", label: "Liter" },
                        { value: "Hour", label: "Hour (Service)" },
                        { value: "Day", label: "Day (Service)" },
                        { value: "Other", label: "Other" },
                    ]}
                />
            ),
        },
        {
            title: "Unit Prices",
            width: 100,
            render: (_, record) => (
                <FormInput
                    name={[record.field.name, 'Unit_Price']}
                    type="number"
                    placeholder="Unit Price"
                    required={true}
                    message={"Unit Price is required"}
                />
            ),
        },
        {
            title: "Discount %",
            width: 100,
            render: (_, record) => (
                <FormInput
                    name={[record.field.name, 'discount_percent']}
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    placeholder="Discount percentage"
                    required={false}
                    message={"Enter discount % if applicable"}
                />
            ),
        },
        {
            title: "Tax Rate %",
            width: 150,
            render: (_, record) => (
                <FormInput
                    name={[record.field.name, 'tax_rate']}
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    placeholder="Tax rate percentage"
                    required={false}
                    message={"Enter tax rate if applicable"}
                />
            ),
        },
        {
            title: "Tax Amount",
            width: 150,
            render: (_, record) => (
                <FormInput
                    name={[record.field.name, 'tax_amount']}
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Tax amount (calculated)"
                    required={false}
                    readOnly={true}
                    message={"Tax amount is auto-calculated"}
                />
            ),
        },
        {
            title: "Line Total",
            width: 150,
            render: (_, record) => (
                <FormInput
                    name={[record.field.name, 'total']}
                    type="no"
                    required={false}
                    placeholder="Total"
                />
            ),
        }
    ];

    return (
        <>
            <Modal
                title=""
                closable={{ 'aria-label': 'Custom Close Button' }}
                className={`${style.form_modalWidth} modalBgColor`}
                open={QuotationModal}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                width={"100%"}
            >
                <Form
                    form={form}
                    className={`${style.form_modalMainBox} mt-3`}
                    layout="vertical"
                    initialValues={{items:[{}]}}
                // onFinish={handleForm}
                >
                    <div className={style.modalHardwareScroll}>
                        <div className={style.QR_box}>
                            <h5 className="mx-1">Quotation Form</h5>
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Quotation Identification</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                className="mx-1"
                                label={"Quotation Number"}
                                name="quotation_number"
                                placeholder="Auto-generated (e.g., ClientFirst-3000-01)"
                                required={false}
                                readOnly={true}
                                message={"Quotation number is auto-generated"}
                            />
                            <CustomDate
                                className="mx-1"
                                label={"Quote Date"}
                                name="quote_date"
                                placeholder="Select quote date"
                                required={true}
                                message={"Quote date is required"}
                                allowToday={true}
                            />
                            <CustomDate
                                className="mx-1"
                                label={"Valid Until"}
                                name="valid_until"
                                placeholder="Select expiry date"
                                required={true}
                                message={"Valid until date is required"}
                                allowToday={true}
                            />
                        </div>
                        <div className={style.form_inputBox}>
                            <FormInput
                                className="mx-1"
                                label={"Revision Number"}
                                name="revision_number"
                                type="number"
                                min="0"
                                step="1"
                                placeholder="Enter revision number (for amendments)"
                                required={false}
                                message={"Enter revision number if applicable"}
                            />
                            <SelectInput
                                className="mx-1"
                                label={"Customer ID"}
                                placeholder="Select customer"
                                name="customer_id"
                                required={true}
                                showSearch={true}
                                message={"Please select a customer"}
                                options={[]}
                            />
                            <FormInput
                                className="mx-1"
                                label={"Customer Name"}
                                name="customer_name"
                                placeholder="Auto-populated from Customer ID"
                                required={false}
                                readOnly={true}
                                message={"Customer name auto-populated"}
                            />
                        </div>
                        <div className={style.form_inputBox}>
                            <FormInput
                                className="mx-1"
                                label={"Customer Contact Person"}
                                name="customer_contact"
                                placeholder="Enter contact person name"
                                required={false}
                                message={"Enter customer contact person"}
                            />
                            <FormInput
                                className="mx-1"
                                label={"Customer Email"}
                                name="customer_email"
                                type="email"
                                placeholder="Enter customer email"
                                required={false}
                                message={"Enter customer email"}
                            />
                            <FormInput
                                className="mx-1"
                                label={"Customer Phone"}
                                name="customer_phone"
                                type="tel"
                                placeholder="Enter customer phone"
                                required={false}
                                message={"Enter customer phone"}
                            />
                        </div>
                        <div className={style.form_inputBox}>
                            <FormInput
                                className="mx-1"
                                label={"Billing Address"}
                                name="billing_address"
                                placeholder="Enter billing address"
                                multiline={true}
                                rows={2}
                                required={false}
                                message={"Enter billing address"}
                            />
                            <FormInput
                                className="mx-1"
                                label={"Shipping Address"}
                                name="shipping_address"
                                placeholder="Enter shipping address (may differ from billing)"
                                multiline={true}
                                rows={2}
                                required={false}
                                message={"Enter shipping address"}
                            />
                            <SelectInput
                                className="mx-1"
                                label={"Project ID (optional)"}
                                placeholder="Select project"
                                name="project_id"
                                required={false}
                                showSearch={true}
                                message={"Select project if quote is for a specific project"}
                                options={[]}
                            />
                        </div>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Sales Person"}
                                placeholder="Select sales representative"
                                name="sales_person"
                                required={true}
                                showSearch={true}
                                message={"Please select sales person"}
                                options={[]}
                            />
                            <SelectInput
                                className="mx-1"
                                label={"Currency"}
                                placeholder="Select currency"
                                name="currency"
                                required={true}
                                message={"Please select currency"}
                                options={[
                                    { value: "PKR", label: "PKR - Pakistani Rupee" },
                                    { value: "USD", label: "USD - US Dollar" },
                                    { value: "EUR", label: "EUR - Euro" },
                                    { value: "GBP", label: "GBP - British Pound" },
                                    { value: "INR", label: "INR - Indian Rupee" },
                                    { value: "AED", label: "AED - UAE Dirham" },
                                    { value: "SAR", label: "SAR - Saudi Riyal" },
                                    { value: "Other", label: "Other" },
                                ]}
                            />
                            <FormInput
                                className="mx-1"
                                label={"Exchange Rate"}
                                name="exchange_rate"
                                type="number"
                                min="0"
                                step="0.0001"
                                placeholder="Enter exchange rate (if multi-currency)"
                                required={false}
                                message={"Enter exchange rate if applicable"}
                            />

                        </div>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Payment Terms"}
                                placeholder="Select payment terms"
                                name="payment_terms"
                                required={true}
                                message={"Please select payment terms"}
                                options={[
                                    { value: "Net 30", label: "Net 30" },
                                    { value: "Net 60", label: "Net 60" },
                                    { value: "50% Advance", label: "50% Advance" },
                                    { value: "100% Advance", label: "100% Advance" },
                                    { value: "Due on Receipt", label: "Due on Receipt" },
                                    { value: "2/10 Net 30", label: "2/10 Net 30" },
                                    { value: "COD", label: "Cash on Delivery" },
                                    { value: "Other", label: "Other" },
                                ]}
                            />
                            <FormInput
                                className="mx-1"
                                label={"Delivery Terms"}
                                name="delivery_terms"
                                placeholder="Enter Incoterms or custom delivery terms"
                                required={false}
                                message={"Enter delivery terms if applicable"}
                            />
                            <SelectInput
                                className="mx-1"
                                label={"Status"}
                                placeholder="Select quote status"
                                name="status"
                                required={true}
                                message={"Please select status"}
                                options={[
                                    { value: "Draft", label: "Draft" },
                                    { value: "Sent", label: "Sent" },
                                    { value: "Accepted", label: "Accepted" },
                                    { value: "Rejected", label: "Rejected" },
                                    { value: "Expired", label: "Expired" },
                                    { value: "Converted", label: "Converted" },
                                ]}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                className="mx-1"
                                label={"Private Notes"}
                                name="private_notes"
                                placeholder="Enter internal remarks (not visible to customer)"
                                multiline={true}
                                rows={3}
                                required={false}
                                message={"Enter private notes if any"}
                            />
                            <FormInput
                                className="mx-1"
                                label={"Terms & Conditions"}
                                name="terms_conditions"
                                placeholder="Enter standard or custom terms and conditions"
                                multiline={true}
                                rows={4}
                                required={false}
                                message={"Enter terms and conditions"}
                            />
                            <UploadFile
                                name={'attachments'}
                                className="inputFlexBox"
                                label={"Attachments"}
                                required={true}
                                multiple={true}
                                accept="image/jpeg,image/png"
                                message={"Attachments"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Products | Services</h5>
                        <Form.List name="items">
                            {(fields) => {
                                const dataSource = fields.map(field => ({
                                    key: field.key,
                                    field,
                                }));
                                return (
                                    <Table
                                        className='antdCustomeTable noneRowHover'
                                        dataSource={dataSource}
                                        scroll={{ x: 1500 }}
                                        columns={columns}
                                        pagination={false}
                                        rowKey="key"
                                    />
                                );
                            }}
                        </Form.List>
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

export default QuotationForm