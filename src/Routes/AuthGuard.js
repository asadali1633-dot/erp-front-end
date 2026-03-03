import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { refreshToken } from "../store/action/auth";
import { Spin } from "antd";
import Loader from "../Components/Loader/Loader";

const AuthGuard = ({ children }) => {
    const token = useSelector(state => state.Red_Auth.accessToken);
    const isLoading = useSelector(state => state.Red_Auth.isLoading);
    const dispatch = useDispatch();
    const [checking, setChecking] = useState(true);
    // useEffect(() => {
    //     const originalFetch = window.fetch;
    //     window.fetch = async (...args) => {
    //         const response = await originalFetch(...args);
    //         if (response.status === 403) {
    //             await dispatch(refreshToken());
    //         }
    //         // console.log("res",response)
    //         return response;
    //     };
    //     return () => {
    //         window.fetch = originalFetch;
    //     };
    // }, [dispatch]);

    useEffect(() => {
        const checkToken = async () => {
            if (!token) {
                await dispatch(refreshToken());
            }
            setChecking(false);
        };
        checkToken();
    }, [token, dispatch]);

    if (isLoading || checking) {
        return (
            <Loader />
        );
    }
    if (!token) return <Navigate to="/" replace />;
    // if (!token) return window.location.href = '/';


    return children;
};

export default AuthGuard;
