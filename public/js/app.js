

console.log('client site')

// getting the data inside the client side javascript we use fetch.
// fetch is not a art of javascript , it is a browser based API ,eta accessible oy node.js e.
// server mane node.js file run kore j data pawa ese seta client side e niye aste hobe .

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//    response.json().then((data)=>{
//        console.log(data)
//    })
// })

//fetch use kore function ekta time e future e call hobe ,jokhn data avilable hobe tokhn function ta run hobe 



//input and search e keu click korle ki submit hobe seta define korte javascript e age html er oi element gula select korte hobe then operation korte hobe.

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne= document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')




weatherForm.addEventListener('submit',(event)=>{  // addeventlistener er first argument hocce name of the event, and second argument hocce event call hole ki kaj hobe seta define kora thakbe call back function e
 event.preventDefault()       //  event object . event object er upor method apply hoise preventdefault. eta default behaviour k prevent kore. tai browser e testing likha ta hold kore rakhe refresh kore dey na
 const location=search.value
   
        messageOne.textContent= 'Loading...'
        messageTwo.textContent=''

      
  //     
   
 
 
    fetch('https://weather-app-4ykn.onrender.com/weather?address='+location).then((response)=>{
       response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error
        }
        else{
          
            messageOne.textContent= data.location
            messageTwo.textContent=data.forecast
         
        
        }
       })
    })



})