import React, { useEffect } from 'react'
import style from './Header.module.css'
import * as ACTIONS from "../../store/action/emp/index";
import { connect } from "react-redux"
import { useSelector } from "react-redux";
import logo from '../../assests/images/logo.png'
import Cookies from "js-cookie";
import { FaCaretDown } from "react-icons/fa";
import ProfileDropDown from '../customer/People/Pernosal/dropdown';



function Header({
    Red_Emp,
    GetMyInfo,
}) {
    const accessToken = useSelector((state) => state.Red_Auth.accessToken);
    const data = Red_Emp?.GetUserLoginTime?.[0]?.data
     const selectId = data?.id
    const [first_name, ...rest] = (data?.name || "").trim().split(" ");
    const last_name = rest.join(" ");

    return (
        <>
            <div className={style.header_mainBox}>
                <div className={style.header_innerBox}>
                    <div className={style.header_logoBox}><img src={logo} alt="" /></div>
                    {
                        data?.user_type == "Super_admin" ?
                            <div className={style.header_contactInfo}>
                                <div>
                                    <span>Mobile#</span>
                                    <p className='white'>{data?.company_phone ? data?.company_phone : data?.phone}</p>
                                </div>
                                <div>
                                    <span>Domain</span>
                                    <p className='white'>{data?.domain}</p>
                                </div>
                                {
                                    data?.business_id ?
                                        <div>
                                            <span>Business ID</span>
                                            <p className='white'>{data?.business_id}</p>
                                        </div> : null
                                }

                                <div>
                                    <span>Created on</span>
                                    <p className='white'>{data?.created_at?.slice(0, 10)}</p>
                                </div>
                            </div> : null

                    }

                    <div className={style.roleBox}>
                        <span className='rolebgBox'>
                            {`${first_name?.slice(0, 1)}${last_name?.slice(0, 1)}`}
                        </span>
                        <div>
                            <h6 className='white'>
                                {data?.name}
                                <ProfileDropDown>
                                    <FaCaretDown style={{ marginLeft: 8, cursor: 'pointer' }} />
                                </ProfileDropDown>
                            </h6>
                            <p style={{ textTransform: "capitalize" }}>
                                {data?.user_type ? data.user_type.replace(/_/g, " ") : ""}
                            </p>
                            <p title={data?.email}>
                                {data?.email?.length > 10
                                    ? `${data?.email.slice(0, 10)}...`
                                    : data?.email}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


function mapStateToProps({ Red_Emp }) {
    return { Red_Emp };
}
export default connect(mapStateToProps, ACTIONS)(Header);