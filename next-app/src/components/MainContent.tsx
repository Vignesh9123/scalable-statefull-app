import { MessageCircleDashed } from "lucide-react"
import { chatsWithMessages } from "@/data/mock"
import { User } from "@/types";
import Messages from "./Messages";

function MainContent({chatId,user}:{chatId?:string, user:User}) {
    const chat = chatsWithMessages.find(chat => chat.id === chatId);

  return (
    <>
      {!chatId && <div className='flex flex-col items-center justify-center h-full p-3'>
        <MessageCircleDashed className='w-8 h-8 text-muted-foreground'/>
        <p className='text-muted-foreground'>Select a chat to start messaging</p>
        </div>}
        {chatId && chat && <div className='h-full flex flex-col justify-end overflow-auto flex-1 p-3 gap-2'>
            <Messages chat={chat} user={user}/>
        </div>}
    </>
  )
}

export default MainContent
