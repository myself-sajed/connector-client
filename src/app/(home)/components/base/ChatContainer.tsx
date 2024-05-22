"use client"

import { useState } from "react"
import ChatSection from "./ChatSection"
import Empty from "./Empty"
import SendMessageInput from "./SendMessageInput"
import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"


const ChatContainer = () => {

    const [messages, setMessages] = useState({})
    const selectedContact = useSelector((state: RootState) => state.active?.selectedContact)

    return (
        <div className="relative rounded-xl bg-muted/50 p-4 col-span-2 min-h-[calc(100vh-90px)] max-h-[calc(100vh-90px)] overflow-hidden">
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
