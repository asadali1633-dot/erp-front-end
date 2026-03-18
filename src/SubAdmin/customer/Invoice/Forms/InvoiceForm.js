import React, { useEffect, useRef, useState } from 'react'
import style from './form.module.css'
import { Form, Modal, Table } from 'antd';
import { FormInput, FormInputTextArea } from '../../../../Components/Inputs/Inputs';
import { SelectInput } from '../../../../Components/Select/Select';
import { Button } from '../../../../Components/Button/Button';
import { Tabs } from "antd";
import CustomDate from '../../../../Components/Date/CustomDate';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'




function InvoiceForm({
    InvoiceModal,
    setInvoiceModal
}) {
    const [form] = Form.useForm();
    const [value, setValue] = useState('');
    const lastAddedRef = useRef(false);
    const itemsValue = Form.useWatch('items', form);

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ size: ['small', false, 'large', 'huge'] }],
            // [{ color: [] }, { background: [] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean'],
        ],
    };
    const handleOk = () => {
        setInvoiceModal(false);
    };
    const handleCancel = () => {
        setInvoiceModal(false);
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

    const items = [
        {
            label: 'Notes / Memo',
            key: '1',
            children: <>
                <div>
                    <ReactQuill
                        theme="snow"
                        value={value}
                        className='textEiditor'
                        onChange={setValue}
                        modules={modules}
                        placeholder="Write Here..."
                    />
                </div>
            </>,
        },
        {
            key: '2',
            label: 'Terms & Conditions',
            children: <>
                <div>
                    <ReactQuill
                        theme="snow"
                        value={value}
                        className='textEiditor'
                        onChange={setValue}
                        modules={modules}
                        placeholder="Write Here..."
                    />
                </div>
            </>,
        },
    ]

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
                open={InvoiceModal}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                width={"100%"}
            >
                <Form
                    form={form}
                    className={`${style.form_modalMainBox} mt-3`}
                    layout="vertical"
                    initialValues={{ items: [{}] }}
                // onFinish={handleForm}
                >
                    <div className={style.modalHardwareScroll}>
                        <div className={style.QR_box}>
                            <h5 className="mx-1">Invoice Form</h5>
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Header Information</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                className="mx-1"
                                label={"Invoice Number"}
                                name="invoice_number"
                                placeholder="Auto-generated (e.g., INV-2025-0001)"
                                required={false}
                                readOnly={true}
                                message={"Invoice number is auto-generated"}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Invoice Date"}
                                name="invoice_date"
                                placeholder="Select invoice date"
                                required={true}
                                message={"Invoice date is required"}
                                allowToday={true}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Due Date"}
                                name="due_date"
                                placeholder="Select due date"
                                required={true}
                                message={"Due date is required"}
                                allowToday={true}
                            />
                        </div>
                        <div className={style.form_inputBox}>
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

                            <FormInput
                                className="mx-1"
                                label={"Billing Address"}
                                name="billing_address"
                                placeholder="Enter billing address"
                                multiline={true}
                                rows={2}
                                required={true}
                                message={"Billing address is required"}
                            />
                        </div>
                        <div className={style.form_inputBox}>
                            <FormInput
                                className="mx-1"
                                label={"Shipping Address"}
                                name="shipping_address"
                                placeholder="Enter shipping address"
                                multiline={true}
                                rows={2}
                                required={false}
                                message={"Enter shipping address if different from billing"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Contact Person"}
                                name="contact_person"
                                placeholder="Enter contact person name"
                                required={false}
                                message={"Enter contact person"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Contact Email"}
                                name="contact_email"
                                type="email"
                                placeholder="Enter contact email"
                                required={false}
                                message={"Enter contact email"}
                            />
                        </div>
                        <div className={style.form_inputBox}>
                            <FormInput
                                className="mx-1"
                                label={"Purchase Order Reference (Customer PO)"}
                                name="customer_po_reference"
                                placeholder="Enter customer's PO number"
                                required={false}
                                message={"Enter customer PO number if applicable"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Our Reference / Sales Order ID"}
                                placeholder="Select sales order"
                                name="sales_order_id"
                                required={false}
                                showSearch={true}
                                message={"Select sales order if invoice is based on it"}
                                options={[]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Project ID"}
                                placeholder="Select project"
                                name="project_id"
                                required={false}
                                showSearch={true}
                                message={"Select project if invoicing project milestones"}
                                options={[]}
                            />
                        </div>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Service Order ID(s)"}
                                placeholder="Select service orders"
                                name="service_order_ids"
                                required={false}
                                showSearch={true}
                                isMulti={true}
                                message={"Select service orders if billing for services"}
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
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
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
                                label={"Bank Account Details"}
                                name="bank_account_details"
                                placeholder="Enter bank account details for payment instructions"
                                multiline={true}
                                rows={3}
                                required={false}
                                message={"Enter bank account details for payment"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Status"}
                                placeholder="Select invoice status"
                                name="status"
                                required={true}
                                message={"Please select status"}
                                options={[
                                    { value: "Draft", label: "Draft" },
                                    { value: "Sent", label: "Sent" },
                                    { value: "Paid", label: "Paid" },
                                    { value: "Partially Paid", label: "Partially Paid" },
                                    { value: "Overdue", label: "Overdue" },
                                    { value: "Cancelled", label: "Cancelled" },
                                    { value: "Written Off", label: "Written Off" },
                                ]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Payment Status"}
                                placeholder="Select payment status"
                                name="payment_status"
                                required={true}
                                message={"Please select payment status"}
                                options={[
                                    { value: "Unpaid", label: "Unpaid" },
                                    { value: "Partial", label: "Partial" },
                                    { value: "Paid", label: "Paid" },
                                ]}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Payment Tracking</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                className="mx-1"
                                label={"Payment Reference(s)"}
                                name="payment_references"
                                placeholder="Enter transaction IDs (comma separated)"
                                required={false}
                                message={"Enter payment references if applicable"}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Payment Date(s)"}
                                name="payment_dates"
                                placeholder="Select payment date(s)"
                                required={false}
                                message={"Select payment date(s) if applicable"}
                                allowToday={true}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Payment Method"}
                                placeholder="Select payment method"
                                name="payment_method"
                                required={false}
                                message={"Please select payment method"}
                                options={[
                                    { value: "Bank Transfer", label: "Bank Transfer" },
                                    { value: "Credit Card", label: "Credit Card" },
                                    { value: "Cheque", label: "Cheque" },
                                    { value: "Cash", label: "Cash" },
                                    { value: "Other", label: "Other" },
                                ]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Payment Status"}
                                placeholder="Select payment status"
                                name="payment_status"
                                required={false}
                                message={"Please select payment status"}
                                options={[
                                    { value: "Unpaid", label: "Unpaid" },
                                    { value: "Partial", label: "Partial" },
                                    { value: "Paid", label: "Paid" },
                                ]}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                className="mx-1"
                                label={"Dunning Level"}
                                name="dunning_level"
                                type="number"
                                min="0"
                                step="1"
                                placeholder="Enter dunning level (e.g., 1, 2, 3...)"
                                required={false}
                                message={"Enter dunning level if applicable"}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Last Reminder Date"}
                                name="last_reminder_date"
                                placeholder="Select last reminder date"
                                required={false}
                                message={"Select last reminder date if any"}
                                allowToday={true}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Write-off Date"}
                                name="write_off_date"
                                placeholder="Select write-off date"
                                required={false}
                                message={"Select write-off date if applicable"}
                                allowToday={true}
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

                        <Tabs
                            className={"customerinfo_tabsPanel mt-3 mx-2"}
                            defaultActiveKey="1"
                            items={items}
                        />
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

export default InvoiceForm