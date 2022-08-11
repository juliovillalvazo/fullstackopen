import { useSelector } from 'react-redux';

const Notification = () => {
    const notification = useSelector(({ notification }) => notification);

    return (
        <>
            {notification.message ? (
                <div className={notification.type}>
                    <p>{notification.message}</p>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default Notification;
