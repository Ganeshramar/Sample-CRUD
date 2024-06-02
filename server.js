const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Product = require('./models/productModels');

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({extended: false}))

//routes
app.get('/',(req,res) => {
    res.send('Hello Node API')
})

app.get('/products', async(req,res) => {
    try{
        const product = await Product.find({});
        res.status(200).json(product);
    } catch(err){
        console.log(err.message);
        res.status(500).json({message: err.message});
    }
})

app.get('/products/:id', async(req,res) => {
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch(err){
        console.log(err.message);
        res.status(500).json({message: err.message});
    }
})

app.post('/products', async(req, res) => {
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product); 
    }catch(err){
        console.log(err.message);
        res.status(500).json({message: err.message});
    }
})

app.put('/products/:id', async(req,res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: `Cannot find a product with id ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch(err){
        console.log(err.message);
        res.status(500).json({message: err.message});
    }
})

app.delete('/products/:id', async(req,res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `Cannot find any product with id ${id}`})
        }
        res.status(200).json(product);
    } catch(err){
        console.log(err.message);
        res.status(500).json({message: err.message});
    }
})

mongoose.set("strictQuery",false);
mongoose.
connect('mongodb+srv://raguram:Panchu86800@cluster0.ilzd5bf.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('connected to MongoDB');
    app.listen(3000, ()=> {
        console.log('Node API is running port 3000')
    })
}).catch((err) => {
    console.log(err);
})