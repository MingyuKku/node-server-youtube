import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { RootState } from '../_reducers';
// import authCheck from '../hoc/authenticationCheck';

const BlockRouter = () => {

    const { loginSuccess } = useSelector((state:RootState) => state.user);

    if (!loginSuccess) return <Outlet />
    else return <Navigate to="/" />
}

export default BlockRouter;