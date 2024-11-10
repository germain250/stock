// stockController.js
const eventBus = require('../services/eventBus');
const StockIn = require('../models/StockIn');
const StockOut = require('../models/StockOut');
const Product = require('../models/Product');

// Stock In Creation
async function createStockIn(req, res) {
    try {
        const { productId, quantity, userId } = req.body;
        const stockIn = new StockIn({ product: productId, quantity, addedBy: userId });
        
        await stockIn.save(); // Pre-save hook adjusts stock
        const product = await Product.findById(productId);

        eventBus.emit('stockInCreate', { product: product.name, quantity, user: userId });
        checkLowStock(product); // Emit lowStock event if necessary

        res.status(201).json({ message: 'Stock in created successfully', stockIn });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Stock In Update
async function updateStockIn(req, res) {
    try {
        const { stockInId } = req.params;
        const { quantity } = req.body;
        const stockIn = await StockIn.findByIdAndUpdate(stockInId, { quantity }, { new: true });

        if (!stockIn) throw new Error('Stock in record not found');

        const product = await Product.findById(stockIn.product);
        eventBus.emit('stockInUpdate', { product: product.name, quantity, user: stockIn.addedBy });
        checkLowStock(product);

        res.status(200).json({ message: 'Stock in updated successfully', stockIn });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Stock In Deletion
async function deleteStockIn(req, res) {
    try {
        const { stockInId } = req.params;
        const stockIn = await StockIn.findByIdAndDelete(stockInId);

        if (!stockIn) throw new Error('Stock in record not found');

        const product = await Product.findById(stockIn.product);
        eventBus.emit('stockInDelete', { product: product.name, quantity: stockIn.quantity, user: stockIn.addedBy });
        checkLowStock(product);

        res.status(200).json({ message: 'Stock in deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Stock Out Creation
async function createStockOut(req, res) {
    try {
        const { productId, quantity, userId } = req.body;
        const stockOut = new StockOut({ product: productId, quantity, removedBy: userId });

        await stockOut.save(); // Pre-save hook adjusts stock
        const product = await Product.findById(productId);

        eventBus.emit('stockOutCreate', { product: product.name, quantity, user: userId });
        checkLowStock(product);

        res.status(201).json({ message: 'Stock out created successfully', stockOut });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Stock Out Update
async function updateStockOut(req, res) {
    try {
        const { stockOutId } = req.params;
        const { quantity } = req.body;
        const stockOut = await StockOut.findByIdAndUpdate(stockOutId, { quantity }, { new: true });

        if (!stockOut) throw new Error('Stock out record not found');

        const product = await Product.findById(stockOut.product);
        eventBus.emit('stockOutUpdate', { product: product.name, quantity, user: stockOut.removedBy });
        checkLowStock(product);

        res.status(200).json({ message: 'Stock out updated successfully', stockOut });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Stock Out Deletion
async function deleteStockOut(req, res) {
    try {
        const { stockOutId } = req.params;
        const stockOut = await StockOut.findByIdAndDelete(stockOutId);

        if (!stockOut) throw new Error('Stock out record not found');

        const product = await Product.findById(stockOut.product);
        eventBus.emit('stockOutDelete', { product: product.name, quantity: stockOut.quantity, user: stockOut.removedBy });
        checkLowStock(product);

        res.status(200).json({ message: 'Stock out deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Helper function to emit lowStock event
function checkLowStock(product) {
    if (product.stockQuantity < 10) {
        eventBus.emit('lowStock', product);
    }
}

module.exports = { createStockIn, updateStockIn, deleteStockIn, createStockOut, updateStockOut, deleteStockOut };
