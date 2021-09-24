import React, { useCallback, useEffect, useState } from 'react';

function Notification({ notification, onClose }) {
    const [show, setShow] = useState(true);
    const { type, message } = notification;
    const strMessage = () => {
        if (typeof message === 'string' || message instanceof String)
            return message;
        return JSON.stringify(message);
    };

    const typeClassName =
        type === 'error'
            ? 'alert-danger'
            : type === 'success'
            ? 'alert-success'
            : 'alert-info';

    const handleClose = useCallback(() => {
        setShow(false);
        setTimeout(() => {
            onClose && onClose();
        }, 400);
    }, [onClose]);

    useEffect(() => {
        setTimeout(() => {
            handleClose();
        }, 2000);
    }, [handleClose]);

    return (
        <div
            className={`alert ${typeClassName} fade ${show && 'show'}`}
            style={{
                display: 'block',
                width: '535px',
                position: 'fixed',
                top: '10px',
                right: '10px',
                bottom: 'unset',
                left: 'unset',
                transform: 'unset',
            }}
            role="alert"
        >
            {strMessage()}
        </div>
    );
}

export { Notification };
