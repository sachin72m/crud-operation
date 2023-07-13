const express = require("express");
const app = express();

const db = require("./config/mongoose");
const Contact = require("./models/contact");

app.use(express.urlencoded({extended:true}));

app.use(express.json());

//todo: It is wrong code which I wrote , I think syntax is wrong.
// app.get("/", (req, res)=>{
//     const list = Contact.find();
//     res.send(list).then(() =>{
//         res.status(200);
//     }).catch((err) =>{
//         res.status(400).send(err);
//     });
//     res.send("Yes got it!!");
// });

//todo: After that I do using async await. 
//todo: here I can get all users data which is saved in db. (Working Fine.)

app.get("/data", async (req, res) =>{
    try {
        const contactData = await Contact.find();
        res.send(contactData);
    } catch (e) {
        res.send(e);
    };
});

//todo: get the individual data using id. (Working Fine.)
app.get("/data/:id", async(req, res) =>{
    try {
        const _id = req.params.id;
        // console.log(req.params.id);
        // res.send(req.params);
        const userData = await Contact.findById(_id);
        console.log(userData);
        if(!userData){
            return res.status(404).send();
        }else{
            res.send(userData);
        }
    } catch (error) {
        
    };
});


//todo: Here i delete the data by id. (Working Fine.)

app.delete("/data/:id", async(req, res) =>{
    try {
        const _id = req.params.id;
       const deleteData = await Contact.findByIdAndDelete(_id); //!!: You can write this way. 
        console.log(deleteData);
        if(!_id){
            return res.status(400).send();
        }else { 
        res.send(deleteData).json({message: "Deleted Successfully"});
        }
    } catch (error) {
        
    };
});

//!: This below put function reflect my data into database,
//!: But simultaneously it wil show the error also in console,
//!: Error gives because it's not in if-else correct format that's why. 
// app.put("/data/:id", async (req, res) =>{
//     try {
//         const _id = req.params.id;
//        const updateData = await Contact.findByIdAndUpdate(_id, req.body);
//        console.log(updateData);
//        res.send(updateData).json({message: "User Updated"});
//     } catch (error) {
//         // res.status(404).send(error);
//         res.send(error);
//     };
    
// });

//todo: This Put function working fine.

app.put("/data/:id", async (req, res) =>{
    try {
        const _id = req.params.id;
       const updateData = await Contact.findByIdAndUpdate(_id, req.body, {
        new:true });
       console.log(updateData);
      if(!_id){
            return res.status(400).send();
        }else { 
        res.send(updateData).json({message: "Updated Successfully"});
        }
    } catch (error) {
        
    };
});



//todo: Here I handle post request to add new user data. (Working Fine.)
app.post("/add", (req, res) =>{
      console.log(req.body);
    const user = new Contact(req.body);
    user.save().then(() =>{
        res.status(200);
    }).catch((err) =>{
        res.status(400).send(err);
    });
    res.send("User Added");
});





app.listen(8000, (req, res) =>{
    console.log(`Server is running on port`, 8000);
});