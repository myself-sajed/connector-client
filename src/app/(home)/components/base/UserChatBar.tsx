/* eslint-disable react-hooks/exhaustive-deps */
import { Input } from "@/components/ui/input"
import { getChats } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import { Badge } from "@/components/ui/badge"
import Loading from "@/components/ui/loading"
import { Chat } from "@/lib/types"
import ChatUserCard from "../unit/ChatUserCard"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { useEffect } from "react"
import socket from "@/lib/client-socket"
import { setChats } from "@/redux/slices/chatSlice"

const UserChatBar = () => {
    const userId = useSelector((state: RootState) => state.user?.user) || null
    const chats = useSelector((state: RootState) => state.chat?.chats)
    const dispatch = useDispatch()

    useEffect(() => {
        if (userId) {
            registerUser();
        }

        // Register event listener for visibility change
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            // Clean up the event listener on component unmount
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [userId]);

    const registerUser = () => {
        if (userId) {
            socket.emit('register', userId);
        }
    };

    const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
            registerUser();
        }
    };


    const { data: serverChats, isLoading, isError } = useQuery({
        queryKey: ['chat-list'],
        queryFn: () => getChats(userId)
    })

    useEffect(() => {
        if (serverChats?.data) {
            dispatch(setChats(serverChats?.data))
        }
    }, [serverChats?.data])


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
                                chats?.map((chat: Chat) => (
                                    <ChatUserCard key={chat._id} chat={chat} />
                                ))
                            }
                        </div>
            }

        </div>
    )
}

export default UserChatBar
