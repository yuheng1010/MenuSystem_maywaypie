import React, { useDebugValue, useEffect, useContext, useState, useSyncExternalStore } from 'react';
import { BrowserRouter, Switch, Route, Routes, Link, NavLink, Redirect } from "react-router-dom";
import './Homepage.css';
import Order from './Order.js'
function Homepage() {

    return (
        <React.Fragment>
            <div className='article'>
                <div className='Left'>
                    <div className='info'>首頁</div>
                    <div className='function'>
                        <div className='title1'>訂單管理</div>
                        <div className='title2'>
                            <div style={{ margin: '5px' }}>製作中</div>
                            <div style={{ margin: '5px' }}>餐點完成</div>
                            <div style={{ margin: '5px' }}>棄單</div>
                        </div>
                        <hr className='hr'></hr>
                        <div className='title1'>品項管理</div>
                        <div className='title1'>存貨管理</div>
                        <hr className='hr'></hr>
                        <div className='title1'>營運相關報表</div>
                        <div className='title2'>銷售情況</div>
                    </div>
                </div>
                <div className='Right'>
                    {/* <BrowserRouter>
                        <Routes>
                            <Route exact path="/" element={<Homepage />} />
                            <Route exact path="/dashboard/:func" element={<Order />} />
                        </Routes>
                    </BrowserRouter> */}
                    <Order />
                </div>
            </div>
        </React.Fragment>
    );
}

export default Homepage;