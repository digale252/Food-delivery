import { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function OrderSuccess() {
    const { clearCart } = useCart();

    useEffect(() => {
        clearCart();
    }, []);

    return (
        <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
            <CheckCircle size={80} color="#2ecc71" style={{ marginBottom: '2rem' }} />
            <h1 style={{ marginBottom: '1rem' }}>Order Placed Successfully!</h1>
            <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
                Thank you for your order. Your food is being prepared and will be delivered shortly.
            </p>

            <Link to="/" className="btn btn-primary">
                Back to Home
            </Link>
        </div>
    );
}
