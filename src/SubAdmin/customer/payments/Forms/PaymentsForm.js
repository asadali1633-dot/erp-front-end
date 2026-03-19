import React, { useEffect, useRef, useState } from 'react'
import style from './form.module.css'
import { Form, Modal, Tabs } from 'antd';
import { FormInput } from '../../../../Components/Inputs/Inputs';
import { SelectInput } from '../../../../Components/Select/Select';
import { Button } from '../../../../Components/Button/Button';
import CustomDate from '../../../../Components/Date/CustomDate';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import UploadFile from '../../../../Components/File/UploadFile';




function PaymentsForm({
    PaymentsModal,
    setPaymentsModal
}) {
    const [form] = Form.useForm();
    const [value, setValue] = useState('');
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
        setPaymentsModal(false);
    };
    const handleCancel = () => {
        setPaymentsModal(false);
    };

    const items = [
        {
            label: 'Private Notes',
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
            label: 'Attachments',
            key: '2',
            children: <>
                <div>
                    <UploadFile
                        className="mx-1 inputFlexBox"
                        label={"Attachments"}
                        name="attachments"
                        title={"Attachments"}
                        required={true}
                        multiple={true}
                        accept="image/jpeg,image/png,application/pdf"
                        classNameColor={`${style.inputDefaultBg}`}
                        message={"Attachments (Invoices, warranty cards, service receipts, photos)"}
                    />
                </div>
            </>,
        },
    ]


    return (
        <>
            <Modal
                title=""
                closable={{ 'aria-label': 'Custom Close Button' }}
                className={`${style.form_modalWidth} modalBgColor`}
                open={PaymentsModal}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                width={"100%"}
            >
                <Form
                    form={form}
                    className={`${style.form_modalMainBox} mt-3`} z
                    layout="vertical"
                    initialValues={{ items: [{}] }}
                // onFinish={handleForm}
                >
                    <div className={style.modalHardwareScroll}>
                        <div className={style.QR_box}>
                            <h5 className="mx-1">Payments Form</h5>
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Payment Info</h5>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Client"}
                                placeholder="Select client"
                                name="client_id"
                                required={true}
                                showSearch={true}
                                message={"Please select a client"}
                                options={[]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Invoice"}
                                placeholder="Select invoice"
                                name="invoice_id"
                                required={true}
                                showSearch={true}
                                message={"Please select an invoice"}
                                options={[]}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Amount"}
                                name="amount"
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="Enter payment amount"
                                required={true}
                                message={"Amount is required"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <CustomDate
                                className="mx-1"
                                label={"Payment Date"}
                                name="payment_date"
                                placeholder="Select payment date"
                                required={true}
                                message={"Payment date is required"}
                                allowToday={true}
                            />    

                            <SelectInput
                                className="mx-1"
                                label={"Payment Type"}
                                placeholder="Select payment type"
                                name="payment_type"
                                required={true}
                                message={"Please select payment type"}
                                options={[
                                    { value: "Cheque", label: "Cheque" },
                                    { value: "Cash", label: "Cash" },
                                    { value: "Bank Deposit", label: "Bank Deposit" },
                                    { value: "Fund Transfer", label: "Fund Transfer" },
                                    { value: "Credit Card", label: "Credit Card" },
                                    { value: "Other", label: "Other" },
                                ]}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Transaction Reference"}
                                name="transaction_reference"
                                placeholder="Enter transaction ID, cheque number, etc."
                                required={false}
                                message={"Enter transaction reference if applicable"}
                            />
                        </div>
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

export default PaymentsForm