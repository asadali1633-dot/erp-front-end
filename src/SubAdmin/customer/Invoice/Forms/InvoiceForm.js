import React, { useEffect, useRef, useState } from 'react'
import style from './form.module.css'
import { Form, Modal, Table } from 'antd';
import { FormInput, FormInputTextArea } from '../../../../Components/Inputs/Inputs';
import { SelectInput } from '../../../../Components/Select/Select';
import { Button,ActionButton } from '../../../../Components/Button/Button';
import { Tabs,message } from "antd";
import { connect, useSelector } from 'react-redux';
import CustomDate from '../../../../Components/Date/CustomDate';
import * as CLIENTS_ACTIONS from "../../../../store/action/clients/index";
import * as QUOTE_ACTIONS from "../../../../store/action/quote/index";
import * as INVOICE_ACTIONS from "../../../../store/action/invoice/index";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import baseUrl from '../../../../config.json'
import MultipleDates from '../../../../Components/Date/MultipleDates';




function InvoiceForm({
    InvoiceModal,
    setInvoiceModal,
    Red_Clients,
    GetClientList,
    Red_Quote,
    getAllQuoteBySimpleList,
    Red_Invoice,
    CreateInvoiceFun,
    code, setCode,
    pageBody,editData,
    GetAllInVoiceWithPage,
    Red_Emp
}) {
    const [form] = Form.useForm();
    const formValues = Form.useWatch([], form);
    const itemsValue = Form.useWatch('items', form);
    const [value, setValue] = useState('');
    const clientList = Red_Clients?.ClientList?.[0]?.data
    const QuoteList = Red_Quote?.QuoteSimpleList?.[0]?.data
    const lastAddedRef = useRef(false);
    const [loading, setloading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const accessToken = useSelector((state) => state.Red_Auth.accessToken);
    const [privateNotes, setPrivateNotes] = useState('');
    const [termsConditions, setTermsConditions] = useState('');

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

    const items = [
        {
            label: 'Notes / Memo',
            key: '1',
            children: <>
                <div>
                    <ReactQuill
                        theme="snow"
                        name="private_notes"
                        className='textEiditor'
                        value={privateNotes}
                        onChange={(value) => {
                            setPrivateNotes(value);
                            form.setFieldsValue({ private_notes: value });
                        }}
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
                        name="terms_conditions"
                        className='textEiditor'
                        value={termsConditions}
                        onChange={(value) => {
                            setTermsConditions(value);
                            form.setFieldsValue({ terms_conditions: value });
                        }}
                        modules={modules}
                        placeholder="Write Here..."
                    />
                </div>
            </>,
        },
    ]

    const columns = [
        {
            title: "Description",
            width: 300,
            render: (_, record) => (
                <FormInput
                    name={[record.field.name, 'description']}
                    placeholder="Item description"
                    required={false}
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
                    required={false}
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
                    required={false}
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
                    required={false}
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

    const formatNumber = (value) => {
        if (value === undefined || value === null || value === '') return '-';
        const num = parseFloat(value);
        if (isNaN(num)) return '-';
        if (Number.isInteger(num)) {
            return num.toLocaleString('en-PK');
        }
        return num.toLocaleString('en-PK', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        });
    };

    const editFuntionData = () => {
        if (editData && code?.mode === "Edit") {
            const data = editData;
            if (!data) return;

            let transformedItems = [];
            if (data.items && Array.isArray(data.items)) {
                transformedItems = data.items.map(item => ({
                    description: item?.description,
                    quantity: item?.quantity,
                    Unit_Price: item?.unit_price,
                    discount_percent: item?.discount_percent,
                    tax_rate: item?.tax_rate,
                    tax_amount: item?.tax_amount,
                    total: item?.line_total,
                    uom: item?.uom
                }));
            }

            if (transformedItems.length === 0) {
                transformedItems = [{}];
            }


            const formValues = {
                client_id: data.client_id,
                invoice_number: data.invoice_number,
                invoice_date: data.invoice_date?.slice(0, 10),
                due_date: data.due_date?.slice(0, 10),
                customer_name: data.customer_name,
                customer_contact: data.customer_contact,
                billing_address: data.billing_address,
                shipping_address: data.shipping_address,
                project_id: data.project_id,
                contact_person: data?.contact_person,
                contact_email: data?.contact_email,
                customer_po_reference: data?.customer_po_reference,
                sales_order_id: data?.sales_order_id,
                project_id: data?.project_id,
                currency: data.currency,
                exchange_rate: data?.exchange_rate,
                acc_holder_name: data?.acc_holder_name,
                bank_account_details: data?.bank_account_details,
                status: data?.status,
                payment_references: data?.payment_references,
                payment_dates: data?.payment_dates,
                payment_method: data?.payment_method,
                payment_status: data?.payment_status,
                dunning_level: data?.dunning_level,
                last_reminder_date: data?.last_reminder_date?.slice(0,10),
                write_off_date: data?.write_off_date?.slice(0,10),
                private_notes: setPrivateNotes(data.private_notes),
                terms_conditions: setTermsConditions(data.terms_conditions),
                items: transformedItems
            };

            form.setFieldsValue(formValues);
        }
    };

     const getPreviewData = () => {
        if (!formValues) return { items: [] };
        let items = formValues.items || [];
        items = items.filter(item => item?.description || item?.quantity || item?.Unit_Price || item?.discount_percent || item?.tax_rate || item?.tax_amount || item?.total);
        const company = Red_Emp?.GetUserLoginTime?.[0]?.data || {};

        const quoteDate = formValues.quote_date
            ? dayjs(formValues.quote_date).format('YYYY-MM-DD')
            : '';
        const validUntil = formValues.valid_until
            ? dayjs(formValues.valid_until).format('YYYY-MM-DD')
            : '';
        return {
            quotation_number: formValues.quotation_number,
            quote_date: quoteDate,
            valid_until: validUntil,
            customer_name: formValues.customer_name,
            customer_contact: formValues.customer_contact,
            customer_email: formValues.customer_email,
            customer_phone: formValues.customer_phone,
            billing_address: formValues.billing_address,
            items: items,
            currency: formValues.currency,
            terms_conditions: termsConditions,
            // Company details
            company_name: company.company_name,
            company_logo: company.company_logo,
            company_address: company.company_address,
            company_phone: company.company_phone,
            company_whatsapp: company.company_whatsapp_no,
            company_email: company.email,
            company_website: company.company_website_url,
            ntn_vat: company.ntn_vat,
            business_id: company.business_id,
            ntn: ntn || editData?.[0]?.data?.ntn,
            strn: strn || editData?.[0]?.data?.registration_number
            
        };
    };
    //    const renderPDFPreview = () => {
    //     const items = formValues?.items || [];
    //     const hasValidItems = items.some(item =>
    //         item?.description && item?.quantity && item?.Unit_Price
    //     );
    //     if (!hasValidItems) return null;
    //         const buttons = (
    //             <div className={style.printBtn}>
    //                 <ActionButton
    //                     className={"mt-2 mx-1 w-auto"}
    //                     title={"Alternate Quote"}
    //                     onClick={() => setformatDoc("alternateQuote")}
    //                 />
    //                 <ActionButton
    //                     className={"mt-2 mx-1 mr-4 w-auto"}
    //                     title={"Letter Head"}
    //                     onClick={() => setformatDoc("letter_head")}
    //                 />
    //                 <ActionButton
    //                     className={"mt-2 w-auto"}
    //                     title={"PDF"}
    //                     onClick={() => setformatDoc("PDF")}
    //                 />
    //             </div>
    //         );
    //     if (pdfLoading) {
    //         return (
    //             <>
    //                 {buttons}
    //                 <div class="load-bar">
    //                     <div class="bar"></div>
    //                     <div class="bar"></div>
    //                     <div class="bar"></div>
    //                 </div>
    //             </>
    //         );
    //     }
    //     const viewer = formatDoc === "PDF" ? (
    //         <PDFViewer width="100%" height="1000px">
    //             <QuotationLivePreview data={getPreviewData()} />
    //         </PDFViewer>
    //     ) : formatDoc == "letter_head"? (
    //         <PDFViewer width="100%" height="1000px">
    //             <LetterHead data={getPreviewData()} />
    //         </PDFViewer>
    //     ): formatDoc == "alternateQuote"? (
    //         <PDFViewer width="100%" height="1000px">
    //             <AlternateQuote data={getPreviewData()} />
    //         </PDFViewer>
    //     ): null  

    //     return (
    //         <>
    //             {buttons}
    //             {viewer}
    //         </>
    //     );
    // };

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
    const lineTotal = () => {
        if (itemsValue && itemsValue.length > 0) {
            itemsValue.forEach((item, index) => {
                const qty = parseFloat(item?.quantity) || 0;
                const price = parseFloat(item?.Unit_Price) || 0;
                const discountPercent = parseFloat(item?.discount_percent) || 0;
                const taxRate = parseFloat(item?.tax_rate) || 0;

                const subtotal = qty * price;
                const discountAmount = subtotal * (discountPercent / 100);
                const taxAmount = subtotal * (taxRate / 100);
                const lineTotal = subtotal - discountAmount + taxAmount;


                const currentTotal = parseFloat(item?.total) || 0;
                if (Math.abs(currentTotal - lineTotal) > 0.01) {
                    form.setFieldValue(['items', index, 'total'], formatNumber(lineTotal));
                }

                const currentTax = parseFloat(item?.tax_amount) || 0;
                if (Math.abs(currentTax - taxAmount) > 0.01) {
                    form.setFieldValue(['items', index, 'tax_amount'], taxAmount);
                }
            });
        }
    };

    const handleClientSelect = async (clientId) => {
        const response = await fetch(`${baseUrl.baseUrl}/api/invoice/generate-number`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({ client_id: clientId })
        });
        const res = await response.json();
        if (res.success) {
            form.setFieldsValue({
                invoice_number: res?.data?.invoice_number,
                customer_name: res?.data?.customer_details?.company_name,
                billing_address: res?.data?.customer_details?.billing_address,
                shipping_address: res?.data?.customer_details?.shipping_address,
                contact_person: res?.data?.customer_details?.contact_name,
                contact_email: res?.data?.customer_details?.contact_email,
                currency: res?.data?.customer_details?.currency,
                // customer_phone: res?.data?.customer_phone,
                // billing_address: res?.data?.billing_address,
                // currency: res?.data?.currency,
            });
        }
    };

    const handleForm = async (values) => {
        setloading(true);
        let filteredItems = [];
        if (values.items && Array.isArray(values.items)) {
            filteredItems = values.items.filter(item => {
                const hasDescription = item.description && String(item.description).trim() !== '';
                const hasQuantity = item.quantity !== undefined && item.quantity !== null && item.quantity !== '';
                const hasPrice = item.Unit_Price !== undefined && item.Unit_Price !== null && item.Unit_Price !== '';
                return hasDescription || hasQuantity || hasPrice;
            });
        }
        const data = {
            ...values,
            items: filteredItems,
            private_notes: privateNotes,
            terms_conditions: termsConditions
        }
        if (code?.mode !== "Edit") {
            const isCheck = await CreateInvoiceFun(data, accessToken);
            if (isCheck?.success) {
                messageApi.success({
                    type: "success",
                    content: isCheck?.message,
                });
                setInvoiceModal(false);
                form.resetFields();
                setloading(false);
                GetAllInVoiceWithPage(pageBody, accessToken);
            } else {
                setloading(false);
                messageApi.error({
                    type: "error",
                    content: isCheck?.message,
                });
            }
        } else {
            // const isCheck = await UpdateQuote(code?.code, formData, accessToken);
        }
    };



    useEffect(() => {
        GetClientList(accessToken);
        getAllQuoteBySimpleList(accessToken)
    }, [accessToken])

    useEffect(() => {
        addRow()
    }, [itemsValue, form]);

    useEffect(() => {
        lineTotal()
    }, [itemsValue, form]);

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
                    onFinish={handleForm}
                    initialValues={{ items: [{}] }}
                    onValuesChange={async (changedValues, allValues) => {
                        if (changedValues.client_id) {
                            handleClientSelect(changedValues.client_id)
                        }
                    }}
                >
                    <div className={style.modalHardwareScroll}>
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

                        <Tabs
                            className={"customerinfo_tabsPanel mt-3 mx-2"}
                            defaultActiveKey="1"
                            items={items}
                        />
                    </div>
                    <div className={style.vendor_modalBtns}>
                        <Button
                            className={"mx-1 mt-2 w-auto"}
                            title={loading ? "Loading" : code?.mode == "Edit" ? "Update Invoice" : "Create"} loading={loading}
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
        Red_Quote: state.Red_Quote,
        Red_Invoice: state.Red_Invoice,
        Red_Emp: state.Red_Emp,
    };
}
const AllActions = {
    ...CLIENTS_ACTIONS,
    ...QUOTE_ACTIONS,
    ...INVOICE_ACTIONS,
};
export default connect(mapStateToProps, AllActions)(InvoiceForm);