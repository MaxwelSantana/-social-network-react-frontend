import { AppProviders } from './context';
import MainRouter from './MainRouter';

function App() {
    return (
        <AppProviders>
            <MainRouter />
        </AppProviders>
    );
}

export default App;
