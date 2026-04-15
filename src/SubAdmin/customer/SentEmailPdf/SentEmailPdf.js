import React, { useState } from 'react'
import { Form, Modal } from 'antd';
import './emailpdf.css'
import { Tabs, Dropdown } from "antd";
import { ActionButton, Button, OutLineButton } from '../../../Components/Button/Button';
import { SelectInput } from '../../../Components/Select/Select';

function SentEmailPdf({
    sentToIEmailInvoice, setsentToEamilInvoice
}) {
    const [activeTab, setActiveTab] = useState("1");

    const handleOk = () => {
        setsentToEamilInvoice(false);

    };

    const handleCancel = () => {
        setsentToEamilInvoice(false);
    };

    const items = [
        {
            key: "1",
            label: "PDF",
            children: "PDF",
        },
        {
            key: "2",
            label: "History",
            children: "History",
        }
    ];
    return (
        <>

            <Modal
                title=""
                className={` form_modalWidth modalBgColor`}
                open={sentToIEmailInvoice}
                onOk={handleOk}
                closable={false}
                header={null}
                footer={null}
                width={"100%"}
            >
                <Form
                    // form={form}
                    // className={`${style.form_modalMainBox} mt-3`}
                    layout="vertical"
                // onFinish={handleForm}
                // initialValues={{ items: [{}] }}
                // onValuesChange={async (changedValues, allValues) => {
                //     if (changedValues.client_id) {
                //         handleClientSelect(changedValues.client_id)
                //     }
                // }}
                >
                    <header className='emailSentHeader'>
                        <h6>Sent Email</h6>
                        <div>
                            <OutLineButton
                                onClick={handleCancel}
                                form={false}
                                className={"mx-1 px-5 mt-2 w-auto"}
                                title={"Back"}
                                style={{
                                    fontSize: "15px",
                                    color: "white !important"
                                }}
                            />
                            <ActionButton
                                className={"mx-1 mt-2 w-auto"}
                                title={"Sent Email"}
                            />

                        </div>
                    </header>
                    <div className="row">
                        <div className="col-6">
                            <div className='emailsentClientHeaderBox'>
                                <h6>To: Moshin</h6>
                                <SelectInput
                                    className="mx-1"
                                    label={"remider"}
                                    placeholder="Select reminder"
                                    name="reminder"
                                    required={true}
                                    message={"Please select currency"}
                                    options={[
                                        { value: "initial_email", label: "Initial Email" },
                                        { value: "first_reminder", label: "First reminder" },
                                        { value: "second_reminder", label: "Second reminder" },
                                        { value: "endless_reminder", label: "endless reminder" },
                                    ]}
                                />
                            </div>
                        </div>
                        <div className='col-6'>
                            <Tabs
                                // className={`${style.personalTabs}`}
                                style={{ width: "100%" }}
                                activeKey={activeTab}
                                onChange={setActiveTab}
                                items={items}
                            />
                        </div>
                    </div>

                    {/* <div className={style.modalHardwareScroll}>
                        <div className={style.QR_box}>
                            <h5 className="mx-1">Invoice Form</h5>
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Header Information</h5>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Customer ID"}
                                placeholder="Select customer"
                                name="client_id"
                                required={true}
                                showSearch={true}
                                message={"Please select a customer"}
                                options={clientList?.map((item) => ({
                                    value: item.id,
                                    label: `${item.company_name} (${item.client_code})`
                                }))}
                            />
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
                        </div>
                        <div className={style.form_inputBox}>
                            <CustomDate
                                className="mx-1"
                                label={"Due Date"}
                                name="due_date"
                                placeholder="Select due date"
                                required={true}
                                message={"Due date is required"}
                                allowToday={true}
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
                                options={QuoteList?.map((item) => ({
                                    value: item.id,
                                    label: item.quotation_number
                                }))}
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
                            <FormInput
                                className="mx-1"
                                label={"ACC Holder Name"}
                                name="acc_holder_name"
                                placeholder="Enter bank account title"
                                multiline={true}
                                rows={3}
                                required={false}
                                message={"Enter bank account title for payment"}
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

                            <MultipleDates
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
                    </div> */}

                    {/* <div className={style.vendor_modalBtns}>
                        <Button
                            className={"mx-1 mt-2 w-auto"}
                            title={loading ? "Loading" : code?.mode == "Edit" ? "Update Invoice" : "Create"} loading={loading}
                        />
                    </div> */}
                </Form>
            </Modal>
        </>
    )
}

export default SentEmailPdf