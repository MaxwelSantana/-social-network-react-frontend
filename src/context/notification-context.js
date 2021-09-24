import { Notification } from '../components/Notification';

const {
    createContext,
    useContext,
    useState,
    useCallback,
    useMemo,
} = require('react');

const notificationContext = createContext();

const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState();

    const error = useCallback((message) => {
        setNotification({ type: 'error', message });
    }, []);

    const removeNotification = () => {
        setNotification(null);
    };

    const value = useMemo(() => ({ error }), [error]);

    return (
        <notificationContext.Provider value={value}>
            {children}
            {notification && (
                <Notification
                    notification={notification}
                    onClose={removeNotification}
                />
            )}
        </notificationContext.Provider>
    );
};

const useNotification = () => {
    const context = useContext(notificationContext);
    if (!context)
        throw new Error(
            'useNotification must be within a Notification Context',
        );
    return context;
};

export { NotificationProvider, useNotification };
