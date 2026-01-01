import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2 } from 'lucide-react';

export default function Cart() {
    const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();

    const tax = cartTotal * 0.1; // 10% dummy tax
    const grandTotal = cartTotal + tax;

    if (cartItems.length === 0) {
        return (
            <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
                <img
                    src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
                    alt="Empty Cart"
                    style={{ width: '200px', marginBottom: '2rem', opacity: 0.5 }}
                />
                <h2 style={{ marginBottom: '1rem' }}>Your cart is empty</h2>
                <p style={{ color: '#666', marginBottom: '2rem' }}>Looks like you haven't added anything to your cart yet.</p>
                <Link to="/" className="btn btn-primary">Start Ordering</Link>
            </div>
        );
    }

    return (
        <div className="container" style={{ paddingBottom: '4rem' }}>
            <h1 style={{ marginBottom: '2rem' }}>Your Cart</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }} className="cart-layout">
                <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: 'var(--shadow)', padding: '1.5rem' }}>
                    {cartItems.map(item => (
                        <div key={item.id} style={{ display: 'flex', gap: '1rem', paddingBottom: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid #eee' }}>
                            <img
                                src={item.image}
                                alt={item.name}
                                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                            />
                            <div style={{ flexGrow: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{item.name}</h3>
                                    <span style={{ fontWeight: 'bold' }}>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                                <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>${item.price.toFixed(2)} each</p>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid #ddd', borderRadius: '4px', padding: '0.2rem' }}>
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ padding: '4px', background: 'none' }}><Minus size={16} /></button>
                                            <span style={{ minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ padding: '4px', background: 'none' }}><Plus size={16} /></button>
                                        </div>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} style={{ color: '#dc2626', background: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Trash2 size={18} /> Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button onClick={clearCart} style={{ color: '#dc2626', background: 'none', fontSize: '0.9rem', textDecoration: 'underline' }}>Clear Cart</button>
                </div>

                <div style={{ height: 'fit-content' }}>
                    <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: 'var(--shadow)', padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1.5rem' }}>Order Summary</h3>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: '#666' }}>
                            <span>Item Total</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: '#666' }}>
                            <span>Tax (10%)</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>

                        <div style={{ borderTop: '1px solid #eee', paddingTop: '1rem', marginTop: '1rem', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '2rem' }}>
                            <span>Grand Total</span>
                            <span>${grandTotal.toFixed(2)}</span>
                        </div>

                        <Link to="/payment" className="btn btn-primary" style={{ width: '100%' }}>
                            Proceed to Checkout
                        </Link>
                    </div>
                </div>
            </div>

            {/* Responsive fix for cart layout */}
            <style>{`
        @media (max-width: 768px) {
          .cart-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </div>
    );
}
