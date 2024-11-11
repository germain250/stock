import axios from "./axios";

//product crud operations
export const getAllProducts = async () => {
    try {
        const response = await axios.get("/products");
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}
export const updateProduct = async (productId, data) => {
    try {
        const response = await axios.patch(`/products/update/${productId}`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const deleteProduct = async (productId) => {
    try {
        const response = await axios.delete(`/products/delete/${productId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const addProduct = async (data) => {
    try {
        const response = await axios.post("/products/add", data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export const getProductDetails = async (productId) => {
    try {
        const response = await axios.get(`products/${productId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

//category crud operations

export const getAllCategories = async () => {
    try {
        const response = await axios.get("/categories");
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export const addCategory = async (data) => {
    try {
        const response = await axios.post("/categories/add", data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export const getSingleCategory = async (categoryId) => {
    try {
        const response = await axios.get(`/categories/${categoryId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export const updateCategory = async (categoryId, data) => {
    try {
        const response = await axios.patch(`/categories/update/${categoryId}`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export const deleteCategory = async (categoryId) => {
    try {
        const response = await axios.delete(`/categories/delete/${categoryId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}