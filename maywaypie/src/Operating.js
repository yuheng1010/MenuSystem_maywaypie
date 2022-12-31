import React, { useDebugValue, useEffect, useContext, useState, useSyncExternalStore } from 'react';
import { BrowserRouter, Switch, Route, Routes, Link, NavLink, Redirect } from "react-router-dom";
import './Operating.css';
import Turnover from './Turnover.js';
import Item from './Item.js';
function Operating() {
    const [func, setFunc] = React.useState(0);
    React.useEffect(() => {

    }, []);
    var turnover = () => {
        setFunc(1);
        document.getElementById('turnover').style.color='#f17014';
        document.getElementById('item').style.color='#000000';
    }
    var item = () => {
        setFunc(2);
        document.getElementById('item').style.color='#f17014';
        document.getElementById('turnover').style.color='#000000';
    }
    return (
        <React.Fragment>
            <div className='bar'>
                <div style={{ fontFamily: 'Noto Sans TC', fontSize: 'larger', marginLeft: '20px' }}>銷售情況</div>
                <div className='barfuns'>
                    <div className='barfun' id='turnover' onClick={turnover}>營業額</div>
                    <div className='barfun' id='item' onClick={item}>品項</div>
                </div>
            </div>
            {func == 0 && <div className='Detail' style={{ backgroundColor: '#444444' }}></div>}
            {func == 1 && <Turnover />}
            {func == 2 && <Item />}
        </React.Fragment>
    );
}
export default Operating;