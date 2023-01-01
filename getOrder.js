const { query } = require('./db');
const pool = require('./db');
const router = require('express').Router();

//拿今天製作中的訂單
router.get("/getCookingOrder", async function (req, res) {
    var today=new Date();
    today = today.toISOString().substring(0,10);
    const [result] = await pool.query("SELECT * FROM food_order WHERE status = 0 AND SUBSTR(`datetime`,1,10)=?",today)
    res.send(result)
    // let date = new Date(result[2].datetime)
    // date = date.toString().split(10,1)[0] //切成Thu Dec 29 2022 16:02:30 GMT+0800 (台北標準時間)的格式
    // console.log(date)
})

//拿今天已完成的訂單
router.get("/getFinishOrder", async function (req, res) {
    var today=new Date();
    today = today.toISOString().substring(0,10);
    const [result] = await pool.query("SELECT * FROM food_order WHERE status = 1 AND SUBSTR(`datetime`,1,10)=?",today)
    res.send(result)
})

//今天棄單
router.get("/getCancelOrder", async function (req, res) {
    var today=new Date();
    today = today.toISOString().substring(0,10);
    const [result] = await pool.query("SELECT * FROM food_order WHERE status = -1 AND SUBSTR(`datetime`,1,10)=?",today)
    res.send(result)
})

//取得今天的銷售狀況
router.get("/getTodayOrder",async function (req, res){
    var today=new Date();
    today = today.toISOString().substring(0,10);
    const [dineIn] = await pool.query("SELECT SUM(totalPrice) AS total,COUNT(id) AS num FROM food_order  WHERE dineWays = ? AND SUBSTR(`datetime`,1,10)= ?",[3,today]);
    const [dineOut] = await pool.query("SELECT SUM(totalPrice) AS total,COUNT(id) AS num FROM food_order  WHERE dineWays = ? AND SUBSTR(`datetime`,1,10)= ?",[2,today]);
    const [quick] = await pool.query("SELECT SUM(totalPrice) AS total,COUNT(id) AS num FROM food_order  WHERE dineWays = ? AND SUBSTR(`datetime`,1,10)= ?",[1,today]);
    const [cancel] = await pool.query("SELECT SUM(totalPrice) AS total,COUNT(id) AS num FROM food_order  WHERE status = ? AND SUBSTR(`datetime`,1,10)= ?",[-1,today]);
    // const [result] = await pool.query('SELECT * FROM food_order WHERE SUBSTR(`datetime`,1,10)=?',today)

    res.send({
        dineInTotal:dineIn[0].total,
        dineInNum:dineIn[0].num,
        dineOutTotal:dineOut[0].total,
        dineOutNum:dineOut[0].num,
        quickTotal:quick[0].total,
        quickNum:quick[0].num,
        cancelTotal:cancel[0].total
    })
})

//取一整週的銷售狀況
router.get("/getWeekOrder",async function (req,res){
    var lastWeeek= new Date();
    lastWeeek.setDate(lastWeeek.getDate()-7)
    // console.log(lastWeeek)
    const [total] = await pool.query("SELECT (SUBSTR(`datetime`,1,10)) AS `date`,COUNT(id) AS num FROM food_order WHERE `datetime` BETWEEN ? AND ? GROUP BY(SUBSTR(`datetime`,1,10))",[3,lastWeeek,new Date()])
    const [live] = await pool.query("SELECT (SUBSTR(`datetime`,1,10)) AS `date`,COUNT(id) AS num FROM food_order WHERE dineWays=? OR dineWays=? AND `datetime` BETWEEN ? AND ? GROUP BY(SUBSTR(`datetime`,1,10))",[3,2,lastWeeek,new Date()])
    const [quick] = await pool.query("SELECT (SUBSTR(`datetime`,1,10)) AS `date`,COUNT(id) AS num FROM food_order WHERE dineWays=? AND `datetime` BETWEEN ? AND ? GROUP BY(SUBSTR(`datetime`,1,10))",[1,lastWeeek,new Date()])
    res.send({
        live:live,
        quick:quick,
        total:total
    })
})

