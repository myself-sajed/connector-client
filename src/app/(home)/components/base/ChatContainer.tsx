"use client"

import { useState } from "react"
import ChatSection from "./ChatSection"
import Empty from "./Empty"
import SendMessageInput from "./SendMessageInput"
import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"

const ChatContainer = () => {

    const [messages, setMessages] = useState(messagesArray)
    const selectedContact = useSelector((state: RootState) => state.active?.selectedContact)

    return (
        <div className="relative rounded-xl bg-muted/50 p-4 col-span-2 max-h-[calc(100vh-90px)] overflow-hidden">
            {
                selectedContact
                    ? <>
                        <ChatSection messages={messages} />
                        <SendMessageInput setMessages={setMessages} />
                    </>
                    : <Empty />
            }
        </div>
    )
}

export default ChatContainer

const messagesArray = [
    {
        isMe: true,
        message: 'Hey!'
    },
    {
        isMe: false,
        message: 'Hii',
    },
    {
        isMe: true,
        message: "Are you coming to the party?",
    },
    {
        isMe: false,
        message: 'Yes',
    },
    {
        isMe: true,
        message: 'Meet you at 6 then!',
    },
    {
        isMe: false,
        message: 'Sure shot!!',
    },
    {
        isMe: true,
        message: 'What are you wearing?',
    },
    {
        isMe: false,
        message: 'Hoodies',
    },
    {
        isMe: true,
        message: "That's great",
    },
    {
        isMe: false,
        message: 'What are you wearing?',
    },
    {
        isMe: true,
        message: "Kurta!!!!",
    },
    {
        isMe: false,
        message: 'Kurta!!! OMG!! 😍',
    },
    {
        isMe: false,
        message: 'You are gonna look awesome😍',
    },
    {
        isMe: true,
        message: 'Thanks',
    },
    {
        isMe: false,
        message: 'Bye! See ya...',
    },
    {
        isMe: true,
        message: 'Bye. See yaaa!',
    }
]

