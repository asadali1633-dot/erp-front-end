import React, { useEffect, useRef, useState } from 'react'
import style from '../EmpProfile.module.css'
import UserDefault from '../../../../../../assests/images/personal/user.png'
import bgProfile from '../../../../../../assests/images/gradient-background.jpg'
import { FaRegCalendarCheck as Calender } from "react-icons/fa6";
import { FaIdCard as IdCard } from "react-icons/fa6";
import { MdOutlineEmail as Email } from "react-icons/md";
import { IoMdPricetags as Tag } from "react-icons/io";
import { IoCallOutline as Call } from "react-icons/io5";
import { MdDialpad as Keyboard } from "react-icons/md";
import { CiLocationOn as Location } from "react-icons/ci";
import { FaLinkedin as Linkedin } from "react-icons/fa";
import * as EMP_ACTIONS from "../../../../../../store/action/emp/index";
import { FaUserTie } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { connect, useSelector } from "react-redux";
import { Form, message } from 'antd';
import ProfileImage from '../../../../../../Components/ProfileImage/ProfileImage';
import baseUrl from '../../../../../../config.json'
import { IoCopyOutline } from "react-icons/io5";


function EmpProfile({
    Red_Emp,
    EmpGetByid,
    UploadSuperAdminProfile,
    UploadUserProfile,
    GetMyInfo,
    GetSuperAdminInfo,
}) {
    const accessToken = useSelector((state) => state.Red_Auth.accessToken);
    const empData = Red_Emp?.GetUserLoginTime?.[0]?.data
    const profileInfo = empData?.user_type === "Super_admin" ?
        Red_Emp?.EmpSuperAdminMyInfo?.[0]?.data : Red_Emp?.myInfo?.[0]?.data
    const selectId = empData?.id
    const fileInputRef = useRef(null);
    const [preview, setPreview] = useState(UserDefault);
    const [messageApi, contextHolder] = message.useMessage();
    const [userAge, setUserAge] = useState();
    const dateOfBirth = empData?.date_of_birth

    const typeRecognize = async () => {
        if (empData?.user_type === "Super_admin") {
            await GetSuperAdminInfo(selectId, accessToken);
        } else {
            await GetMyInfo(selectId, accessToken);
        }
    }
    useEffect(() => {
        typeRecognize()
    }, [selectId, accessToken])


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
        formData.append("empid", selectId);
        if (empData?.user_type === "Super_admin") {
            const isCheck = await UploadSuperAdminProfile(formData, accessToken);
            if (isCheck?.success) {
                messageApi.success(isCheck?.message);
                GetSuperAdminInfo(selectId, accessToken);
            } else {
                messageApi.error(isCheck?.message);
            }
        } else {
            const isCheck = await UploadUserProfile(formData, accessToken)
            if (isCheck?.success) {
                messageApi.success(isCheck?.message);
                GetMyInfo(selectId, accessToken)
            } else {
                messageApi.error(isCheck?.message);
            }
        }
    };

    useEffect(() => {
        if (profileInfo?.profile_image) {
            setPreview(`${baseUrl.baseUrl}${profileInfo.profile_image}`);
        } else {
            setPreview(UserDefault);
        }
    }, [profileInfo]);

    // const calculateAge = (dateOfBirth) => {
    //     if (!dateOfBirth) return null;
    //     const dob = new Date(dateOfBirth);
    //     const today = new Date();
    //     let years = today.getFullYear() - dob.getFullYear();
    //     let months = today.getMonth() - dob.getMonth();
    //     let days = today.getDate() - dob.getDate();
    //     if (days < 0) {
    //         months--;
    //         const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    //         days += prevMonth.getDate();
    //     }
    //     if (months < 0) {
    //         years--;
    //         months += 12;
    //     }
    //     return { years, months, days };
    // };

    // useEffect(() => {
    //     if (!dateOfBirth) return;
    //     const age = calculateAge(dateOfBirth);
    //     setUserAge(age)
    // }, [dateOfBirth]);

    const handleCopyId = async () => {
        if (!profileInfo?.emp_id) {
            message.warning("No Emp ID to copy");
            return;
        }
        try {
            await navigator.clipboard.writeText(profileInfo.emp_id);
            message.success("Emp ID copied!");
        } catch (err) {
            message.error("Copy failed");
        }
    };

    const handleCopyEmail = async () => {
        if (!profileInfo?.email) {
            message.warning("No email to copy");
            return;
        }
        try {
            await navigator.clipboard.writeText(profileInfo.email);
            message.success("Email copied!");
        } catch (err) {
            message.error("Copy failed");
        }
    };

    return (
        <>
            {contextHolder}
            <div className={style.main_profile_box}>
                <div className={style.cover_box}>
                    <img src={bgProfile} alt="" className={style.cover_img} />
                    <div>
                        <ProfileImage {...{ handleImageChange, handleEditClick, preview, setPreview, fileInputRef }} />
                    </div>
                </div>
                <div className={style.profileNamingBox}>
                    <div>
                        <h5>{`${profileInfo?.first_name} ${profileInfo?.last_name}`}</h5>
                        <p>
                            {profileInfo?.emp_id}
                            <IoCopyOutline
                                style={{ fontSize: "15px", cursor: "pointer", marginLeft: "8px" }}
                                onClick={handleCopyId}
                            />
                        </p>
                    </div>
                    <span>{profileInfo?.designation_name}</span>
                </div>
                <div className={style.infoBox}>
                    <div className={`${style.profileFlex} mt-3`}>
                        <Email />
                        <div className={style.contentFlex}>
                            <span>Email</span>
                            <p>
                                {profileInfo?.email ? profileInfo?.email : <span>---</span>}
                                <IoCopyOutline
                                    style={{ fontSize: "15px", cursor: "pointer", marginLeft: "8px" }}
                                    onClick={handleCopyEmail}
                                />
                            </p>
                        </div>
                    </div>
                    <div className={style.profileFlex}>
                        <Calender />
                        <div className={style.contentFlex}>
                            <span>Joining Date</span>
                            <p>{profileInfo?.joining_date ? `Start ${profileInfo?.joining_date?.slice(0, 10)}` : <span>---</span>}</p>
                        </div>
                    </div>
                    <div className={style.profileFlex}>
                        <Tag />
                        <div className={style.contentFlex}>
                            <span>Depart Name</span>
                            <p>{profileInfo?.department_name ? profileInfo?.department_name : <span>---</span>}</p>
                        </div>
                    </div>
                    <div className={style.profileFlex}>
                        <Call />
                        <div className={style.contentFlex}>
                            <span>Phone</span>
                            <p>{profileInfo?.mobile_number ? profileInfo?.mobile_number : <span>---</span>}</p>
                        </div>
                    </div>
                    <div className={style.profileFlex}>
                        <Keyboard />
                        <div className={style.contentFlex}>
                            <span>Extension</span>
                            <p>{profileInfo?.phone_extension ? profileInfo?.phone_extension : <span>---</span>}</p>
                        </div>
                    </div>
                    <div className={style.profileFlex}>
                        <Location />
                        <div className={style.contentFlex}>
                            <span>Address</span>
                            <p>{profileInfo?.full_address ? profileInfo?.full_address : <span>---</span>}</p>
                        </div>
                    </div>
                    <div className={style.profileFlex}>
                        <Linkedin />
                        <div className={style.contentFlex}>
                            <span>Linkedin</span>
                            <p>{profileInfo?.linkedin_link ? `${profileInfo?.linkedin_link?.slice(0, 15)}...` : <span>---</span>}</p>
                        </div>
                    </div>
                </div>
            </div>
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
export default connect(mapStateToProps, AllActions)(EmpProfile);
