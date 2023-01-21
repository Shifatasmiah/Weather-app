
const path=require('path')// build in node module
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const cors=require('cors')

const app= express() // express ekta function but eta kono argument nai, eta server k various method provide kore application er madhhome.
const  viewsPath=path.join(__dirname,'../templates/views')
const publicdirectoryPath=path.join(__dirname,'../public')
const partialsPath=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)

hbs.registerPartials(partialsPath)

app.use(cors())
app.use(express.static(publicdirectoryPath)) 

 app.get('',(req,res)=>{
     res.render('index',{
title:'Weather App',
name:'Tisha'
     })
 })


 app.get('/about',(req,res)=>{
     res.render('about',{
         title:'About me',
         name:'Tisha'
     })
 })


 app.get('/help',(req,res)=>{
     res.render('help',{
         title:'Help',
         helpText:'this is the helpful text',
         name:'Tisha'
     })
 })

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address.'
        })
    }
geocode(req.query.address,(error,{latitude,longitude,location}={})=>{  // destructure kora hoise object property k ,object property undefined show korbe ,mane latitude,longitude na thakleo pprogram run hobe crashed korbe na
    if(error){
        return res.send({error})
    }
    
    
   forecast(latitude,longitude,(error,forecastData)=>{
       if(error){
           return res.send({error})
       }

       res.send({
           forecast:forecastData,
           location,
           address:req.query.address
       })
   })
})


// res.send({
//     forecast:'50 degree',
//     location: 'Boston',
//     address:req.query.address
// })
})

// app.get('/products',(req,res)=>{
//     if(!req.query.search){
//     return res.send({                   // two respond hole error dekhabe. ekta request er jonno two respond hole error dekhay .http request ekta single request and ekta respond back kore
//            // tai akhne return use hoise.return function tar execution off kore and nicher respond tokhn run hoy na.
//         error:'You must provide a search term'
//     })
//     }
    
    
//     console.log(req.query)    // query sting request object er property query also an object and eta query property k hold kore. 

//     console.log(req.query.search) // search ekta query er particular value er outut asbe 'games'
//     res.send({
//     products:[]
// })
// })

app.get('/help/*',(req,res)=>{   // first '/help/*' eta hocce url e ja dea hobe root er pore 
    res.render('404',{   //but render e '404' mane oi url e gele kon page ta asbe seta dekhabe tao 404 page er name ta dea hoise extension chara.
        title:'404',
        name:'Tisha',
        errorMessage:'Help article not found '
    })
    })

//404 page er jonno * eta sobar last e dite hobe get e,nahole match khuje abe na

// 404 page ekta html file er moto eta partial na tai eta view te create korte hobe 
app.get('*',(req,res)=>{
res.render('404',{
    title:'404',
    name:'Tisha',
    errorMessage:'Page not found'
})
})



//app.com         // domain for home page .eta main root route
//app.com/help     // help route
//app.com/about


app.listen(3000,()=>{
    console.log('server is up on port 3000.')
}) // server  start hoy , ekta specific port thake server r jonno.
//http website er jonno port thake deafult 80.