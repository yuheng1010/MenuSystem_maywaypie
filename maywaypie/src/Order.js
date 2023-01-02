import React, { useDebugValue, useEffect, useContext, useState, useSyncExternalStore } from 'react';
import { BrowserRouter, Switch, Route, Routes, Link, NavLink, Redirect } from "react-router-dom";
import './Order.css';
function Order() {
    let githubURL = new URL(window.location.href);
    let params = githubURL.pathname;
    var state = params.substring(17, params.length);
    const [stateData, setStateData] = useState([])
    const [Datetime, setDatetime] = React.useState("");
    React.useEffect(() => {
        if (state == 'ing') {
            fetch("http://localhost:7000/getCookingOrder")
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setStateData(data)
                })
        } else if (state == 'ed') {
            fetch("http://localhost:7000/getFinishOrder")
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setStateData(data)
                })
        } else if (state == 'cancel') {
            fetch("http://localhost:7000/getCancelOrder")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setStateData(data)
            })
        }
    }, [])

function finishOrder(idx){
    const id = stateData[idx].id
    fetch(`http://localhost:7000/finishOrder?id=${id}`,{method:"POST"})
    window.location.reload()
}


    return (
        <React.Fragment>



            <div className='bar'>
                <div style={{ fontFamily: 'Noto Sans TC', fontSize: 'larger', marginLeft: '20px' }}>訂單紀錄</div>
            </div>
            <div className='Detail'>
                <div className='orderTitle'>
                    <div className='orderId' style={{ fontSize: '13px' }}>order_id</div>
                    <div className='orderTP' style={{ fontSize: '13px' }}>List</div>
                    <div className='orderTP' style={{ fontSize: '13px' }}>Price</div>
                    <div className='orderTP' style={{ fontSize: '13px' }}>Dineways</div>
                    <div className='orderTP' style={{ fontSize: '13px' }}>customer</div>
                    <div className='orderTP' style={{ fontSize: '13px' }}>DateTime</div>
                </div>

                {stateData.map((inner, index) =>
                        <div className='orderDetail'>
                            {state=="ing" && <button className='finishBtn' onClick={()=>finishOrder(index)}>OK</button>}
                            <div className='orderId'>{inner.id}</div>
                            <div className='orderName'>{(inner.food_name)}</div>
                            <div className='orderTP'>{inner.totalPrice}</div>                    
                            {inner.dineWays==1 && <div className='orderTP'>快取</div>}
                            {inner.dineWays==2 && <div className='orderTP'>外帶</div>}
                            {inner.dineWays==3 && <div className='orderTP'>內用</div>}
                            <div className='orderTP'>{inner.user}</div> {/*沒登入就寫anonymous*/}
                            <div className='orderTP'>{((new Date(inner.datetime)).toString().split(10,1)[0]).substring(0,(new Date(inner.datetime)).toString().split(10,1)[0].indexOf("G"))}</div>
                        </div>
                   
                )}





            </div>
        </React.Fragment>
    );
}
export default Order;