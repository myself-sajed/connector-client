import { Input } from "@/components/ui/input"
import { getChats } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import { Badge } from "@/components/ui/badge"
import Loading from "@/components/ui/loading"
import { Chat } from "@/lib/types"
import ChatUserCard from "../unit/ChatUserCard"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { useEffect } from "react"
import socket from "@/lib/client-socket"

const UserChatBar = () => {
    const userId = useSelector((state: RootState) => state.user?.user) || null

    useEffect(() => {
        if (userId) {
            socket.emit('register', userId)
        }
    }, [userId])

    const { data: chats, isLoading, isError } = useQuery({
        queryKey: ['chat-list'],
        queryFn: () => getChats(userId)
    })



    return (
        <div className="relative hidden flex-col items-start gap-2 md:flex">
            <Input type="search" placeholder="Search contact" className="sticky left-0 top-0" />
            {
                isError
                    ? <Badge variant="destructive" className="my-10">
                        Error fetching users...
                    </Badge>
                    : isLoading
                        ? <Loading title="Fetching Chats..." />
                        : <div className="divide-y overflow-y-auto w-full overflow-hidden max-h-[calc(100vh-137px)] pr-5">
                            {
                                chats?.data.map((chat: Chat) => (
                                    <ChatUserCard key={chat._id} isMe={userId === chat.contact._id} chat={chat} />
                                ))
                            }
                        </div>
            }

        </div>
    )
}

export default UserChatBar
