import React, { useEffect, useRef, useState } from 'react'
import style from './form.module.css'
import { Form, Modal } from 'antd';
import { FormInput } from '../../../../Components/Inputs/Inputs';
import { SelectInput } from '../../../../Components/Select/Select';
import { Button } from '../../../../Components/Button/Button';
import CustomDate from '../../../../Components/Date/CustomDate';
import UploadFile from '../../../../Components/File/UploadFile';
import Histrory from './Histrory';




function ExpensesForm({
    ExpensesModal,
    setExpensesModal
}) {
    const [form] = Form.useForm();
    const [historyModal,sethistoryModal] = useState(false)
    const handleOk = () => {
        setExpensesModal(false);
    };
    const handleCancel = () => {
        setExpensesModal(false);
    };

    const handleClick = () => {
        sethistoryModal(!historyModal)
    }

    return (
        <>
            <Modal
                title=""
                closable={{ 'aria-label': 'Custom Close Button' }}
                className={`${style.form_modalWidth} modalBgColor`}
                open={ExpensesModal}
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
                            <h5 className="mx-1">Expenses Form</h5>
                            <Button
                                add={true}
                                onClick={handleClick}
                                title={"Approval history"}
                                className={"mx-1 mt-2 w-auto"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Basic Info</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                className="mx-1"
                                label={"Expense ID"}
                                name="expense_id"
                                placeholder="Auto-generated (e.g., EXP-2025-0001)"
                                required={false}
                                readOnly={true}
                                message={"Expense ID is auto-generated"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Report Name / Title"}
                                name="report_title"
                                placeholder="Enter short description of expense report"
                                required={true}
                                message={"Report title is required"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Employee ID"}
                                placeholder="Select employee"
                                name="employee_id"
                                required={true}
                                showSearch={true}
                                message={"Please select employee who incurred the expense"}
                                options={[]}
                            />
                        </div>
                        <div className={style.form_inputBox}>
                            <FormInput
                                className="mx-1"
                                label={"Employee Name"}
                                name="employee_name"
                                placeholder="Auto-populated from Employee ID"
                                required={false}
                                readOnly={true}
                                message={"Employee name auto-populated"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Department / Cost Center"}
                                placeholder="Select department"
                                name="department_id"
                                required={true}
                                showSearch={true}
                                message={"Please select department/cost center for budget allocation"}
                                options={[]}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Expense Date"}
                                name="expense_date"
                                placeholder="Select date expense was incurred"
                                required={true}
                                message={"Expense date is required"}
                                allowToday={true}
                            />
                        </div>
                        <div className={style.form_inputBox}>
                            <CustomDate
                                className="mx-1"
                                label={"Submitted Date"}
                                name="submitted_date"
                                placeholder="Select date report was submitted"
                                required={true}
                                message={"Submitted date is required"}
                                allowToday={true}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Currency"}
                                placeholder="Select original currency"
                                name="currency"
                                required={true}
                                message={"Please select currency of expense"}
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
                                placeholder="Enter exchange rate (if converting to base currency)"
                                required={false}
                                message={"Enter exchange rate if applicable"}
                            />
                        </div>
                        <div className={style.form_inputBox}>
                            <FormInput
                                className="mx-1"
                                label={"Total Amount (original)"}
                                name="total_original"
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="Auto-calculated from line items"
                                required={false}
                                readOnly={true}
                                message={"Total in original currency is auto-calculated"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Total Amount (base)"}
                                name="total_base"
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="Auto-converted to company base currency"
                                required={false}
                                readOnly={true}
                                message={"Total in base currency is auto-calculated"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Status"}
                                placeholder="Select report status"
                                name="status"
                                required={true}
                                message={"Please select status"}
                                options={[
                                    { value: "Draft", label: "Draft" },
                                    { value: "Submitted", label: "Submitted" },
                                    { value: "In Review", label: "In Review" },
                                    { value: "Approved", label: "Approved" },
                                    { value: "Rejected", label: "Rejected" },
                                    { value: "Paid", label: "Paid" },
                                    { value: "Reimbursed", label: "Reimbursed" },
                                ]}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
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

                            <SelectInput
                                className="mx-1"
                                label={"Reimbursement Method"}
                                placeholder="Select reimbursement method"
                                name="reimbursement_method"
                                required={false}
                                message={"Please select reimbursement method"}
                                options={[
                                    { value: "Payroll", label: "Payroll" },
                                    { value: "Bank Transfer", label: "Bank Transfer" },
                                    { value: "Petty Cash", label: "Petty Cash" },
                                    { value: "Cheque", label: "Cheque" },
                                    { value: "Other", label: "Other" },
                                ]}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Purpose / Description"}
                                name="description"
                                placeholder="Enter overall explanation of expenses"
                                multiline={true}
                                rows={4}
                                required={true}
                                message={"Purpose/description is required"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Project Info</h5>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Project ID"}
                                placeholder="Select project"
                                name="project_id"
                                required={false}
                                showSearch={true}
                                message={"Select project to allocate expense"}
                                options={[]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Service Order ID"}
                                placeholder="Select service order"
                                name="service_order_id"
                                required={false}
                                showSearch={true}
                                message={"Select service order if expense relates to a service call"}
                                options={[]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Asset Tag"}
                                placeholder="Select asset"
                                name="asset_tag"
                                required={false}
                                showSearch={true}
                                message={"Select asset if expense is for a specific asset"}
                                options={[]}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <SelectInput
                                className="mx-1"
                                label={"Purchase Order ID"}
                                placeholder="Select purchase order"
                                name="po_id"
                                required={false}
                                showSearch={true}
                                message={"Select PO if expense is related to a purchase order"}
                                options={[]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Client ID"}
                                placeholder="Select client"
                                name="client_id"
                                required={false}
                                showSearch={true}
                                readOnly={false}
                                message={"Select client if expense is billable (auto-filled from project)"}
                                options={[]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Task ID"}
                                placeholder="Select project task"
                                name="task_id"
                                required={false}
                                showSearch={true}
                                message={"Select task for granular tracking"}
                                options={[]}
                            />
                        </div>


                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Approval Info</h5>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Submitted By"}
                                placeholder="Select submitter"
                                name="submitted_by"
                                required={true}
                                showSearch={true}
                                readOnly={true}
                                message={"Submitted by is auto-filled with current user"}
                                options={[]}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Submitted Date"}
                                name="submitted_date"
                                placeholder="Auto-filled with current date/time"
                                required={false}
                                readOnly={true}
                                showTime={true}
                                message={"Submitted date is auto-filled"}
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
                                    { value: "More Info Required", label: "More Info Required" },
                                ]}
                            />
                        </div>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Current Approver"}
                                placeholder="Select current approver"
                                name="current_approver"
                                required={false}
                                showSearch={true}
                                message={"Select who needs to act now"}
                                options={[]}
                            />
                            <SelectInput
                                className="mx-1"
                                label={"Final Approval By"}
                                placeholder="Select final approver"
                                name="final_approval_by"
                                required={false}
                                showSearch={true}
                                readOnly={true}
                                message={"Final approver is set upon approval"}
                                options={[]}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Final Approval Date"}
                                name="final_approval_date"
                                placeholder="Auto-filled upon final approval"
                                required={false}
                                readOnly={true}
                                message={"Final approval date is auto-filled"}
                                allowToday={true}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                className="mx-1"
                                label={"Rejection Reason"}
                                name="rejection_reason"
                                placeholder="Enter reason for rejection (if applicable)"
                                multiline={true}
                                rows={3}
                                required={false}
                                message={"Enter rejection reason if rejected"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Approver Comments"}
                                name="approver_comments"
                                placeholder="Enter comments from approver"
                                multiline={true}
                                rows={3}
                                required={false}
                                message={"Enter approver comments"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Payment / Reimbursement</h5>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Payment ID"}
                                placeholder="Select payment record"
                                name="payment_id"
                                required={false}
                                showSearch={true}
                                message={"Select outgoing payment record"}
                                options={[]}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Reimbursement Date"}
                                name="reimbursement_date"
                                placeholder="Select date employee was paid"
                                required={false}
                                message={"Select reimbursement date"}
                                allowToday={true}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Reimbursement Amount"}
                                name="reimbursement_amount"
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="Enter amount reimbursed (may differ if partial)"
                                required={false}
                                message={"Enter reimbursement amount"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                className="mx-1"
                                label={"Payment Reference"}
                                name="payment_reference"
                                placeholder="Enter cheque number, transaction ID, etc."
                                required={false}
                                message={"Enter payment reference"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Paid Via"}
                                placeholder="Select payment method"
                                name="paid_via"
                                required={false}
                                message={"Select how reimbursement was paid"}
                                options={[
                                    { value: "Payroll", label: "Payroll" },
                                    { value: "Bank Transfer", label: "Bank Transfer" },
                                    { value: "Petty Cash", label: "Petty Cash" },
                                    { value: "Other", label: "Other" },
                                ]}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Payroll Run ID"}
                                name="payroll_run_id"
                                placeholder="Enter payroll run identifier (if via payroll)"
                                required={false}
                                message={"Enter payroll run ID if applicable"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Reimbursement Notes"}
                                name="reimbursement_notes"
                                placeholder="Enter any additional notes about reimbursement"
                                multiline={true}
                                rows={3}
                                required={false}
                                message={"Enter reimbursement notes"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Tax & Compliance</h5>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Tax Reclaimable"}
                                placeholder="Can tax be reclaimed?"
                                name="tax_reclaimable"
                                required={false}
                                message={"Please select if tax is reclaimable"}
                                options={[
                                    { value: "Yes", label: "Yes" },
                                    { value: "No", label: "No" },
                                ]}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Tax Code"}
                                name="tax_code"
                                placeholder="Enter tax code for accounting"
                                required={false}
                                message={"Enter tax code if applicable"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Receipt Required"}
                                placeholder="Is receipt required?"
                                name="receipt_required"
                                required={false}
                                message={"Please select if receipt is required"}
                                options={[
                                    { value: "Yes", label: "Yes" },
                                    { value: "No", label: "No" },
                                ]}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <SelectInput
                                className="mx-1"
                                label={"Receipt Received"}
                                placeholder="Has receipt been received?"
                                name="receipt_received"
                                required={false}
                                message={"Please select if receipt has been received"}
                                options={[
                                    { value: "Yes", label: "Yes" },
                                    { value: "No", label: "No" },
                                ]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Policy Compliant"}
                                placeholder="Is this policy compliant?"
                                name="policy_compliant"
                                required={false}
                                message={"Please select if policy compliant (checked by approver)"}
                                options={[
                                    { value: "Yes", label: "Yes" },
                                    { value: "No", label: "No" },
                                ]}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Policy Violation Notes"}
                                name="policy_violation_notes"
                                placeholder="Enter notes about policy violation"
                                multiline={true}
                                rows={3}
                                required={false}
                                message={"Enter policy violation notes if applicable"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Administrative</h5>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Created By"}
                                placeholder="Auto-filled with current user"
                                name="created_by"
                                required={false}
                                showSearch={true}
                                readOnly={true}
                                message={"Created by is auto-filled"}
                                options={[]}
                            />
                            <CustomDate
                                className="mx-1"
                                label={"Created Date"}
                                name="created_date"
                                placeholder="Auto-filled with current date/time"
                                required={false}
                                readOnly={true}
                                showTime={true}
                                message={"Created date is auto-filled"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Last Modified By"}
                                placeholder="Auto-filled with current user"
                                name="last_modified_by"
                                required={false}
                                showSearch={true}
                                readOnly={true}
                                message={"Last modified by is auto-filled"}
                                options={[]}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <CustomDate
                                className="mx-1"
                                label={"Last Modified Date"}
                                name="last_modified_date"
                                placeholder="Auto-filled with current date/time"
                                required={false}
                                readOnly={true}
                                showTime={true}
                                message={"Last modified date is auto-filled"}
                            />

                            <UploadFile
                                className="mx-1 inputFlexBox"
                                label={"Attachments"}
                                name="attachments"
                                title={"Upload Files"}
                                required={false}
                                multiple={true}
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                message={"Upload additional documents (itineraries, approvals, etc.)"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Notes / Internal Remarks"}
                                name="internal_notes"
                                placeholder="Enter internal notes (not visible to employee)"
                                multiline={true}
                                rows={4}
                                required={false}
                                message={"Enter internal remarks"}
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


            {historyModal && (
                <Histrory {...{ historyModal, sethistoryModal }} />
            )}

        </>
    )
}

export default ExpensesForm