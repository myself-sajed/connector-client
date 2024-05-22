"use client"
import { Provider as ReduxProvider } from 'react-redux'
import { store } from "@/redux/store"
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

import React from 'react'
import { usePathname } from 'next/navigation'

const Providers = ({ children }: { children: React.ReactNode }) => {

    const pathname = usePathname()

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 100000,
                enabled: pathname === '/'
            }
        }
    })
    return (
        <>
            <ReduxProvider store={store}>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </ReduxProvider>

        </>
    )
}

export default Providers
