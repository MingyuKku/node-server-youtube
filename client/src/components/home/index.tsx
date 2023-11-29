import React from 'react'
import { Link } from 'react-router-dom'

import { styled } from '@mui/styles';
import Button from '@mui/material/Button';

const LinkButton = styled(Button)({
    '&&': {
        'display': 'inline-block',
        'marginRight': '20px',
    }
})

const index = () => {
  return (
    <div>
        <h1>홈이다</h1>
        <div>
            <Link to="/">
                <LinkButton variant="outlined">Home</LinkButton>
            </Link>
            <Link to="/about">
                <LinkButton variant="outlined">About</LinkButton>
            </Link>
            <Link to="/login">
                <LinkButton variant="outlined">Login</LinkButton>
            </Link>
            <Link to="/register">
                <LinkButton variant="outlined">Sign up</LinkButton>
            </Link>
        </div>
    </div>
  )
}

export default index