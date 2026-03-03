import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import UserModule from '../UserModule/index'
import Verification from '../verification/Verification';
import RegisterCompany from '../Company/Resigter'
import Packages from '../Packages';
import CustomerInfo from '../SubAdmin/customer/CustomerInfo';
import Password from '../SubAdmin/ChangePwd/Password';
import EmailScreen from '../SubAdmin/ChangePwd/EmailScreen';
import '../assests/css/themes.css'
import Data from '../DataSedingApis/Data';
import AuthGuard from './AuthGuard';
import StepGuard from './StepGuard';

function Routers() {
  return (
    <>
      <Router>
        <Routes>
          <>
            <Route path="/" element={
              <StepGuard>
                <UserModule />
              </StepGuard>
            }
            />
            <Route path="/user-verification" element={
              <StepGuard>
                <Verification />
              </StepGuard>
            }
            />
            <Route path="/company-registration" element={
              <StepGuard>
                <RegisterCompany />
              </StepGuard>
            }
            />
            <Route path="/user-subscription-packages" element={
                <StepGuard>
                  <Packages />
                </StepGuard>
              }
            />

             <Route path="/EmailScreenPassword" element={
                <StepGuard>
                  <EmailScreen />
                </StepGuard>
              }
            />
             <Route path="/changePassword" element={
                <StepGuard>
                  <Password />
                </StepGuard>
              }
            />
            

            <Route path="/CustomerInfo" element={
              <AuthGuard>
                <StepGuard>
                  <CustomerInfo />
                </StepGuard>
              </AuthGuard>
            }
            />

            {/* <Route path="/EmailScreenPassword" element={<EmailScreen />} /> */}
            {/* <Route path="/changePassword" element={<Password />} /> */}




            <Route path="/DataSeedar" element={<Data />} />
          </>
        </Routes>
      </Router>
    </>
  )
}

export default Routers