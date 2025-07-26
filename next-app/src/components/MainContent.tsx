import { MessageCircleDashed } from "lucide-react"
import { Chat, User } from "@/types";
import Messages from "./Messages";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { fetchChat } from "@/app/actions";
import { auth } from "@/auth";
import { headers } from "next/headers";
async function MainContent({chatId}:{chatId?:string}) {
  const chat = chatId ? await fetchChat(chatId!): null;
  const session = await auth.api.getSession({
      headers: await headers()
  })
  const user = session?.user as User
  return (
    <>
      {!chatId && <div className='flex flex-col items-center justify-center h-full p-3'>
        <MessageCircleDashed className='w-8 h-8 text-muted-foreground'/>
        <p className='text-muted-foreground'>Select a chat to start messaging</p>
        </div>}
        {chatId && chat && <div className='flex flex-col justify-end h-[99vh] p-3 gap-2'>

            <Messages chat={chat} user={user}/>
            <div className='flex items-center gap-2'>
                <Input placeholder="Type a message..."/>
                <Button>Send</Button>
            </div>
        </div>}
    </>
  )
}

export default MainContent
