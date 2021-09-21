import React from 'react';

function ErrorMessage({ show, children, ...rest }) {
    const { className } = rest;
    return (
        <div
            className={`alert alert-danger ${className || ''}`}
            style={{ display: show ? '' : 'none' }}
        >
            {children}
        </div>
    );
}
export { ErrorMessage };
