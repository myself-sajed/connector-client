/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, { useEffect, useMemo, useRef, useState } from 'react'
import ChatBubble from './ChatBubble'
import { ChevronDown } from 'lucide-react';
import { Contact, Message } from '@/lib/types';
import { handleScroll, scrollToBottom, scrollToBottomInstantly } from '../../helpers/chatSectionHelpers';
import { getMessages } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import Loading from '@/components/ui/loading';
import { SelectedChatUser } from '@/redux/slices/activeSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

type PropType = {
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    messages: Message[];
    selectedContact: SelectedChatUser;
}

const ChatSection = ({ messages, setMessages, selectedContact }: PropType) => {
    const [showScrollButton, setShowScrollButton] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const user = useSelector((state: RootState) => state.user.user)

    const { data: serverMessages, isLoading, isError } = useQuery({
        queryKey: ['message-list', selectedContact?.chatId, user],
        queryFn: () => getMessages(selectedContact?.chatId || null, user || null),
        enabled: (selectedContact && user) ? true : false
    })


    useEffect(() => {
        if (serverMessages?.data) {
            setMessages(serverMessages?.data)
        }
    }, [serverMessages?.data])



    useEffect(() => {
        scrollToBottomInstantly(chatContainerRef);
    }, [messages]);

    const memoizedMessages = useMemo(() => {
        return messages.map((message) => {
            console.log(message.author._id, user, message.author._id === user)
            return <ChatBubble key={message._id} isMe={(user === message.author._id) ? true : false} message={message} />
        })
    }, [messages])


    return (
        <div className='relative h-[75%]'>
            <div className='h-full overflow-hidden overflow-y-auto px-[3.5rem]' onScroll={() => handleScroll(chatContainerRef, setShowScrollButton)} ref={chatContainerRef}>

                {
                    isError ? <Badge className="flex items-center justify-center w-full my-10">
                        Error fetching messages...
                    </Badge>
                        : isLoading
                            ? <Loading title='Getting your messages...' />
                            : <>
                                {
                                    memoizedMessages
                                }
                            </>
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


