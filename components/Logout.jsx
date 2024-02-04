"use client"
import React from 'react';
import { signIn, signOut, useSession } from "next-auth/react"
import Link from 'next/link';

const Logout = () => {
    const { status, data } = useSession();

    console.log(data);
    return (
        <div className='flex items-center space-x-4'>
            {status === 'loading' && <h1>hey gorib wait kor login kora hosse !</h1>}
            {status === 'authenticated' ? <button onClick={() => signOut({ redirect: '/login' })}>Logout</button> : <Link href="/login">Login</Link>}
        </div>
    );
};

export default Logout;