'use client'
import { Chat, User } from "@/types"
import { useRouter } from "next/navigation";
function ChatListItem({chat, user, selectedChatId}:{chat:Chat, user:User, selectedChatId?:string}) {
    const router = useRouter();
    const otherUser = chat.participants[0]?.id === user?.id ? chat.participants[1] : chat.participants[0];
    const initials = otherUser?.name ? otherUser.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() : '?';
    const lastMessageTime = chat.lastMessage.createdAt ? new Date(chat.lastMessage.createdAt).toLocaleTimeString([
        'en-IN',
    ], { hour: '2-digit', minute: '2-digit' }) : '';

    // const unreadCount = chat.unreadCount || 0;
    const unreadCount = 3;
    return (
        <div key={chat.id} onClick={() => router.push(`/home/${chat.id}`)} className={`chat-item flex items-center gap-3 bg-muted my-2 rounded-lg p-2 hover:bg-muted/70 duration-200 cursor-pointer transition-all ${selectedChatId === chat.id ? 'bg-muted/50' : ''}`}>
            <div className="avatar flex-shrink-0 w-10 h-10 rounded-full bg-accent flex items-center justify-center border text-lg font-bold text-foreground">
                {initials}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-base truncate">{otherUser?.name || 'Unknown'}</h3>
                    <span className="chat-time text-xs text-muted-foreground ml-2 whitespace-nowrap">{lastMessageTime}</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                    <span className="sender text-sm font-medium text-muted-foreground truncate max-w-[80px]">{chat.lastMessage.sender.name == user?.name ? 'You' : chat.lastMessage.sender.name}</span>
                    <span className="text-sm text-muted-foreground">:</span>
                    <span title={chat.lastMessage.text} className="message text-sm truncate flex-1">{chat.lastMessage.text}</span>
                    {unreadCount > 0 && (
                        <span className="unread-badge bg-primary text-background text-xs rounded-full px-2 py-0.5 ml-2">{unreadCount}</span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ChatListItem
