import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { CreditCard, DollarSign } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Payment() {
  const { cartItems, cartTotal } = useCart();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { currentUser } = useAuth();

  const tax = cartTotal * 0.1;
  const grandTotal = cartTotal + tax;

  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const inputAmount = parseFloat(amount);

    if (Math.abs(inputAmount - grandTotal) < 0.01) {
      setLoading(true);

      try {
        if (currentUser) {
          await addDoc(collection(db, 'orders'), {
            userId: currentUser.uid,
            items: cartItems,
            total: grandTotal,
            status: 'confirmed',
            createdAt: serverTimestamp(),
            userEmail: currentUser.email // helpful for admin
          });
        }

        // Simulate payment processing delay if needed, or just fast
        setTimeout(() => {
          setLoading(false);
          showToast('Payment successful!', 'success');
          navigate('/order-success');
        }, 1000);
      } catch (err) {
        console.error("Error creating order:", err);
        setLoading(false);
        showToast('Failed to process order', 'error');
      }

    } else {
      setError(`Please enter exactly ${grandTotal.toFixed(2)} to confirm payment.`);
      showToast('Payment amount mismatch', 'error');
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <LoadingSpinner />
        <p style={{ marginTop: '1rem', fontSize: '1.2rem' }}>Processing Payment...</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '600px', paddingBottom: '4rem' }}>
      <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Secure Checkout</h1>

      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: 'var(--shadow)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <p style={{ color: '#666', marginBottom: '0.5rem' }}>Total Amount to Pay</p>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
            <DollarSign size={32} style={{ display: 'inline', position: 'relative', top: '-4px' }} />
            {grandTotal.toFixed(2)}
          </div>
        </div>

        {error && <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handlePayment}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Enter Payment Amount</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#666' }}>$</span>
              <input
                type="number"
                step="0.01"
                placeholder={grandTotal.toFixed(2)}
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ width: '100%', padding: '1rem 1rem 1rem 2rem', fontSize: '1.1rem', borderRadius: '4px', border: '1px solid #ddd' }}
              />
            </div>
            <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.5rem' }}>
              For this dummy payment, simply enter the exact total amount shown above.
            </p>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', fontSize: '1.1rem', padding: '0.8rem' }}>
            <CreditCard size={20} /> Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}
