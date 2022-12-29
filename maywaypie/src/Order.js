import React, { useDebugValue, useEffect, useContext, useState, useSyncExternalStore } from 'react';
import { BrowserRouter, Switch, Route, Routes, Link, NavLink, Redirect } from "react-router-dom";
import './Order.css';
function Order() {
    return (
        <React.Fragment>
            <div className='bar'>
                <div style={{ fontFamily: 'Noto Sans TC', fontSize: 'larger', marginLeft: '20px' }}>銷售情況</div>
                <div className='barfuns'>
                    <div className='barfun'>營業額</div>
                    <div className='barfun'>品項</div>
                </div>
            </div>
            <div className='Sdetail'>
                <button className='timebtn'>今日</button>
                <button className='timebtn'>本周</button>
                <button className='timebtn'>本月</button>
                <input type="date"/>
            </div>
            <div className='Detail'>

            </div>
        </React.Fragment>
    );
}
export default Order;