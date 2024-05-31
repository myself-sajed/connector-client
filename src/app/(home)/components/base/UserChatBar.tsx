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
import { useEffect, useState, useCallback } from "react"
import socket from "@/lib/client-socket"
import EmptyBar from "../unit/EmptyBar"
import { tabs } from "@/lib/constants"
import SearchBar from "../unit/SearchBar"
import { setStoreChats } from "@/redux/slices/chatSlice"
import { debounce } from 'lodash'

const UserChatBar = () => {
    const userId = useSelector((state: RootState) => state.user.user)?._id || null
    const [chats, setChats] = useState<Chat[]>([])
    const selectedContact = useSelector((state: RootState) => state.active?.selectedContact)

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

    const registerUser = useCallback(() => {
        if (userId) {
            socket.emit('register', userId);
        }
    }, [userId]);

    const handleVisibilityChange = useCallback(() => {
        if (document.visibilityState === 'visible') {
            registerUser();
        }
    }, [registerUser]);

    const { data: serverChats, isLoading, isError, isFetching, refetch } = useQuery({
        queryKey: ['chat-list', userId],
        queryFn: () => getChats(userId),
        refetchOnWindowFocus: false,
        enabled: !!userId, // Only run the query if userId is available
    });

    useEffect(() => {
        if (serverChats?.data) {
            setChats(serverChats?.data)
        }
    }, [serverChats?.data]);

    const handleServerChat = useCallback(({ chat, shouldUpdateCount, isEditing = false }: { chat: Chat, shouldUpdateCount: boolean, isEditing: boolean }) => {
        setChats((prevChats) => {
            let oldCount = 0
            const filteredPrevChats = prevChats.filter((itemChat) => {
                if (itemChat._id === chat._id) {
                    oldCount = itemChat.unreadCount ? (itemChat.unreadCount[chat.contact._id] || 0) : 0
                }
                return itemChat._id !== chat._id
            });
            if (isEditing) {
                return [
                    {
                        ...chat, unreadCount:
                            { [chat.contact._id]: shouldUpdateCount ? 0 : oldCount }
                    },
                    ...filteredPrevChats
                ]
            }
            return [
                {
                    ...chat, unreadCount:
                        { [chat.contact._id]: shouldUpdateCount ? 0 : oldCount + 1 }
                },
                ...filteredPrevChats
            ]
        })
    }, []);

    useEffect(() => {
        socket.on('chat:server', handleServerChat);
        return () => {
            socket.off('chat:server', handleServerChat);
        };
    }, [handleServerChat]);

    const handleChatUnreadCount = useCallback(({ chatId, unreadCount }: { chatId: string, unreadCount: { [key: string]: number } }) => {
        setChats((prev: Chat[]) => {
            return prev.map((singleChat) => singleChat._id === chatId ? { ...singleChat, unreadCount: { [singleChat.contact._id]: 0 } } : singleChat);
        });
    }, []);

    useEffect(() => {
        socket.on("chat:unreadCount", handleChatUnreadCount);
        return () => {
            socket.off('chat:unreadCount', handleChatUnreadCount);
        };
    }, [handleChatUnreadCount]);


    useEffect(() => {
        if (chats.length) {
            dispatch(setStoreChats(chats));
        }
    }, [chats, dispatch]);

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        let searchText = e.target.value

        if (searchText === "" || searchText === undefined || searchText === null) {
            setChats(serverChats?.data)
        } else {
            searchText = searchText.trim().toLowerCase()
            setChats(() => {
                return serverChats?.data?.filter((user: Chat) => {
                    return ((user.contact.name).toLowerCase()).includes(searchText)
                })
            })
        }
    }

    return (
        <div className="relative flex-col items-start gap-2 flex h-full">
            <SearchBar tooltipText="Refresh Chats" isLoading={isLoading} isFetching={isFetching} refetch={refetch} onSearch={onSearch} />
            {
                isError
                    ? <Badge variant="destructive" className="my-10">
                        Error fetching users...
                    </Badge>
                    : isLoading
                        ? <Loading title="Fetching Chats..." />
                        : chats.filter((chat) => chat.chatable)?.length > 0 ? (
                            <div className="divide-y overflow-y-auto w-full overflow-hidden min-h-[calc(100vh-137px)] max-h-[calc(100vh-137px)]">
                                {
                                    chats.filter((chat) => chat.chatable)?.map((chat: Chat) => (
                                        <ChatUserCard key={chat._id} chat={chat} isSelected={chat.contact._id === selectedContact?._id} />
                                    ))
                                }
                            </div>
                        ) : (
                            <div className="overflow-y-auto w-full overflow-hidden min-h-[calc(100vh-137px)] max-h-[calc(100vh-137px)] pr-5">
                                <EmptyBar type={tabs.CHATS} />
                            </div>
                        )
            }
        </div>
    )
}

export default UserChatBar;
