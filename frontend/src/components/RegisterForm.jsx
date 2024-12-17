import { useState } from "react";
import FormCard from "../components/FormCard";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { registerUser } from "../services/apiService";
import showAlert from "../composables/swalAlert";
import { useAuthContext } from "../context/AuthContext";
function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({});
  const {user} = useAuthContext();

  const userId = user._id
  console.log(userId)
  console.log(role)

  const validateFields = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username.trim()) {
      newErrors.username = "Username is required.";
    }

    if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email address.";
    }

    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (!role) {
      newErrors.role = "Role is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      console.log("Validation failed:", errors);
      return;
    }
  
    try {
      const userData = { username, email, password, role, userId };
      await registerUser(userData);
      setErrors({});
      showAlert({
        title: "User Created",
        text: `${userData.username} Created Successfully as a ${userData.role}!`,
        icon: "success",
      });
    } catch (err) {
      setErrors({ form: err.message }); // Display error from API
    }
  };
  

  const getInputClass = (field) =>
    errors[field]
      ? "border-red-500 focus:ring-red-500"
      : "border-green-500 focus:ring-green-500";

  return (
      <FormCard title="Register User" className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <InputField
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className={`py-2 px-5 text-sm rounded-md ${getInputClass("username")}`}
          />
          {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}

          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className={`py-2 px-5 text-sm rounded-md ${getInputClass("email")}`}
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}

          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className={`py-2 px-5 text-sm rounded-md ${getInputClass("password")}`}
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={`py-2 px-5 text-sm rounded-md border ${getInputClass("role")}`}
            >
              <option value="">Select Role</option>
              <option value="sales">sales</option>
              <option value="stock_manager">stock_manager</option>
            </select>
          </div>
          {errors.role && <span className="text-red-500 text-sm">{errors.role}</span>}

          {errors.form && <div className="text-red-500 text-sm">{errors.form}</div>}
          <Button type="submit">Register</Button>
        </form>
      </FormCard>
  );
}

export default RegisterForm;
