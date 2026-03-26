import React, { useEffect, useRef, useState } from 'react'
import style from './form.module.css'
import { Form, Modal } from 'antd';
import { FormInput } from '../../../../Components/Inputs/Inputs';
import { SelectInput } from '../../../../Components/Select/Select';
import { Button } from '../../../../Components/Button/Button';
import CustomDate from '../../../../Components/Date/CustomDate';
import UploadFile from '../../../../Components/File/UploadFile';




function ProjectMngtForm({
    ProjectMngtFormModal,
    setProjectMngtFormModal
}) {
    const [form] = Form.useForm();

    const handleOk = () => {
        setProjectMngtFormModal(false);
    };
    const handleCancel = () => {
        setProjectMngtFormModal(false);
    };

    return (
        <>
            <Modal
                title=""
                closable={{ 'aria-label': 'Custom Close Button' }}
                className={`${style.form_modalWidth} modalBgColor`}
                open={ProjectMngtFormModal}
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
                            <h5 className="mx-1">Project Form</h5>
                        </div>
                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Project Identification & Classification</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                className="mx-1"
                                label={"Project ID"}
                                name="project_id"
                                placeholder="Auto-generated (e.g., PRJ-2025-0001)"
                                required={false}
                                readOnly={true}
                                message={"Project ID is auto-generated"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Project Name"}
                                name="project_name"
                                placeholder="Enter descriptive project title"
                                required={true}
                                message={"Project name is required"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Project Type"}
                                placeholder="Select project type"
                                name="project_type"
                                required={true}
                                message={"Please select project type"}
                                options={[
                                    { value: "Internal", label: "Internal" },
                                    { value: "Customer-Facing", label: "Customer-Facing" },
                                    { value: "R&D", label: "R&D" },
                                    { value: "Maintenance", label: "Maintenance" },
                                    { value: "Capital", label: "Capital" },
                                ]}
                            />
                        </div>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Project Category"}
                                placeholder="Select project category"
                                name="project_category"
                                required={true}
                                message={"Please select project category"}
                                options={[
                                    { value: "Software Development", label: "Software Development" },
                                    { value: "Infrastructure", label: "Infrastructure" },
                                    { value: "Consulting", label: "Consulting" },
                                    { value: "Marketing", label: "Marketing" },
                                    { value: "Other", label: "Other" },
                                ]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Status"}
                                placeholder="Select project status"
                                name="status"
                                required={true}
                                message={"Please select status"}
                                options={[
                                    { value: "Proposed", label: "Proposed" },
                                    { value: "Planned", label: "Planned" },
                                    { value: "Active", label: "Active" },
                                    { value: "On Hold", label: "On Hold" },
                                    { value: "Completed", label: "Completed" },
                                    { value: "Cancelled", label: "Cancelled" },
                                    { value: "Closed", label: "Closed" },
                                ]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Priority"}
                                placeholder="Select priority"
                                name="priority"
                                required={false}
                                message={"Please select priority"}
                                options={[
                                    { value: "High", label: "High" },
                                    { value: "Medium", label: "Medium" },
                                    { value: "Low", label: "Low" },
                                ]}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <SelectInput
                                className="mx-1"
                                label={"Health"}
                                placeholder="Select project health"
                                name="health"
                                required={false}
                                message={"Please select project health"}
                                options={[
                                    { value: "Green", label: "Green (On Track)" },
                                    { value: "Yellow", label: "Yellow (At Risk)" },
                                    { value: "Red", label: "Red (Off Track)" },
                                ]}
                            />
                            <FormInput
                                className="mx-1"
                                label={"Description"}
                                name="description"
                                placeholder="Enter detailed project overview"
                                multiline={true}
                                rows={4}
                                required={true}
                                message={"Project description is required"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Objective / Goal"}
                                name="objective"
                                placeholder="Enter business objectives and goals"
                                multiline={true}
                                rows={4}
                                required={true}
                                message={"Project objective/goal is required"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Dates & Timeline</h5>
                        <div className={style.form_inputBox}>
                            <CustomDate
                                className="mx-1"
                                label={"Start Date"}
                                name="start_date"
                                placeholder="Select planned start date"
                                required={true}
                                message={"Start date is required"}
                                allowToday={true}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"End Date"}
                                name="end_date"
                                placeholder="Select planned end date"
                                required={true}
                                message={"End date is required"}
                                allowToday={true}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Actual Start Date"}
                                name="actual_start_date"
                                placeholder="Select actual start date (if started)"
                                required={false}
                                message={"Select actual start date if project has started"}
                                allowToday={true}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <CustomDate
                                className="mx-1"
                                label={"Actual End Date"}
                                name="actual_end_date"
                                placeholder="Select actual end date (if completed)"
                                required={false}
                                message={"Select actual end date if project completed"}
                                allowToday={true}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Duration (days)"}
                                name="duration"
                                type="number"
                                min="0"
                                step="1"
                                placeholder="Auto-calculated planned duration"
                                required={false}
                                readOnly={true}
                                message={"Duration is auto-calculated from start/end dates"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Phase / Stage"}
                                placeholder="Select current phase"
                                name="phase"
                                required={false}
                                message={"Select current project phase"}
                                options={[
                                    { value: "Initiation", label: "Initiation" },
                                    { value: "Planning", label: "Planning" },
                                    { value: "Execution", label: "Execution" },
                                    { value: "Monitoring", label: "Monitoring & Control" },
                                    { value: "Closure", label: "Closure" },
                                    { value: "Other", label: "Other" },
                                ]}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Client & Stakeholders</h5>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <SelectInput
                                className="mx-1"
                                label={"Client ID"}
                                placeholder="Select client (if customer project)"
                                name="client_id"
                                required={false}
                                showSearch={true}
                                message={"Select client if this is a customer project"}
                                options={[]}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Client Contact"}
                                name="client_contact"
                                placeholder="Enter primary client contact name"
                                required={false}
                                message={"Enter primary client contact if applicable"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Project Sponsor"}
                                name="project_sponsor"
                                placeholder="Enter internal or external sponsor name"
                                required={false}
                                message={"Enter project sponsor if applicable"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Team & Resources</h5>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <SelectInput
                                className="mx-1"
                                label={"Project Manager"}
                                placeholder="Select project manager"
                                name="project_manager"
                                required={true}
                                showSearch={true}
                                message={"Please select the responsible project manager"}
                                options={[]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Team Members"}
                                placeholder="Select team members"
                                name="team_members"
                                required={false}
                                showSearch={true}
                                isMulti={true}
                                message={"Select employees assigned to the project"}
                                options={[]}
                            />

                            <FormInput
                                className="mx-1"
                                label={"External Resources"}
                                name="external_resources"
                                placeholder="Enter contractors, agencies, etc."
                                multiline={true}
                                rows={3}
                                required={false}
                                message={"Enter external resources if any"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Financials & Budget</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                className="mx-1"
                                label={"Budget (Total)"}
                                name="budget_total"
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="Enter approved budget amount"
                                required={true}
                                message={"Budget total is required"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Actual Cost"}
                                name="actual_cost"
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="Auto-calculated sum of all project costs"
                                required={false}
                                readOnly={true}
                                message={"Actual cost is auto-calculated"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Committed Cost"}
                                name="committed_cost"
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="POs not received + approved expenses"
                                required={false}
                                readOnly={true}
                                message={"Committed cost is auto-calculated"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Estimated Cost to Complete"}
                                name="estimate_to_complete"
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="Forecast remaining cost"
                                required={false}
                                message={"Enter estimated remaining cost"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                className="mx-1"
                                label={"Estimated Total Cost"}
                                name="estimated_total_cost"
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="Actual + Estimate to Complete"
                                required={false}
                                readOnly={true}
                                message={"Estimated total cost is auto-calculated"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Budget Variance"}
                                name="budget_variance"
                                type="number"
                                step="0.01"
                                placeholder="Budget - Estimated Total Cost"
                                required={false}
                                readOnly={true}
                                message={"Budget variance is auto-calculated"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Profitability"}
                                name="profitability"
                                type="number"
                                step="0.01"
                                placeholder="Revenue - Actual Cost (for customer projects)"
                                required={false}
                                readOnly={true}
                                message={"Profitability is auto-calculated"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Revenue & Billing</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                className="mx-1"
                                label={"Contract Value"}
                                name="contract_value"
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="Enter total agreed amount"
                                required={true}
                                message={"Contract value is required"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Billing Method"}
                                placeholder="Select billing method"
                                name="billing_method"
                                required={true}
                                message={"Please select billing method"}
                                options={[
                                    { value: "Fixed Price", label: "Fixed Price" },
                                    { value: "Time & Material", label: "Time & Material" },
                                    { value: "Milestone", label: "Milestone" },
                                    { value: "Retainer", label: "Retainer" },
                                    { value: "Other", label: "Other" },
                                ]}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Total Invoiced"}
                                name="total_invoiced"
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="Auto-calculated sum of invoices"
                                required={false}
                                readOnly={true}
                                message={"Total invoiced is auto-calculated"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Total Received"}
                                name="total_received"
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="Auto-calculated sum of payments"
                                required={false}
                                readOnly={true}
                                message={"Total received is auto-calculated"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                className="mx-1"
                                label={"Outstanding Receivables"}
                                name="outstanding_receivables"
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="Total Invoiced - Total Received"
                                required={false}
                                readOnly={true}
                                message={"Outstanding receivables is auto-calculated"}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Last Invoice Date"}
                                name="last_invoice_date"
                                placeholder="Select date of last invoice"
                                required={false}
                                message={"Select last invoice date if applicable"}
                                allowToday={true}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Next Billing Date"}
                                name="next_billing_date"
                                placeholder="Select next billing date"
                                required={false}
                                message={"Select next billing date if scheduled"}
                                allowToday={true}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Tasks & Activities</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                className="mx-1"
                                label={"Task ID"}
                                name="task_id"
                                placeholder="Auto-generated"
                                required={false}
                                readOnly={true}
                                message={"Task ID is auto-generated"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Task Name"}
                                name="task_name"
                                placeholder="Enter task name"
                                required={true}
                                message={"Task name is required"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Description"}
                                name="description"
                                placeholder="Enter task description"
                                multiline={true}
                                rows={3}
                                required={false}
                                message={"Enter description"}
                            />
                        </div>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Assigned To"}
                                placeholder="Select assignee"
                                name="assigned_to"
                                required={false}
                                showSearch={true}
                                message={"Select employee to assign"}
                                options={[]}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Start Date"}
                                name="start_date"
                                placeholder="Select start date"
                                required={false}
                                message={"Select start date"}
                                allowToday={true}
                            />

                            <CustomDate
                                className="mx-1"
                                label={"Due Date"}
                                name="due_date"
                                placeholder="Select due date"
                                required={false}
                                message={"Select due date"}
                                allowToday={true}
                            />
                        </div>
                        <div className={style.form_inputBox}>
                            <FormInput
                                className="mx-1"
                                label={"Completion %"}
                                name="completion_percent"
                                type="number"
                                min="0"
                                max="100"
                                step="1"
                                placeholder="Enter completion percentage"
                                required={false}
                                message={"Enter completion percentage (0-100)"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Status"}
                                placeholder="Select status"
                                name="status"
                                required={true}
                                message={"Please select status"}
                                options={[
                                    { value: "Not Started", label: "Not Started" },
                                    { value: "In Progress", label: "In Progress" },
                                    { value: "Completed", label: "Completed" },
                                    { value: "Blocked", label: "Blocked" },
                                ]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Priority"}
                                placeholder="Select priority"
                                name="priority"
                                required={false}
                                message={"Select priority"}
                                options={[
                                    { value: "Low", label: "Low" },
                                    { value: "Medium", label: "Medium" },
                                    { value: "High", label: "High" },
                                    { value: "Critical", label: "Critical" },
                                ]}
                            />
                        </div>
                        <div className={style.form_inputBox}>
                            <FormInput
                                className="mx-1"
                                label={"Estimated Hours"}
                                name="estimated_hours"
                                type="number"
                                min="0"
                                step="0.5"
                                placeholder="Enter estimated hours"
                                required={false}
                                message={"Enter estimated hours"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Actual Hours"}
                                name="actual_hours"
                                type="number"
                                min="0"
                                step="0.5"
                                placeholder="Auto-calculated from timesheets"
                                required={false}
                                readOnly={true}
                                message={"Actual hours are auto-calculated"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Linked Asset"}
                                placeholder="Select asset"
                                name="linked_asset"
                                required={false}
                                showSearch={true}
                                message={"Select asset if task uses specific asset"}
                                options={[]}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <SelectInput
                                className="mx-1"
                                label={"Linked Ticket"}
                                placeholder="Select ticket"
                                name="linked_ticket"
                                required={false}
                                showSearch={true}
                                message={"Select ticket if task originates from ticket"}
                                options={[]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Linked Service Order"}
                                placeholder="Select service order"
                                name="linked_service_order"
                                required={false}
                                showSearch={true}
                                message={"Select service order if task is a service order"}
                                options={[]}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Notes"}
                                name="notes"
                                placeholder="Enter additional notes"
                                multiline={true}
                                rows={3}
                                required={false}
                                message={"Enter notes"}
                            />
                        </div>


                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Risks & Issues</h5>
                        <div className={style.form_inputBox}>
                            <FormInput
                                className="mx-1"
                                label={"Risk ID"}
                                name="risk_id"
                                placeholder="Auto-generated"
                                required={false}
                                readOnly={true}
                                message={"Risk ID is auto-generated"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Description"}
                                name="description"
                                placeholder="Enter risk description"
                                required={true}
                                message={"Risk description is required"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Category"}
                                placeholder="Select risk category"
                                name="category"
                                required={true}
                                message={"Please select risk category"}
                                options={[
                                    { value: "Technical", label: "Technical" },
                                    { value: "Resource", label: "Resource" },
                                    { value: "Schedule", label: "Schedule" },
                                    { value: "Budget", label: "Budget" },
                                    { value: "External", label: "External" },
                                ]}
                            />
                        </div>
                        <div className={style.form_inputBox}>
                            <SelectInput
                                className="mx-1"
                                label={"Probability"}
                                placeholder="Select probability"
                                name="probability"
                                required={true}
                                message={"Please select probability"}
                                options={[
                                    { value: "Low", label: "Low" },
                                    { value: "Medium", label: "Medium" },
                                    { value: "High", label: "High" },
                                ]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Impact"}
                                placeholder="Select impact"
                                name="impact"
                                required={true}
                                message={"Please select impact"}
                                options={[
                                    { value: "Low", label: "Low" },
                                    { value: "Medium", label: "Medium" },
                                    { value: "High", label: "High" },
                                ]}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Severity"}
                                name="severity"
                                placeholder="Auto-calculated (Probability × Impact)"
                                required={false}
                                readOnly={true}
                                message={"Severity is auto-calculated"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <FormInput
                                className="mx-1"
                                label={"Mitigation Plan"}
                                name="mitigation_plan"
                                placeholder="Enter mitigation plan"
                                multiline={true}
                                rows={3}
                                required={false}
                                message={"Enter mitigation plan"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Owner"}
                                placeholder="Select risk owner"
                                name="owner"
                                required={false}
                                showSearch={true}
                                message={"Select employee responsible for this risk"}
                                options={[]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Status"}
                                placeholder="Select status"
                                name="status"
                                required={true}
                                message={"Please select status"}
                                options={[
                                    { value: "Open", label: "Open" },
                                    { value: "Mitigated", label: "Mitigated" },
                                    { value: "Closed", label: "Closed" },
                                ]}
                            />
                        </div>


                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Procurement & Expenses</h5>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <SelectInput
                                className="mx-1"
                                label={"Related Purchase Orders"}
                                placeholder="Select purchase orders"
                                name="related_po_ids"
                                required={false}
                                showSearch={true}
                                isMulti={true}
                                message={"Select POs raised for this project"}
                                options={[]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Related Expenses"}
                                placeholder="Select expenses"
                                name="related_expense_ids"
                                required={false}
                                showSearch={true}
                                isMulti={true}
                                message={"Select expenses allocated to this project"}
                                options={[]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Related Service Orders"}
                                placeholder="Select service orders"
                                name="related_service_order_ids"
                                required={false}
                                showSearch={true}
                                isMulti={true}
                                message={"Select service orders for this project"}
                                options={[]}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Documents & Attachments</h5>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <UploadFile
                                className="mx-1 inputFlexBox"
                                label={"Project Charter"}
                                name="project_charter"
                                title={"Upload Project Charter"}
                                required={false}
                                multiple={false}
                                accept=".pdf,.doc,.docx"
                                message={"Upload project charter document"}
                            />

                            <UploadFile
                                className="mx-1 inputFlexBox"
                                label={"Scope Document"}
                                name="scope_document"
                                title={"Upload Scope Document"}
                                required={false}
                                multiple={false}
                                accept=".pdf,.doc,.docx"
                                message={"Upload scope document"}
                            />

                            <UploadFile
                                className="mx-1 inputFlexBox"
                                label={"Requirements"}
                                name="requirements_document"
                                title={"Upload Requirements"}
                                required={false}
                                multiple={false}
                                accept=".pdf,.doc,.docx"
                                message={"Upload requirements document"}
                            />

                            <UploadFile
                                className="mx-1 inputFlexBox"
                                label={"Other Attachments"}
                                name="other_attachments"
                                title={"Upload Files"}
                                required={false}
                                multiple={true}
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx"
                                message={"Upload other project documents"}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Integration Links</h5>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <SelectInput
                                className="mx-1"
                                label={"Related Quotes"}
                                placeholder="Select quotes"
                                name="related_quote_ids"
                                required={false}
                                showSearch={true}
                                isMulti={true}
                                message={"Select quotes that led to this project"}
                                options={[]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Related Invoices"}
                                placeholder="Select invoices"
                                name="related_invoice_ids"
                                required={false}
                                showSearch={true}
                                isMulti={true}
                                message={"Select invoices generated from this project"}
                                options={[]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Related Tickets"}
                                placeholder="Select tickets"
                                name="related_ticket_ids"
                                required={false}
                                showSearch={true}
                                isMulti={true}
                                message={"Select support tickets logged against this project"}
                                options={[]}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Related Assets"}
                                placeholder="Select assets"
                                name="related_asset_ids"
                                required={false}
                                showSearch={true}
                                isMulti={true}
                                message={"Select assets allocated to or created by this project"}
                                options={[]}
                            />
                        </div>

                        <h5 className={`${style.form_checkBoxHeading} mx-1`}>Closure</h5>
                        <div className={style.form_inputBox}>
                            <CustomDate
                                className="mx-1"
                                label={"Closure Date"}
                                name="closure_date"
                                placeholder="Select project closure date"
                                required={false}
                                message={"Select date when project was closed"}
                                allowToday={true}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Closure Reason"}
                                placeholder="Select closure reason"
                                name="closure_reason"
                                required={false}
                                message={"Please select reason for closure"}
                                options={[
                                    { value: "Completed", label: "Completed" },
                                    { value: "Cancelled", label: "Cancelled" },
                                    { value: "On Hold", label: "On Hold" },
                                ]}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Lessons Learned"}
                                name="lessons_learned"
                                placeholder="Enter lessons learned from project"
                                multiline={true}
                                rows={4}
                                required={false}
                                message={"Enter lessons learned"}
                            />
                        </div>
                        <div className={`${style.form_inputBox} ${style.border_bottom}`}>
                            <UploadFile
                                className="mx-1 inputFlexBox"
                                label={"Final Report"}
                                name="final_report"
                                title={"Upload Final Report"}
                                required={false}
                                multiple={false}
                                accept=".pdf,.doc,.docx"
                                message={"Upload project final report"}
                            />

                            <FormInput
                                className="mx-1"
                                label={"Handover Notes"}
                                name="handover_notes"
                                placeholder="Enter handover instructions and notes"
                                multiline={true}
                                rows={3}
                                required={false}
                                message={"Enter handover notes"}
                            />

                            <SelectInput
                                className="mx-1"
                                label={"Assets Handed Over"}
                                placeholder="Select assets"
                                name="handed_over_assets"
                                required={false}
                                showSearch={true}
                                isMulti={true}
                                message={"Select assets transferred to client/operations"}
                                options={[]}
                            />
                        </div>
                        <div className={style.form_inputBox} style={{ justifyContent: 'flex-start', marginTop: '10px' }}>
                            <Button
                                title={"Generate Completion Certificate"}
                                className={"mx-1 mt-2 w-auto"}
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

export default ProjectMngtForm