import React, { useEffect } from 'react'
import style from './CustomerHeader.module.css'
import { DeleteButton } from '../../../Components/Button'
import arrowLeft from '../../../assests/images/icons/arrowleft.png'
import * as ACTIONS from "../../../store/action/overview/index";
import { connect } from "react-redux"
import { useSelector } from "react-redux";

function InfoHeader({
    Red_Overview,
    OverviewCall,
}) {
    const role = Red_Overview?.data?.[0]?.data?.role
    const data = Red_Overview?.data?.[0]?.data
    const accessToken = useSelector((state) => state.Red_Auth.accessToken);
    useEffect(() => {
        if (accessToken) {
            OverviewCall(accessToken);
        }
    }, [accessToken]);
    return (
        <>
            {/* <div className={style.customerHeader_headerBox}>
                <div className={style.customerHeader_customerName}>
                    <img src={arrowLeft} alt="" />
                    <div>
                        <span>{data?.name}</span>
                        <p title={data?.email}>{data?.email?.length > 15 ? `${data?.email?.slice(0,15)}...` : data?.email}</p>
                    </div>
                </div>
                <div className={style.customerHeader_contactInfo}>
                    <div>
                        <span>Mobile#</span>
                        <p>{data?.company?.phone}</p>
                    </div>
                    <div>
                        <span>Domain</span>
                        <p>{data?.company?.domain}</p>
                    </div>
                    <div>
                        <span>Business ID</span>
                        <p>{data?.company?.business_id}</p>
                    </div>
                    <div>
                        <span>Created on</span>
                        <p>{data?.created_at?.slice(0,10)}</p>

                    </div>
                </div>
                <DeleteButton title={"Delete Customer"} />
            </div> */}
        </>
    )
}


function mapStateToProps({ Red_Overview }) {
    return { Red_Overview };
}
export default connect(mapStateToProps, ACTIONS)(InfoHeader);