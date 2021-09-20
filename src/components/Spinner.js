import React from 'react';

export default function Spinner({ show }) {
    if (!show) return null;
    return (
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    );
}
