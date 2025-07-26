
import React from 'react'
import { auth } from "@/auth"; 
import { headers } from "next/headers";
import { redirect } from 'next/navigation';
import ChatList from '@/components/ChatList';
import { User } from '@/types';
import ChatProvider from '@/context/chat';
async function HomeLayout({
    children
}:{
    children:React.ReactNode,
}) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if(!session?.session) return redirect('/signin')
    
    return (
        <ChatProvider>
        <div className='lg:grid grid-cols-12 h-screen'>
          <div className='col-span-3 border  chat-list'>
            <ChatList user={session.user as User}/>
          </div>
          <div className='col-span-9 border h-full'>
            {children}
          </div>
            
        </div>
        </ChatProvider>
  )
}

export default HomeLayout
