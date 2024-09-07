'use client'

import axios from 'axios';
import { SessionProvider } from 'next-auth/react'

export default function AuthProvider({ children }: {
    children: React.ReactNode
}) {
    
  axios.defaults.baseURL = process.env.BASE_URL;
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}
