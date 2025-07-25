import { Chat, User } from '@/types';
import React from 'react'
import MessageBubble from './MessageBubble';

function Messages({ chat, user }: { chat: Chat, user: User }) {
    return (
        <>
            {chat?.messages?.map((message) => {
                return (
                   <MessageBubble key={message.id} user={user} message={message} />
                );
            })
            }
        </>
    )
}

export default Messages
