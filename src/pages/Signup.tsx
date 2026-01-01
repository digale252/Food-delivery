import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        try {
            await signup({ name, email, password });
            navigate('/');
        } catch (err: any) {
            console.error("Signup caught error:", err);
            // Firebase errors often look like "Firebase: Error (auth/email-already-in-use)."
            let msg = 'Failed to create an account';
            if (err.code === 'auth/email-already-in-use') {
                msg = 'Email is already in use.';
            } else if (err.code === 'auth/operation-not-allowed') {
                msg = 'Email/Password sign-in is not enabled in Firebase Console.';
            } else if (err.message) {
                msg = err.message;
            }
            setError(msg);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '3rem auto', padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h2 style={{ marginBottom: '1.5rem', textAlign: 'center', color: 'var(--primary-color)' }}>Sign Up</h2>

            {error && <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Full Name</label>
                    <input
                        type="text"
                        placeholder="John Doe"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd' }}
                    />
                </div>

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

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Confirm Password</label>
                    <input
                        type="password"
                        placeholder="******"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd' }}
                    />
                </div>

                <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>Sign Up</button>
            </form>

            <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
                Already have an account? <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: 500 }}>Login</Link>
            </div>
        </div>
    );
}
