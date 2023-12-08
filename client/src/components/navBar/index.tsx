import React from 'react'

// 컴포넌트
import LeftMenu from './leftMenu';
import RightMenu from './rightMenu';

// MUI
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

const NavBar = () => {
    return (
        <AppBar style={{
            'backgroundColor': 'white',
            'color': 'black',
        }}>
            <Toolbar style={{
                'display': 'flex',
                'justifyContent': 'space-between',
            }}>
                <LeftMenu />
                <RightMenu />
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;