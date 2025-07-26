export interface User {
    id: string;
    name: string;
    email: string;
    image: string | null;
}

export interface Chat {
    id: string;
    participants: User[];
    lastMessage: Message | null;
    messages?: Message[];
    unreadCount?: number;
    unreadBy?: String;
}

export interface Message {
    id: string;
    text: string;
    sender: User;
    createdAt: Date;
}