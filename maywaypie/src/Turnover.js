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
        fetch('http://localhost:7000/getTodayOrder')
            .then((result) => result.json())
            .then((res) => setDetail(res))
            .catch(error => window.alert(error))
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
    //pie
    var data1 = [{
        values: [16, 15, 12],
        labels: ['外帶', '預定快取', '內用'],
        domain: { column: 0 },
        textinfo: 'label+percent',
        textposition: "outside",
        hole: .4,
        type: 'pie'
    }]
    //line for week
    var trace1 = {
        x: ['一', '二', '三', '四', '五', '六', '日'],
        y: [10, 15, 13, 17, 10, 15, 16],
        type: 'scatter',
        name: '預訂快取'
    };

    var trace2 = {
        x: ['一', '二', '三', '四', '五', '六', '日'],
        y: [16, 5, 11, 9, 12, 15, 14],
        type: 'scatter',
        name: '現場點餐'
    };

    var trace3 = {
        x: ['一', '二', '三', '四', '五', '六', '日'],
        y: [26, 20, 34, 26, 22, 30, 30],
        type: 'scatter',
        name: '銷售總額'
    };
    var data2 = [trace1, trace2, trace3];

    //line for month

    var trace4 = {
        x: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUNE', 'JULY', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        y: [10, 15, 13, 17, 10, 15, 16, 18, 20, 13, 20, 15],
        type: 'scatter',
        name: '預訂快取'
    };

    var trace5 = {
        x: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUNE', 'JULY', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        y: [16, 5, 11, 9, 12, 15, 14, 13, 17, 14, 13, 16],
        type: 'scatter',
        name: '現場點餐'
    };

    var trace6 = {
        x: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUNE', 'JULY', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        y: [26, 20, 34, 26, 22, 30, 30, 31, 37, 27, 33, 31],
        type: 'scatter',
        name: '銷售總額'
    };
    var data3 = [trace4, trace5, trace6];
    console.log(detail);
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
            {period == 1 && <div className='Detail0'>
                <div className='Detail1'>
                    <div className='Tprices'>
                        <div className='Tpricet'>消費總額</div>
                        <div className='Tprice' style={{ color: '#f17014' }}>$2985</div>
                    </div>
                    <hr className='detailhr'></hr>
                    <div className='Tprices'>
                        <div className='Tpricet' style={{ fontSize: '18px', fontWeight: '400' }}>+ 現場點餐</div>
                        <div className='Tprice' style={{ fontSize: '18px', fontWeight: '400' }}>$2625</div>
                    </div>
                    <div className='Tprices'>
                        <div className='Tpricet' style={{ fontSize: '15px', fontWeight: '400' }}>外帶</div>
                        <div className='Tprice' style={{ fontSize: '15px', fontWeight: '400' }}>$1640</div>
                    </div>
                    <div className='Tprices'>
                        <div className='Tpricet' style={{ fontSize: '15px', fontWeight: '400' }}>內用</div>
                        <div className='Tprice' style={{ fontSize: '15px', fontWeight: '400' }}>$985</div>
                    </div>
                    <div className='Tprices'>
                        <div className='Tpricet' style={{ fontSize: '18px', fontWeight: '400' }}>+ 預定快取</div>
                        <div className='Tprice' style={{ fontSize: '18px', fontWeight: '400' }}>$425</div>
                    </div>
                    <hr className='detailhr'></hr>
                    <div className='Tprice' style={{ marginRight: '15px' }}>$3050</div>
                    <div className='Tprices'>
                        <div className='Tpricet' style={{ fontSize: '18px', fontWeight: '400' }}>- 棄單</div>
                        <div className='Tprice' style={{ fontSize: '18px', fontWeight: '400' }}>$65</div>
                    </div>
                </div>
                <div className='Detail2-5'>
                    <div className='Detail2'>
                        <div className='Tprices' style={{ margin: '25px' }}>
                            <div className='Tpricet'>訂單數量</div>
                            <div className='Tprice' style={{ color: '#f17014' }}>#57</div>
                        </div>
                        <div className='Ordernum'>
                            <div style={{ fontSize: '17px' }}>外帶 #31</div>
                            <div style={{ fontSize: '17px' }}>內用 #19</div>
                            <div style={{ fontSize: '17px' }}>預約快取 #7</div>
                        </div>
                    </div>
                    <div className='Detail3'>
                        <div className='Tprices' style={{ width: '100%', position: 'absolute', zIndex: '99' }}>
                            <div className='Tpricet' style={{ marginLeft: '25px', marginTop: '10px' }}>總額占比</div>
                        </div>
                        <Plot data={data1} layout={{ width: 325, height: 325, annotations: [{ showarrow: false, text: '$3050' }], showlegend: false }} />
                    </div>
                </div>
            </div>}
            {period == 2 && <div className='Detail'>
                <div className='Tprices' style={{ width: '100%', position: 'absolute', zIndex: '99' }}>
                    <div className='Tpricet' style={{ marginLeft: '25px', marginTop: '10px' }}>週銷售情況</div>
                </div>
                <Plot data={data2} layout={{ width: 900, height: 500 }} />
            </div>}
            {period == 3 && <div className='Detail'>
                <div className='Tprices' style={{ width: '100%', position: 'absolute', zIndex: '99' }}>
                    <div className='Tpricet' style={{ marginLeft: '25px', marginTop: '10px' }}>月銷售情況</div>
                </div>
                <Plot data={data3} layout={{ width: 900, height: 500 }} />
            </div>}
        </React.Fragment>
    )
}
export default Turnover;