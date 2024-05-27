'use client'
import bcrypt from 'bcryptjs';
import { saveUser } from '@/utils/users';
import Link from 'next/link';

const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const name = formData.get('name') as string;
  const email = formData.get('email') as string; 
  const password = formData.get('password') as string;

  // hash password before saveUser
  const hashedPassword = await bcrypt.hash(password, 10);

  if (!name || !password) {
    console.error('Please fill in all required fields.');
    return;
  }

  try {
    const result = await saveUser(name, email, hashedPassword);

    if (result == "Something went wrong ...") {
      alert('Sign-up failed.');

    } else {
      alert('Sign-in successful!');
      window.location.href = '/login'; // redirects to '/login'
    }
  } catch (error) {
    alert('Sign-in error:' + error);
  }
};

const SignUp = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-1 bg-[--darkestBlue]">

      <div className="w-96 bg-[#e5e1e1] mb-[-5px] flex justify-center items-center flex-col py-3 rounded-t-xl">
        <h2 className="text-[#8B3037] gloria-hallelujah-regular">
          <b>Time Manager</b>
        </h2>

        <div className="bg-[#8B3037] w-28 h-0.5"></div>

        <h1 id="red_webkit" className="text-[--offWhite] text-2xl tracking-wide inconsolata-500">
          <b>Login Page</b>
        </h1>
      </div>

      <div className="bg-[#8B3037] h-1 w-96 mb-[-10px] z-10"></div>

      <form onSubmit={handleSignUp} className="w-96 p-10 flex flex-col justify-center items-center bg-[--offWhite] rounded-b-xl border-4 boreder-[#D9D9D9] gap-2">

        <input name="name" type="text" placeholder="Username" className="p-1 border-2 border-[#8B3037] rounded-md placeholder:text-[#AC7679] inconsolata-500" />

        <input name="email" type="text" placeholder="Email" className="p-1 border-2 border-[#8B3037] rounded-md placeholder:text-[#AC7679] inconsolata-500" />

        <input name="password" type="password" placeholder="Password" className="p-1 border-2 border-[#8B3037] rounded-md placeholder:text-[#AC7679] inconsolata-500" />
        
        <button type='submit' className="border-2 bg-[#8B3037] border-[#ffffff] w-28 rounded-md text-[#D9D9D9] inconsolata-500">Sign Up</button>
        
        <Link href="/login">
          <i className="underline text-[#8B3037] inconsolata-500">{'<'}- login page</i>
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
