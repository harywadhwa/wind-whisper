const express = require("express");
const app = express();
const https = require("https");
const bodyParse = require("body-parser");

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.use(bodyParse.urlencoded({extended: true}));  


app.post("/", function(req, res){
const cityName = req.body.cityName;
const key = "b1113e296b9a233eb09b8ca87cdb4d94";
const unit= "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=" + key + "&units=" + unit;
https.get(url, function(response){
console.log(response.statusCode);

response.on("data", function(data){
    const weatherData = JSON.parse(data)
    const temp = weatherData.main.temp
    const icon = weatherData.weather[0].icon
    const imgUrl = "https://openweathermap.org/img/wn/" + icon +"@2x.png"
    res.write("<h1>The temperature in the city is " + temp + " degrees celcius</h1>");
    res.write("<img src=" + imgUrl + ">");
    res.send()
})
})
})

app.listen(3000, function(){
    console.log("server is running on port https://localhost:3000");
});