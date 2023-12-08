import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../_reducers'
import axios from 'axios'

const RightMenu = () => {

  const { loginSuccess } = useSelector((state:RootState) => state.user);

  const onClickLogout = () => {
    axios.get('/api/users/logout')
    .then(res => {})
    .catch(err => {})
  }

  return (
    <div>
        {
          loginSuccess ?
          <div onClick={ onClickLogout } style={{
            'cursor': 'pointer'
          }}>
              Logout
          </div>
          : <>
            <Link to="/login" style={{
                'marginRight': '20px'
            }}>
                Sign in
            </Link>
            <Link to="/register">
                Sign up
            </Link>
          </>
        }
    </div>
  )
}

export default RightMenu