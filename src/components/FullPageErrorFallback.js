import React from 'react';

function FullPageErrorFallback({ error }) {
    return (
        <div
            role="alert"
            style={{
                color: 'red',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <p>Uh oh... There's a problem. Try refreshing the app.</p>
            <pre>{error.message}</pre>
        </div>
    );
}

export default FullPageErrorFallback;
