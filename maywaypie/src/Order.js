import React, { useDebugValue, useEffect, useContext, useState, useSyncExternalStore } from 'react';
import { BrowserRouter, Switch, Route, Routes, Link, NavLink, Redirect } from "react-router-dom";
import './Order.css';
function Order() {
    let githubURL = new URL(window.location.href);
    let params = githubURL.pathname;
    var state = params.substring(17, params.length);
    const [Datetime, setDatetime] = React.useState("");
    React.useEffect(() => {
        if (state == 'ing') {

        } else if (state == 'ed') {

        } else if (state == 'cancel') {

        }
    })

    var today = () => {
        
    }
    var week = () => {
        
    }
    var month = () => {
     
    }
    
    return (
        <React.Fragment>
            <div className='bar'>
                <div style={{ fontFamily: 'Noto Sans TC', fontSize: 'larger', marginLeft: '20px' }}>訂單紀錄</div>
            </div>
            <div className='Detail'>
            <div className='orderTitle'>
                    <div className='orderId' style={{fontSize: '13px'}}>order_id</div>
                    <div className='orderTP' style={{fontSize: '13px'}}>List</div>
                    <div className='orderTP' style={{fontSize: '13px'}}>Price</div>
                    <div className='orderTP' style={{fontSize: '13px'}}>Dineways</div>
                    <div className='orderTP' style={{fontSize: '13px'}}>customer</div>
                    <div className='orderTP' style={{fontSize: '13px'}}>DateTime</div>
                    </div>
                <div className='orderDetail'>
                    <div className='orderId'>1</div>
                    <div className='orderName'>地瓜餅、蛋餅、地瓜餅、再一個蛋餅好吃哈哈、真的很好吃</div>
                    <div className='orderTP'>65</div>
                    <div className='orderTP'>現場內用</div>
                    <div className='orderTP'>Jeff</div> {/*沒登入就寫anonymous*/}
                    <div className='orderTP'>2022-12-28 06:25:55</div>
                </div>
            </div>
        </React.Fragment>
    );
}
export default Order;