import React, { useEffect, useRef, useState } from 'react'
import style from './form.module.css'
import { Form, Modal, Table } from 'antd';
import { FormInput, FormInputTextArea } from '../../../../Components/Inputs/Inputs';
import { SelectInput } from '../../../../Components/Select/Select';
import { Button } from '../../../../Components/Button/Button';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CustomDate from '../../../../Components/Date/CustomDate';
import UploadFile from '../../../../Components/File/UploadFile';




function PurchaseOrderForm({
    PurchaseOrdersForm,
    setPurchaseOrdersForm
}) {
    const [form] = Form.useForm();
    const lastAddedRef = useRef(false);
    const itemsValue = Form.useWatch('items', form);
    const handleOk = () => {
        setPurchaseOrdersForm(false);
    };
    const handleCancel = () => {
        setPurchaseOrdersForm(false);
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
            title: "Model",
            width: 100,
            render: (_, record) => (
                <FormInput
                    name={[record.field.name, 'model_part_number']}
                    placeholder="Enter model or part number"
                    required={false}
                    message={"Enter model/part number if applicable"}
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
                    min="0"
                    step="0.01"
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
            title: "LIne Total",
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
                open={PurchaseOrdersForm}
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
                            <h5 className="mx-1">Purchase Order Form</h5>
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Basic Information</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                className="mx-1"
                                label={"Purchase Order Number"}
                                name="po_number"
                                placeholder="Auto-generated (e.g., PO-2025-0001)"
                                required={false}
                                readOnly={true}
                                message={"PO number is auto-generated"}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Order Date"}
                                name="order_date"
                                placeholder="Select order date"
                                required={true}
                                message={"Order date is required"}
                                allowToday={true}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Expected Delivery Date"}
                                name="expected_delivery_date"
                                placeholder="Select expected delivery date"
                                required={true}
                                message={"Expected delivery date is required"}
                                allowToday={true}
                            />


                            <SelectInput
                                className="mx-1"
                                label={"Vendor ID"}
                                placeholder="Select Vendor"
                                name="vendor_id"
                                required={true}
                                showSearch={true}
                                message={"Please select a vendor"}
                                options={[]}
                            />
                        </div>
                        <div className={style.form_inputBox}>
                            <FormInput
                                className="mx-1"
                                label={"Vendor Name"}
                                name="vendor_name"
                                placeholder="Auto-filled from vendor selection"
                                required={false}
                                readOnly={true}
                                message={"Vendor name auto-filled"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Vendor Contact Person"}
                                name="vendor_contact_person"
                                placeholder="Enter contact person name"
                                required={false}
                                message={"Enter vendor contact person"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Vendor Email / Phone"}
                                name="vendor_email_phone"
                                placeholder="Enter vendor email or phone"
                                required={false}
                                message={"Enter vendor contact details"}
                            />


                            <FormInput
                                className="mx-1"
                                label={"Billing Address"}
                                name="billing_address"
                                placeholder="Enter billing address"
                                required={true}
                                message={"Billing address is required"}
                            />
                        </div>
                        <div className={style.form_inputBox}>
                            <FormInput
                                className="mx-1"
                                label={"Shipping Address"}
                                name="shipping_address"
                                placeholder="Enter shipping address (warehouse, project site)"
                                required={true}
                                message={"Shipping address is required"}
                            />


                            <SelectInput
                                className="mx-1"
                                label={"Buyer / Requisitioner"}
                                placeholder="Select buyer"
                                name="buyer_id"
                                required={true}
                                showSearch={true}
                                message={"Please select requisitioner"}
                                options={[]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Department / Cost Center"}
                                placeholder="Select department"
                                name="department_id"
                                required={true}
                                showSearch={true}
                                message={"Please select department/cost center"}
                                options={[]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Project ID"}
                                placeholder="Select project (if applicable)"
                                name="project_id"
                                required={false}
                                showSearch={true}
                                message={"Select project if PO is project-specific"}
                                options={[]}
                            />
                        </div>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Service Order ID"}
                                placeholder="Select service order (if applicable)"
                                name="service_order_id"
                                required={false}
                                showSearch={true}
                                message={"Select service order if ordering parts for repair"}
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
                                    { value: "USD", label: "USD - US Dollar" },
                                    { value: "EUR", label: "EUR - Euro" },
                                    { value: "GBP", label: "GBP - British Pound" },
                                    { value: "INR", label: "INR - Indian Rupee" },
                                    { value: "PKR", label: "PKR - Pakistani Rupee" },
                                    { value: "AED", label: "AED - UAE Dirham" },
                                    { value: "SAR", label: "SAR - Saudi Riyal" },
                                ]}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Exchange Rate"}
                                name="exchange_rate"
                                type="number"
                                step="0.0001"
                                min="0"
                                placeholder="Enter exchange rate (if applicable)"
                                required={false}
                                message={"Enter exchange rate"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Payment Terms"}
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
                        </div>
                        <div className={style.form_inputBox}>
                            <FormInput
                                className="mx-1"
                                label={"Incoterms"}
                                name="incoterms"
                                placeholder="e.g., EXW, FOB, CIF, DAP"
                                required={false}
                                message={"Enter delivery terms (Incoterms)"}
                            />


                            <SelectInput
                                className="mx-1"
                                label={"Status"}
                                placeholder="Select PO status"
                                name="status"
                                required={true}
                                message={"Please select status"}
                                options={[
                                    { value: "Draft", label: "Draft" },
                                    { value: "Sent", label: "Sent" },
                                    { value: "Acknowledged", label: "Acknowledged" },
                                    { value: "Shipped", label: "Shipped" },
                                    { value: "Partially Received", label: "Partially Received" },
                                    { value: "Received", label: "Received" },
                                    { value: "Cancelled", label: "Cancelled" },
                                    { value: "Closed", label: "Closed" },
                                ]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Approval Status"}
                                placeholder="Select approval status"
                                name="approval_status"
                                required={true}
                                message={"Please select approval status"}
                                options={[
                                    { value: "Pending", label: "Pending" },
                                    { value: "Approved", label: "Approved" },
                                    { value: "Rejected", label: "Rejected" },
                                ]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Approved By"}
                                placeholder="Select approver"
                                name="approved_by"
                                required={false}
                                showSearch={true}
                                message={"Select approval authority"}
                                options={[]}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <CustomDate
                                className="mx-1"
                                label={"Approval Date"}
                                name="approval_date"
                                placeholder="Select approval date"
                                required={false}
                                message={"Select approval date if approved"}
                                allowToday={true}
                            />

                            {/* Notes & Terms */}
                            <FormInput
                                className="mx-1"
                                label={"Notes / Instructions"}
                                name="notes"
                                placeholder="Special instructions to vendor"
                                multiline={true}
                                rows={3}
                                required={false}
                                message={"Enter any special instructions"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Terms & Conditions"}
                                name="terms_conditions"
                                placeholder="Enter terms and conditions"
                                multiline={true}
                                rows={4}
                                required={false}
                                message={"Enter PO terms and conditions"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>PO Details</h5>
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
                                        scroll={{x:1500}}
                                        columns={columns}
                                        pagination={false}
                                        rowKey="key"
                                    />
                                );
                            }}
                        </Form.List>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Receiving Information</h5>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                className="mx-1"
                                label={"Receipt Number"}
                                name="receipt_number"
                                placeholder="Auto-generated (e.g., RCPT-2025-0001)"
                                required={false}
                                readOnly={true}
                                message={"Receipt number is auto-generated"}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Receipt Date"}
                                name="receipt_date"
                                placeholder="Select receipt date"
                                required={true}
                                message={"Receipt date is required"}
                                allowToday={true}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Received By"}
                                placeholder="Select receiver"
                                name="received_by"
                                required={true}
                                showSearch={true}
                                message={"Please select who received the goods"}
                                options={[]}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Financial & Invoicing (Accounts Payable)</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                className="mx-1"
                                label={"Vendor Invoice Number"}
                                name="vendor_invoice_number"
                                placeholder="Enter vendor invoice reference number"
                                required={true}
                                message={"Vendor invoice number is required"}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Vendor Invoice Date"}
                                name="vendor_invoice_date"
                                placeholder="Select invoice date"
                                required={true}
                                message={"Vendor invoice date is required"}
                                allowToday={true}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Vendor Invoice Amount"}
                                name="vendor_invoice_amount"
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="Enter invoice amount"
                                required={true}
                                message={"Vendor invoice amount is required"}
                            />
                        </div>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Matching Status"}
                                placeholder="Select matching status"
                                name="matching_status"
                                required={true}
                                message={"Please select matching status"}
                                options={[
                                    { value: "Not Matched", label: "Not Matched" },
                                    { value: "Matched", label: "Matched" },
                                    { value: "Discrepancy", label: "Discrepancy" },
                                ]}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Payment Due Date"}
                                name="payment_due_date"
                                placeholder="Select payment due date"
                                required={true}
                                message={"Payment due date is required"}
                                allowToday={true}
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
                                    { value: "Paid", label: "Paid" },
                                    { value: "Partial", label: "Partial" },
                                ]}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                className="mx-1"
                                label={"Payment Reference"}
                                name="payment_reference"
                                placeholder="Enter payment reference"
                                required={false}
                                message={"Enter payment reference if applicable"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Prepayment Amount"}
                                name="prepayment_amount"
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="Enter advance payment"
                                required={false}
                                message={"Enter prepayment amount if applicable"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Financial & Invoicing (Accounts Payable)</h5>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                className="mx-1"
                                label={"Request for Quotation (RFQ) Reference"}
                                name="rfq_reference"
                                placeholder="Enter RFQ reference number"
                                required={false}
                                message={"Enter RFQ reference if applicable"}
                            />

                            <UploadFile
                                className="mx-1 inputFlexBox"
                                label={"Quotation from Vendor"}
                                name="vendor_quotation"
                                title={"Upload Quotation"}
                                required={false}
                                multiple={false}
                                accept=".pdf,.doc,.docx,.xls,.xlsx"
                                message={"Upload vendor quotation document"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Contract Reference"}
                                name="contract_reference"
                                placeholder="Enter contract reference (if part of master agreement)"
                                required={false}
                                message={"Enter contract reference if applicable"}
                            />

                            <UploadFile
                                className="mx-1 inputFlexBox"
                                label={"Attachments"}
                                name="attachments"
                                title={"Upload Files"}
                                required={false}
                                multiple={true}
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx"
                                message={"Upload scanned PO, specifications, etc."}
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

export default PurchaseOrderForm