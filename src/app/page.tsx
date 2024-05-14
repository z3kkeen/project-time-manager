'use client'
import React from 'react'
import { useState } from 'react'
import Profile from './components/Profile'
import Link from 'next/link'

export default function Login () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  const handleSubmit = async (e, path) => {
    e.preventDefault()
    const response = await fetch(`/api/${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    if (response.ok) {
      const user = await response.json()
      setUser(user)
      setIsLoggedIn(true)
    } else {
      console.log(`${path} failed`)
    }
  }

  return (
    <div>
      {!isLoggedIn ? (
          <div className="h-screen w-full pt-60 flex items-center flex-col gap-10">
            <h1 className="text-xl tracking-wide"><b>Login page</b></h1>
            
            <form action='/home' method="POST" className="flex flex-col items-center gap-1 w-60">
              <input name="username" type="text" placeholder="username" className="px-2 border-2 border-slate-500 rounded-md" />
              <input name="password" type="password" placeholder="password" className="px-2 border-2 border-slate-500 rounded-md" />
              
              <button type="submit" className="border-2 bg-slate-600 text-white w-20 rounded-md">Login</button>
            </form>

            <Link href={"/signup"} className="underline"><i>signup page</i></Link>
        </div>
      ) : (
        <Profile user={user} />
      )}
    </div>
  )
}