const mongoose = require("mongoose");

//!! it is the databse schema where we put two field, name and phone
//! and database name is contactSchema.
const contactSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});

//? here we calling the collection of database ,
//? So collection name is Contact in database. 

const Contact = mongoose.model('Contact', contactSchema);

//! export the contact module here because we can use this file in our app.js.
module.exports = Contact;