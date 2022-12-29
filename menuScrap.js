require('dotenv').config();

const axios = require('axios')
const pool = require('./db');

axios.get('https://tw.fd-api.com/api/v5/vendors/gbxx?include=menus,bundles,multiple_discounts&language_id=6&dynamic_pricing=0&opening_type=delivery&basket_currency=TWD&latitude=24.991108&longitude=121.565932')
    .then(async (response) => {
        var data = await (response.data.data.menus[0].menu_categories[5].products)
        // const conn = await pool.getConnection();
        // console.log(data)
        for(var i=0;i<data.length;i++){
            
            if((data[i]["images"][0])){
                console.log("name:"+data[i]["name"])
                console.log("img:"+Object.values(data[i]["images"][0])[0])
                console.log("----------------------------")
                await pool.query("INSERT INTO menu(`name`,category,img) VALUES (?,?,?)",[data[i]["name"], "漢堡",Object.values(data[i]["images"][0])[0]])
            }
        }
    })