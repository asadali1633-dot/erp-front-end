import React, { useEffect } from 'react'
import style from './sidebar.module.css'
import powerdByLogo from '../../assests/images/logo.png'
import DownArrow from '../../assests/images/icons/sidebarArrow.png'
import companylogo from '../../assests/images/companyLogo.png'
import { MdViewQuilt as Overview } from "react-icons/md";
import { LuFileUser as User } from "react-icons/lu";
import { MdDevices as Devices } from "react-icons/md";
import { IoLayersSharp as Assets } from "react-icons/io5";
import { BsTicketPerforatedFill as Tickets } from "react-icons/bs";
import { FaIdCardClip as Vendors } from "react-icons/fa6";
import { GrLogout as Logout } from "react-icons/gr";
import { Link } from 'react-router-dom';
import * as ACTIONS from "../../store/action/overview/index";
import { connect } from "react-redux"
import { useSelector } from "react-redux";
import baseUrl from '../../config.json'
import { FaBarsStaggered as Bar} from "react-icons/fa6";


function Sidebar({
    handleSideBar,
    show,
    Red_Overview,
    OverviewCall,
}) {
    const data = Red_Overview?.data?.[0]?.data
    const accessToken = useSelector((state) => state.Red_Auth.accessToken);
    useEffect(() => {
        if (accessToken) {
            OverviewCall(accessToken);
        }
    }, [accessToken]);
    return (
        <>
        <section className={style.sidebar_section}>
            <div className={style.sidebar_iconBox}>
                <Bar onClick={handleSideBar} className={style.sidebar_sideIcon}/>
                <span>Menu</span>
            </div>
            <div className={`${style.sidebar_mainBox}  ${show ? style.sideBarActive : false}`} >
                <div className={`${style.sidebar_logoBox}`}>
                    <div className={style.sidebar_logoInnerBox}>
                        <img src={`${baseUrl.baseUrl}${data?.company?.image}`} alt="" />
                        <span title={data?.company?.company}>{data?.company?.company}</span>
                    </div>
                </div>
                <div className={`${style.sidebar_linkBox}`}>
                    <ul>
                        <div className={style.sidebar_menuBox}>
                            <Overview />
                            <li>
                                <Link to="">Over View</Link>
                            </li>
                        </div>
                        <div className={style.sidebar_menuBox}>
                            <User />
                            <li>
                                <Link to="">Customers</Link>
                            </li>
                        </div>
                        <div className={style.sidebar_menuBox}>
                            <Devices />
                            <li>
                                <Link to="">Devices</Link>
                            </li>
                        </div>
                        <div className={style.sidebar_menuBox}>
                            <Assets />
                            <li>
                                <Link to="">Assets</Link>
                            </li>
                        </div>
                        <div className={style.sidebar_menuBox}>
                            <Tickets />
                            <li>
                                <Link to="">Tickets</Link>
                            </li>
                        </div>
                        <div className={style.sidebar_menuBox}>
                            <Vendors />
                            <li>
                                <Link to="">Vendors</Link>
                            </li>
                        </div>
                    </ul>
                </div>
                <div className={`${style.sidebar_powerdbyBox}`}>
                    <li>
                        <Logout />
                        <Link to="">Logout</Link>
                    </li>
                    <div>
                        <span>Powered by</span>
                        <img src={powerdByLogo} alt="" />
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}


function mapStateToProps({ Red_Overview }) {
    return { Red_Overview };
}
export default connect(mapStateToProps, ACTIONS)(Sidebar);