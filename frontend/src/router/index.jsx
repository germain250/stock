import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import PropTypes from 'prop-types';
import AdminDashboard from '../pages/AdminDashboard';
import StockManagerDashboard from '../pages/StockManagerDashboard';
import SalesDashboard from '../pages/SalesDashboard';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import ErrorPage from '../pages/ErrorPage';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, isLoading } = useAuthContext(); // Ensure `isLoading` matches the state in AuthContext

    if (isLoading) return <div>Loading...</div>;

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/error" />;
    }

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function AppRouter() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/error" element={<ErrorPage />} />
            
            <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                </ProtectedRoute>
            } />

            <Route path="/stock-manager" element={
                <ProtectedRoute allowedRoles={['admin', 'stock_manager']}>
                    <StockManagerDashboard />
                </ProtectedRoute>
            } />

            <Route path="/sales" element={
                <ProtectedRoute allowedRoles={['admin', 'sales']}>
                    <SalesDashboard />
                </ProtectedRoute>
            } />

            <Route path="/profile" element={
                <ProtectedRoute allowedRoles={['admin', 'stock_manager', 'sales']}>
                    <Profile />
                </ProtectedRoute>
            } />

            <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
    );
}

export default AppRouter;