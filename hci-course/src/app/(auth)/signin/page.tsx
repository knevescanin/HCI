export default function SignIn() {
    return (
        <div className="rounded-2xl flex flex-row mx-auto my-auto p-0 shadow-2xl max-w-7xl max-h-lvh">
            <div className="bg-[#1A20AB] flex-1 text-left p-10 rounded-l-2xl flex flex-col justify-center items-center">
                <div className="font-latoBlack text-5xl mt-12 mb-12 text-white text-center">
                    <p className="[text-shadow:_0_5px_0_rgb(0_0_0_/_90%)]">Sign In</p>
                </div>
                <div className="flex flex-col gap-1 mb-4 w-full max-w-sm">
                    <label className="block text-lg font-latoBlack text-white">E-mail</label>
                    <div className="relative">
                        <input type="text" placeholder="E-mail" className="border border-white rounded-2xl text-center font-semibold text-xl w-full placeholder-[#1A20AB] placeholder-opacity-85 shadow-lg shadow-black py-1" />
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

                <div className="flex flex-col gap-1 mb-4 w-full max-w-sm">
                    <label className="block text-lg font-latoBlack text-white">Password</label>
                    <div className="relative">
                        <input type="password" placeholder="Password" className="border border-white rounded-2xl text-center font-semibold text-xl w-full placeholder-[#1A20AB] placeholder-opacity-85 shadow-lg shadow-black py-1" />
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



                <button className="mt-12 p-3 bg-white text-[#1A20AB] font-bold rounded-2xl text-xl w-1/2 max-w-md mb-12 shadow-lg shadow-black">Sign In</button>
                <div className="flex items-center my-2">
                    <div className="flex-grow border-t border-black"></div>
                    <span className="mx-4 text-white font-semibold">Or</span>
                    <div className="flex-grow border-t border-black"></div>
                </div>
            </div>



            <div className="bg-white flex-1 text-center p-0 text-[#1A20AB] shadow-lg rounded-r-2xl flex flex-col justify-center">
                <h1 className="text-5xl font-latoBlack mb-6 [text-shadow:_0_1.2px_0_rgb(0_0_0_/_90%)]">Welcome Back!</h1>
                <p className="text-2xl mt-6 mb-6 mx-20">
                    <span className="font-black">Sign in</span> to continue enjoying all the great features we offer.
                </p>
                <p className="text-lg mt-10 text-black">
                    Don’t have an account? <a href="../signup" className="no-underline text-[#1A20AB] font-black">Sign up here</a>.
                </p>
            </div>
        </div>
    );
}
