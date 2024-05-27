'use client';
import React from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const name = formData.get('name') as string;
  const password = formData.get('password') as string;

  try {
    const result = await signIn('credentials', {
      redirect: false,
      name,
      password,
    });

    if (result?.error) {
      console.error('Sign-in error:', result.error);
      alert('Sign-in failed: ' + result.error);

    } else if (result?.ok) {
      console.log('Sign-in successful');
      alert('Sign-in successful!');
      window.location.href = '/home'; // redirects to '/home'
    }
  } catch (error) {
    alert('Sign-in error:' + error);
  }
}

export default function SignInPage() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-1 bg-[--darkestBlue]">

      <div className="w-96 bg-[#D9D9D9] mb-[-5px] flex justify-center items-center flex-col py-3 rounded-t-xl">
        <h2 className="text-[--lightBlue] gloria-hallelujah-regular">
          <b>Time Manager</b>
        </h2>

        <div className="bg-[--lightBlue] w-28 h-0.5"></div>

        <h1 id="blue_webkit" className="text-[#ebe9e5] text-2xl tracking-wide inconsolata-500">
          <b>Login Page</b>
        </h1>
      </div>

      <div className="bg-[#6E7F95] h-1 w-96 mb-[-10px] z-10"></div>

      <form onSubmit={handleSignIn} className="w-96 p-10 flex flex-col justify-center items-center bg-[--offWhite] rounded-b-xl border-4 boreder-[#D9D9D9] gap-2 inconsolata-500">

        <input name="name" type="text" placeholder="Username" className="p-1 border-2 border-[#708196] rounded-md placeholder:text-[#708196] " />

        <input name="password" type="password" placeholder="Password" className="p-1 border-2 border-[#708196] rounded-md placeholder:text-[#708196]" />
        
        <button type='submit' className="border-2 bg-[#708196] border-[--lightBlue] w-28 rounded-md text-[#f4f3f3] inconsolata-500">Login</button>
        
        <Link href="/signup">
          <i className="underline text-[--lightBlue]">sign-up page -{'>'}</i>
        </Link>
      </form>
    </div>
    
  );
}

