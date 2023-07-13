const mongoose = require("mongoose");


//todo: Connection creation and create a new db.

mongoose.connect('mongodb://0.0.0.0:27017/contact');

//? acquire the connection to check if it is successful 
const db = mongoose.connection;

//! checking error.
db.on("error", console.error.bind(console, "error connecting to db"));

//! up and running then print the message.
db.once('open', function(){
  console.log("DB Connected Successfully");
});

