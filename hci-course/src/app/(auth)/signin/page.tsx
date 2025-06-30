"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from 'next/image'

export default function SignIn() {

    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });

    const handleOAuthSignIn = async (provider: string) => {
        await signIn(provider, { callbackUrl: "/" });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await signIn("credentials", {
            redirect: false,
            email: form.email,
            password: form.password,
        });

        if (res?.error) {
            alert("Invalid login credentials");
        } else {
            router.push("/"); // Redirect after successful login
        }
    };
    return (
        <div className="my-auto">
            <div className="mx-auto my-10 w-11/12 max-w-4xl shadow-2xl rounded-lg md:rounded-2xl flex flex-col md:flex-row">
                <form onSubmit={handleSubmit} className="bg-[#1A20AB] flex-1 text-left p-6 md:p-10 rounded-t-lg md:rounded-l-2xl md:rounded-tr-none flex flex-col justify-center items-center">
                    <div className="font-latoBlack md:mt-12 md:mb-12 text-white text-center">
                        <p className="text-3xl md:text-5xl [text-shadow:_0_5px_0_rgb(0_0_0_/_90%)]">Sign In</p>
                    </div>
                    <div className="flex flex-col gap-1 md:mb-4 w-full max-w-sm">
                        <label className="block md:text-lg font-latoBlack text-white">E-mail</label>
                        <div className="relative">
                            <input type="email" placeholder="E-mail" className="border border-white rounded-2xl text-center font-semibold text-lg md:text-xl w-full max-w-sm placeholder-[#1A20AB] placeholder-opacity-85 shadow-md shadow-black py-1" name="email" onChange={handleChange} required />
                            <div className="absolute inset-y-0 items-center flex pl-3 pointer-events-none">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="#1A20AB"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6V8L12 13L2 8V6ZM2 10L12 15L22 10V18C22 18.5523 21.5523 19 21 19H3C2.44772 19 2 18.5523 2 18V10Z"
                                        fill="#1A20AB"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 mt-3 md:mt-0 md:mb-4 w-full max-w-sm">
                        <label className="block md:text-lg font-latoBlack text-white">Password</label>
                        <div className="relative">
                            <input type="password" placeholder="Password" className="border border-white rounded-2xl text-center font-semibold text-lg md:text-xl w-full max-w-sm placeholder-[#1A20AB] placeholder-opacity-85 shadow-md shadow-black py-1" name="password" onChange={handleChange} required />
                            <div className="absolute inset-y-0 items-center flex pl-3 pointer-events-none">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="#1A20AB"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M6 10V7C6 4.7 8.7 2 12 2C15.3 2 18 4.7 18 7V10H20C20.6 10 21 10.4 21 11V20C21 20.6 20.6 21 20 21H4C3.4 21 3 20.6 3 20V11C3 10.4 3.4 10 4 10H6ZM8 10H16V7C16 5.8 14.2 4 12 4C9.8 4 8 5.8 8 7V10ZM12 13C11.4 13 11 13.4 11 14V17C11 17.6 11.4 18 12 18C12.6 18 13 17.6 13 17V14C13 13.4 12.6 13 12 13Z" />
                                </svg>
                            </div>
                        </div>
                    </div>



                    <button type="submit" className="mt-8 md:mt-12 p-1 md:p-3 bg-white text-[#1A20AB] font-bold rounded-2xl text-lg md:text-xl w-full max-w-sm md:w-1/2 md:max-w-md md:mb-8 shadow-md shadow-black">Sign In</button>
                    <div className="flex items-center my-6 w-full max-w-sm md:my-0 md:mb-8">
                        <div className="flex-grow border-t border-white"></div>
                        <span className="mx-4 text-white font-semibold">Or</span>
                        <div className="flex-grow border-t border-white"></div>
                    </div>

                    {/* Email & Password Sign In */}

                    <button
                        type="button"
                        onClick={() => handleOAuthSignIn("google")}
                        className="flex items-center justify-center w-full max-w-sm md:w-72 bg-white md:mb-6 text-gray-700 border border-gray-300 rounded-full hover:shadow-md transition duration-300 ease-in-out hover:bg-gray-300 py-2 px-4 font-semibold shadow-md shadow-black"
                    >
                        <Image src="/google-icon.svg" width={100} height={100} alt="Google" className="w-6 h-6 mr-2" />
                        Sign in with Google
                    </button>

                    <button
                        type="button"
                        onClick={() => handleOAuthSignIn("facebook")}
                        className="flex items-center justify-center w-full max-w-sm md:w-72 mt-4 md:mt-0 bg-[#1877F2] text-white rounded-full hover:shadow-md transition duration-300 ease-in-out hover:bg-[#165BD4] py-2 px-4 font-semibold shadow-md shadow-black"
                    >
                        <Image src="/facebook-icon.svg" width={100} height={100} alt="Facebook" className="w-6 h-6 mr-2" />
                        Sign in with Facebook
                    </button>

                </form>



                <div className="bg-white flex-1 text-center p-0 text-[#1A20AB] shadow-lg rounded-lg md:rounded-l-none md:rounded-r-2xl flex flex-col justify-center">
                    <h1 className="text-xl md:text-5xl font-latoBlack mb-2 md:mb-6 md:[text-shadow:_0_1.2px_0_rgb(0_0_0_/_90%)]">Welcome Back!</h1>
                    <p className="md:text-2xl px-2 md:px-0 md:mt-6 md:mb-6 md:mx-12">
                        <span className="font-black text-lg md:text-2xl">Sign in</span> to continue enjoying all the great features we offer.
                    </p>
                    <p className="md:text-lg mt-3 md:mt-10 text-black">
                        Don’t have an account? <a href="../signup" className="no-underline text-[#1A20AB] font-black text-lg">Sign up here</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}
