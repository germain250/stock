import FormCard from "./FormCard";
import InputField from "./InputField";
import Button from "./Button";
import { useState } from "react";
import { addCategory } from "../services/apiService";
import showAlert from "../composables/swalAlert";

const AddCategory = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.description) {
      alert("Please fill out all fields.");
      return;
    }
    addCategory(formData)
    showAlert({ 
        title: 'Success', 
        text: `Added categorry ${formData.name} successfully`, 
        icon: 'success' 
      });    
    setFormData({ name: '', description: '' });
  };

  return (
    <FormCard>
      <InputField
        label="Category Name"
        onChange={handleChange}
        value={formData.name}
        name="name"
        placeholder="Category Name"
      />
      <InputField
        label="Description"
        onChange={handleChange}
        value={formData.description}
        name="description"
        placeholder="Enter Description"
      />
      <Button onClick={handleSubmit}>Add Category</Button>
    </FormCard>
  );
};

export default AddCategory;
