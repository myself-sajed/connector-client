"use client"

import { useState } from "react"
import ChatSection from "./ChatSection"
import Empty from "./Empty"
import SendMessageInput from "./SendMessageInput"
import { RootState } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"
import { cn } from "@/lib/utils"
import Loading from "@/components/ui/loading"
import { Message } from "@/lib/types"
import CodeEditor from "../../code/components/CodeEditor"
import { activities } from "@/lib/constants"

export type MessagesState = {
    [key: string]: Message[];
};


const ChatContainer = ({ className }: { className?: string }) => {

    const [messages, setMessages] = useState<MessagesState>({})
    const selectedContact = useSelector((state: RootState) => state.active?.selectedContact)
    const selectedChat = useSelector((state: RootState) => state.active?.selectedChat)
    const currentActivity = useSelector((state: RootState) => state.active?.currentActivity)



    return (
        <div className={cn("relative rounded-xl bg-muted/50 col-span-2  min-h-[calc(100vh-89px)] max-h-[calc(100vh-89px)] overflow-hidden w-full", className)}>
            {
                (selectedContact && selectedChat && !selectedChat.generateChatId && selectedChat.openChatSection)
                    ? <>
                        {
                            currentActivity === activities.CHAT ? <>
                                <ChatSection messages={messages} setMessages={setMessages} selectedChat={selectedChat} />
                                <SendMessageInput setMessages={setMessages} selectedChat={selectedChat} />
                            </>
                                :
                                <CodeEditor />
                        }

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
