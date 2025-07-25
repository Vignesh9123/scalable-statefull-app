import { Message, User } from '@/types'
import React from 'react'

function MessageBubble({ message, user }: { message: Message, user: User }) {
    const isSent = message.sender.id === user.id;
    const initials = message.sender.name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
    const time = message.createdAt ? new Date(message.createdAt).toLocaleTimeString([
        'en-IN',
    ], { hour: '2-digit', minute: '2-digit' }) : '';
    return (
        <div key={message.id} className={`flex ${isSent ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-end gap-2 max-w-[70%] ${isSent ? 'flex-row-reverse' : ''}`}>
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-sm font-bold text-foreground">
                    {initials}
                </div>
                <div>
                    <div className={`flex items-center gap-2 mb-0.5 ${isSent ? 'justify-end' : ''}`}>
                        <span className="text-xs font-semibold text-muted-foreground">{message.sender.name}</span>
                        <span className="text-[10px] text-muted-foreground">{time}</span>
                    </div>
                    <div className={`px-3 py-2 rounded-2xl text-sm break-words ${isSent ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'} shadow-sm`}>
                        {message.text}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessageBubble
