const express=require('express');
const fs=require('fs');
const path=require("path");

//add mongoose
const mongoose = require('mongoose');
const { text } = require('express');

const bodyparser=require('body-parser')
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost/contactDance'); //Database name contactDance
}

//define mongoose schema

const contactSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    email: String,
    address: String,
    concern: String
  });

const contact = mongoose.model('contactcoll', contactSchema); //contact collections

const app=express();
const port=80;


//Express Specific Stuff

app.use('/static',express.static('static'))  //for serving static files
app.use(express.urlencoded())

//Pug Specific Stuff
app.set('view engine','pug') //Set the template engine as pug
app.set('views',path.join(__dirname,'views')) //Set the views directory

//EndPoints
app.get('/',(req,res)=>{
    const params={'title':'Dance Website'}
    res.status(200).render('home.pug',params)
})

app.get('/contact',(req,res)=>{
    const params={'title':'Dance Website'}
    res.status(200).render('contact.pug',params)
})

app.post('/contact',(req,res)=>{
    var myData=new contact(req.body)
    myData.save().then(()=>{
        res.send("Item has been saved to database")
    }).catch(()=>{
        res.status(400).send("Item was not send to the database")
    })
});

//Start the Server
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`);
})