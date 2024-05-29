/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import socket from "@/lib/client-socket"
import { Contact } from "@/lib/types"
import { cn } from "@/lib/utils"
import { SelectedChat, setContact, setSelectedChat } from "@/redux/slices/activeSlice"
import { RootState } from "@/redux/store"
import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const SelectedContact = ({ className }: { className?: string }) => {
    const [onlineStatus, setOnlineStatus] = useState<string | null>(null)
    const [typingStatus, setTypingStatus] = useState<string | null>(null)
    const selectedChat = useSelector((state: RootState) => state.active?.selectedChat)
    const selectedContact = selectedChat?.contact

    const dispatch = useDispatch()
    const handleBack = () => {

        if (window.matchMedia('(max-width: 767px)').matches) {
            dispatch(setContact(null))
            dispatch(setSelectedChat(null))
        }

    }

    useEffect(() => {

        const handleStatus = ({ status, statusOf }: { status: string, statusOf: string }) => {
            if (statusOf === selectedContact?._id) {
                setOnlineStatus(status)
            }
        }

        socket.on("server:online-status", handleStatus)

        return () => {
            socket.on("server:online-status", handleStatus)
        }
    }, [])


    useEffect(() => {

        const handleTyping = ({ selectedChatFromServer, typingStatus }: { selectedChatFromServer: SelectedChat, typingStatus: string }) => {
            if (selectedChat) {
                if (selectedChatFromServer._id === selectedChat._id) {
                    setTypingStatus(typingStatus)
                }
            }
        }

        socket.on("server:typing", handleTyping)

        return () => {
            socket.on("server:typing", handleTyping)
        }
    }, [])

    useEffect(() => {
        if (selectedContact) {
            socket.emit("client:online-status", selectedContact._id)
        }
    }, [selectedContact])



    return (selectedContact && <div className={cn("flex items-center gap-3", className)}>
        <div className="flex items-center gap-2 hover:bg-muted md:hover:bg-transparent rounded-full cursor-pointer p-2" onClick={handleBack}>
            <ArrowLeft className="size-5 md:hidden block" />
            <Avatar className="md:h-9 h-7 md:w-9 w-7 flex">
                <AvatarImage src={selectedContact.avatar} alt="Avatar" />
                <AvatarFallback>{(selectedContact.name.split(""))[0]}</AvatarFallback>
            </Avatar>
        </div>
        <div className="flex flex-col">
            <p className="font-semibold" >{selectedContact.name}</p>
            <span className="text-xs text-muted-foreground" style={{ lineHeight: '14px' }}>{typingStatus || onlineStatus}</span>
        </div>
    </div>
    )
}

export default SelectedContact
