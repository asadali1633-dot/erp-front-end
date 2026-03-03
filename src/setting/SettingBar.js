import React, { useEffect, useRef, useState } from 'react'
import style from './seetingbar.module.css'
import logo from '../../src/assests/images/logo.png'
import { IoCloseCircleOutline as Close } from "react-icons/io5";
import { SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { TbListDetails as CompanyIcon } from "react-icons/tb";
import { FaRegUser as UserIcon } from "react-icons/fa";
import { TbWorld as WorldIcon } from "react-icons/tb";
import { MdPayment as PaymentIcon } from "react-icons/md";
import { AiOutlinePercentage as PercentageIcon } from "react-icons/ai";
import { AiOutlineProduct as ProductIcon } from "react-icons/ai";
import { MdOutlineExposure as ExpenseIcon } from "react-icons/md";
import { GoWorkflow as WorkFlowIcon } from "react-icons/go";
import { MdOutlineImportExport as ImportExportIcon } from "react-icons/md";
import { MdDevices as DeviceIcon } from "react-icons/md";
import { RiAccountPinCircleLine as ActMgntIcon } from "react-icons/ri";
import { MdOutlineSettingsEthernet as AdvancedIcon } from "react-icons/md";
import { CiCircleList as PermIcon } from "react-icons/ci";
import { PiArrowsLeftRightFill as AccessIcon } from "react-icons/pi";
import PermSetting from '../SubAdmin/SettingOptions/Permissions/PermSetting';
import { clearStepCookie } from '../Routes/stepCookie';
import { useNavigate } from 'react-router-dom';
import { setAccessToken } from '../store/action/auth';
import { useDispatch } from 'react-redux';
import { HiOutlineLogout } from "react-icons/hi";







function SettingBar({
    show,
    hide
}) {
    const navigate = useNavigate();
     const dispatch = useDispatch();
    const [modals, setmodals] = useState(false)
    const sidebarRef = useRef(null)

    const closeBar = () => show(false)


    const items = [

        {
            key: '1',
            label: 'Company',
            icon: <SettingOutlined />,
            children: [
                { key: '1', icon: <CompanyIcon />, label: 'Company Details' },
                { key: '2', icon: <UserIcon />, label: 'User Details' },
                { key: '3', icon: <WorldIcon />, label: 'Localizaion' },
                { key: '4', icon: <PaymentIcon />, label: 'Payment Setting' },
                { key: '5', icon: <PercentageIcon />, label: 'Text Setting' },
                { key: '6', icon: <ProductIcon />, label: 'Product Setting' },
                { key: '7', icon: <ExpenseIcon />, label: 'Expense Setting' },
                { key: '8', icon: <WorkFlowIcon />, label: 'WorkFlow Setting' },
                { key: '9', icon: <ImportExportIcon />, label: 'Import | Export' },
                { key: '10', icon: <DeviceIcon />, label: 'Device Setting' },
                { key: '11', icon: <ActMgntIcon />, label: 'Account Management' },

            ],
        },

        {
            type: 'divider',
        },

        {
            key: '2',
            label: 'Permissions',
            icon: <PermIcon />,
            children: [
                { key: 'employee-access', icon: <AccessIcon />, label: 'Employe Access' },
            ],
        },
        {
            key: 'Logout',
            label: 'Logout',
            icon: <HiOutlineLogout />,
        },
    ];

    const onMenuClick = ({ key }) => {
        if (key === 'employee-access') {
            setmodals(true);
        }else if(key === "Logout"){
            clearStepCookie()
            dispatch(setAccessToken(""));
            setTimeout(() => {
                navigate("/")
            }, 3000);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                hide &&
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target)
            ) {
                closeBar()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [hide])

    return (
        <>
            <section className={style.setting_section}>
                <div className={style.setting_bar} id={hide ? style.setting_open : style.setting_close}>
                    <div className={style.setting_innerBox} ref={sidebarRef}>
                        <div className={style.setting_logoBox}>
                            <img src={logo} alt="" />
                            <Close onClick={closeBar} />
                        </div>
                        <Menu
                            // onClick={onClick}
                            // style={{ width: 256 }}
                            onClick={onMenuClick}
                            theme="dark"
                            className='settingBar'
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                            items={items}
                        />

                    </div>
                </div>
                {
                    modals ? <PermSetting {...{ modals, setmodals }} /> : null
                }
            </section>
        </>
    )
}

export default SettingBar