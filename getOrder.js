const pool = require('./db');
const router = require('express').Router();

//拿製作中的訂單
router.get("/getCookingOrder", async function (req, res) {
    const [result] = await pool.query("SELECT * FROM food_order WHERE status = 0")
    res.send(result)
    
    let date = new Date(result[2].datetime)
    date = date.toString().split(10,1)[0] //切成Thu Dec 29 2022 16:02:30 GMT+0800 (台北標準時間)的格式
    console.log(date)
})

//拿已完成的訂單
router.get("/getFinishOrder", async function (req, res) {
    const [result] = await pool.query("SELECT * FROM food_order WHERE status = 1")
    res.send(result)
})

//棄單
router.get("/getCancelOrder", async function (req, res) {
    const [result] = await pool.query("SELECT * FROM food_order WHERE status = -1")
    res.send(result)
})

//取得今天的銷售狀況
router.get("/getTodayOrder",async function (req, res){
    var today=new Date();
    today = today.toISOString().substring(0,10);
    const [result] = await pool.query('SELECT * FROM food_order WHERE SUBSTR(`datetime`,1,10)=?',today)
    res.send(result)
})





module.exports = router;

