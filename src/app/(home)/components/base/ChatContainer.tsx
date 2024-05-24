"use client"

import { useState } from "react"
import ChatSection from "./ChatSection"
import Empty from "./Empty"
import SendMessageInput from "./SendMessageInput"
import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"
import { cn } from "@/lib/utils"


const ChatContainer = ({ className }: { className?: string }) => {

    const [messages, setMessages] = useState({})
    const selectedContact = useSelector((state: RootState) => state.active?.selectedContact)

    return (
        <div className={cn("relative rounded-xl bg-muted/50 col-span-2 p-4 min-h-[calc(100vh-89px)] max-h-[calc(100vh-89px)] overflow-hidden w-full", className)}>
            {
                selectedContact
                    ? <>
                        <ChatSection messages={messages} setMessages={setMessages} selectedContact={selectedContact} />
                        <SendMessageInput selectedContact={selectedContact} setMessages={setMessages} />
                    </>
                    : <Empty />
            }
        </div>
    )
}

export default ChatContainer
