import React, { useDebugValue, useEffect, useContext, useState, useSyncExternalStore } from 'react';
import { BrowserRouter, Switch, Route, Routes, Link, NavLink, Redirect } from "react-router-dom";
import './Operating.css';
import Plot from 'react-plotly.js';
function Turnover() {
    const [detail, setDetail] = React.useState([]);
    const [period, setPeriod] = React.useState(0);
    React.useEffect(() => {

    }, []);

    var today = () => {
        setPeriod(1);
        document.getElementById('today').style.backgroundColor = '#f17014';
        document.getElementById('today').style.color = '#ffffff';
        document.getElementById('week').style.backgroundColor = '#ffffff';
        document.getElementById('month').style.backgroundColor = '#ffffff';
        document.getElementById('week').style.color = '#000000';
        document.getElementById('month').style.color = '#000000';
    }
    var week = () => {
        setPeriod(2);
        document.getElementById('week').style.backgroundColor = '#f17014';
        document.getElementById('week').style.color = '#ffffff';
        document.getElementById('today').style.backgroundColor = '#ffffff';
        document.getElementById('month').style.backgroundColor = '#ffffff';
        document.getElementById('today').style.color = '#000000';
        document.getElementById('month').style.color = '#000000';
    }
    var month = () => {
        setPeriod(3);
        document.getElementById('month').style.backgroundColor = '#f17014';
        document.getElementById('month').style.color = '#ffffff';
        document.getElementById('week').style.backgroundColor = '#ffffff';
        document.getElementById('today').style.backgroundColor = '#ffffff';
        document.getElementById('week').style.color = '#000000';
        document.getElementById('today').style.color = '#000000';
    }
    //bar for day
    var data1 = [{
        type: 'bar',
        x: [20, 14, 23, 20, 30, 50, 20],
        y: ['蛋餅', '其他', '鐵板麵', '果醬', '飲料', '漢堡'],
        orientation: 'h',
        marker: {
            color: '#febd59',
        }
    }];
    //bar for week
    var data2 = [{
        type: 'bar',
        x: [20, 14, 23, 20, 30, 50, 20],
        y: ['蛋餅', '其他', '鐵板麵', '果醬', '飲料', '漢堡'],
        orientation: 'h',
        marker: {
            color: '#febd59',
        }
    }];
    //bar for month
    var data3 = [{
        type: 'bar',
        x: [20, 14, 23, 20, 30, 50, 20],
        y: ['蛋餅', '其他', '鐵板麵', '果醬', '飲料', '漢堡'],
        orientation: 'h',
        marker: {
            color: '#febd59',
        }
    }];
    return (
        <React.Fragment>
            <div className='Sdetail'>
                <button className='timebtn' id='today' onClick={today}>今日</button>
                <button className='timebtn' id='week' onClick={week}>本周</button>
                <button className='timebtn' id='month' onClick={month}>本月</button>
                <input type="date" id="start" />---
                <input type="date" id="end" />
            </div>
            {period == 0 && <div className='Detail' style={{ backgroundColor: '#444444' }}></div>}
            {period == 1 && <div className='Detail'>
                <div className='Tprices' style={{ width: '100%', position: 'absolute', zIndex: '99' }}>
                    <div className='Tpricet' style={{ marginLeft: '25px', marginTop: '10px' }}>日銷售類別</div>
                </div>
                <Plot data={data1} layout={{ width: 900, height: 500 }} />
            </div>}
            {period == 2 && <div className='Detail'>
                <div className='Tprices' style={{ width: '100%', position: 'absolute', zIndex: '99' }}>
                    <div className='Tpricet' style={{ marginLeft: '25px', marginTop: '10px' }}>週銷售類別</div>
                </div>
                <Plot data={data2} layout={{ width: 900, height: 500 }} />
            </div>}
            {period == 3 && <div className='Detail'>
                <div className='Tprices' style={{ width: '100%', position: 'absolute', zIndex: '99' }}>
                    <div className='Tpricet' style={{ marginLeft: '25px', marginTop: '10px' }}>月銷售類別</div>
                </div>
                <Plot data={data3} layout={{ width: 900, height: 500 }} />
            </div>}
        </React.Fragment>
    )
}
export default Turnover;