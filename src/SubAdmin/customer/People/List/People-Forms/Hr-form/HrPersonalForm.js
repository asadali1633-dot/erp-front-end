
import React, { useEffect, useState } from 'react'
import { Form, message } from 'antd';
import style from './Hrform.module.css'
import Heading from '../../../../../../Components/Heading/Heading';
import { FormInput } from '../../../../../../Components/Inputs/Inputs';
import { SelectInput } from '../../../../../../Components/Select/Select';
import { Country, State, City } from "country-state-city";
import { Button } from '../../../../../../Components/Button/Button';
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import CustomDate from '../../../../../../Components/Date/CustomDate';
import * as EMPA_ACTIONS from "../../../../../../store/action/emp/index";
import * as DEPART_ACTIONS from "../../../../../../store/action/departments/index";
import * as ROLES_ACTIONS from "../../../../../../store/action/role/index";
import * as DESIGNATIONS_ACTIONS from "../../../../../../store/action/designations/index";
import CreateDepart from '../../../../Depart/CreateDepart';
import Roles from '../../../../roles/Roles';
import Designations from '../../../../designations/Designations';


function PersonalForm({
    personalForm,
    setPersonalForm,
    code, setCode,
    pageBody,
    Red_Emp,
    GetGenratedEmpId,
    GetPeopleDataWithPage,
    Red_Department,
    Red_Roles,
    Red_Design,
    CreatePeopleFun,
    CreateSuperAdmin,
    handleUpdateEmp,
    EmpGetByid
}) {
    const accessToken = useSelector((state) => state.Red_Auth.accessToken);
    const [depart, setDepart] = useState(false)
    const [role, setRole] = useState(false)
    const [designation, setDesignation] = useState(false)
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setloading] = useState(false);
    const departData = Red_Department?.UserDepartment?.[0]?.departments
    const rolesData = Red_Roles?.roleData?.[0]?.roles
    const designationData = Red_Design?.DesignationsData?.[0]?.designations
    const [form] = Form.useForm();
    const countries = Country.getAllCountries();
    const codes = ["PK", "IN", "US", "AS"];
    const provinces = codes.flatMap((code) => State.getStatesOfCountry(code));
    let selectedCities = [];

    codes.forEach((code) => {
        const cities = City.getCitiesOfCountry(code);
        selectedCities = [...selectedCities, ...cities];
    });

    const handleCancel = () => {
        setPersonalForm(false);
    };

    const handleOk = () => {
        setPersonalForm(false);
    };

    const handleSubmit = async (values) => {
        setloading(true);
        if(values.user_type == "Super_admin"){
            const isCheck = await CreateSuperAdmin(values, accessToken);
            if (isCheck?.success) {
                console.log("isCheck", isCheck)
                messageApi.success(isCheck?.message);
                form.resetFields();
                GetPeopleDataWithPage(pageBody, accessToken);
                setPersonalForm(false);
            } else {
                messageApi.error(isCheck?.message);
            } 
        }
        else{
            const isCheck = await CreatePeopleFun(values, accessToken);
            if (isCheck?.success) {
                console.log("isCheck", isCheck)
                messageApi.success(isCheck?.message);
                form.resetFields();
                GetPeopleDataWithPage(pageBody, accessToken);
                setPersonalForm(false);
            } else {
                messageApi.error(isCheck?.message);
            } 
        }
       
        setloading(false);
    };

    const setEmpId = () => {
        const Data = Red_Emp?.GenratedEmpId
        if (Data) {
            form.setFieldsValue({
                emp_id: Data?.[0]?.next_employee_id
            });
        }
    }

    useEffect(() => {
        GetGenratedEmpId(accessToken)
    }, [accessToken])
    
    useEffect(() => {
        setEmpId();
    }, [Red_Emp?.GenratedEmpId]);


    return (
        <>
            {contextHolder}
            <section className={style.perForm_section}>
                <Modal
                    title=""
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    className='modalBgColor personalFormModal'
                    open={personalForm}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                    >
                        <Heading title={"Create Employe"} className={style.perForm_inputBox} />
                        <div>
                            <div className={style.perForm_sectioninputBox}>
                                <FormInput
                                    label={"Employe ID"}
                                    className={"mx-1 inputFlexBox"}
                                    name="emp_id"
                                    placeholder="Employe Id"
                                    required={false}
                                    message="Please Enter a Emplye Id"
                                    readOnly={false}
                                />
                                <FormInput
                                    label={"First Name"}
                                    className={"mx-1 inputFlexBox"}
                                    name="first_name"
                                    placeholder="First Name"
                                    required={true}
                                    message="Please Enter a First Name"
                                />
                            </div>
                            <div className={style.perForm_sectioninputBox}>
                                <FormInput
                                    label={"Last Name"}
                                    className={"mx-1 inputFlexBox"}
                                    name="last_name"
                                    placeholder="Last Name"
                                    required={true}
                                    message="Please Enter a Last Name"
                                />
                                <SelectInput
                                    label={"Department"}
                                    className={"mx-1 inputFlexBox"}
                                    name="department"
                                    placeholder="Assigned to Department"
                                    message="Please Select a Assigned to Department"
                                    required={true}
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
                            </div>
                            <div className={style.perForm_sectioninputBox}>
                                <SelectInput
                                    label={"Role"}
                                    className={"mx-1 inputFlexBox"}
                                    name="role"
                                    placeholder="Select a Role"
                                    message="Please Select Role"
                                    required={true}
                                    showSearch={true}
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
                                <SelectInput
                                    label={"Designation"}
                                    className={"mx-1 inputFlexBox"}
                                    name="designation"
                                    placeholder="Select a Designation"
                                    message="Please Select Designation"
                                    required={true}
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
                            </div>
                            <div className={style.perForm_sectioninputBox}>
                                <CustomDate
                                    label={"Hiring Date"}
                                    className={`mx-1 inputFlexBox`}
                                    name={"joining_date"}
                                    placeholder={"Date of Hiring"}
                                    message={"Please Enter Date of Hiring"}
                                    required={true}
                                    allowToday={true}
                                />
                                <FormInput
                                    label={"Email"}
                                    className={"mx-1 inputFlexBox"}
                                    name="email"
                                    placeholder="Email"
                                    required={true}
                                    message="Please Enter a Email"
                                />

                            </div>
                            <div className={style.perForm_sectioninputBox}>
                                <SelectInput
                                    className="mx-1 inputFlexBox"
                                    label={"User Type"}
                                    name="user_type"
                                    placeholder="Select User Type"
                                    message="Please Select User Type"
                                    required={true}
                                    showSearch={false}
                                    options={[
                                        { value: "ADMIN", label: "Admin" },
                                        { value: "HR", label: "Hr" },
                                        { value: "MANAGER", label: "Manager" },
                                        { value: "EMPLOYEE", label: "Employe" },
                                        { value: "Super_admin", label: "Super Admin" },
                                    ]}
                                />

                            </div>
                        </div>
                        <div className={style.perForm_sectioninputBox}>
                            <Button type="submit" className={"mt-2"} title={code?.mode == "Edit" ? "Save" : "Create"} loading={loading} />
                        </div>
                    </Form>
                </Modal>
            </section>

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
    ...EMPA_ACTIONS,
    ...DEPART_ACTIONS,
    ...ROLES_ACTIONS,
    ...DESIGNATIONS_ACTIONS,
};
export default connect(mapStateToProps, AllActions)(PersonalForm);
