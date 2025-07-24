"use client"
import React from 'react'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
function signin() {
  const signUpFunction =async()=>{
    await authClient.signUp.email({
      email: "sSf8O@example.com",
      password: "Vignesh1234",
      name: "Vignesh"
    }, {
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error) => {
        console.log(error)
      },
      onRequest: () => {
        console.log("request")
      }
    })
  }
  const signinFunction =async()=>{ 
    await authClient.signIn.email({
      email: "sSf8O@example.com",
      password: "Vignesh1234"
    }, {
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error) => {
        console.log(error)
      },
      onRequest: () => {
        console.log("request")
      }
    })
  }

  const signOutFunction = async() => await authClient.signOut(
    {},{
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error) => {
        console.log(error)
      },
      onRequest: () => {
        console.log("request")
      }
    }
  )
  const githubSigninFunction = async() =>  {
    await authClient.signIn.social({
    provider: "github"
  }, {
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error) => {
      console.log(error)
    },
    onRequest: () => {
      console.log("request")
    }
  })
}
  return (
    <div>
      <Button onClick={signUpFunction}>Signup</Button>
      <Button onClick={signinFunction}>Signin</Button>
      <Button onClick={githubSigninFunction}>Github Signin</Button>
      <Button onClick={signOutFunction}>Signout</Button>
      <Link href="/home">Dashboard</Link>
    </div>
  )
}

export default signin
