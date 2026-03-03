import React, { useEffect, useRef, useState } from 'react'
import style from '../People-Profile/profile.module.css'
import UserDefault from '../../../../../assests/images/personal/user.png'
import { FaRegCalendarCheck as Calender } from "react-icons/fa6";
import { FaIdCard as IdCard } from "react-icons/fa6";
import { MdOutlineEmail as Email } from "react-icons/md";
import { IoMdPricetags as Tag } from "react-icons/io";
import { IoCallOutline as Call } from "react-icons/io5";
import { MdDialpad as Keyboard } from "react-icons/md";
import { CiLocationOn as Location } from "react-icons/ci";
import { FaLinkedin as Linkedin } from "react-icons/fa";
import * as EMP_ACTIONS from "../../../../../store/action/emp/index";
import { FaUserTie } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { connect, useSelector } from "react-redux";
import { Form, message } from 'antd';
import ProfileImage from '../../../../../Components/ProfileImage/ProfileImage';
import baseUrl from '../../../../../config.json'

function Profile({
    Red_Emp,
    EmpGetByid,
    UploadUserProfile,
    emptId,
}) {
    const accessToken = useSelector((state) => state.Red_Auth.accessToken);
    const profileInfo = Red_Emp?.EmpSingleData?.[0]?.data
    const fileInputRef = useRef(null);
    const [preview, setPreview] = useState(UserDefault);
    const [messageApi, contextHolder] = message.useMessage();
    const [userAge, setUserAge] = useState();
    const dateOfBirth = profileInfo?.date_of_birth

    useEffect(() => {
        EmpGetByid(emptId, accessToken)
    }, [accessToken])

  

    const handleEditClick = () => {
        fileInputRef.current.click();
    };
    
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
        if (!file) {
            messageApi.error({
                type: "error",
                content: "Please select a company logo.",
            });
            return;
        }
        const formData = new FormData();
        formData.append("image", file);
        formData.append("empid", emptId);
        const isCheck = await UploadUserProfile(formData, accessToken);
        if (isCheck?.success) {
            messageApi.success({
                type: "success",
                content: isCheck?.message,
            });
            setTimeout(() => {
                EmpGetByid(emptId, accessToken)
            }, 1000);
        } else {
            messageApi.error({
                type: "error",
                content: isCheck?.message,
            });
        }
    };

    useEffect(() => {
        if (profileInfo?.profile_image) {
            setPreview(`${baseUrl.baseUrl}${profileInfo.profile_image}`);
        } else {
            setPreview(UserDefault);
        }
    }, [profileInfo]);

    const calculateAge = (dateOfBirth) => {
        if (!dateOfBirth) return null;
        const dob = new Date(dateOfBirth);
        const today = new Date();
        let years = today.getFullYear() - dob.getFullYear();
        let months = today.getMonth() - dob.getMonth();
        let days = today.getDate() - dob.getDate();
        if (days < 0) {
            months--;
            const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += prevMonth.getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }
        return { years, months, days };
    };

    useEffect(() => {
        if (!dateOfBirth) return;
        const age = calculateAge(dateOfBirth);
        setUserAge(age)
    }, [dateOfBirth]);




    return (
        <>
            {contextHolder}
            <ul className={style.persemp_profileView}>
                <ProfileImage {...{ handleImageChange, handleEditClick, preview, setPreview, fileInputRef }} />
                <div className={style.persemp_personalInfoBox}>
                    <h5>{profileInfo?.first_name}</h5>
                    <span className={style.persemp_lastName}>{profileInfo?.last_name}</span>
                </div>
                <div className={style.persEmp_dataList} >
                    <li><Calender />{profileInfo?.joining_date ? `Start ${profileInfo?.joining_date?.slice(0, 10)}` : <span>Not Found</span>}</li>
                    <li><IdCard /> {profileInfo?.emp_id ? profileInfo?.emp_id : <span>Not Found</span>}</li>
                    <li><Email /> {profileInfo?.email?.length > 10 ? `${profileInfo?.email?.slice(0, 10)}...` : ""}</li>
                    <li><Tag /> {profileInfo?.department_name ? profileInfo?.department_name : <span>Not Found</span>}</li>
                    <li><Call /> {profileInfo?.mobile_number ? profileInfo?.mobile_number : <span> Not Found</span>}</li>
                    <li><Keyboard /> {profileInfo?.phone_extension ? profileInfo?.phone_extension : <span>Not Found</span>}</li>
                    <li><FaUserTie /> Age {userAge ? `${userAge?.days}-${userAge?.months}-${userAge?.years}` : <span>Not Found</span>}</li>
                    <li title={profileInfo?.full_address}><Location /> {profileInfo?.full_address?.slice(0, 15)}...</li>
                    <li title={profileInfo?.linkedin_link}><Linkedin /> <Link>{profileInfo?.linkedin_link?.slice(0, 15)}...</Link></li>
                </div>
            </ul>
        </>
    )
}


function mapStateToProps(state) {
    return {
        Red_Emp: state.Red_Emp,
    };
}
const AllActions = {
    ...EMP_ACTIONS,
};
export default connect(mapStateToProps, AllActions)(Profile);
