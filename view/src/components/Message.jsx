import React from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, children }) => {
    //children is the actual text
    return (
        <Alert variant={variant}>
            <h1>Stupid react</h1>
        </Alert>
    )
}

Message.defaultProps = {
    variant: 'info'
}
//{children}
export default Message;