import React, { useState } from 'react'
import { FormInput, FormInputTextArea } from '../../../../../../../Components/Inputs/Inputs'
import style from '../../empPersonalForm.module.css'
import Heading from '../../../../../../../Components/Heading/Heading';
import { SelectInput } from '../../../../../../../Components/Select/Select';
import { Form, Modal } from 'antd';
import { FaHouseUser } from "react-icons/fa6";
import { Button, OutLineButton } from '../../../../../../../Components/Button/Button';
import { Table } from 'antd';
import CustomDate from '../../../../../../../Components/Date/CustomDate';
import UploadFile from '../../../../../../../Components/File/UploadFile';
import { RadioButton } from '../../../../../../../Components/RadioButton';


function Reimbursements() {
    const [form] = Form.useForm();
    const [modal, setmodal] = useState(false)
    const [loading, setloading] = useState(false);
    const [payroll, setPayroll] = useState([
        { key: "Next Payroll", label: "Next Payroll" },
        { key: "Separate Payment", label: "Separate Payment" },
    ]);

    const columns = [
        {
            title: "Claim Type",
            dataIndex: "common",
        },
        {
            title: "Expense Date",
            dataIndex: "common",
        },
        {
            title: "Description",
            dataIndex: "common",
        },
        {
            title: "Amount",
            dataIndex: "common",
        },
        {
            title: "Project Code",
            dataIndex: "common",
        },
        {
            title: "Cost Center",
            dataIndex: "common",
        },
        {
            title: "Payment Preference",
            dataIndex: "common",
        },
        {
            title: "Receipt Attachment",
            dataIndex: "common",
        },
        {
            title: " Approved by",
            dataIndex: "common",
        },

    ];

    const data = [
        {
            key: "1",
            common: "Expense amount",
        },
    ];

    const handleCancel = () => {
        setmodal(false);
    };

    const handleOk = () => {
        setmodal(false);
    };


    return (
        <>

            <div>
                <div className={style.headerBox}>
                    <div>
                        <FaHouseUser />
                        <Heading title={"Reimbursements"} />
                    </div>
                    <Button title={"Apply"} add={true} className={"w-auto"} onClick={() => { setmodal(true) }} loading={loading} />
                </div>
                <Modal
                    title=""
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    className='modalBgColor personalFormModal'
                    open={modal}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Form
                        form={form}
                        layout="vertical"
                    // onFinish={code?.mode == "Edit" ? handleUpdateSubmit : handleSubmit}
                    >
                        <Heading title={"New Claim Submission Form"} />
                        <div className={style.emp_inputbox}>
                            <SelectInput
                                className="mx-1 inputFlexBox"
                                label={"Claim Type"}
                                name="Industry"
                                placeholder="Select a Claim Type"
                                message="Please Select Claim Type"
                                showSearch={false}
                                required={true}
                                options={[
                                    { value: "Travel", label: "Travel" },
                                    { value: "Medical", label: "Medical" },
                                    { value: "Office Supplies", label: "Office Supplies" },
                                    { value: "others", label: "others" },
                                ]}
                            />
                            <CustomDate
                                label="Expense Date"
                                className="mx-1 inputFlexBox"
                                name="Expense Date"
                                placeholder="Expense Date"
                                message="Please Enter Expense Date"
                                allowToday
                                required
                            />
                        </div>
                        <div className={style.emp_inputbox}>
                            <FormInput
                                label={"Amount"}
                                className={"mx-1 inputFlexBox"}
                                className2={"w-25"}
                                name="Amount"
                                placeholder="Amount"
                                required={true}
                            />
                            <SelectInput
                                className="mx-1 inputFlexBox"
                                label={"Project Code"}
                                name="Project Code"
                                placeholder="Select a Project Code"
                                message="Please Select Project Code"
                                showSearch={false}
                                required={true}
                                options={[
                                    { value: "Travel", label: "Travel" },
                                    { value: "Medical", label: "Medical" },
                                    { value: "Office Supplies", label: "Office Supplies" },
                                    { value: "others", label: "others" },
                                ]}
                            />
                        </div>
                        <div className={style.emp_inputbox}>
                            <SelectInput
                                className="mx-1 inputFlexBox"
                                label={"Cost Center"}
                                name="Cost Center"
                                placeholder="Select a Department Allocation"
                                message="Please Select Department Allocation"
                                showSearch={false}
                                required={true}
                                options={[
                                    { value: "Travel", label: "Travel" },
                                    { value: "Medical", label: "Medical" },
                                    { value: "Office Supplies", label: "Office Supplies" },
                                    { value: "others", label: "others" },
                                ]}
                            />

                            <UploadFile
                                className="mx-1 inputFlexBox"
                                label={"Attachments"}
                                name="Attachments"
                                title={"File Upload (PDF)"}
                                required={true}
                            />
                        </div>
                        <div className={style.emp_inputbox}>
                            <FormInputTextArea
                                label={"Description"}
                                className="mx-1"
                                type="text"
                                name="Description"
                                placeholder="Enter a Description"
                                required={true}
                                message={"Description is required"}
                            />
                        </div>
                        <h6 className={`${style.reimbursment_radio_heading} mx-1 mt-2`}>Payment Preference</h6>
                        <div className={style.emp_inputbox}>
                            <RadioButton
                                name="payroll"
                                label=""
                                required={true}
                                message="Please select a Payroll!"
                                className={`mx-1 form_checkBox`}
                                options={payroll.map((l) => ({ label: l.label, value: l.key }))}
                            />
                        </div>
                        <div className={`${style.emp_buttonBox2} mt-2`}>
                            <Button 
                                title={"Submit for Approval"}
                                className={"mx-1"}
                                type={"submit"}
                                loading={loading}
                                actionInfo={"Send to Approval email and Portal Notification to his/her line manager"}
                            />
                        </div>

                    </Form>
                </Modal>
                <div className='mt-2'>
                    <Table
                        className='antdCustomeTable antdEducationTable'
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                    />
                </div>
            </div>


        </>
    )
}

export default Reimbursements