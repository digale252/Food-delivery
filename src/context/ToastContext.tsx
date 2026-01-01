import { createContext, useContext, useState, type ReactNode } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = (message: string, type: ToastType = 'info') => {
        const id = Date.now().toString();
        setToasts(prev => [...prev, { id, message, type }]);

        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000); // Auto dismiss after 3s
    };

    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div style={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                zIndex: 200,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
            }}>
                {toasts.map(toast => (
                    <div key={toast.id} style={{
                        minWidth: '300px',
                        backgroundColor: 'white',
                        padding: '1rem',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.8rem',
                        animation: 'slideIn 0.3s ease-out',
                        borderLeft: `4px solid ${toast.type === 'success' ? '#2ecc71' :
                                toast.type === 'error' ? '#dc2626' : '#3498db'
                            }`
                    }}>
                        {toast.type === 'success' && <CheckCircle size={20} color="#2ecc71" />}
                        {toast.type === 'error' && <AlertCircle size={20} color="#dc2626" />}
                        {toast.type === 'info' && <Info size={20} color="#3498db" />}

                        <span style={{ flexGrow: 1, fontSize: '0.95rem' }}>{toast.message}</span>

                        <button onClick={() => removeToast(toast.id)} style={{ background: 'none', color: '#999', padding: '2px', border: 'none', cursor: 'pointer' }}>
                            <X size={16} />
                        </button>
                    </div>
                ))}
            </div>
            <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
        </ToastContext.Provider>
    );
}
