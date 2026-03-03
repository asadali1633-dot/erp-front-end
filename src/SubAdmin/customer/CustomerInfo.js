import React, { useEffect, useRef, useState } from 'react'
import style from './CustomerInfo.module.css'
import Header from '../Header/index'
import { Tabs, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { IoSettingsOutline as Setting } from "react-icons/io5";
import 'react-tabs/style/react-tabs.css';
import Hardware from './Hardware/Hardware'
import Software from './Software/Software'
import View from './Overview/View'
import Tickets from './Tickets/Tickets'
import Vendors from './vendor/Vendor'
import PurchaseOrder from './PurchaseOrder/PurchaseOrder'
import Info from './People/Pernosal/Info'
import * as THEME_ACTIONS from '../../store/action/theme/index'
import { connect } from "react-redux"
import { useSelector } from "react-redux";
import SettingBar from '../../setting/SettingBar';
import PeopleList from './People/List/PeopleList';
import Cookies from "js-cookie";
import Loader from '../../Components/Loader/Loader';



function CustomerInfo({
    SaveThemeFun,
    GetThemeSetting,
    Red_Theme,
    Red_Emp
}) {
    const [theme, setTheme] = useState("dark");
    const accessToken = useSelector((state) => state.Red_Auth.accessToken);
    const [hide, show] = useState(false)
    const [activeTab, setActiveTab] = useState("1");
    const [assetType, setAssetType] = useState("hardware");
    const [vendorType, setVendorType] = useState("vendor");
    const [showPeopleTabs, setShowPeopleTabs] = useState(false);
    const empData = Red_Emp?.GetUserLoginTime?.[0]?.data
    const loading = Red_Emp?.loading

    const openBar = () => {
        show(!hide)
    }

    const hasPermission = (slug) => {
        if (!slug) return true;
        return empData?.permissions?.includes(slug);
    };

    const assetItems = [
        { type: "hardware", slug: "hardware_view", component: <Hardware /> },
        { type: "software", slug: "software_view", component: <Software /> },
    ];
    const vendorItems = [
        { type: "vendor", slug: "vendor_view", component: <Vendors /> },
        { type: "purchase_order", slug: "purchase_order_view", component: <PurchaseOrder /> },
    ];
    const filteredAssetItems = assetItems.filter(item => hasPermission(item.slug));
    const filteredVendorItems = vendorItems.filter(item => hasPermission(item.slug));

    const assetsTab = filteredAssetItems.length > 0 && {
        key: "assets",
        label: (
            <Dropdown
                menu={{
                    items: filteredAssetItems.map(item => ({
                        key: item.type,
                        label: item.type.charAt(0).toUpperCase() + item.type.slice(1),
                        onClick: () => setAssetType(item.type)
                    })),
                    onClick: (e) => setAssetType(e.key),
                }}
                trigger={["click"]}
            >
                <span style={{ cursor: "pointer" }}>Assets <DownOutlined /></span>
            </Dropdown>
        ),
        children: filteredAssetItems.map(item =>
            assetType === item.type ? item.component : null
        )
    };

    const vendorTab = filteredVendorItems.length > 0 && {
        key: "vendor",
        label: (
            <Dropdown
                menu={{
                    items: filteredVendorItems.map(item => ({
                        key: item.type,
                        label: item.type === "vendor" ? "Vendor" : "Purchase Order",
                        onClick: () => setVendorType(item.type)
                    })),
                    onClick: (e) => setVendorType(e.key),
                }}
                trigger={["click"]}
            >
                <span style={{ cursor: "pointer" }}>Vendor <DownOutlined /></span>
            </Dropdown>
        ),
        children: filteredVendorItems.map(item =>
            vendorType === item.type ? item.component : null
        )
    };

    const items = [
        {
            key: "1",
            label: "Overview",
            slug: "overview_view",
            children: <View />
        },
        {
            key: "2",
            label: "My Info",
            slug: "",
            children: <Info />
        },
        {
            key: "People_list",
            label: "People",
            slug: "people_view",
            children: <PeopleList showPeopleTabs={showPeopleTabs} setShowPeopleTabs={setShowPeopleTabs} />
        },
        {
            key: "4",
            label: "Devices",
            slug: "devices_view",
            children: <h1>Devices Content</h1>
        },
        assetsTab,
        { key: "5", label: "Tickets", slug: "", children: <Tickets /> },
        vendorTab

    ];

    const filteredItems = items.filter(item => item && hasPermission(item.slug));
    

    // const handleTheme = async () => {
    //     const newTheme = theme === "light" ? "dark" : "light";
    //     setTheme(newTheme);
    //     document.documentElement.setAttribute("data-theme", newTheme);
    //     const isCheck = await SaveThemeFun(newTheme, accessToken);
    // };


    // useEffect(() => {
    //     if (accessToken) {
    //         GetThemeSetting(accessToken);
    //     }
    // }, [accessToken]);

    // useEffect(() => {
    //     const themedata = Red_Theme?.ThemeData?.[0];
    //     if (themedata?.success && themedata.theme_mode) {
    //         const mode = themedata.theme_mode.toLowerCase().trim();
    //         setTheme(mode);
    //         document.documentElement.setAttribute("data-theme", mode);
    //     }
    // }, [Red_Theme]);

       useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        // setTheme(mode);
    }, [theme]);

    useEffect(() => {
        if (!empData) return; 
        const filteredItems = items.filter(item => hasPermission(item.slug));
        if (filteredItems.length > 0) {
            setActiveTab(filteredItems[0].key); 
        } else {
            setActiveTab(null);
        }
    }, [empData]);





    return (
        <>

        {loading && <Loader />}
        <section className={`${style.customerinfo_mainSection}`}>
            {/* <button onClick={handleTheme} style={{ position: "absolute", zIndex: "999" }}>
                Switch to {theme === "light" ? "Dark" : "Light"} Mode
            </button> */}

            <SettingBar show={show} hide={hide} />
            <div className={style.customerinfo_innerBox}>
                <Header />
                <div className={`${style.customerinfo_tableBox} divbg mt-4`}>
                    <div className={`${style.customerinfo_tableInnerBox} divbg`}>
                        <div className={`${style.customerinfo_tabsBox} divbg`} >
                            <div className={style.customerinfo_settingIconBox}>
                                {
                                    empData?.user_type == "Super_admin" ? <Setting title='settings' onClick={openBar} /> : null
                                }
                            </div>
                            <Tabs
                                className={"customerinfo_tabsPanel"}
                                onChange={(key) => setActiveTab(key)}
                                activeKey={activeTab}
                                onTabClick={(key) => {
                                    if (key === "People_list") {
                                        setShowPeopleTabs(false);
                                    }
                                }}
                                items={filteredItems.map(item => ({
                                    key: item.key,
                                    label: item.label,
                                    children: item.children,
                                }))}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

function mapStateToProps(state) {
    return {
        Red_Theme: state.Red_Theme,
        Red_Emp: state.Red_Emp
    };
}
const AllActions = {
    ...THEME_ACTIONS,
};
export default connect(mapStateToProps, AllActions)(CustomerInfo);