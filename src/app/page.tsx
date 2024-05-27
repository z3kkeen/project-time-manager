import React from 'react';
export default function SignupPage() {
  return (
    <div className="h-screen w-full flex  items-center flex-col bg-[--darkestBlue]">
      <header className="w-full h-32 mt-6 bg-[--darkerBlue] flex justify-center items-center">
        <div className="w-80 h-20 flex justify-center items-center flex-col bg-[--offWhite] border-4 rounded-md border-[#8B3037]">
          <h1 className="text-[#8B3037] tracking-wider gloria-hallelujah-regular">
            <b>{"zekken'"}s</b>
          </h1>

          <div className="bg-[#8B3037] w-28 h-0.5"></div>

          <h1 id="red_webkit" className="text-[--offWhite] text-2xl inconsolata-500">
            <strong>Time Manager</strong>
          </h1>
        </div>
      </header>

      <main className="bg-orange-100/70 bg-orange-200- w-full h-80 flex flex-col justify-center items-center mt-5 border-2 border-[#D9D9D9]">

        <a href="/login" className="w-72 h-20 border-2 border-[#2f3f52] bg-[--lightBlue] p-5 rounded-md flex flex-col justify-center items-center gap-2">
          <div className="bg-white w-28 h-0.5"></div>
          <div className="text-white inconsolata-500"><b>Login</b></div>
        </a>

        <p className="my-4 text-[#8B3037] text-lg">
          <b className="cursor-default gloria-hallelujah-regular">- or -</b>
        </p>

        <a href="/signup" className="w-72 rounded-md border-2 border-[#8B3037] bg-[--offWhite] p-5 flex flex-col justify-center items-center gap-2">
          <div className="text-[#8B3037] inconsolata-500"><b>Sign up!</b></div>
          <div className="bg-[#8B3037] w-28 h-0.5"></div>
        </a>

      </main>
    </div>
  )
}