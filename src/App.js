import { ErrorBoundary } from 'react-error-boundary';
import { ErrorMessage } from './components/ErrorMessage';
import FullPageErrorFallback from './components/FullPageErrorFallback';
import { AppProviders } from './context';
import Navbar from './core/Navbar';
import MainRouter from './MainRouter';

function ErrorFallback({ error }) {
    console.log('teste', error);
    return <div className={`alert alert-danger`}>{error.message}</div>;
}
function App() {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <AppProviders>
                <div>
                    <Navbar />
                </div>
                <main>
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                        <MainRouter />
                    </ErrorBoundary>
                </main>
            </AppProviders>
        </ErrorBoundary>
    );
}

export default App;
