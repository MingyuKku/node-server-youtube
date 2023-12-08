import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { RootState } from '../_reducers';
// import authCheck from '../hoc/authenticationCheck';

const AuthRouter = () => {

    const { loginSuccess } = useSelector((state:RootState) => state.user);

    if (loginSuccess === null) {
        return (
            <div>로딩중...</div>
        )

    } else {
        if (loginSuccess) return <Outlet />
        else return <Navigate to="/login" />
    }
}

export default AuthRouter;