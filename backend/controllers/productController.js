const Product = require("../models/Product");
const eventBus = require('../services/eventBus');


const getProductByIdMiddleWare = async(req,res, next) => {
    let product;
    try {
        product = await Product.findById(req.params.id);
        if(product == null) {
            return res.status(404).json({message: 'Product not found'})
        }
    } catch (error) {
        return res.status(500).json({message: error.message});        
    }
    res.product = product;
    next();
}
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(201).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });        
    }
}
const getProductById = async (req, res) => {
    res.json(res.product);
}
const addProduct = async (req, res) => {
    const product = new Product(
        {
            name: req.body.name,
            sku: req.body.sku.toUpperCase(),            
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            stockQuantity: req.body.stockQuantity
        }
    );
    try {
        const newProduct = await product.save();
        eventBus.emit('productCreated', newProduct);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
const updateProduct = async (req, res) => {
    const {name,sku,category,description,price,stockQuantity} = req.body;
    if (name!= null) {
        res.product.name = name;
    }
    if (sku!= null) {
        res.product.sku = sku.toUpperCase();
    }
    if (description!= null) {
        res.product.description = description;
    }
    if (price!= null) {
        res.product.price = price;
    }
    if (category!= null) {
        res.product.category = category;
    }
    if (stockQuantity!= null) {
        res.product.stockQuantity = stockQuantity;
    }
    try {
        const updatedProduct = await res.product.save();
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
const deleteProduct = async (req, res) => {
    try {
        await res.product.deleteOne();
        res.json({message: "Product deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}




module.exports = {
    getProductByIdMiddleWare,
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
     
}