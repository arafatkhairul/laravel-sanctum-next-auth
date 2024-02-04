"use client"
import React from 'react';
import { signIn } from "next-auth/react"

const HomeComponent = () => {
    return (
        <div>
            <button onClick={() => signIn()}>Login</button>
        </div>
    );
};

export default HomeComponent;