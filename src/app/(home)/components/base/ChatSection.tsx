/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, { useEffect, useMemo, useRef, useState } from 'react';
import ChatBubble from './ChatBubble';
import { ChevronDown } from 'lucide-react';
import { Chat, Contact, Message } from '@/lib/types';
import { handleScroll, scrollToBottom, scrollToBottomInstantly } from '../../helpers/chatSectionHelpers';
import { getMessages } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import Loading from '@/components/ui/loading';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import socket from '@/lib/client-socket';
import { SelectedChat } from '@/redux/slices/activeSlice';
import { MessagesState } from './ChatContainer';
import EditMessageDialog from './EditMessageDialog';

interface SelectedContactUser extends Chat {
    contact: Contact;
}

interface ServerMessage {
    selectedContactUser: SelectedContactUser;
    message: Message;
    tempMessageId: string;
}

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
    const user = useSelector((state: RootState) => state.user.user);
    const selectedContact = useSelector((state: RootState) => state.active.selectedContact);
    const [editMessage, setEditMessage] = useState<Message | null>(null)

    const { data: serverMessages, isLoading, isError } = useQuery({
        queryKey: ['message-list', chatId, user],
        queryFn: () => getMessages(chatId),
        enabled: !!chatId,
        refetchOnWindowFocus: false
    });

    useEffect(() => {
        if (selectedChat) {
            setChatId(selectedChat?._id!)
        }
    }, [selectedChat])

    useEffect(() => {
        if (serverMessages?.data && serverMessages.data?.length > 0) {
            setMessages((prev) => ({
                ...prev,
                [chatId]: serverMessages?.data,
            }));
        }
    }, [serverMessages?.data]);

    useEffect(() => {
        const handleServerMessage = (serverMessage: ServerMessage) => {
            const socketMessageChatId = serverMessage?.message.chatId
            const tempMessageId = serverMessage?.tempMessageId
            if (!chatId) {
                setChatId(socketMessageChatId)
            }

            if (serverMessage.message.author._id === user) {
                setMessages((prev) => ({
                    ...prev,
                    [socketMessageChatId]: (prev[socketMessageChatId] || []).map((msg: Message): Message => {
                        return msg._id === tempMessageId ? serverMessage?.message : msg
                    })
                }));
            } else {
                setMessages((prev) => ({
                    ...prev,
                    [socketMessageChatId]: [...(prev[socketMessageChatId] || []), serverMessage?.message]
                }));

                if (selectedChat?._id === serverMessage?.message?.chatId) {
                    socket.emit("client:status:delivered", { chatId, userId: user, contactId: selectedChat?.contact?._id })
                }
            }


        };

        socket.on('message:server', handleServerMessage);

        return () => {
            socket.off('message:server', handleServerMessage);
        };
    }, [user, socket]);

    useEffect(() => {
        const handleMessageServerEdit = (serverMessage: ServerMessage) => {
            const socketMessageChatId = serverMessage?.message.chatId
            const tempMessageId = serverMessage?.tempMessageId

            if (!chatId) {
                setChatId(socketMessageChatId)
            }

            setMessages((prev) => ({
                ...prev,
                [socketMessageChatId]: (prev[socketMessageChatId] || []).map((msg: Message): Message => {
                    return msg._id === tempMessageId ? serverMessage?.message : msg
                })
            }));

            if (serverMessage.message.author._id !== user) {
                if (selectedChat?._id === serverMessage?.message?.chatId) {
                    socket.emit("client:status:delivered", { chatId, userId: user, contactId: selectedChat?.contact?._id })
                }
            }



        };

        socket.on('message:server:edit', handleMessageServerEdit);

        return () => {
            socket.off('message:server:edit', handleMessageServerEdit);
        };
    }, [user, socket]);


    useEffect(() => {
        socket.on('message:status:update', (data) => {
            const { messageId, status } = data;
            setMessages((prev: MessagesState) => {
                const updatedMessages = { ...prev };
                Object.keys(updatedMessages).forEach(chatId => {
                    updatedMessages[chatId] = updatedMessages[chatId].map(msg => {
                        if (msg._id === messageId) {
                            return { ...msg, status: status };
                        }
                        return msg;
                    });
                });
                return updatedMessages;
            });
        });

        return () => {
            socket.off('message:status:update');
        };
    }, [socket]);

    useEffect(() => {
        socket.on("server:status:delivered", (message) => {
            setMessages((prev: MessagesState) => {
                return {
                    ...prev, [message.chatId]: (prev[message.chatId] || []).map((msg) => {
                        return msg._id === message._id ? { ...msg, status: 'seen' } : msg
                    })
                }
            });
        });

        return () => {
            socket.off('server:status:delivered');
        };
    }, [socket]);


    useEffect(() => {
        socket.emit("client:status:delivered", { chatId, userId: user })
    }, [])

    useEffect(() => {
        scrollToBottomInstantly(chatContainerRef);
    }, [messages, chatId]);



    const memoizedMessages = useMemo(() => {
        const chatMessages = messages[chatId] || [];
        return chatMessages.map((message) => (
            <ChatBubble setEditMessage={setEditMessage} key={message._id} isMe={user === message.author._id} message={message} />
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
                        <EditMessageDialog setMessages={setMessages} editMessage={editMessage} setEditMessage={setEditMessage} selectedChat={selectedChat} />
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
