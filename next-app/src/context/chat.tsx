'use client'
import { createContext, useContext, useState } from "react";

const ChatContext = createContext<{
    selectedChatId: string | null;
    setSelectedChatId: (id: string | null) => void;
}>({
    selectedChatId: null,
    setSelectedChatId: () => {},
});

export function useChat() {
    return useContext(ChatContext);
}

export default function ChatProvider({ children }: any) {
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
    return <ChatContext.Provider value={{selectedChatId, setSelectedChatId}}>
        {children}
    </ChatContext.Provider>;
}