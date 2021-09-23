import React from 'react';

function Spinner({ show, ...rest }) {
    if (!show) return null;
    return (
        <div className="spinner-border" role="status" {...rest}>
            <span className="visually-hidden">Loading...</span>
        </div>
    );
}
export { Spinner };
