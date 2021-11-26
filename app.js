const express = require('express');
const ejs = require('ejs')
const app = express();
const path = require("path")
const requests =require('requests')



app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))


  cityName = 'Mumbai'
app.get('/',(req,res)=>{
requests('https://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=d396d8030cc2be51bfd84bb05272ef59')


.on('data',(chunk)=>{
  const objData = JSON.parse(chunk);
  const arrData =[objData]
 temperature=Math.floor((arrData[0].main.temp)-273.15)
 temperatureMin=Math.floor((arrData[0].main.temp_min)-273.15)
 temperatureMax=Math.floor((arrData[0].main.temp_max)-273.15)
 weather = arrData[0].weather[0].main
  console.log(arrData[0])
  res.render('weather.ejs')
})

.on('end',()=>{
  res.end();
})

})


app.listen(80,()=>{
    console.log("running")
})