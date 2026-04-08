import React, { useEffect, useRef, useState } from 'react'
import style from './form.module.css'
import { Form, message, Modal, Table } from 'antd';
import { FormInput, FormInputTextArea } from '../../../../Components/Inputs/Inputs';
import { SelectInput } from '../../../../Components/Select/Select';
import { ActionButton, Button } from '../../../../Components/Button/Button';
import { Tabs } from 'antd';
import CustomDate from '../../../../Components/Date/CustomDate';
import UploadFile from '../../../../Components/File/UploadFile';
import * as CLIENTS_ACTIONS from "../../../../store/action/clients/index";
import * as QUOTE_ACTIONS from "../../../../store/action/quote/index";
import * as ASSETS_ACTIONS from "../../../../store/action/hardware/index";
import { useReactToPrint } from 'react-to-print';
import { connect, useSelector } from 'react-redux';
import dayjs from "dayjs";
import baseUrl from '../../../../config.json'
import QuotationLivePreview from '../QuotationLivePreview';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import ReactQuill from 'react-quill'
import LetterHead from '../LetterHead';
import AlternateQuote from '../AlternateQuote';
import MultipleUploads from '../../../../Components/File/MultipleUploads';




function QuotationForm({
    QuotationModal,
    setQuotationModal,
    Red_Clients,
    Red_Quote,
    GetClientList,
    CreateQuoteFun,
    code,
    setCode,
    pageBody,
    editData,
    UpdateQuote,
    GetAllQuotewithPage,
    Red_Emp,
    Red_Assets,
    GetAllEmpList,
}) {
    const [form] = Form.useForm();
    const formValues = Form.useWatch([], form);
    const [loading, setloading] = useState(false);
    const lastAddedRef = useRef(false);
    const itemsValue = Form.useWatch('items', form);
    const accessToken = useSelector((state) => state.Red_Auth.accessToken);
    const clientList = Red_Clients?.ClientList?.[0]?.data
    const users = Red_Assets?.Users?.[0]?.data
    const [messageApi, contextHolder] = message.useMessage();
    const [strn, setstrn] = useState(null)
    const [ntn, setntn] = useState(null)
    const [formatDoc, setformatDoc] = useState("PDF")
    const [privateNotes, setPrivateNotes] = useState('');
    const [termsConditions, setTermsConditions] = useState('');
    const [pdfLoading, setPdfLoading] = useState(false);

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

    const handleOk = () => {
        setQuotationModal(false);
        setCode({
            mode: null,
            code: null
        })
    };
    const handleCancel = () => {
        setQuotationModal(false);
        setCode({
            mode: null,
            code: null
        })
    };

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
                    required={false}
                    placeholder="Total"
                    readOnly={true}
                />
            ),
        }
    ];

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
            label: 'Private Notes / Memo',
            key: '1',
            children: <>
                <div>
                    <ReactQuill
                        theme="snow"
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

    const editFuntionData = () => {
        if (editData && code?.mode === "Edit") {
            const data = editData?.[0]?.data;
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
                quotation_number: data.quotation_number,
                quote_date: data.quote_date?.slice(0, 10),
                valid_until: data.valid_until?.slice(0, 10),
                revision_number: data.revision_number,
                customer_name: data.customer_name,
                customer_contact: data.customer_contact,
                customer_email: data.customer_email,
                customer_phone: data.customer_phone,
                billing_address: data.billing_address,
                shipping_address: data.shipping_address,
                project_id: data.project_id,
                sales_person_id: data?.sales_person_id && data?.sales_person_type
                    ? `${data.sales_person_type}_${data.sales_person_id}`
                    : null,
                currency: data.currency,
                exchange_rate: data.exchange_rate,
                payment_terms: data.payment_terms,
                delivery_terms: data.delivery_terms,
                status: data.status,
                private_notes: setPrivateNotes(data.private_notes),
                terms_conditions: setTermsConditions(data.terms_conditions),
                items: transformedItems
            };

            form.setFieldsValue(formValues);
        }
    };

    const handleClientSelect = async (clientId) => {
        const response = await fetch(`${baseUrl.baseUrl}/api/quotation/generate-number`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({ client_id: clientId })
        });
        const res = await response.json();
        if (res.success) {
            setstrn(res?.data?.strn_no)
            setntn(res?.data?.ntn_no)
            form.setFieldsValue({
                quotation_number: res?.data?.quotation_number,
                customer_name: res?.data?.customer_name,
                customer_contact: res?.data?.customer_contact,
                customer_email: res?.data?.customer_email,
                customer_phone: res?.data?.customer_phone,
                billing_address: res?.data?.billing_address,
                shipping_address: res?.data?.shiping_address,
                currency: res?.data?.currency,
            });
        }
    };

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
                    form.setFieldValue(['items', index, 'total'], formatNumber(lineTotal.toFixed(2)));
                }

                const currentTax = parseFloat(item?.tax_amount) || 0;
                if (Math.abs(currentTax - taxAmount) > 0.01) {
                    form.setFieldValue(['items', index, 'tax_amount'], formatNumber(taxAmount.toFixed(2)));
                }
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
        const formData = new FormData();
        Object.keys(values).forEach(key => {
            if (key === 'items') return;
            if (key === 'attachments') return;
            if(key === "sales_person_id") return;
            let val = values[key];
            if (val === undefined || val === null || val === '') return;
            if (Array.isArray(val)) val = JSON.stringify(val);
            formData.append(key, val);
        });

        if (filteredItems.length > 0) {
            formData.append('items', JSON.stringify(filteredItems));
        }
        if (values.attachments && Array.isArray(values.attachments) && values.attachments.length > 0) {
            values.attachments.forEach(file => {
                if (file.originFileObj) {
                    formData.append('attachments', file.originFileObj);
                }
            });
        }
        if (values?.sales_person_id) {
            const parts = values.sales_person_id.split("_");
            const id = parts.pop();
            const type = parts.join("_");

            formData.append("sales_person_type", type);
            formData.append("sales_person_id", id);
        }
        if (privateNotes) {
            formData.append('private_notes', privateNotes);
        }
        if (termsConditions) {
            formData.append('terms_conditions', termsConditions);
        }

        if (code?.mode !== "Edit") {
            const isCheck = await CreateQuoteFun(formData, accessToken);
            if (isCheck?.success) {
                messageApi.success({
                    type: "success",
                    content: isCheck?.message,
                });
                setQuotationModal(false);
                form.resetFields();
                setloading(false);
                GetAllQuotewithPage(pageBody, accessToken);
            } else {
                setloading(false);
                messageApi.error({
                    type: "error",
                    content: isCheck?.message,
                });
            }
        } else {
            const isCheck = await UpdateQuote(code?.code, formData, accessToken);
            if (isCheck?.success) {
                messageApi.success({
                    type: "success",
                    content: isCheck?.message,
                });
                setQuotationModal(false);
                form.resetFields();
                setloading(false);
                GetAllQuotewithPage(pageBody, accessToken);
            } else {
                setloading(false);
                messageApi.error({
                    type: "error",
                    content: isCheck?.message,
                });
            }
        }
    };

    const pdfLoader = () => {
        const items = formValues?.items || [];
        const hasValidItems = items.some(item =>
            item?.description && item?.quantity && item?.Unit_Price
        );
        if (!hasValidItems) return;

        setPdfLoading(true);
        const timer = setTimeout(() => {
            setPdfLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }

    const renderPDFPreview = () => {
        const items = formValues?.items || [];
        const hasValidItems = items.some(item =>
            item?.description && item?.quantity && item?.Unit_Price
        );
        if (!hasValidItems) return null;
            const buttons = (
                <div className={style.printBtn}>
                    <ActionButton
                        className={"mt-2 mx-1 w-auto"}
                        title={"Alternate Quote"}
                        onClick={() => setformatDoc("alternateQuote")}
                    />
                    <ActionButton
                        className={"mt-2 mx-1 mr-4 w-auto"}
                        title={"Letter Head"}
                        onClick={() => setformatDoc("letter_head")}
                    />
                    <ActionButton
                        className={"mt-2 w-auto"}
                        title={"PDF"}
                        onClick={() => setformatDoc("PDF")}
                    />
                </div>
            );
        if (pdfLoading) {
            return (
                <>
                    {buttons}
                    <div class="load-bar">
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                    </div>
                </>
            );
        }
        const viewer = formatDoc === "PDF" ? (
            <PDFViewer width="100%" height="1000px">
                <QuotationLivePreview data={getPreviewData()} />
            </PDFViewer>
        ) : formatDoc == "letter_head"? (
            <PDFViewer width="100%" height="1000px">
                <LetterHead data={getPreviewData()} />
            </PDFViewer>
        ): formatDoc == "alternateQuote"? (
            <PDFViewer width="100%" height="1000px">
                <AlternateQuote data={getPreviewData()} />
            </PDFViewer>
        ): null  

        return (
            <>
                {buttons}
                {viewer}
            </>
        );
    };


    useEffect(() => {
        pdfLoader()
    }, [formatDoc, formValues]);

    useEffect(() => {
        lineTotal()
    }, [itemsValue, form]);

    useEffect(() => {
        addRow()
    }, [itemsValue, form]);

    useEffect(() => {
        GetClientList(accessToken);
        GetAllEmpList(accessToken);
    }, [accessToken])

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
                            <h5 className="mx-1">Quotation Form</h5>
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Quotation Identification</h5>
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
                                label={"Quotation Number"}
                                name="quotation_number"
                                placeholder="Auto-generated (e.g., ClientFirst-3000-01)"
                                required={true}
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
                        </div>
                        <div className={style.form_inputBox}>
                            <CustomDate
                                className="mx-1"
                                label={"Valid Until"}
                                name="valid_until"
                                placeholder="Select expiry date"
                                required={true}
                                message={"Valid until date is required"}
                                allowToday={true}
                            />
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
                            <FormInput
                                className="mx-1"
                                label={"Customer Name"}
                                name="customer_name"
                                placeholder="Auto-populated from Customer ID"
                                required={false}
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
                                name="sales_person_id"
                                required={true}
                                showSearch={true}
                                message={"Please select sales person"}
                                options={users?.map((item) => ({
                                    value: `${item.user_type}_${item.id}`,
                                    label: `${item.name || ''} - ${item.email || ''}`
                                }))}
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
                                label={"Status"}
                                placeholder="Select quote status"
                                name="status"
                                required={false}
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
                    <Tabs
                        className={"customerinfo_tabsPanel mt-3 mx-2"}
                        defaultActiveKey="1"
                        items={items}
                    />

                    <div className={style.vendor_modalBtns}>
                        <Button
                            className={"mx-1 mt-2 w-auto"}
                            title={loading ? "Loading" : code?.mode == "Edit" ? "Update Client" : "Create"} loading={loading}
                        />
                    </div>
                </Form>


                <div style={{ marginTop: 20 }}>
                    {renderPDFPreview()}
                </div>
            </Modal>
        </>
    )
}


function mapStateToProps(state) {
    return {
        Red_Clients: state.Red_Clients,
        Red_Quote: state.Red_Quote,
        Red_Emp: state.Red_Emp,
        Red_Assets: state.Red_Assets,
    };
}
const AllActions = {
    ...CLIENTS_ACTIONS,
    ...QUOTE_ACTIONS,
    ...ASSETS_ACTIONS
};
export default connect(mapStateToProps, AllActions)(QuotationForm);