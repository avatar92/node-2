const express = require('express'); 
const hbs = require('hbs')
const path=require('path')
const fs= require('fs')
var app=express();

hbs.registerPartials(path.join(__dirname, 'views/partials'))
app.set('view engine','hbs') 
app.use((req,res,next)=>{
  var now = new Date().toString();
  var log=`${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log',log+'\n',(err)=>{
    if (err){
      console.log('unable to connect to server.log')
    }
  });
  next();
});

// app.use((req,res,next)=>{
//   res.render('maintenance.hbs')
// })
app.use(express.static(path.join(__dirname , "/public")));

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
})
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
})
app.get('/',(req,res)=>{
  // res.send('<h1>hello Express<h1>!')
  res.render('home.hbs',{
    pageTitle:'Home Page',
    welcomeMessage:'Welcome'
  })
}); 
app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About Page'
  }
  );
});
app.get('/bad',(req,res)=>{
  res.send(
    {
      errorMessage:'unable to fulfill the request',
    }
  )
});

app.listen(3000,()=>{
  console.log('server is running in port 3000')
}); 