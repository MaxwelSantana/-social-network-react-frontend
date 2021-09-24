import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth-context';
import { NotificationProvider } from './notification-context';

function AppProviders({ children }) {
    return (
        <BrowserRouter>
            <AuthProvider>
                <NotificationProvider>{children}</NotificationProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export { AppProviders };
