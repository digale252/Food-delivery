import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingBag, LogOut, User as UserIcon } from 'lucide-react';

export default function Navbar() {
    const { currentUser, logout } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav style={{
            backgroundColor: 'var(--white)',
            boxShadow: 'var(--shadow)',
            padding: '1rem 0',
            marginBottom: '2rem',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    FoodKart
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <Link to="/" style={{ fontWeight: 500 }}>Home</Link>

                    <Link to="/cart" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <ShoppingBag size={24} />
                        {cartCount > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-8px',
                                right: '-8px',
                                backgroundColor: 'var(--primary-color)',
                                color: 'white',
                                fontSize: '0.75rem',
                                width: '18px',
                                height: '18px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {currentUser ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <UserIcon size={20} />
                                {currentUser.name}
                            </span>
                            <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}>
                                <LogOut size={16} /> Logout
                            </button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Link to="/login" className="btn btn-outline">Login</Link>
                            <Link to="/signup" className="btn btn-primary">Sign Up</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
