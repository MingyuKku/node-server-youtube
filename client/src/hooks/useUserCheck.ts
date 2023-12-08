import React from "react"
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux"
import { setLoginState } from "../_actions/user_action";

import axios from "axios"


export default function useUserCheck() {

    const location = useLocation();
    const dispatch = useDispatch();

    React.useEffect(() => {
        axios.get('/api/users/auth')
        .then(({ data }) => {
            dispatch(setLoginState(data.isAuth));
            console.log('인증', data)
        })
        .catch(err => {
            dispatch(setLoginState(false));
        })
        
    }, [location])

    return {

    }
}