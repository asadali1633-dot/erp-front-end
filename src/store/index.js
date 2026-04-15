import { combineReducers, compose, createStore, applyMiddleware } from "redux";
import { thunk } from 'redux-thunk';
import Red_Theme from './redcure/theme/index'
import Red_SignUp from './redcure/signup/index'
import Red_Verification from './redcure/Verification/index'
import Red_Company from './redcure/company/index'
import Red_SignIn from './redcure/signin/index'
import Red_Auth from './redcure/auth/index'
import Red_Depart from './redcure/departments/index'
import Red_Role from './redcure/role/index'
import Red_Designations from './redcure/designations/index'
import Red_Assets from './redcure/hardware/index'
import Red_Software from './redcure/software/index'
import Red_Tickets from './redcure/Tickets/index'
import Red_Permission from "./redcure/permission";
import Red_ForgotPassord from "./redcure/ForgotPassword";
import Red_Emp from "./redcure/emp";
import Red_Education from "./redcure/education/index";
import Red_Qualification from "./redcure/qualification/index";
import Red_Experiance from './redcure/experiance/index'
import Red_Clients from './redcure/clients/index'
import Red_Quote from './redcure/quote/index'
import Red_Invoice from './redcure/invoice/index'
import Red_Vendors from './redcure/Vendors/index'









const reducers = combineReducers({
  Red_Theme,
  Red_SignUp,
  Red_Verification,
  Red_Company,
  Red_SignIn,
  Red_Auth,
  Red_Depart,
  Red_Role,
  Red_Designations,
  Red_Assets,
  Red_Software,
  Red_Tickets,
  Red_Permission,
  Red_ForgotPassord,
  Red_Emp,
  Red_Education,
  Red_Qualification,
  Red_Experiance,
  Red_Clients,
  Red_Quote,
  Red_Invoice,
  Red_Vendors
});

const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(thunk)));

export default store;