//取一整月的銷售狀況
router.get("/getMonthOrder",async function (req,res){
    var lastMonth= new Date();
    lastMonth.setMonth(lastMonth.getMonth()-1)
    console.log(lastMonth)
    const [total] = await pool.query("SELECT (SUBSTR(`datetime`,1,10)) AS `date`, COUNT(id) AS num FROM food_order WHERE `datetime` BETWEEN ? AND ? GROUP BY(SUBSTR(`datetime`,1,10))",[3,lastMonth,new Date()])
    const [live] = await pool.query("SELECT (SUBSTR(`datetime`,1,10)) AS `date`, COUNT(id) AS num FROM food_order WHERE dineWays=? OR dineWays=? AND `datetime` BETWEEN ? AND ? GROUP BY(SUBSTR(`datetime`,1,10))",[3,2,lastMonth,new Date()])
    const [quick] = await pool.query("SELECT (SUBSTR(`datetime`,1,10)) AS `date`, COUNT(id) AS num FROM food_order WHERE dineWays=? AND `datetime` BETWEEN ? AND ? GROUP BY(SUBSTR(`datetime`,1,10))",[1,lastMonth,new Date()])
    // const [result] = await pool.query("SELECT (SUBSTR(`datetime`,1,10)) AS `date`,COUNT(id) AS num FROM food_order WHERE dineWays=1 AND `datetime` BETWEEN ? AND ? GROUP BY(SUBSTR(`datetime`,1,10))",[lastMonth,new Date()])
    res.send({
        total:total,
        live:live,
        quick:quick
    })
})

//今天各品項
router.get("/getTodayUnitOrder",async function (req,res){
    var today=new Date();
    today = today.toISOString().substring(0,10);
    const [result] = await pool.query("SELECT id,food_name FROM food_order WHERE SUBSTR(`datetime`,1,10)=?",today)
    let danbin = 0;
    let toast = 0;
    let other = 0 ;
    let noodle = 0;
    let drink = 0;
    let hamburger = 0;
    for(var i=0;i<result.length;i++){
        for(var j=0; j<JSON.parse(result[0].food_name).length;j++){
            if(JSON.parse(result[0].food_name)[j].includes("蛋餅")){
                danbin++;
            }else if(JSON.parse(result[0].food_name)[j].includes("吐司")){
                toast++;
            }else if(JSON.parse(result[0].food_name)[j].includes("鐵板麵")){
                noodle++;
            }else if(JSON.parse(result[0].food_name)[j].includes("飲料")){
                drink++;
            }else if(JSON.parse(result[0].food_name)[j].includes("堡")){
                hamburger++;
            }else{
                other++;
            }
        }
        
    }
    res.send({
        danbin:danbin,
        toast:toast,
        noodle:noodle,
        drink:drink,
        hamburger:hamburger,
        other:other
    })
})

//本週各品項
router.get("/getWeekUnitOrder",async function (req,res){
    var lastWeek= new Date();
    lastWeek.setDate(lastWeek.getDate()-7)
    const [result] = await pool.query("SELECT id,food_name FROM food_order WHERE `datetime` BETWEEN ? AND ?",[lastWeek,new Date()])
    let danbin = 0;
    let toast = 0;
    let other = 0 ;
    let noodle = 0;
    let drink = 0;
    let hamburger = 0;
    for(var i=0;i<result.length;i++){
        for(var j=0; j<JSON.parse(result[0].food_name).length;j++){
            if(JSON.parse(result[0].food_name)[j].includes("蛋餅")){
                danbin++;
            }else if(JSON.parse(result[0].food_name)[j].includes("吐司")){
                toast++;
            }else if(JSON.parse(result[0].food_name)[j].includes("鐵板麵")){
                noodle++;
            }else if(JSON.parse(result[0].food_name)[j].includes("飲料")){
                drink++;
            }else if(JSON.parse(result[0].food_name)[j].includes("堡")){
                hamburger++;
            }else{
                other++;
            }
        }
        
    }
    res.send({
        danbin:danbin,
        toast:toast,
        noodle:noodle,
        drink:drink,
        hamburger:hamburger,
        other:other
    })
})

//本月各品項
router.get("/getMonthUnitOrder",async function (req,res){
    var lastMonth= new Date();
    lastMonth.setMonth(lastMonth.getMonth()-1)
    const [result] = await pool.query("SELECT id,food_name FROM food_order WHERE `datetime` BETWEEN ? AND ?",[lastMonth,new Date()])
    let danbin = 0;
    let toast = 0;
    let other = 0 ;
    let noodle = 0;
    let drink = 0;
    let hamburger = 0;
    for(var i=0;i<result.length;i++){
        for(var j=0; j<JSON.parse(result[0].food_name).length;j++){
            if(JSON.parse(result[0].food_name)[j].includes("蛋餅")){
                danbin++;
            }else if(JSON.parse(result[0].food_name)[j].includes("吐司")){
                toast++;
            }else if(JSON.parse(result[0].food_name)[j].includes("鐵板麵")){
                noodle++;
            }else if(JSON.parse(result[0].food_name)[j].includes("飲料")){
                drink++;
            }else if(JSON.parse(result[0].food_name)[j].includes("堡")){
                hamburger++;
            }else{
                other++;
            }
        }
        
    }
    res.send({
        danbin:danbin,
        toast:toast,
        noodle:noodle,
        drink:drink,
        hamburger:hamburger,
        other:other
    })
})


module.exports = router;

