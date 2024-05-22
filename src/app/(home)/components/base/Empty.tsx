"use client"

import { Button } from '@/components/ui/button'
import { tabs } from '@/lib/constants'
import { setCurrentTab } from '@/redux/slices/activeSlice'
import { ChevronRight, Lock, Waypoints } from 'lucide-react'
import React from 'react'
import { useDispatch } from 'react-redux'

const Empty = () => {

    const dispatch = useDispatch()

    return (
        <div className="w-full h-full text-center">
            <Waypoints strokeWidth={2} size={550} className="text-gray-100 absolute z-20 top-0 left-0 right-0 mx-auto" />
            <div className="relative z-30 flex items-center justify-center flex-col h-full">
                <Waypoints strokeWidth={2} size={100} className="text-primary" />

                <p style={{ lineHeight: '85px' }} className="text-[5rem] font-bold mt-10 text-primary">Connector</p>
                <p>The most trusted & secure chatting platform for everyone.</p>


                <Button onClick={() => dispatch(setCurrentTab(tabs.CONTACTS))} className='mt-10 flex items-center justify-center gap-5'><span>Start Chatting</span><ChevronRight strokeWidth={2.5} size={17} /></Button>
                <div className="flex items-center gap-2 justify-center text-muted-foreground text-sm mt-[7rem]">
                    <Lock size={13} /> Your chats are end-to-end encrypted.
                </div>
            </div>


        </div>
    )
}

export default Empty
