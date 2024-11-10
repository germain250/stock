// Login.jsx
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({ email, password });
            setError(null);
        } catch (err) {
            setError('Invalid login credentials.', err);
        }
    };

    return (
        <FormCard title="Login">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <InputField
                    label="Username or Email"
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
                {error && <div className="text-red-500 text-sm">{error}</div>}
                <Button type="submit">Login</Button>
            </form>
        </FormCard>
    );
}

export default Login;
