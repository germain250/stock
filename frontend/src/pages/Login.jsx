import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import FormCard from "../components/FormCard";
import InputField from "../components/InputField";
import Button from "../components/Button";
import authService from "../services/authService";

function Login() {
  const { login } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});
  const [isSignup, setIsSignup] = useState(false);

  const validateFields = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (isSignup && !username.trim()) {
      newErrors.username = "Username is required.";
    }

    if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email address.";
    }

    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (isSignup && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
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
      if (isSignup) {
        const userData = { username, email, password };
        await authService.registerUser(userData);
        toggleMode()

      } else {
        await login({ email, password });
      }
      setErrors({});
    } catch (err) {
      setErrors({ form: err.message });
    }
  };

  const toggleMode = () => {
    setIsSignup((prev) => !prev);
    setErrors({});
  };

  const getInputClass = (field) =>
    errors[field]
      ? "border-red-500 focus:ring-red-500"
      : "border-green-500 focus:ring-green-500";

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-50 px-6 py-10 md:px-20">
      <div className="flex flex-col md:flex-row items-center md:space-x-10 w-full min-h-[600px] max-w-4xl bg-white p-10 rounded-lg shadow-lg">
        <div className="flex-1 transition-all duration-500 transform">
          <FormCard
            title={isSignup ? "Sign Up" : "Login"}
            className="w-full max-w-sm h-[500px] flex flex-col justify-center"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {isSignup && (
                <InputField
                  label="Username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className={`py-2 px-5 text-sm rounded-md ${getInputClass("username")}`}
                />
              )}
              {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}

              <InputField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
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

              {isSignup && (
                <>
                  <InputField
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    className={`py-2 px-5 text-sm rounded-md ${getInputClass("confirmPassword")}`}
                  />
                  {errors.confirmPassword && (
                    <span className="text-red-500 text-sm">{errors.confirmPassword}</span>
                  )}
                </>
              )}

              {errors.form && <div className="text-red-500 text-sm">{errors.form}</div>}
              <Button type="submit">{isSignup ? "Sign Up" : "Login"}</Button>
            </form>
          </FormCard>
        </div>

        <div className="flex flex-col items-center text-center space-y-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-yellow-500 via-yellow-600 to-green-600 bg-clip-text text-transparent">
              Stock XY
            </span>
          </h1>
          <p className="text-gray-700 text-md font-medium">
            {isSignup ? "Already have an account?" : "Don’t have an account?"}
          </p>
          <button
            onClick={toggleMode}
            className="text-sm font-semibold text-green-700 transition duration-200 transform hover:scale-105 hover:text-green-800"
          >
            {isSignup ? "Login" : "Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
