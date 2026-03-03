import React, { useEffect } from 'react';
import { DownOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { Dropdown, Switch } from 'antd';
import { createStyles } from 'antd-style';
import * as ACTIONS from "../../../../../store/action/emp/index";
import { connect, useDispatch } from "react-redux"
import { useSelector } from "react-redux";
import baseUrl from '../../../../../config.json'
import { CiDark } from "react-icons/ci";
import { clearStepCookie } from '../../../../../Routes/stepCookie';
import { setAccessToken } from '../../../../../store/action/auth';
import { CLEAR_STEP } from '../../../../../store/action/types';
import Cookies from "js-cookie";




const useStyles = createStyles(({ token }) => ({
    root: {
        backgroundColor: token.colorFillAlter,
        border: `1px solid ${token.colorBorder}`,
        borderRadius: token.borderRadius,
        marginTop: "50rem"
    },
}));

const ProfileDropDown = ({
    Red_Emp,
    getUserLoginTime,
    children
}) => {
    const accessToken = useSelector((state) => state.Red_Auth.accessToken);
    const { styles } = useStyles();
    const data = Red_Emp?.GetUserLoginTime?.[0]?.data
    const dispatch = useDispatch();

    useEffect(() => {
        getUserLoginTime(accessToken);
    }, [accessToken]);

    const handleLogout = () => {
        clearStepCookie()
        dispatch(setAccessToken(""));
        Cookies.remove("refresh_token")
        dispatch({ type: CLEAR_STEP });
    }

    const items = [
        {
            key: '1',
            label: (
                <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                    <img
                        src={`${baseUrl.baseUrl}${data?.profile_image}`}
                        alt="avatar"
                        style={{ borderRadius: '50%', width: 40, height: 40 }}
                    />
                    <div>
                        <span style={{ fontWeight: 'bold' }}>{data?.name}</span>
                        <p style={{ margin: 0, fontSize: 12, color: '#555' }}>{data?.email}</p>
                    </div>
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>
                        <CiDark style={{ fontSize: 16, marginRight: 8 }} />
                        Dark Mode
                    </span>
                    <Switch size="small" />
                </div>
            ),
        },
        {
            type: 'divider',
        },
        {
            key: '3',
            label: 'Logout',
            icon: <LogoutOutlined />,
            danger: true,
            onClick: handleLogout,
        },
    ];
    return (
        <Dropdown
            menu={{ items }}
            trigger={['click']}
            placement="bottomRight"
            classNames={{ root: styles.root }}
        >
            {children}
        </Dropdown>
    );
};

function mapStateToProps({ Red_Emp }) {
    return { Red_Emp };
}
export default connect(mapStateToProps, ACTIONS)(ProfileDropDown);