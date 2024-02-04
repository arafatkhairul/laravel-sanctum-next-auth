"use client"
import React from 'react';
import { signIn, useSession } from "next-auth/react";
import { redirect } from 'next/navigation';

const Login = () => {
    const { data, status } = useSession();

    if (status === 'authenticated') {
        redirect('/');
    }

    const handleLogin = async () => {
        const res = await signIn("credentials", {
            redirect: '/',
            // callbackUrl: '/',
            phone_number: "01308008954",
            password: 12345678
        });

        console.log(res);
    }

    return (
        <div className='border-[1px] p-4 rounded-md flex-col space-x-4 flex min-h-screen justify-center items-center'>
            <button onClick={handleLogin} className='bg-black text-white px-4 py-2 rounded-md'>Login</button>
        </div>
    );
};

export default Login;