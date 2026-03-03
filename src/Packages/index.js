import React from 'react'
import StaterHeader from '../Components/StarterHeader/StaterHeader'
import Heading from '../Components/Heading/Heading'
import style from './Packages.module.css'
import { FaCheckCircle } from "react-icons/fa";
import { ActionButton } from '../Components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { STEPS } from '../Routes/stepCookie';
import { setStep } from '../store/action/auth';
import { useDispatch } from 'react-redux';



function Packages() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClick = (e) => {
        dispatch(setStep(STEPS.LOGIN));
        setTimeout(() => {
            navigate("/", {replace: true});
        }, 3000);
        e.preventDefault();
    }

    return (
        <>
            <StaterHeader />
            <section className={style.Packages_section}>
                <div className="container">
                    <div className="row justify-content-center">
                        <Heading
                            className="mb-5"
                            title={"Choose the Perfect Package for Your Needs"}
                        />
                        <div className="col-lg-4">
                            <div className={style.Packages_box}>
                                <h5>Free Trial</h5>
                                <span>$0.00</span>
                                <ul>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                </ul>
                                <ActionButton
                                    className={style.userButton}
                                    type={"submit"}
                                    onClick={handleClick}
                                    title={"Continue"}
                                />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className={style.Packages_box}>
                                <h5>Basic Package</h5>
                                <span>$29.99</span>
                                <ul>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                </ul>
                                <ActionButton
                                    className={style.userButton}
                                    type={"submit"}
                                    onClick={handleClick}
                                    title={"Continue"}
                                />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className={style.Packages_box}>
                                <h5>Basic Package</h5>
                                <span>$29.99</span>
                                <ul>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                    <li><FaCheckCircle /> List Item</li>
                                </ul>
                                <ActionButton
                                    className={style.userButton}
                                    type={"submit"}
                                    onClick={handleClick}
                                    title={"Continue"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Packages