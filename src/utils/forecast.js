const request=require('postman-request')
const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=7bf08cf8e888c131f2d85e4010772b42&query='+latitude +','+longitude +'&units=f&fbclid=IwAR1bjnyON00UjaVYVXmwazB20RVaVLQLTqRjmOF9aFtmTDsAX1rxWU49WPE'
    request({url,json:true},(error,{body})=>{
      if(error){
        callback('Unable to connect weather services.',undefined)}
        // callback(error,data) etar sathe match kore argument value dite hobe      }
      else if(body.error){
        callback('Unable to find forecast. Try again',undefined )
      }
      else{

        const temperature=body.current.temperature
        const feelslike=body.current.feelslike
        callback(undefined,body.current.weather_descriptions[0]+'. It is currently ' +temperature+ ' degress out. It feels like '+feelslike + ' degress out.'
        ) // callback er vitore argument value te const declare kora jabe na , and akhne console log lagbe na karon forecast calling er shomoy console.log(data) dea ace okhn thekei show hobe terminal e callback e sudhu responsegula dite hobe .
      }
    })
 }
 module.exports=forecast 