"use client"

import { useEffect, useRef, useState } from 'react'
import { chats } from '@/data/mock';
import { Chat, User } from '@/types';
import ChatListItem from './ChatListItem';
import { Input } from './ui/input';
import { Command } from 'lucide-react';
function ChatList({user, selectedChatId}:{user:User, selectedChatId?:string}) {
    const [chatList, setChatList] = useState<Chat[]>([...chats]);
    const [searchQuery, setSearchQuery] = useState('');
    const searchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        window.addEventListener('keydown', (e) => {
            if(e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                searchRef.current?.focus();
            }
            if(e.key === 'Escape') {
                setSearchQuery('');
                searchRef.current?.blur();
            }
        })
    }, []);

    useEffect(() => {
        const filteredChats = chats.filter((chat) => chat.participants.some((participant) => participant.id !== user.id && participant.name.toLowerCase().includes(searchQuery.toLowerCase())));
        setChatList(filteredChats);
    }, [searchQuery]);

    return (
        <div className="bg-background rounded-lg px-2">
            <div className='py-2 h-[85px]'>
                <h1 className='text-2xl font-bold my-1'>Chats</h1>
                <div className='relative'>
                <Input ref={searchRef} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..."/>
                <span className='absolute flex right-2 items-center bg-muted rounded px-1 top-[6px] text-muted-foreground cursor-pointer' ><Command size={20}/>K</span>
                </div>
            </div>
            <div className='h-[calc(99vh-85px)] overflow-auto'>

            {chatList.map((chat) => {
                return (
                    <ChatListItem key={chat.id} chat={chat} user={user} selectedChatId={selectedChatId}/>   
                )
            })}
            </div>
        </div>
    )
}

export default ChatList
