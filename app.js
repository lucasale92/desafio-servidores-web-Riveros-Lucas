const express = require('express')
const ProductManager = require('./productManager.js');
const container = new ProductManager('./productos.json');

const app = express();
const PORT = 8080

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen( PORT,() =>{
    console.log(`listening on ${PORT}`)
})

app.get('/products', async (req, res) =>{
    const limit = req.query.limit;
    const products = container.getProducts();
    if (limit){
        res.json (products.slice(0, limit));
    } else {
        res.json(products);
    }
})

app.get('/products/id', async (req, res) =>{
    const id = container.getProductsById(parseInt(id));
    if (product) {
        res.json(products);
    } else{
        res.json({error:"product not found"});
    }
})
