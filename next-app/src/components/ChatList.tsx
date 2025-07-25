"use client"

import { useState } from 'react'
import { chats } from '@/data/mock';
import { Chat, User } from '@/types';
import ChatListItem from './ChatListItem';
function ChatList({user}:{user:User}) {
    const [chatList, setChatList] = useState<Chat[]>([...chats]);

    return (
        <div className="bg-background rounded-lg px-2">
            {chatList.map((chat) => {
               return (
            <ChatListItem key={chat.id} chat={chat} user={user}/>   
               )
            })}
        </div>
    )
}

export default ChatList
