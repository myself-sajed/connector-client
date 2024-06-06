"use client"
import { Provider as ReduxProvider } from 'react-redux'
import { store } from "@/redux/store"
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

import React from 'react'
import { usePathname } from 'next/navigation'
import { Toaster } from '@/components/ui/sonner'
import useAuthenticate from './hooks/useAuthenticate'

const Providers = ({ children }: { children: React.ReactNode }) => {

    const pathname = usePathname()

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                enabled: pathname === '/'
            }
        }
    })


    useAuthenticate()

    return (
        <>
            <ReduxProvider store={store}>
                <QueryClientProvider client={queryClient}>
                    <>
                        {children}
                        <Toaster position="top-right" toastOptions={{ duration: 2300 }} richColors={true} />
                    </>
                </QueryClientProvider>
            </ReduxProvider>

        </>
    )
}

export default Providers
