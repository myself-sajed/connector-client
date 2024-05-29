/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import {
    Mic,
    Paperclip,
    Send,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import socket from "@/lib/client-socket"
import { Dispatch, SetStateAction, useEffect, useRef } from "react"
import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"
import { SelectedChat } from "@/redux/slices/activeSlice"
import { v4 as uuid } from "uuid"
import { Message } from "@/lib/types"
import { MessagesState } from "./ChatContainer"
import VoiceRecorder from "./VoiceRecorder"

interface PropType {
    selectedChat: SelectedChat;
    setMessages: Dispatch<SetStateAction<{}>>;
}

const SendMessageInput = ({ selectedChat, setMessages }: PropType) => {

    const messageRef = useRef<HTMLTextAreaElement>(null)
    const userId = useSelector((state: RootState) => state.user?.user)

    useEffect(() => {
        messageRef.current?.focus()
    }, [userId])

    const handleSubmit = () => {
        const msgValue = messageRef.current?.value

        if (msgValue) {

            // optimistic message
            const tempMessageId = uuid()

            const optimisticMessage = {
                _id: tempMessageId,
                text: msgValue,
                updatedAt: new Date().getTime(),
                author: { _id: userId },
                status: "optimistic",
                showChevron: false,
                isEdited: false
            }


            const chatData = {
                selectedChat,
                messageContent: msgValue,
                author: userId,
                tempMessageId
            }

            socket.emit('message:client', chatData)
            if (selectedChat && selectedChat._id) {
                const chatId = selectedChat._id as string;
                setMessages((prev: MessagesState) => {
                    return {
                        ...prev,
                        [chatId]: [...(prev[chatId] || []), optimisticMessage]
                    };
                });
            } else {
                console.error("Selected chat or chat ID is null or undefined");
            }
            messageRef.current.value = ''
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // Prevent newline
            handleSubmit();
        }
    };

    const handleVoiceStop = (audioBlob: Blob) => {
        const tempMessageId = uuid();
        const optimisticMessage = {
            _id: tempMessageId,
            audioUrl: URL.createObjectURL(audioBlob),
            updatedAt: new Date().getTime(),
            author: { _id: userId },
            status: "optimistic",
            showChevron: false,
            isEdited: false
        };

        const chatData = {
            selectedChat,
            audioContent: audioBlob,
            author: userId,
            tempMessageId
        };

        socket.emit('voiceMessage:client', chatData);
        if (selectedChat && selectedChat._id) {
            const chatId = selectedChat._id as string;
            setMessages((prev: MessagesState) => {
                return {
                    ...prev,
                    [chatId]: [...(prev[chatId] || []), optimisticMessage]
                };
            });
        } else {
            console.error("Selected chat or chat ID is null or undefined");
        }
    };


    return (
        <div className="relative rounded-lg border bg-background mt-2 flex items-start">
            <Textarea ref={messageRef}
                onKeyDown={handleKeyDown}
                autoFocus={true}
                placeholder="Type your message here..."
                className="min-h-32 resize-none border-none flex-1 p-3 outline-none focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0"
            />
            <Button onClick={handleSubmit} type="submit" size="sm" className="ml-auto gap-1.5 m-3">
                Send
                <Send className="size-3.5" />
            </Button>
        </div>
    )
}

export default SendMessageInput
