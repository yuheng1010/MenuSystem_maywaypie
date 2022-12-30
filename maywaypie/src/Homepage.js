import React, { useDebugValue, useEffect, useContext, useState, useSyncExternalStore } from 'react';
import { BrowserRouter, Switch, Route, Routes, Link, NavLink, Redirect } from "react-router-dom";
import './Homepage.css';
import Order from './Order.js'
import Operating from './Operating.js'
import hamburger from './img/hamburger.png'
function Homepage() {
    let githubURL = new URL(window.location.href);
    let params = githubURL.pathname;
    let path = params.substring(10,params.length)
    console.log(path);
    return (
        <React.Fragment>
            <div className='article'>
                <div className='Left'>
                    {path=='' && <div className='info'>首頁</div>}
                    {path=='/order/ing' && <div className='info'>首頁 &gt; 訂單管理 &gt; 製作中</div>}
                    {path=='/order/ed' && <div className='info'>首頁 &gt; 訂單管理 &gt; 餐點完成</div>}
                    {path=='/order/cancel' && <div className='info'>首頁 &gt; 訂單管理 &gt; 棄單</div>}
                    {path=='/operating' && <div className='info'>首頁 &gt; 銷售情況</div>}
                    <div className='function'>
                        <div className='title1'>訂單管理</div>
                        <div className='title2'>
                            <div className='titlehover' style={{ margin: '5px' }}><a href='/dashboard/order/ing'>製作中</a></div>
                            <div className='titlehover' style={{ margin: '5px' }}><a href='/dashboard/order/ed'>餐點完成</a></div>
                            <div className='titlehover' style={{ margin: '5px' }}><a href='/dashboard/order/cancel'>棄單</a></div>
                        </div>
                        <hr className='hr'></hr>
                        <div className='title1'>品項管理</div>
                        <div className='title1'>存貨管理</div>
                        <hr className='hr'></hr>
                        <div className='title1'>營運相關報表</div>
                        <div className='title2'><a href='/dashboard/operating'><div className='titlehover'>銷售情況</div></a></div>
                    </div>
                </div>
                <div className='Right'>
                    {path=='' && <img className='hamburger' src={hamburger}></img>}
                    <BrowserRouter>
                        <Routes>
                            {/* <Route exact path="/" element={<Homepage />} /> */}
                            <Route exact path="/dashboard/order/:status" element={<Order />} />
                            <Route exact path="/dashboard/operating" element={<Operating />} />
                        </Routes>
                    </BrowserRouter>
                    {/* <Operating /> */}
                </div>
            </div>
        </React.Fragment>
    );
}

export default Homepage;