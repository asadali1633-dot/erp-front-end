import React, { useState } from 'react'
import Heading from '../../../../../../Components/Heading/Heading'
import style from '../empPersonalForm.module.css'
import { FaCalendarAlt } from "react-icons/fa";
import { Button } from '../../../../../../Components/Button/Button';
import { Form, Modal } from 'antd';
import { FormInput } from '../../../../../../Components/Inputs/Inputs';
import { SelectInput } from '../../../../../../Components/Select/Select';
import CustomDate from '../../../../../../Components/Date/CustomDate';


function Timeoff() {
    const [modal, setmodal] = useState(false)
    const [duration, setduration] = useState("full_day")
    const [form] = Form.useForm();
    const handleCancel = () => {
        setmodal(false);
    };

    const handleOk = () => {
        setmodal(false);
    };
    return (
        <>

            <div>
                <div className={`${style.headerBox} ${style.TimeOffHeader}`}>
                    <div>
                        <FaCalendarAlt />
                        <Heading title={"Time Off"} />
                    </div>
                    <Button
                        title={"Apply Leaves"}
                        add={true} className={"w-auto"}
                        onClick={() => { setmodal(true) }}
                    />
                </div>


                <div className="container p-0 mt-2">
                    <div className="row p-0">
                        <div className="col-2 p-0">
                            <div className={`${style.leavesBox}`}>
                                <div className={`${style.leavesCricle}`}>
                                    <h6>TL</h6>
                                </div>
                                <h4>Total Leaves</h4>
                                <h6>21</h6>
                            </div>
                        </div>
                        <div className="col-2 p-0">
                            <div className={`${style.leavesBox}`}>
                                <div className={`${style.leavesCricle}`}>
                                    <h6>SL</h6>
                                </div>
                                <h4>Sick Leaves Availed</h4>
                                <h6>5</h6>
                            </div>
                        </div>
                        <div className="col-2 p-0">
                            <div className={`${style.leavesBox}`}>
                                <div className={`${style.leavesCricle}`}>
                                    <h6>CL</h6>
                                </div>
                                <h4>Casual Leaves Availed</h4>
                                <h6>3</h6>
                            </div>
                        </div>
                        <div className="col-2 p-0">
                            <div className={`${style.leavesBox}`}>
                                <div className={`${style.leavesCricle}`}>
                                    <h6>AL</h6>
                                </div>
                                <h4>Annual Leaves</h4>
                                <h6>21</h6>
                            </div>
                        </div>
                        <div className="col-2 p-0">
                            <div className={`${style.leavesBox}`}>
                                <div className={`${style.leavesCricle}`}>
                                    <h6>ML</h6>
                                </div>
                                <h4>Maternity Leaves Availed</h4>
                                <h6>5</h6>
                            </div>
                        </div>
                        <div className="col-2 p-0">
                            <div className={`${style.leavesBox}`}>
                                <div className={`${style.leavesCricle}`}>
                                    <h6>PL</h6>
                                </div>
                                <h4>Paid Leaves Availed</h4>
                                <h6>0</h6>
                            </div>
                        </div>
                    </div>
                </div>
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
                    <Heading title={"Add Leaves"} />
                    <div className={style.emp_inputbox}>
                        <FormInput
                            label={"Employee ID"}
                            className={"mx-1 inputFlexBox"}
                            className2={"w-25"}
                            name="Employee ID"
                            placeholder="Employee ID"
                            required={true}
                        />
                        <SelectInput
                            label={"Employee Name"}
                            className={"mx-1 inputFlexBox"}
                            name="Employee_Name"
                            required={true}
                            // required={isRequiredField("department")}
                            placeholder="Employee Name"
                            showSearch={true}
                        // options={departData?.map((item) => ({
                        //     value: item.id,
                        //     label: item.department,
                        // }))}
                        />
                    </div>
                    <div className={style.emp_inputbox}>
                        <SelectInput
                            className="mx-1 inputFlexBox"
                            label={"Leave Type"}
                            name="Leave Type"
                            placeholder="Select Leave Type"
                            message="Please Select Leave Type"
                            showSearch={false}
                            required={true}
                            options={[
                                { value: "Casual", label: "Casual" },
                                { value: "Sick", label: "Sick" },
                                { value: "Annual", label: "Annual" },
                                { value: "Unpaid", label: "Unpaid" },
                                { value: "Maternity / Paternity", label: "Maternity / Paternity" },
                            ]}
                        />
                        <SelectInput
                            className="mx-1 inputFlexBox"
                            label={"Leave Category"}
                            name="Leave Category"
                            placeholder="Select Leave Category"
                            message="Please Select Leave Category"
                            showSearch={false}
                            required={true}
                            options={[
                                { value: "paid", label: "Paid" },
                                { value: "unpaid", label: "Unpaid" },
                            ]}
                        />
                    </div>
                    <div className={style.emp_inputbox}>
                        <FormInput
                            label={"Reason for Leave"}
                            className={"mx-1 inputFlexBox"}
                            className2={"w-25"}
                            name="Reason for Leave"
                            placeholder="Reason for Leave"
                            required={true}
                        />
                    </div>
                    <div className={style.emp_inputbox}>
                        <SelectInput
                            className="mx-1 inputFlexBox"
                            label={"Leave Duration"}
                            name="Leave Duration"
                            placeholder="Select Leave Type"
                            message="Please Select Leave Type"
                            showSearch={false}
                            required={true}
                            onChange={(value) => setduration(value)}
                            options={[
                                { value: "full_day", label: "Full Day" },
                                { value: "half_day", label: "Half Day" },
                                { value: "short_leave", label: "Short Leave" },
                            ]}
                        />
                        {
                            duration === "short_leave" && (
                                <SelectInput
                                    className="mx-1 inputFlexBox"
                                    label={"Day Type"}
                                    name="Day Type"
                                    placeholder="Select Leave Type"
                                    message="Please Select Leave Type"
                                    showSearch={false}
                                    required={true}
                                    options={[
                                        { value: "First Half", label: "First Half" },
                                        { value: "Second Half", label: "Second Half" },
                                    ]}
                                />
                            )
                        }

                    </div>
                    <div className={style.emp_inputbox}>
                        <CustomDate
                            label="Start Date"
                            className="mx-1 inputFlexBox"
                            name="start_date"
                            placeholder="Start Date"
                            message="Please Enter Start Date"
                            allowToday
                            required
                        />

                        <CustomDate
                            label="End Date"
                            className="mx-1 inputFlexBox"
                            name="end_date"
                            placeholder="End Date"
                            message="Please Enter End Date"
                            allowToday
                            required
                        />
                    </div>
                    {
                        duration == "short_leave" && (
                            <div className={style.emp_inputbox}>
                                <CustomDate
                                    label="From Time"
                                    className="mx-1 inputFlexBox"
                                    name="start_date"
                                    placeholder="Start Date"
                                    message="Please Enter Start Date"
                                    allowToday
                                    required
                                />

                                <CustomDate
                                    label="To Time"
                                    className="mx-1 inputFlexBox"
                                    name="end_date"
                                    placeholder="End Date"
                                    message="Please Enter End Date"
                                    allowToday
                                    required
                                />
                            </div>
                        )
                    }
                    <div className={style.emp_inputbox}>
                        <FormInput
                            label={"Reporting To"}
                            className={"mx-1 inputFlexBox"}
                            className2={"w-25"}
                            name="Reporting Manager"
                            placeholder="Reporting To"
                            required={true}
                        />
                        <FormInput
                            label="Attachments"
                            className="mx-1 inputFlexBox"
                            className2="w-25"
                            name="Attachments"
                            type={"file"}
                            placeholder="Attachments"
                        />
                    </div>
                    <div className={style.emp_inputbox}>
                        <FormInput
                            label={"Total Leaves"}
                            className={"mx-1 inputFlexBox"}
                            className2={"w-25"}
                            name="Total Leaves"
                            placeholder="Total Leaves"
                            required={true}
                        />
                         <FormInput
                            label={"Remaining Leaves"}
                            className={"mx-1 inputFlexBox"}
                            className2={"w-25"}
                            name="Remaining Leaves"
                            placeholder="Remaining Leaves"
                            required={true}
                        />
                    </div>
                    <div className={style.emp_inputbox}>
                        <SelectInput
                            className="mx-1 inputFlexBox"
                            label={"Emergency Leave"}
                            name="Emergency Leave"
                            placeholder="Select Emergency Leave"
                            message="Please Select Emergency Leave"
                            showSearch={false}
                            required={true}
                            options={[
                                { value: "yes", label: "Yes" },
                                { value: "no", label: "No" },
                            ]}
                        />
                        <SelectInput
                            className="mx-1 inputFlexBox"
                            label={"Work From Home"}
                            name="Work From Home"
                            placeholder="Select Work From Home"
                            message="Please Select Work From Home type"
                            showSearch={false}
                            required={true}
                            options={[
                                { value: "yes", label: "Yes" },
                                { value: "no", label: "No" },
                            ]}
                        />
                    </div>
                    <div className={style.emp_inputbox}>
                        <FormInput
                            label={"CC Email"}
                            className={"mx-1 inputFlexBox"}
                            className2={"w-25"}
                            name="ccEmail"
                            placeholder="CC Email"
                            required={true}
                        />
                    </div>
                    <div className={`${style.emp_buttonBox} mt-2`}>
                        <Button title={"Apply"} type={"submit"} />
                    </div>
                </Form>
            </Modal>
        </>
    )
}

export default Timeoff