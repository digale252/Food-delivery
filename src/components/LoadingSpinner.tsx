export default function LoadingSpinner() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '200px',
            width: '100%',
            color: 'var(--primary-color)'
        }}>
            <div className="spinner"></div>
            <p style={{ marginTop: '1rem', fontWeight: 500 }}>Loading...</p>
            <style>{`
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid var(--gray-200);
          border-top: 4px solid var(--primary-color);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
}
