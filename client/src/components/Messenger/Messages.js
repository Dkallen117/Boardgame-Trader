import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

export default function Messages() {
    return (
        <div className="d-flex flex-column flex-grow-1">
            <div className="flex-grow-1 overflow-auto">
                These are the displayed messages
            </div>
        </div>
    )
}