const Category = require('../models/Category')

const getCategoryByIdMiddleWare = async(req,res, next) => {
    let category;
    try {
        category = await Category.findById(req.params.id);
        if(category == null) {
            return res.status(404).json({message: 'Category not found'})
        }
    } catch (error) {
        return res.status(500).json({message: error.message});        
    }
    res.category = category;
    next();
}


const getCategoryById = async(req,res) => {
    res.json(res.category)
}

const createCategory = async(req,res) => {
    const category = new Category({
        name: req.body.name,
        description: req.body.description
    });
    try {
        const newCategory = await category.save();
        res.status(201).json(newCategory)
    } catch (error) {
        res.status(400).json({message: error.message})        
    }
}


const getCategories = async(req,res) => {
    try {
        const categories = await Category.find()
        res.json(categories)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const updateCategory = async(req,res) => {
    const {name,description} = req.body;
    if(name != null){
        res.category.name = name;
    }
    if(description!= null){
        res.category.description = description;
    }

    try {
        const updateCategory = await res.category.save();
        res.json(updateCategory)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const deleteCategory = async(req,res) => {
    try {
        await res.category.deleteOne();
        res.json({message: 'Category deleted'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
    getCategoryByIdMiddleWare,
    getCategoryById
};