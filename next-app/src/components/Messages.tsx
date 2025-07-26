'use client'
import { Chat, User } from '@/types';
import React, { useEffect } from 'react'
import MessageBubble from './MessageBubble';
import { useChat } from '@/context/chat';

function Messages({ chat, user }: { chat: Chat, user: User }) {
    const {setSelectedChatId} = useChat();
    useEffect(() => {
       setSelectedChatId(chat.id);
       document.getElementById('message-list')?.scrollTo(0,document.getElementById('message-list')?.scrollHeight ?? 0); 
    },[])
    return (
        <div id='message-list' className="overflow-auto p-2">
            {chat?.messages?.map((message) => {
                return (
                   <MessageBubble key={message.id} user={user} message={message} />
                );
            })
            }
        </div>
    )
}

export default Messages
