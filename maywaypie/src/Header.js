import React, { useDebugValue, useEffect, useContext, useState, useSyncExternalStore } from 'react';
import { BrowserRouter, Switch , Route , Routes , Link , NavLink ,Redirect } from "react-router-dom";
import './Header.css';
function Header() {
    
    return(
        <React.Fragment>
            <div className='header'>
                <div className='headerTitle'><a href="/">美味派 商家管理平台</a></div>
            </div>
        </React.Fragment>
    );
}
export default Header;