
import React from 'react'
import { auth } from "@/auth"; 
import { headers } from "next/headers";
import { redirect } from 'next/navigation';
import ChatList from '@/components/ChatList';
import MainContent from '@/components/MainContent';
import { User } from '@/types';
async function Home() {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    console.log('session',session)
    if(!session?.session) return redirect('/signin')
    
    return (
        <div className='lg:grid grid-cols-12 h-screen'>
          <div className='col-span-3 border  chat-list'>
            <ChatList user={session.user as User}/>
          </div>
          <div className='col-span-9 border h-full'><MainContent user={session.user as User}/></div>
            
        </div>
  )
}

export default Home
