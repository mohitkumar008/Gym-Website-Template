const express = require('express');
const path = require("path");
const fs = require("fs");

const app = express();
const port = 80;

//EXPRESS RELATED STUFF
app.use('/static', express.static('static'))  //for using static files
//app.use(express.urlencoded());
app.use(express.urlencoded({extended: true})); 

// PUG RELATED STUFF
app.set('view engine', 'pug')  //set the template engine as pug
app.set('views', path.join(__dirname, 'views'))  //set the views directory

//ENDPOINTS
app.get('/', (req, res)=>{
    const gymForm = {'Message': 'Your Form has been subbmitted successfully'}
    res.status(200).render('index.pug', gymForm);
});
app.post('/', (req, res)=>{
    names = req.body.name
    age = req.body.age
    gender = req.body.gender
    mobile = req.body.mobile

    let gymUserDetails = `
    {Name: ${names}
    Age: ${age}
    Gender: ${gender}
    Mobile No.: ${mobile}}
    `

    fs.writeFileSync('userDetails.txt', gymUserDetails)

    const gymForm = {'Message': 'Your Form has been subbmitted successfully'}
    res.status(200).render('index.pug', gymForm);
});

//SERVER START
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});