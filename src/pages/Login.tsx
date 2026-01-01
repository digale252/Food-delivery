import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); // Just for UI, simulated auth ignores it as per requirements (or we can check dummy)
    const [error, setError] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const success = await login(email, password);
        if (success) {
            navigate('/');
        } else {
            setError('User not found. Please sign up first.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '3rem auto', padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h2 style={{ marginBottom: '1.5rem', textAlign: 'center', color: 'var(--primary-color)' }}>Login</h2>

            {error && <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email</label>
                    <input
                        type="email"
                        placeholder="john@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Password</label>
                    <input
                        type="password"
                        placeholder="******"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd' }}
                    />
                </div>

                <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>Login</button>
            </form>

            <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
                Don't have an account? <Link to="/signup" style={{ color: 'var(--primary-color)', fontWeight: 500 }}>Sign Up</Link>
            </div>
        </div>
    );
}
