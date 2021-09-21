import React from 'react';

function ErrorMessage({ show, children }) {
    return (
        <div
            className="alert alert-danger"
            style={{ display: show ? '' : 'none' }}
        >
            {children}
        </div>
    );
}
export { ErrorMessage };
