"use client"

import React, { useEffect, useRef, useState } from 'react'
import ChatBubble from './ChatBubble'
import { ChevronDown } from 'lucide-react';
import { handleScroll, scrollToBottom, scrollToBottomInstantly } from '@/app/(home)/helpers/chatSectionHelpers';
import { IMessages } from '@/lib/types';




const ChatSection = ({ messages }: { messages: IMessages[] }) => {
    const [showScrollButton, setShowScrollButton] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollToBottomInstantly(chatContainerRef);
    }, [messages]);


    return (
        <div className='relative h-[75%]'>
            <div className='h-full overflow-hidden overflow-y-auto px-[3.5rem]' onScroll={() => handleScroll(chatContainerRef, setShowScrollButton)} ref={chatContainerRef}>

                {
                    messages.map((msg, index) => {
                        return <ChatBubble key={`msg-${index}`} isMe={msg.isMe} message={msg.message} />
                    })
                }

                <div ref={chatEndRef} />
                {showScrollButton && (
                    <ChevronDown onClick={() => scrollToBottom(chatEndRef)} className='text-muted-foreground absolute bottom-5 z-30 rounded-full right-6 drop-shadow-md cursor-pointer bg-white hover:bg-gray-100 shadow-md p-2' size={40} strokeWidth={2} />
                )}
            </div>
        </div>
    )
}

export default ChatSection


