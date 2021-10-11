import React, {useState } from 'react';
import Sidebar from './Sidebar';
import Messages from './Messages';

export default function Dashboard() {
    // const { selectedMessages } = useMessages();

    return (
        <>
        <div>
            <Sidebar/>
        </div>
        <div>
            <Messages />
        </div>
        </>
    )
}