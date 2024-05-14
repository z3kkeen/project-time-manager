import React from 'react';
import Link from "next/link";

export default function SignupPage() {
  return (
    <form action='/home' method='POST' className="flex flex-col items-center gap-1 w-60">
      <h1 className="text-xl tracking-wide"><b>Sign-Up page</b></h1>
      <input name="username" type="text" placeholder="username" className="px-2 border-2 border-slate-500 rounded-md" />
      <input name="email" type="text" placeholder="email" className="px-2 border-2 border-slate-500 rounded-md" />
      <input name="password" type="password" placeholder="password" className="px-2 border-2 border-slate-500 rounded-md" />
      
      <button type='submit' className="border-2 bg-slate-600 text-white w-28 rounded-md">Continue</button>
      <Link href={"/"} className="underline"><i>login page -></i></Link>
    </form>
  )
}

