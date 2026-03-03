// import React, { useState } from 'react'
// import style from './Payments.module.css'
// import StaterHeader from '../Components/StaterHeader'
// import Heading from '../Components/Heading'
// import arrowLeft from "../assests/images/icons/arrowleft.png";
// import { RadioButton } from '../Components/CheckBoxInput';
// import { FormInput } from '../Components/Inputs';
// import { SelectInput } from '../Components/Select';
// import { Country, State, City } from "country-state-city";
// import { Link } from 'react-router-dom';
// import { ActionButton } from '../Components/Button';


// function Payments() {
//     const [method, setMethod] = useState("credit_card");
//     const [Datetype, setType] = useState("text");
//     const countries = Country.getAllCountries();
//     const codes = ["PK", "IN", "US", "AS"];
//     const provinces = codes.flatMap(code => State.getStatesOfCountry(code));

//     const handleClick = (e) => {
//         e.preventDefault();
//         window.location.href = "/";
//     }
//     return (
//         <>
//             <StaterHeader />
//             <section className={`${style.payments_section} mt-5`}>
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-lg-7 p-0">
//                             <div className={style.payments_checkoutArrowBox}>
//                                 <Link><img src={arrowLeft} alt="" /></Link>
//                                 <div>
//                                     <Heading
//                                         className="m-0"
//                                         title={"Checkout"}
//                                     />
//                                     <p>Complete your payment to launch your IT universe</p>
//                                 </div>

//                             </div>
//                             <div className={style.payments_checkoutRadioBox}>
//                                 <Heading
//                                     className=""
//                                     title={"Payment Method"}
//                                 />
//                                 <RadioButton
//                                     style={{ color: "#FFFFFF66" }}
//                                     id="credit_card"
//                                     labelTitle="Credit Card"
//                                     htmlFor="credit_card"
//                                     method={method}
//                                     onChange={() => setMethod("credit_card")}
//                                 />

//                                 <RadioButton
//                                     style={{ color: "#FFFFFF66" }}
//                                     id="paypal_card"
//                                     labelTitle="Paypal Card"
//                                     htmlFor="paypal_card"
//                                     method={method}
//                                     onChange={() => setMethod("paypal_card")}
//                                 />
//                             </div>
//                             <div className={style.payments_checkoutInputs}>
//                                 <div>
//                                     <FormInput
//                                         className={`mt-2 mx-1`}
//                                         type={"text"}
//                                         name={"first_name"}
//                                         placeholder={"First Name"}
//                                         required={true}
//                                     />
//                                     <FormInput
//                                         className={`mt-2 mx-1`}
//                                         type={"text"}
//                                         name={"last_name"}
//                                         placeholder={"Last Name"}
//                                         required={true}
//                                     />
//                                 </div>
//                                 <div>
//                                     <FormInput
//                                         className={`mt-2 mx-1`}
//                                         type={"text"}
//                                         name={"card_number"}
//                                         placeholder={"Card Number"}
//                                         required={true}
//                                     />
//                                 </div>
//                                 <div>
//                                     <FormInput
//                                         className={`mt-2 mx-1`}
//                                         type={Datetype}
//                                         name={"expiration_date"}
//                                         placeholder={"Expiration date"}
//                                         required={true}
//                                         Datetype
//                                         onFocus={() => setType("date")}
//                                     />
//                                     <FormInput
//                                         className={`mt-2 mx-1`}
//                                         type={"Number"}
//                                         name={"cvv"}
//                                         placeholder={"CVV"}
//                                         required={true}
//                                     />
//                                 </div>
//                             </div>
//                             <div className={`${style.payments_checkoutInputs} mt-5`}>
//                                 <Heading
//                                     className="m-0"
//                                     title={"Billing Address"}
//                                 />
//                                 <div>
//                                     <SelectInput
//                                         className={`mt-2 mx-1`}
//                                         showSearch={true}
//                                         placeholder={"State / Province"}
//                                         options={provinces?.map(
//                                             (item) => ({
//                                                 value: item.isoCode,
//                                                 label: item.name,
//                                             })
//                                         )}
//                                     />
//                                     <SelectInput
//                                         className={`mt-2 mx-1`}
//                                         showSearch={true}
//                                         placeholder={"Country"}
//                                         options={countries?.map(
//                                             (item) => ({
//                                                 value: item.isoCode,
//                                                 label: item.name,
//                                             })
//                                         )}
//                                     />
//                                 </div>
//                                 <div>
//                                     <FormInput
//                                         className={`mt-2 mx-1`}
//                                         type={"text"}
//                                         name={"Address"}
//                                         placeholder={"Address"}
//                                         required={true}
//                                     />
//                                 </div>
//                                 <div>
//                                     <FormInput
//                                         className={`mt-2 mx-1`}
//                                         type={"number"}
//                                         name={"phone number"}
//                                         placeholder={"Phone Number"}
//                                         required={true}
//                                     />
//                                     <FormInput
//                                         className={`mt-2 mx-1`}
//                                         type={"number"}
//                                         name={"postal code"}
//                                         placeholder={"Postal Code"}
//                                         required={true}
//                                     />
//                                 </div>
//                                 <div>
//                                     <FormInput
//                                         className={`mt-2 mx-1`}
//                                         type={"number"}
//                                         name={"cat code"}
//                                         placeholder={"Cat Code"}
//                                         required={true}
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="col-lg-5">
//                             <div className={style.payments_summaryCheckoutBox}>
//                                 <Heading
//                                     className="m-0"
//                                     title={"Package Details"}
//                                 />
//                                 <div className={style.payments_summaryInnerBox}>
//                                     <div>
//                                         <h5>Premium Package</h5>
//                                         <span>Annual subscription</span>
//                                     </div>
//                                     <div>
//                                         <h5 className='text-end'>$1079.67</h5>
//                                         <span className='text-end'>3 User x $29.99 x 12 mo</span>
//                                     </div>
//                                 </div>
//                                 <div className={style.payments_summaryInnerBox}>
//                                     <div>
//                                         <h5>Tax</h5>
//                                         <span>Annual subscription</span>
//                                     </div>
//                                     <div>
//                                         <h5 className='text-end'>$200</h5>
//                                         <span className='text-end'>3 User x $29.99 x 12 mo</span>
//                                     </div>
//                                 </div>
//                                 <div className={style.payments_summaryInnerBox}>
//                                     <div>
//                                         <h5>Total</h5>
//                                     </div>
//                                     <div>
//                                         <h5 className='text-end'>$1279.64</h5>
//                                         <span className='text-end'>Price does not include tax</span>
//                                     </div>
//                                 </div>
//                                 {/* <Button
//                                     className={""}
//                                     type={"no"}
//                                     title={"Continue"}
//                                 /> */}
//                                 <ActionButton
//                                     className={style.userButton}
//                                     type={"submit"}
//                                     onClick={handleClick}
//                                     title={"Continue"}
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </>
//     )
// }

// export default Payments