
import React from 'react'
// import { authClient } from '@/lib/auth-client'
import { auth } from "@/auth"; // path to your Better Auth server instance
import { headers } from "next/headers";
import { redirect } from 'next/navigation';
async function Home() {
    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })
    console.log('session',session)
    if(!session?.session) return redirect('/signin')
    
    return (
        <div>
            Dash
        </div>
  )
}

export default Home
