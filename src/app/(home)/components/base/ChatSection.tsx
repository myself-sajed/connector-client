/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, { useMemo, useRef, useState } from 'react';
import ChatBubble from './ChatBubble';
import { ChevronDown } from 'lucide-react';
import { Message } from '@/lib/types';
import { handleScroll, scrollToBottom } from '../../helpers/chatSectionHelpers';
import { Badge } from '@/components/ui/badge';
import Loading from '@/components/ui/loading';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import socket from '@/lib/client-socket';
import { SelectedChat } from '@/redux/slices/activeSlice';
import { MessagesState } from './ChatContainer';
import EditReplyMessageDialog from './EditMessageDialog';
import useChatSectionHook from '../../js/useChatSectionHook';




type PropType = {
    setMessages: React.Dispatch<React.SetStateAction<{ [key: string]: Message[] }>>;
    messages: { [key: string]: Message[] };
    selectedChat: SelectedChat;
};



const ChatSection = ({ messages, setMessages, selectedChat }: PropType) => {
    const [showScrollButton, setShowScrollButton] = useState(false);
    const [chatId, setChatId] = useState<string>(selectedChat._id!)
    const chatEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const user = useSelector((state: RootState) => state.user.user) || null;
    const selectedContact = useSelector((state: RootState) => state.active.selectedContact);
    const [editMessage, setEditMessage] = useState<Message | null>(null)
    const [messageOperation, setMessageOperation] = useState<"reply" | "unsend" | null>(null)


    const { isError, isLoading } = useChatSectionHook({ setMessages, messages, selectedChat, chatContainerRef, chatId, setChatId, user })


    const memoizedMessages = useMemo(() => {
        const chatMessages = messages[chatId] || [];
        return chatMessages.map((message) => (
            <ChatBubble setEditMessage={setEditMessage} key={message._id} isMe={user === message.author._id} message={message} setMessageOperation={setMessageOperation} />
        ));
    }, [messages, chatId, selectedChat, selectedContact]);

    return (
        <div className='relative h-[75%]'>
            <div className='h-full overflow-hidden overflow-y-auto md:px-[3.5rem] pr-1' onScroll={() => handleScroll(chatContainerRef, setShowScrollButton)} ref={chatContainerRef}>
                {isError ? (
                    <Badge className="flex items-center justify-center w-full my-10">
                        Error fetching messages...
                    </Badge>
                ) : isLoading ? (
                    <Loading title='Getting your messages...' />
                ) : (
                    <>
                        <EditReplyMessageDialog setMessages={setMessages} editMessage={editMessage} setEditMessage={setEditMessage} selectedChat={selectedChat} messageOperation={messageOperation} setMessageOperation={setMessageOperation} />
                        {memoizedMessages}
                    </>
                )}
                <div ref={chatEndRef} />
                {showScrollButton && (
                    <ChevronDown onClick={() => scrollToBottom(chatEndRef)} className='text-muted-foreground absolute bottom-5 z-30 rounded-full right-4 drop-shadow-md cursor-pointer bg-white hover:bg-gray-100 shadow-md p-2' size={40} strokeWidth={2} />
                )}
            </div>
        </div>
    );
};

export default ChatSection;
