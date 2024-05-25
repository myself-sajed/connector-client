"use client"

import { useState } from "react"
import ChatSection from "./ChatSection"
import Empty from "./Empty"
import SendMessageInput from "./SendMessageInput"
import { RootState } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"
import { cn } from "@/lib/utils"
import Loading from "@/components/ui/loading"


const ChatContainer = ({ className }: { className?: string }) => {

    const [messages, setMessages] = useState({})
    const selectedContact = useSelector((state: RootState) => state.active?.selectedContact)
    const selectedChat = useSelector((state: RootState) => state.active?.selectedChat)


    return (
        <div className={cn("relative rounded-xl bg-muted/50 col-span-2 p-4 min-h-[calc(100vh-89px)] max-h-[calc(100vh-89px)] overflow-hidden w-full", className)}>
            {
                (selectedContact && selectedChat && !selectedChat.generateChatId && selectedChat.openChatSection)
                    ? <>
                        <ChatSection messages={messages} setMessages={setMessages} selectedChat={selectedChat} />
                        <SendMessageInput selectedChat={selectedChat} />
                    </>
                    : selectedChat && selectedChat.generateChatId && selectedChat.openChatSection
                        ? <div>
                            <Loading title="Connector is creating connection, please wait..." />
                        </div>
                        : <Empty />
            }
        </div>
    )
}

export default ChatContainer
