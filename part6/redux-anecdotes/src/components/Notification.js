import { connect } from 'react-redux';

const Notification = (props) => {
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
    };

    return props.notification.content ? (
        <div style={style}>{props.notification.content}</div>
    ) : (
        <></>
    );
};

const mapStateToProps = (state) => {
    return { notification: state.notification };
};

export default connect(mapStateToProps)(Notification);
