"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Page() {

    const router = useRouter();
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Validate email
        if (!emailRegex.test(form.email)) {
            setError("Please enter a valid email address.");
            return;
        }

        // Validate password strength
        if (!passwordRegex.test(form.password)) {
            setError(
                "Password must be at least 8 characters long and contain both letters and numbers."
            );
            return;
        }

        // Check if passwords match
        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        console.log("Submitting form", form); // ✅ Log form data before sending

        const response = await fetch("/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const data = await response.json();
        console.log("Response from API:", data); // ✅ Log the response data

        if (!response.ok) {
            setError(data.error || "Signup failed");
            return;
        }

        alert("Signup successful! You can now log in.");

        router.push("/signin");
    };

    return (

        <div className="mx-auto my-10 w-11/12 max-w-4xl shadow-2xl rounded-b-lg md:rounded-none flex flex-col md:flex-row 2xl:my-auto">
            <form onSubmit={handleSubmit} className="bg-[#1A20AB] flex-1 text-left p-6 md:p-10 rounded-t-lg md:rounded-l-2xl flex flex-col justify-center items-center">
                <div className="font-latoBlack md:mt-12 md:mb-12 text-white text-center">
                    <p className="text-3xl md:text-5xl [text-shadow:_0_5px_0_rgb(0_0_0_/_90%)]">Sign Up</p>
                </div>
                <div className="flex flex-col gap-1 md:mb-4 w-full max-w-sm">
                    <label className="block md:text-lg font-latoBlack text-white">First Name</label>
                    <div className="relative">
                        <input type="text" placeholder="First Name" className="border border-white rounded-2xl text-center font-semibold text-lg md:text-xl w-full max-w-sm placeholder-[#1A20AB] placeholder-opacity-85 shadow-lg shadow-black py-1" name="firstName" value={form.firstName} onChange={handleChange} required />
                        <div className="absolute inset-y-0 items-center flex pl-3 pointer-events-none">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle cx="12" cy="9" r="3.5" fill="#1A20AB" />
                                <path
                                    d="M4 17C4 18.1 7 19 12 19C17 19 20 18.1 20 17C20 15.9 17 14 12 14C7 14 4 15.9 4 17Z"
                                    fill="#1A20AB"
                                />
                            </svg>
                        </div>
                    </div>

                </div>

                <div className="flex flex-col gap-1 mt-3 md:mt-0 md:mb-4 w-full max-w-sm">
                    <label className="block md:text-lg font-latoBlack text-white">Last Name</label>
                    <div className="relative">
                        <input type="text" placeholder="Last Name" className="border border-white rounded-2xl text-center font-semibold text-lg md:text-xl w-full max-w-sm placeholder-[#1A20AB] placeholder-opacity-85 shadow-lg shadow-black py-1" name="lastName" value={form.lastName} onChange={handleChange} required />
                        <div className="absolute inset-y-0 items-center flex pl-3 pointer-events-none">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle cx="12" cy="9" r="3.5" fill="#1A20AB" />
                                <path
                                    d="M4 17C4 18.1 7 19 12 19C17 19 20 18.1 20 17C20 15.9 17 14 12 14C7 14 4 15.9 4 17Z"
                                    fill="#1A20AB"
                                />
                            </svg>

                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-1 mt-3 md:mt-0 md:mb-4 w-full max-w-sm">
                    <label className="block md:text-lg font-latoBlack text-white">E-mail</label>
                    <div className="relative">
                        <input type="email" placeholder="E-mail" className="border border-white rounded-2xl text-center font-semibold text-lg md:text-xl w-full max-w-sm placeholder-[#1A20AB] placeholder-opacity-85 shadow-lg shadow-black py-1" name="email" value={form.email} onChange={handleChange} required />
                        <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
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
                        <input type="password" placeholder="Password" className="border border-white rounded-2xl text-center font-semibold text-lg md:text-xl w-full max-w-sm placeholder-[#1A20AB] placeholder-opacity-85 shadow-lg shadow-black py-1" name="password" value={form.password} onChange={handleChange} required />
                        <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
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

                <div className="flex flex-col gap-1 mt-3 md:mt-0 md:mb-4 w-full max-w-sm">
                    <label className="block md:text-lg font-latoBlack text-white">Confirm Password</label>
                    <div className="relative">
                        <input type="password" placeholder="Confirm Password" className="border border-white rounded-2xl text-center font-semibold text-lg md:text-xl w-full max-w-sm placeholder-[#1A20AB] placeholder-opacity-85 shadow-lg shadow-black py-1" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
                        <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
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

                    {error && <p className=" text-red-500 text-md">{error}</p>}
                </div>
                <button type="submit" className="mt-8 md:mt-12 p-1 md:p-3 bg-white text-[#1A20AB] font-bold rounded-2xl text-lg md:text-xl w-full max-w-sm md:w-1/2 md:max-w-md md:mb-8 shadow-lg shadow-black">Sign Up</button>
            </form>

            <div className="bg-white flex-1 text-center p-0 text-[#1A20AB] shadow-lg rounded-b-lg md:rounded-r-2xl flex flex-col justify-center">
                <h1 className="text-xl md:text-5xl font-latoBlack mb-2 md:mb-6 md:[text-shadow:_0_1.2px_0_rgb(0_0_0_/_90%)]">Ready To Save Big?</h1>
                <p className="md:text-2xl px-2 md:px-0 md:mt-6 md:mb-6 md:mx-20">
                    Then <span className="font-black text-lg md:text-2xl">join us</span>, quickly <span className="font-black text-lg md:text-2xl">compare prices</span> from various stores and <span className="font-black text-lg md:text-2xl">find the best deals</span> available!
                </p>
                <p className="md:text-lg mt-3 md:mt-10 text-black">
                    Already have an account? <a href="../signin" className="no-underline text-[#1A20AB] font-black text-lg">Sign in here</a>.
                </p>
            </div>

        </div>
    );
}