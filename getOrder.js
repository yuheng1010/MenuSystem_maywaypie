const pool = require('./db');
const router = require('express').Router();

router.get("/getCookingOrder", async function (req, res) {
    const [result] = await pool.query("SELECT * FROM food_order WHERE status = 0")
    res.send(result)
    let date = new Date(result[2].datetime)
    date = date.toString().split(10,1)
    console.log(result[2].datetime)
    console.log(date)
})

module.exports = router;

