const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');
const StockIn = require('../models/StockIn');
const StockOut = require('../models/StockOut');
const User = require('../models/User');

const getOverview = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user.id); // Ensure ObjectId type

        // 1. Total Product Count
        const totalProducts = await Product.countDocuments({ createdBy: userId });

        // 2. Total Stock Quantity
        const totalStockQuantityResult = await Product.aggregate([
            { $match: { createdBy: userId } },
            { $group: { _id: null, totalQuantity: { $sum: '$stockQuantity' } } }
        ]);
        const totalStockQuantity = totalStockQuantityResult.length > 0 ? totalStockQuantityResult[0].totalQuantity : 0;

        // 3. Total StockIn Quantity
        const totalStockInResult = await StockIn.aggregate([
            { $match: { addedBy: userId } },
            { $group: { _id: null, totalStockIn: { $sum: '$quantity' } } }
        ]);
        const totalStockIn = totalStockInResult.length > 0 ? totalStockInResult[0].totalStockIn : 0;

        // 4. Total StockOut Quantity
        const totalStockOutResult = await StockOut.aggregate([
            { $match: { removedBy: userId } },
            { $group: { _id: null, totalStockOut: { $sum: '$quantity' } } }
        ]);
        const totalStockOut = totalStockOutResult.length > 0 ? totalStockOutResult[0].totalStockOut : 0;

        // 5. Category Count
        const totalCategories = await Category.countDocuments({ createdBy: userId });

        // 6. Products by Category
        const productsByCategory = await Product.aggregate([
            { $match: { createdBy: userId } },
            { $group: { _id: '$category', count: { $sum: 1 } } },
            {
                $lookup: {
                    from: 'categories',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'categoryDetails'
                }
            },
            {
                $project: {
                    category: { $arrayElemAt: ['$categoryDetails.name', 0] },
                    count: 1
                }
            }
        ]);

        // 7. Recent StockIn Activities
        const recentStockIn = await StockIn.find({ addedBy: userId }).sort({ date: -1 }).limit(5);

        // 8. Recent StockOut Activities
        const recentStockOut = await StockOut.find({ removedBy: userId }).sort({ date: -1 }).limit(5);

        // 9. Total Products with Low Stock
        const lowStockProducts = await Product.countDocuments({
            createdBy: userId,
            stockQuantity: { $lt: 10 }
        });

        // 10. Total Revenue
        const totalRevenueResult = await StockOut.aggregate([
            { $match: { removedBy: userId } },
            {
                $lookup: {
                    from: 'products',
                    localField: 'product',
                    foreignField: '_id',
                    as: 'productDetails'
                }
            },
            { $unwind: '$productDetails' },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: { $multiply: ['$quantity', '$productDetails.price'] } }
                }
            }
        ]);
        const totalRevenue = totalRevenueResult.length > 0 ? totalRevenueResult[0].totalRevenue : 0;

        // 11. Total Users (if applicable)
        const totalUsers = await User.countDocuments();

        // Prepare the overview object
        const overview = {
            totalProducts,
            totalStockQuantity,
            totalStockIn,
            totalStockOut,
            totalCategories,
            productsByCategory,
            recentStockIn,
            recentStockOut,
            lowStockProducts,
            totalRevenue,
            totalUsers
        };

        res.json(overview);
    } catch (error) {
        console.error('Error fetching overview:', error);
        res.status(500).json({ message: 'Failed to fetch overview', error: error.message });
    }
};

module.exports = { getOverview };
