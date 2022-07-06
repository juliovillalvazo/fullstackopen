import { useState, forwardRef, useImperativeHandle } from 'react';
import Button from './Button';

const Toggleable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? 'none' : '' };
    const showWhenVisible = { display: visible ? '' : 'none' };

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility,
        };
    });

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button handler={toggleVisibility} value={props.buttonLabel} />
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <Button
                    handler={toggleVisibility}
                    value={props.hideButtonLabel}
                />
            </div>
        </div>
    );
});

export default Toggleable;
