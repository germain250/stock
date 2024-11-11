import { useState } from 'react';
import Button from '../components/Button';
import InputField from '../components/InputField';
import FormCard from '../components/FormCard';
import apiService from '../services/apiService';

const ProductForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        sku: '',
        category: '',
        description: '',
        price: '',
        stockQuantity: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiService({ data: formData });
            alert("Product saved successfully!");
            setFormData({
                name: '',
                sku: '',
                category: '',
                description: '',
                price: '',
                stockQuantity: ''
            });
        } catch (error) {
            console.error("Error saving product:", error);
            alert("Failed to save product.");
        }
    };

    return (
        <>
            <FormCard title="Add New Product">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <InputField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter product name"
                    />
                    <InputField
                        label="SKU"
                        name="sku"
                        value={formData.sku}
                        onChange={handleChange}
                        placeholder="Enter SKU"
                    />
                    <InputField
                        label="Category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Enter category ID"
                    />
                    <InputField
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter product description"
                        type="text"
                    />
                    <InputField
                        label="Price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Enter price"
                        type="number"
                    />
                    <InputField
                        label="Stock Quantity"
                        name="stockQuantity"
                        value={formData.stockQuantity}
                        onChange={handleChange}
                        placeholder="Enter stock quantity"
                        type="number"
                    />
                    <Button type="submit">Save Product</Button>
                </form>
            </FormCard>
        </>
    );
}

export default ProductForm;
