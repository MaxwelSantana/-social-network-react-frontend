import React from 'react';

function Spinner({ ...rest } = { show: true }) {
    return (
        <div className="spinner-border" role="status" {...rest}>
            <span className="visually-hidden">Loading...</span>
        </div>
    );
}
export { Spinner };
