const express=require("express")
const https=require("https")
const app=express()
const bodyParser=require("body-parser")
app.use(bodyParser.urlencoded({extended:true}))
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

app.post("/",(req,res)=>{
    const cityName=req.body.city;
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=ba26ea29af4911b2dcb74b0d56ad793f&units=metric`
    https.get(url,(response)=>{
        response.on("data",(data)=>{
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp;
            const weatherDescription=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon
            const imageUrl= `http://openweathermap.org/img/wn/${icon}@2x.png`
            res.write(`<h1>Current Temperature of ${cityName} is ${temp} degree cel</h1>`)
            res.write(`<p>The weather is currently ${weatherDescription}</p>`)
            res.write(`<img src=${imageUrl}>`)
            res.send();
        })
    })
})

app.listen(process.env.PORT || 3000,()=>{
    console.log("Server started at 3000");
})