import React from 'react';
import { useNotification } from '../context/notification-context';
import Posts from '../post/Posts';

export default function Home() {
    console.log('Home render');
    return (
        <div className="jumbotron">
            <h1>Home Screen</h1>
            <Posts />
        </div>
    );
}
