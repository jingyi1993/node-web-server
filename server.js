const express = require('express');
//handlebars;
const hbs = require('hbs');

var app = express();

app.set('view engine:','hbs');

app.use(express.static(__dirname + '/public'));
// console.log(__dirname);

app.get('/', (req, res )=>{
    // res.send('<h1>hihihihi</h1>')
    res.render('home.hbs',
        {pageTitle: 'home page',
            welcomeMesssage: 'welcome to this page',
            currentYear: new Date().getFullYear(),
        }
    )
});

app.get('/about', (req,res)=>{
    // res.send('about page~~~')
    //eject the dynamic data to html
    res.render('about.hbs', {
        pageTitle:'about page',
        //return year
        currentYear: new Date().getFullYear(),

    });
});

app.get('/bad', (req,res)=>{
    res.send({
        errorMessasge: 'unable to handler request',
    })
})

app.listen(3000,()=>{
    console.log('server is on on port 3000')
});
