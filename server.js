const express = require('express');
const mongoose = require('mongoose');
const UsersData = require('./model');

const app = express();

app.use(express.json());

mongoose.connect('mongodb+srv://praveen:<my_password>@cluster0.lb4dxtr.mongodb.net/test').then( 
()=> console.log('connetd to db..')
).catch(err => console.log(err))


app.post('/add_user',async (req,res) => {
    const {username} = req.body;
    const {email} = req.body;
    try{
        const newData = new UsersData({username,email});
        await newData.save();
        return res.json(await UsersData.find())
    }
    catch(err){
        console.log(err.message);
    }
})

app.put('/update/:id', async (req, res) => {
    const { username} = req.body;
    const {email} = req.body;

    try {
        await UsersData.findByIdAndUpdate(
            req.params.id,
            { username, email },
            { new: true }   
        );

        return res.json(await UsersData.find());
    }
    catch (err) {
        console.log(err.message);
    }
});


app.get('/get_all_data', async (req,res)=>{
    try{
        const allData = await UsersData.find();
        return res.json(allData);
    }
    catch(err){
        console.log(err.message);

    }
})
app.get('/get_data/:id', async (req,res)=>{
    try{
        const Data = await UsersData.findById(req.params.id);
        return res.json(Data);
    }
    catch(err){
        console.log(err.message);

    }
})

app.delete('/delete/:id', async (req,res) => {
    try{
        await UsersData.findByIdAndDelete(req.params.id);
        return res.json( await UsersData.find())
    }
    catch (err){
        console.log(err.message)
    }
})



app.listen(3000,()=>console.log('server running....'))