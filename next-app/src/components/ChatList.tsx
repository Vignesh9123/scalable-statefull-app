"use client"

import { useEffect, useRef, useState } from 'react'
import { Chat, User } from '@/types';
import ChatListItem from './ChatListItem';
import { Input } from './ui/input';
import { Command } from 'lucide-react';
import { fetchChats } from '@/app/actions';
import { useChat } from '@/context/chat';
function ChatList({ user }: { user: User }) {
    const [chatList, setChatList] = useState<Chat[]>([]);
    const [filteredChatsList, setFilteredChatsList] = useState<Chat[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const searchRef = useRef<HTMLInputElement>(null);
    const {selectedChatId} = useChat();


    useEffect(() => {
        // setLoading(true)
        fetchChats(user.id).then((chats: Chat[]) => {
            setLoading(false)
            setChatList(chats)
            setFilteredChatsList(chats)
        })
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                searchRef.current?.focus();
            }
            if (e.key === 'Escape') {
                setSearchQuery('');
                searchRef.current?.blur();
            }
        })
    }, []);

    useEffect(() => {
        const filteredChats = chatList.filter((chat) => chat.participants.some((participant) => participant.id !== user.id && participant.name.toLowerCase().includes(searchQuery.toLowerCase())));
        setFilteredChatsList(filteredChats);
    }, [searchQuery]);

    return (
        <div className="bg-background rounded-lg px-2">
            <div className='py-2 h-[85px]'>
                <h1 className='text-2xl font-bold my-1'>Chats</h1>
                <div className='relative'>
                    <Input ref={searchRef} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." />
                    <span className='absolute flex right-2 items-center bg-muted rounded px-1 top-[6px] text-muted-foreground cursor-pointer' ><Command size={20} />K</span>
                </div>
            </div>
            <div className='h-[calc(99vh-85px)] overflow-auto'>
                {loading && <div className='flex justify-center items-center h-full'>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>}

                {filteredChatsList.map((chat) => {
                    return (
                        <ChatListItem key={chat.id} chat={chat} user={user} selectedChatId={selectedChatId!} />
                    )
                })}
            </div>
        </div>
    )
}

export default ChatList
