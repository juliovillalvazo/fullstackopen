const Notification = ({ type, message }) => (
    <div className={type}>
        <p>{message}</p>
    </div>
);

export default Notification;
