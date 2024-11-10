import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import FormCard from '../components/FormCard';
import InputField from '../components/InputField';
import Button from '../components/Button';

function Login() {
    const { login } = useAuthContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isSignup, setIsSignup] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({ email, password });
            setError(null);
        } catch (err) {
            setError('Invalid login credentials.', err);
        }
    };

    const toggleMode = () => {
        setIsSignup((prev) => !prev);
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-50 px-6 py-10 md:px-20">
            <div className="flex flex-col md:flex-row items-center md:space-x-10 w-full min-h-[600px] max-w-4xl bg-white p-10 rounded-lg shadow-lg">
                {/* Form Card */}
                <div className="flex-1 transition-all duration-500 transform">
                    <FormCard title={isSignup ? "Sign Up" : "Login"} className="w-full max-w-sm h-[500px] flex flex-col justify-center">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <InputField
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                            />
                            <InputField
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                            />
                            {isSignup && (
                                <InputField
                                    label="Confirm Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Confirm your password"
                                />
                            )}
                            {error && <div className="text-red-500 text-sm">{error}</div>}
                            <Button type="submit">{isSignup ? "Sign Up" : "Login"}</Button>
                        </form>
                    </FormCard>
                </div>

                {/* Branding and Toggle Section */}
                <div className="flex flex-col items-center text-center space-y-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Welcome to{' '}
                        <span className="bg-gradient-to-r from-yellow-500 via-yellow-600 to-green-600 bg-clip-text text-transparent">
                            Stock XY
                        </span>
                    </h1>
                    <p className="text-gray-700 text-lg font-medium">
                        {isSignup ? "Already have an account?" : "Don’t have an account?"}
                    </p>
                    <button
                        onClick={toggleMode}
                        className="text-lg font-semibold text-green-700 transition duration-200 transform hover:scale-105 hover:text-green-800"
                    >
                        {isSignup ? "Login" : "Create Account"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
