const express = require('express');
const ejs = require('ejs')
const app = express();
const path = require("path")
const requests =require('requests')
var bodyParser = require('body-parser');
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/static',express.static('static'));




app.get('/',(req,res)=>{


  res.render('index.ejs')

})




 
app.get('/weather',(req,res)=>{
 let cityName = req.query.cityName;
requests(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=d396d8030cc2be51bfd84bb05272ef59`)


.on('data',(chunk)=>{
  const objData = JSON.parse(chunk);
  const arrData =[objData]
 temperature=Math.floor((arrData[0].main.temp)-273.15)
 temperatureMin=Math.floor((arrData[0].main.temp_min)-273.15)
 temperatureMax=Math.floor((arrData[0].main.temp_max)-273.15)
 weather = arrData[0].weather[0].main
 country = arrData[0].sys.country
 city=cityName;
  console.log(arrData)
  res.render('weather.ejs')
})

.on('end',()=>{
  res.end();
})

})


app.listen(80,()=>{
    console.log("running")
})