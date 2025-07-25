'use client'
import React from 'react'
import SignIn from '@/components/sign-in'
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
function Signin() {
  return (
    <div className='m-5'>
      <Button className='float-right' onClick={() => authClient.signOut()}>Sign out</Button>
      <SignIn />     
    </div>
  )
}

export default Signin
