import React from 'react'
import { useNavigate, Navigate } from 'react-router-dom';
import { useThunkDispatch } from '../thunk'
import { auth } from '../_actions/user_action';

export default function AuthHOC<T extends JSX.IntrinsicAttributes>(OriginComponent: React.ComponentType<T>, option: null | boolean) {

    return function NewComponent(props: T) {

        const dispatch = useThunkDispatch();
        const [ isAuth, setAuth ] = React.useState(true);

        React.useEffect(() => {
            dispatch(auth())
            .then((res) => {
                if (!res.isAuth) {
                    setAuth(true);
                } else {
                    setAuth(false);
                }
            })
            .catch(err => {
                console.log(err)
                setAuth(false);
            })

        }, [dispatch])

        return (
            isAuth && option !== null ? 
            <OriginComponent
                {...props}
            />
            : <Navigate to='/' />
        )
    }
}