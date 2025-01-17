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

//stockin and stockout operations

export const createStockIn = async (data) =>{
    try {
        const response = await axios.post("/stock/stock-in/", data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export const createStockOut = async (data) =>{
    try {
        const response = await axios.post("/stock/stock-out/", data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export const getAllLogs = async () =>{
    try {
        const response = await axios.get("/report")
        return response.data;
    } catch (error) {
        console.log(error)        
    }
}

export const getStockOverview = async () =>{
    try {
        const response = await axios.get("/stock/overview")
        return response.data;
    } catch (error) {
        console.log(error.message)        
    }
}

export const registerUser = async (userData) => {
    try {
      await axios.post("/auth/register-worker", userData);
    } catch (error) {
      // Rethrow the error with a message for client-side handling
      throw new Error(error.response?.data?.message || "Failed to register user");
    }
  };
  