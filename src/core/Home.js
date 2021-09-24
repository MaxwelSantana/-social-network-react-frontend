import React from 'react';
import { useNotification } from '../context/notification-context';

export default function Home() {
    const { error } = useNotification();
    return (
        <div className="jumbotron">
            <h1>Home Screen</h1>
            <button
                className="btn btn-primary btn-rounded"
                onClick={() => error('EROUUUUU')}
            >
                EROUUUUU
            </button>
        </div>
    );
}
