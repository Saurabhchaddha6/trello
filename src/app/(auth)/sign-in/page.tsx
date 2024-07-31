/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setMessage(result.error);
    } else {
      router.replace('/dashboard');
    }
  };

  return (
<div className="relative w-full h-screen bg-custom-gradient flex items-center justify-center">
      <div className="box-border flex flex-col items-center p-16 gap-8 w-[648px] h-auto bg-frame-gradient border border-gray-300 rounded-lg">
        <div className="w-full text-center font-barlow font-semibold text-4xl leading-[58px] text-gray-800 mb-8">
          Welcome to <span className="text-[#4534AC]">Workflo</span>!
        </div>
        <form className="flex flex-col items-center gap-10 w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col items-start gap-6 w-full">
            <div className="flex flex-row items-center p-4 gap-2 w-full h-14 bg-gray-200 rounded-md">
              <input
                type="email"
                placeholder="Your email"
                className="w-full h-full bg-transparent text-gray-600 font-inter text-lg outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-row items-center p-4 gap-2 w-full h-14 bg-gray-200 rounded-md">
              <input
                type="password"
                placeholder="Password"
                className="w-full h-full bg-transparent text-gray-600 font-inter text-lg outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="flex justify-center items-center w-full h-14 bg-gradient-to-b from-purple-700 to-purple-900 text-white font-inter text-lg rounded-md shadow-md"
          >
            Login
          </button>
        </form>
        {message && <div className="mt-4 text-red-500">{message}</div>}
        <div className="flex flex-row justify-center items-start gap-2 w-full mt-4">
          <div className="text-gray-600 text-lg">
            Don't have an accoun? Create a
          </div>
          <a href="/sign-up" className="text-blue-600 text-lg">
            new account
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
