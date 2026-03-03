import React, { useEffect, useState } from 'react'
import style from '../empPersonalForm.module.css'
import Heading from '../../../../../../Components/Heading/Heading'
import { PiUserList } from "react-icons/pi";
import { FormInput } from '../../../../../../Components/Inputs/Inputs';
import CustomDate from '../../../../../../Components/Date/CustomDate';
import { SelectInput } from '../../../../../../Components/Select/Select';
import { Country, State, City } from "country-state-city";
import { CiEdit } from "react-icons/ci";
import { Button, OutLineButton } from '../../../../../../Components/Button/Button';
import * as EMP_ACTIONS from "../../../../../../store/action/emp/index";
import * as DEPART_ACTIONS from "../../../../../../store/action/departments/index";
import * as ROLES_ACTIONS from "../../../../../../store/action/role/index";
import * as DESIGNATIONS_ACTIONS from "../../../../../../store/action/designations/index";
import { connect } from "react-redux";
import { Form, message } from 'antd';
import { useSelector } from "react-redux";
import CreateDepart from '../../../../Depart/CreateDepart';
import Roles from '../../../../roles/Roles';
import Designations from '../../../../designations/Designations';





function EditPeople({
    Red_Emp,
    EmpGetByid,
    Red_Department,
    Red_Roles,
    Red_Design,
    emptId,
    handleUpdateEmp,
    handleUpdateSuperAmdin,
    getUserLoginTime
}) {
    const [loading, setloading] = useState(false);
    const countries = Country.getAllCountries();
    const codes = ["PK", "IN", "US", "AS"];
    const [formEdit, setfomtEdit] = useState(false);
    const provinces = codes.flatMap((code) => State.getStatesOfCountry(code));
    const empData = Red_Emp?.GetUserLoginTime?.[0]?.data
    const selectId = emptId
    const [messageApi, contextHolder] = message.useMessage();
    const accessToken = useSelector((state) => state.Red_Auth.accessToken);
    const [depart, setDepart] = useState(false)
    const [role, setRole] = useState(false)
    const [designation, setDesignation] = useState(false)
    const departData = Red_Department?.UserDepartment?.[0]?.departments
    const rolesData = Red_Roles?.roleData?.[0]?.roles
    const designationData = Red_Design?.DesignationsData?.[0]?.designations
    const [form] = Form.useForm();
    const [filteredCities, setFilteredCities] = useState([]);


    const EDITABLE_FIELDS = [
        "first_name",
        "last_name",
        "date_of_birth",
        "gender",
        "blood_group",
        "mobile_number",
        "whatsapp_number",
        "phone_extension",
        "emergency_number",
        "full_address",
        "country",
        "city",
        "province",
        "postal_code",
        "facebook_link",
        "x_link",
        "linkedin_link",
    ];
    const EDITABLE_FIELDS_BY_ROLE = {
        EMPLOYEE: EDITABLE_FIELDS,
        MANAGER: EDITABLE_FIELDS,
        HR: "ALL",
        ADMIN: "ALL",
        Super_admin: "ALL",
    };
    const userRole = empData?.user_type;

    const isFullAccess = EDITABLE_FIELDS_BY_ROLE[userRole] === "ALL";
    const canEditField = (fieldName) => {
        if (!formEdit) return false;
        if (isFullAccess) return true;
        return EDITABLE_FIELDS_BY_ROLE[userRole]?.includes(fieldName);
    };

    const isRequiredField = (field) => {
        if (isFullAccess) return true;
        return canEditField(field);
    };

    const handleEdit = () => {
        setfomtEdit(prev => !prev);
    };

    const handleCountryChange = (value) => {
        const [countryCode] = value.split("-");
        const cities = City.getCitiesOfCountry(countryCode);
        setFilteredCities(cities);
    };

    useEffect(() => {
        EmpGetByid(selectId, accessToken)
    }, [accessToken])





    const setValues = () => {
        const Data = Red_Emp?.EmpSingleData?.[0]?.data;
        form.setFieldsValue({
            ...Data,
            department: Data?.department,
            designation: Data?.designation,
            role:  Data?.role,
        });
    };


    const handleUpdateSubmit = async (values) => {
        setloading(true);
        const isCheck = await handleUpdateEmp(values, accessToken, selectId);
        if (isCheck?.success) {
            messageApi.success(isCheck?.message);
            form.resetFields();
            EmpGetByid(emptId, accessToken)
            setfomtEdit(false)
            setloading(false);
        } else {
            messageApi.error(isCheck?.message);
            setloading(false);
        }
    };


    useEffect(() => {
        form.resetFields();
        setValues();
    }, [Red_Emp?.EmpSingleData, selectId]);






    return (
        <>

            {contextHolder}
            <div>
                <div className={style.headerBox}>
                    <div>
                        <PiUserList />
                        <Heading title={"Personal Information"} />
                    </div>
                    <CiEdit onClick={handleEdit} />
                </div>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleUpdateSubmit}
                >
                    <div>
                        <div className={style.emp_inputbox}>
                            <FormInput
                                label={"Employe ID"}
                                className={"mx-1 inputFlexBox"}
                                className2={""}
                                name="emp_id"
                                placeholder="Employe Id"
                                required={false}
                                disabled={!canEditField("emp_id")}
                                readOnly={!canEditField("emp_id")}
                            />
                            <FormInput
                                label={"First Name"}
                                className={"mx-1 inputFlexBox"}
                                name="first_name"
                                placeholder="First Name"
                                message="Please Enter a First Name"
                                required={isRequiredField("first_name")}
                                disabled={!canEditField("first_name")}
                                readOnly={!canEditField("first_name")}


                            />
                            <FormInput
                                label={"Last Name"}
                                className={"mx-1 inputFlexBox"}
                                name="last_name"
                                placeholder="Last Name"
                                message="Please Enter a Last Name"
                                required={isRequiredField("last_name")}
                                disabled={!canEditField("last_name")}
                                readOnly={!canEditField("last_name")}
                            />
                            <FormInput
                                label={"Email"}
                                className={"mx-1 inputFlexBox"}
                                name="email"
                                placeholder="Email"
                                message="Please Enter a Email"
                                required={isRequiredField("email")}
                                disabled={!canEditField("email")}
                                readOnly={!canEditField("email")}
                            />

                        </div>
                        <div className={style.emp_inputbox}>
                            <SelectInput
                                label={"Department"}
                                className={"mx-1 inputFlexBox"}
                                name="department"
                                required={isRequiredField("department")}
                                disabled={!canEditField("department")}
                                placeholder="Assigned to Department"
                                message="Please Select a Assigned to Department"
                                showSearch={true}
                                dropdownRender={(menu) => (
                                    <>
                                        {menu}
                                        <button onClick={() => { setDepart(true) }} className='simpleButtonAction'>Create</button>
                                    </>
                                )}
                                options={departData?.map((item) => ({
                                    value: item.id,
                                    label: item.department,
                                }))}
                            />
                            <SelectInput
                                label={"Designation"}
                                className={"mx-1 inputFlexBox"}
                                name="designation"
                                placeholder="Select a Designation"
                                message="Please Select Designation"
                                required={isRequiredField("designation")}
                                disabled={!canEditField("designation")}
                                showSearch={true}
                                dropdownRender={(menu) => (
                                    <>
                                        {menu}
                                        <button onClick={() => { setDesignation(true) }} className='simpleButtonAction'>Create</button>
                                    </>
                                )}
                                options={designationData?.map((item) => ({
                                    value: item.id,
                                    label: item.designation_name,
                                }))}
                            />
                            <SelectInput
                                className="mx-1 inputFlexBox"
                                label={"Status"}
                                name="status"
                                placeholder="Select Employee Status"
                                message="Please Select Employee Status"
                                required={isRequiredField("status")}
                                showSearch={false}
                                disabled={!canEditField("status")}
                                options={[
                                    { value: "active", label: "Active" },
                                    { value: "inactive", label: "Inactive" },
                                ]}
                            />
                            <SelectInput
                                label={"Role"}
                                className={"mx-1 inputFlexBox"}
                                name="role"
                                placeholder="Select a Role"
                                message="Please Select Role"
                                showSearch={true}
                                required={isRequiredField("role")}
                                disabled={!canEditField("role")}
                                dropdownRender={(menu) => (
                                    <>
                                        {menu}
                                        <button onClick={() => { setRole(true) }} className='simpleButtonAction'>Create</button>
                                    </>
                                )}
                                options={rolesData?.map((item) => ({
                                    value: item.id,
                                    label: item.role_name,
                                }))}
                            />
                        </div>
                        <div className={style.emp_inputbox}>
                            <SelectInput
                                className="mx-1 inputFlexBox"
                                label={"User Type"}
                                name="user_type"
                                placeholder="Select User Type"
                                message="Please Select User Type"
                                showSearch={false}
                                required={isRequiredField("user_type")}
                                disabled={!canEditField("user_type")}
                                options={[
                                    { value: "ADMIN", label: "Admin" },
                                    { value: "HR", label: "Hr" },
                                    { value: "MANAGER", label: "Manager" },
                                    { value: "EMPLOYEE", label: "Employe" },
                                ]}
                            />
                            <CustomDate
                                label={"Date of birth"}
                                className={`mx-1 inputFlexBox`}
                                name={"date_of_birth"}
                                placeholder={"Date of birth"}
                                message={"Please Enter Date of Birth"}
                                required={isRequiredField("date_of_birth")}
                                disabled={!canEditField("date_of_birth")}
                                allowToday={false}
                            />
                            <SelectInput
                                className="mx-1 inputFlexBox"
                                label={"Gender"}
                                name="gender"
                                placeholder="Select Gender"
                                message="Please Select Gender"
                                showSearch={false}
                                required={isRequiredField("gender")}
                                disabled={!canEditField("gender")}
                                options={[
                                    { value: "male", label: "Male" },
                                    { value: "female", label: "Female" },
                                ]}
                            />
                            <SelectInput
                                className="mx-1 inputFlexBox"
                                label={"Blood Group"}
                                name="blood_group"
                                placeholder="Select Blood Group"
                                message="Please Select Blood Group"
                                showSearch={false}
                                required={isRequiredField("blood_group")}
                                disabled={!canEditField("blood_group")}
                                options={[
                                    { value: "A+", label: "A+" },
                                    { value: "A-", label: "A-" },
                                    { value: "B+", label: "B+" },
                                    { value: "B-", label: "B-" },
                                    { value: "AB+", label: "AB+" },
                                    { value: "AB-", label: "AB-" },
                                    { value: "O+", label: "O+" },
                                    { value: "O-", label: "O-" },
                                ]}
                            />
                        </div>
                        <div className={style.emp_inputbox}>
                            <SelectInput
                                className="mx-1 inputFlexBox"
                                label={"Identity Type"}
                                name="identity_type"
                                placeholder="Select Identity Type"
                                message="Please Select Identity Type"
                                showSearch={false}
                                required={isRequiredField("identity_type")}
                                disabled={!canEditField("identity_type")}
                                options={[
                                    { value: "cnic", label: "CNIC" },
                                    { value: "nicop", label: "NICOP" },
                                    { value: "ssn", label: "SSN" },
                                ]}
                            />
                            <FormInput
                                label={"Identity Number"}
                                className={"mx-1 inputFlexBox"}
                                name="identity_number"
                                required={isRequiredField("identity_number")}
                                disabled={!canEditField("identity_number")}
                                readOnly={!canEditField("identity_number")}
                                placeholder="Identity Number"
                            />
                            <FormInput
                                label={"Mobile Number"}
                                className={"mx-1 inputFlexBox"}
                                name="mobile_number"
                                placeholder="Mobile Number"
                                required={isRequiredField("mobile_number")}
                                disabled={!canEditField("mobile_number")}
                                readOnly={!canEditField("mobile_number")}

                            />
                            <FormInput
                                label={"Whatsapp Number"}
                                className={"mx-1 inputFlexBox"}
                                name="whatsapp_number"
                                placeholder="Whatsapp Number"
                                required={isRequiredField("whatsapp_number")}
                                disabled={!canEditField("whatsapp_number")}
                                readOnly={!canEditField("whatsapp_number")}
                            />
                        </div>
                        <div className={style.emp_inputbox}>
                            <FormInput
                                label={"Extension Number"}
                                className={"mx-1 inputFlexBox"}
                                name="phone_extension"
                                placeholder="Extension Number"
                                // required={isRequiredField("")}
                                disabled={!canEditField("phone_extension")}
                                readOnly={!canEditField("phone_extension")}
                            />
                            <FormInput
                                label={"Emergency Number"}
                                className={"mx-1 inputFlexBox"}
                                name="emergency_number"
                                placeholder="Emergency Number"
                                required={isRequiredField("emergency_number")}
                                disabled={!canEditField("emergency_number")}
                                readOnly={!canEditField("emergency_number")}
                            />
                            <CustomDate
                                label={"Date of Joining"}
                                className={`mx-1 inputFlexBox`}
                                name={"joining_date"}
                                placeholder={"Date of Joining"}
                                message={"Please Enter Date of Joining"}
                                allowToday={true}
                                required={isRequiredField("joining_date")}
                                disabled={!canEditField("joining_date")}
                            />
                            <FormInput
                                label={"Full Address"}
                                className={"mx-1 inputFlexBox"}
                                name="full_address"
                                placeholder="Full Address"
                                required={isRequiredField("full_address")}
                                disabled={!canEditField("full_address")}
                                readOnly={!canEditField("full_address")}
                            />
                        </div>
                        <div className={style.emp_inputbox}>
                            <SelectInput
                                label={"Province"}
                                className="mx-1 inputFlexBox"
                                showSearch={true}
                                name="province"
                                placeholder="Province"
                                message={"Province is required"}
                                required={isRequiredField("province")}
                                disabled={!canEditField("province")}
                                options={provinces?.map((item) => ({
                                    value: `${item.countryCode}-${item.name}`,
                                    label: item.name,
                                }))}
                            />
                            <SelectInput
                                label={"Country"}
                                className="mx-1 inputFlexBox"
                                showSearch={true}
                                name="country"
                                placeholder="Country"
                                message={"Country is required"}
                                onChange={handleCountryChange}
                                required={isRequiredField("country")}
                                disabled={!canEditField("country")}
                                options={countries?.map((item) => ({
                                    value: `${item.isoCode}-${item.name}`,
                                    label: item.name,
                                }))}
                            />
                            <SelectInput
                                label={"City"}
                                className="mx-1 inputFlexBox"
                                showSearch={true}
                                name="city"
                                placeholder="City"
                                message={"City is required"}
                                required={isRequiredField("city")}
                                disabled={!canEditField("city")}
                                options={filteredCities?.map((item) => ({
                                    value: `${item.stateCode}-${item.name}`,
                                    label: item.name,
                                }))}
                            />
                            
                            <FormInput
                                label={"Postal Code"}
                                className={"mx-1 inputFlexBox"}
                                name="postal_code"
                                placeholder="Postal Code"
                                required={isRequiredField("postal_code")}
                                disabled={!canEditField("postal_code")}
                                readOnly={!canEditField("postal_code")}
                            />
                        </div>
                        <div className={style.emp_inputbox}>
                            <FormInput
                                label={"Facebook"}
                                className={"mx-1 inputFlexBox"}
                                name="facebook_link"
                                placeholder="Facebook Link"
                                required={isRequiredField("facebook_link")}
                                disabled={!canEditField("facebook_link")}
                                readOnly={!canEditField("facebook_link")}

                            />
                            <FormInput
                                label={"X"}
                                className={"mx-1 inputFlexBox"}
                                name="x_link"
                                placeholder="X LInk"
                                required={isRequiredField("x_link")}
                                disabled={!canEditField("x_link")}
                                readOnly={!canEditField("x_link")}
                            />
                            <FormInput
                                label={"LinkedIn"}
                                className={"mx-1 inputFlexBox"}
                                name="linkedin_link"
                                placeholder="linkedin link"
                                required={isRequiredField("linkedin_link")}
                                disabled={!canEditField("linkedin_link")}
                                readOnly={!canEditField("linkedin_link")}
                            />
                        </div>
                        {formEdit && (
                            <div className={`${style.emp_buttonBox} mt-2`}>
                                <OutLineButton form={true} title={"Cancel"}
                                    onClick={() => setfomtEdit(false)}
                                />
                                <Button title={"Save"} className={"w-auto"} type={"submit"}
                                    loading={loading}
                                />
                            </div>
                        )}
                    </div>
                </Form>

            </div>

            <CreateDepart {...{ depart, setDepart }} />
            <Roles {...{ role, setRole }} />
            <Designations {...{ designation, setDesignation }} />
        </>
    )
}


function mapStateToProps(state) {
    return {
        Red_Emp: state.Red_Emp,
        Red_Department: state.Red_Depart,
        Red_Roles: state.Red_Role,
        Red_Design: state.Red_Designations

    };
}
const AllActions = {
    ...EMP_ACTIONS,
    ...DEPART_ACTIONS,
    ...ROLES_ACTIONS,
    ...DESIGNATIONS_ACTIONS,
};
export default connect(mapStateToProps, AllActions)(EditPeople);