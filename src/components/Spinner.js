import React from 'react';

export default function Spinner({ show }) {
    if (!show) return null;
    return (
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    );
}
