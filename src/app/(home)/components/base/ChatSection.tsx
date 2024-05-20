"use client"

import React, { useEffect, useRef, useState } from 'react'
import ChatBubble from './ChatBubble'
import { ChevronDown } from 'lucide-react';

const ChatSection = () => {
    const [showScrollButton, setShowScrollButton] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToBottomInstantly = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottomInstantly();
    }, []);

    const handleScroll = () => {
        if (chatContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
            if (scrollHeight - scrollTop > clientHeight + 100) {
                setShowScrollButton(true);
            } else {
                setShowScrollButton(false);
            }
        }
    };


    return (
        <div className='relative h-[75%]'>
            <div className='h-full overflow-hidden overflow-y-auto px-[3.5rem]' onScroll={handleScroll} ref={chatContainerRef}>
                <ChatBubble isMe={true} message='Hello' />
                <ChatBubble isMe={false} message='Hey!' />
                <ChatBubble isMe={true} message='Coming to the party??' />
                <ChatBubble isMe={true} message='Coming to the party??' />
                <ChatBubble isMe={true} message='Coming to the party??' />
                <ChatBubble isMe={false} message='Yeah.' />
                <ChatBubble isMe={true} message='Meet you at 6 then!' />
                <ChatBubble isMe={false} message='Sure shot!!' />
                <ChatBubble isMe={false} message='Hey' />
                <ChatBubble isMe={false} message='Hii' />
                <ChatBubble isMe={false} message='Hii' />
                <ChatBubble isMe={false} message='Hii' />
                <ChatBubble isMe={false} message='Hii' />
                <ChatBubble isMe={false} message='Hii' />
                <ChatBubble isMe={false} message='Hii' />
                <ChatBubble isMe={false} message='Hii' />
                <ChatBubble isMe={true} message='Meet you at 6 then!' />
                <ChatBubble isMe={true} message='What??' />

                <div ref={chatEndRef} />
                {showScrollButton && (
                    <ChevronDown onClick={scrollToBottom} className='text-muted-foreground absolute bottom-5 z-30 rounded-full right-6 drop-shadow-md cursor-pointer bg-white shadow-md p-2' size={40} strokeWidth={2} />
                )}
            </div>
        </div>
    )
}

export default ChatSection
