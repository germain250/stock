import { useState, useEffect } from 'react';
import Button from '../components/Button';
import InputField from '../components/InputField';
import FormCard from '../components/FormCard';
import { addProduct, getAllCategories } from '../services/apiService';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const ProductForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        sku: '',
        category: '',
        description: '',
        price: 0,
        stockQuantity: 0
    });
    
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getAllCategories();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        const MySwal = withReactContent(Swal);
        const showAlert = () => {
            MySwal.fire({
                title: 'Product',
                text: 'Product Saved Succesfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        };

        e.preventDefault();
        try {
            await addProduct(formData);
            showAlert();
            setFormData({
                name: '',
                sku: '',
                category: '',
                description: '',
                price: 0,
                stockQuantity: 0
            });
        } catch (error) {
            console.error("Error saving product:", error);
            alert("Failed to save product.");
        }
    };

    return (
        <div className="flex justify-center mt-10">
            <FormCard title="Add New Product" className="w-full max-w-5xl">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="flex flex-col gap-4">
                            <InputField
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter product name"
                                className="w-full"
                            />
                            <InputField
                                label="SKU"
                                name="sku"
                                value={formData.sku}
                                onChange={handleChange}
                                placeholder="Enter SKU"
                                className="w-full"
                            />
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-semibold text-gray-700">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="py-2 px-5 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    required
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category._id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <InputField
                                label="Description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter product description"
                                className="w-full"
                                type="text"
                            />
                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col gap-4">
                            <InputField
                                label="Price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="Enter price"
                                className="w-full"
                                type="number"
                            />
                            <InputField
                                label="Stock Quantity"
                                name="stockQuantity"
                                value={formData.stockQuantity}
                                onChange={handleChange}
                                placeholder="Enter stock quantity"
                                className="w-full"
                                type="number"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end mt-4">
                        <Button type="submit">Save Product</Button>
                    </div>
                </form>
            </FormCard>
        </div>
    );
};

export default ProductForm;
