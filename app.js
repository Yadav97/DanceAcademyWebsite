const express = require("express");
const path = require("path");
// const fs = require("fs"); no need in this project, we use in gym website to put the data of form in file

// const bodyparser = require("body-parser");
// if you want to ppost the data using express we need to install this module because
//it Parses the incoming request bodies in a middleware before your handlers, available under the req.body property.
// currently in this project we did not use the body-parser module

// importing the mongoose 
const mongoose = require('mongoose');

const app = express();
const port = 8000;


// ----------------------MONGODB STUFF --------------------------------

// connecting to the database called "ContactFormDB" here this DB is not exist so it creates automaticallu
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ContactFormDB');
  console.log("hence we connected ")

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// define the schema for database
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    addr: String,
    concern: String,

  });

//   compile this schema to model so that actual collection is made by calling the constructor of model class which creates the document of with properties and behaviors as declared in our schema. 

const contact = mongoose.model('contactCollection', contactSchema);

// now create the post request and take the value from form and store in mongodb



// --------------------------------------------------------------




// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('staticfolder')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'viewsfolder')) // Set the views directory


// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.statusCode = 200;
    res.render('home.pug', params);
})

// contact us page
app.get("/contact",(req,res)=>{
    const params = {};
    res.statusCode = 200;
    res.render("contact.pug",params);
})

app.post("/contact",(req,res)=>{
    var mydata = new contact(req.body);
    // here now data is stored in mongodb in cntactcollection 
    // mydata.save();

    // but save() also return promise so we need to use then
    mydata.save().then(()=>{
        params = {succesMessage:"form has been submitted"};
        // res.send("contact.Fpug",params );
        res.status(200).render("contact.pug",params);

    }).catch(()=>{
        params = {failureMessage:"Error! form not Submitted"};
        res.statusCode = 404;
        // res.send("Error ! Form not Submitted") deprecated error 
        res.status(404).render("contact.pug",params);
        
    })


    // we make commecnt below code cause we again send status code and response(rendering the contact.pug) doubly 1st time in save() functiona nd 2nd time below this 
    // // res.statusCode = 200;
    // res.render("contact.pug");
})


// signup page

app.get("/signup",(req,res)=>{
    const params = {};
    res.statusCode = 200;
    res.render("signup.pug",params);
})


// put the data into mongodb using mongoose library
// 1.run a mongod process 2.install mongoose for this project in the package.json filr





// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port  ==> ${port}`);
});