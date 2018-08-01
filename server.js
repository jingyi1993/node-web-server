const express = require('express');
//handlebars;
const hbs = require('hbs');
const fs =require('fs');
const port = process.env.PORT || 3000;



var app = express();

hbs.registerPartials(__dirname +'/views/partials');

//1st argument the functionName, 2nd argument the function;
hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getTime();
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();

});

app.set('view engine:','hbs');

app.use(express.static(__dirname + '/public'));
// console.log(__dirname);
//middleware


app.use((req, res, next)=>{
    var now = new Date().toString();
    // console.log(`${now}:${req.method},${req.url}`);
    var log= `${now}: ${req.method}, ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log +'\n', (e)=>{
        if(e){
            console.log('unable to append file!!!')
        }
    });
        next();
});
// middleware
// app.use((req,res,next)=>{
//     res.render('maintance.hbs');
//     next();
// });

app.get('/', (req, res )=>{
    // res.send('<h1>hihihihi</h1>')
    res.render('home.hbs',
        {pageTitle: 'home page',
            welcomeMesssage: 'welcome to this page',
        }
    )
});

app.get('/about', (req,res)=>{
    // res.send('about page~~~')
    //eject the dynamic data to html
    res.render('about.hbs', {
        pageTitle:'about page',
        //return year

    });
});

app.get('/projects',(req,res)=>{
    res.render('projects.hbs',{
        pageTitle:'Projects',
    })
});

app.get('/bad', (req,res)=>{
    res.send({
        errorMessasge: 'unable to handler request',
    })
});




app.listen(port,()=>{
    console.log(`server is on port ${port}`)
});
