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
        fetch('http://localhost:7000/getWeekOrder')
        .then((result) => result.json())
        .then((res) => setDetail(res))
        .catch(error => window.alert(error))
        document.getElementById('week').style.backgroundColor = '#f17014';
        document.getElementById('week').style.color = '#ffffff';
        document.getElementById('today').style.backgroundColor = '#ffffff';
        document.getElementById('month').style.backgroundColor = '#ffffff';
        document.getElementById('today').style.color = '#000000';
        document.getElementById('month').style.color = '#000000';
    }
    var month = () => {
        setPeriod(3);
        fetch('http://localhost:7000/getMonthOrder')
        .then((result) => result.json())
        .then((res) => setDetail(res))
        .catch(error => window.alert(error))
        document.getElementById('month').style.backgroundColor = '#f17014';
        document.getElementById('month').style.color = '#ffffff';
        document.getElementById('week').style.backgroundColor = '#ffffff';
        document.getElementById('today').style.backgroundColor = '#ffffff';
        document.getElementById('week').style.color = '#000000';
        document.getElementById('today').style.color = '#000000';
    }
    //pie
    var data1 = [{
        values: [detail.dineOutTotal, detail.quickTotal, detail.dineInTotal],
        labels: ['外帶', '預定快取', '內用'],
        domain: { column: 0 },
        textinfo: 'label+percent',
        textposition: "outside",
        hole: .4,
        type: 'pie'
    }]
    //line for week
    var x1Arr = []
    for(var i=0;i<detail.quick?.length;i++){
        x1Arr.push(detail.quick[i].date)
    }
    var y1Arr = []
    for(var i=0;i<detail.quick?.length;i++){
        y1Arr.push(detail.quick[i].num)
    }
    var trace1 = {
        x: x1Arr,
        y: y1Arr,
        type: 'scatter',
        name: '預訂快取'
    };
    var x2Arr = []
    for(var i=0;i<detail.live?.length;i++){
        x2Arr.push(detail.live[i].date)
    }
    var y2Arr = []
    for(var i=0;i<detail.live?.length;i++){
        y2Arr.push(detail.live[i].num)
    }
    var trace2 = {
        x: x2Arr,
        y: y2Arr,
        type: 'scatter',
        name: '現場點餐'
    };
    var x3Arr = []
    for(var i=0;i<detail.total?.length;i++){
        x3Arr.push(detail.total[i].date)
    }
    var y3Arr = []
    for(var i=0;i<detail.total?.length;i++){
        y3Arr.push(detail.total[i].num)
    }
    var trace3 = {
        x: x3Arr,
        y: y3Arr,
        type: 'scatter',
        name: '銷售總數'
    };
    var data2 = [trace1, trace2, trace3];

    //line for month
    var x4Arr = []
    for(var i=0;i<detail.quick?.length;i++){
        x4Arr.push(detail.quick[i].date)
    }
    var y4Arr = []
    for(var i=0;i<detail.quick?.length;i++){
        y4Arr.push(detail.quick[i].num)
    }
    var trace4 = {
        x: x4Arr,
        y: y4Arr,
        type: 'scatter',
        name: '預訂快取'
    };

    var x5Arr = []
    for(var i=0;i<detail.live?.length;i++){
        x5Arr.push(detail.live[i].date)
    }
    var y5Arr = []
    for(var i=0;i<detail.live?.length;i++){
        y5Arr.push(detail.live[i].num)
    }
    var trace5 = {
        x: x5Arr,
        y: y5Arr,
        type: 'scatter',
        name: '現場點餐'
    };

    var x6Arr = []
    for(var i=0;i<detail.total?.length;i++){
        x6Arr.push(detail.total[i].date)
    }
    var y6Arr = []
    for(var i=0;i<detail.total?.length;i++){
        y6Arr.push(detail.total[i].num)
    }
    var trace6 = {
        x: x6Arr,
        y: y6Arr,
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
                        <div className='Tprice' style={{ color: '#f17014' }}>${detail.dineOutTotal+detail.dineInTotal+detail.quickTotal-detail.cancelTotal}</div>
                    </div>
                    <hr className='detailhr'></hr>
                    <div className='Tprices'>
                        <div className='Tpricet' style={{ fontSize: '18px', fontWeight: '400' }}>+ 現場點餐</div>
                        <div className='Tprice' style={{ fontSize: '18px', fontWeight: '400' }}>${detail.dineOutTotal+detail.dineInTotal}</div>
                    </div>
                    <div className='Tprices'>
                        <div className='Tpricet' style={{ fontSize: '15px', fontWeight: '400' }}>外帶</div>
                        <div className='Tprice' style={{ fontSize: '15px', fontWeight: '400' }}>${detail.dineOutTotal}</div>
                    </div>
                    <div className='Tprices'>
                        <div className='Tpricet' style={{ fontSize: '15px', fontWeight: '400' }}>內用</div>
                        <div className='Tprice' style={{ fontSize: '15px', fontWeight: '400' }}>${detail.dineInTotal}</div>
                    </div>
                    <div className='Tprices'>
                        <div className='Tpricet' style={{ fontSize: '18px', fontWeight: '400' }}>+ 預定快取</div>
                        <div className='Tprice' style={{ fontSize: '18px', fontWeight: '400' }}>${detail.quickTotal}</div>
                    </div>
                    <hr className='detailhr'></hr>
                    <div className='Tprice' style={{ marginRight: '15px' }}>${detail.dineOutTotal+detail.dineInTotal+detail.quickTotal}</div>
                    <div className='Tprices'>
                        <div className='Tpricet' style={{ fontSize: '18px', fontWeight: '400' }}>- 棄單</div>
                        <div className='Tprice' style={{ fontSize: '18px', fontWeight: '400' }}>${detail.cancelTotal}</div>
                    </div>
                </div>
                <div className='Detail2-5'>
                    <div className='Detail2'>
                        <div className='Tprices' style={{ margin: '25px' }}>
                            <div className='Tpricet'>訂單數量</div>
                            <div className='Tprice' style={{ color: '#f17014' }}>#{detail.dineOutNum + detail.dineInNum + detail.quickNum}</div>
                        </div>
                        <div className='Ordernum'>
                            <div style={{ fontSize: '17px' }}>外帶 #{detail.dineOutNum}</div>
                            <div style={{ fontSize: '17px' }}>內用 #{detail.dineInNum}</div>
                            <div style={{ fontSize: '17px' }}>預約快取 #{detail.quickNum}</div>
                        </div>
                    </div>
                    <div className='Detail3'>
                        <div className='Tprices' style={{ width: '100%', position: 'absolute', zIndex: '99' }}>
                            <div className='Tpricet' style={{ marginLeft: '25px', marginTop: '10px' }}>總額占比</div>
                        </div>
                        <Plot data={data1} layout={{ width: 325, height: 325, annotations: [{ showarrow: false, text: `$${detail.dineOutTotal + detail.dineInTotal + detail.quickTotal}` }], showlegend: false }} />
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