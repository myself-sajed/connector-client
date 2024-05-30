"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { tabs } from '@/lib/constants'
import { Contact } from '@/lib/types'
import { cn } from '@/lib/utils'
import { setContact, setCurrentTab, setSelectedChat } from '@/redux/slices/activeSlice'
import { RootState } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import generateChat from '../../helpers/generateChat'
import { useState } from 'react'

interface PropType {
    contact: Contact;
    isSelected: boolean;
}

const ChatContactCard = ({ contact, isSelected }: PropType) => {

    const dispatch = useDispatch()
    const storeChats = useSelector((state: RootState) => state.chat?.storeChats)
    const user = useSelector((state: RootState) => state.user.user)?._id
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleContactSelect = () => {
        dispatch(setContact(contact))

        if (storeChats && contact && user) {
            const chat = storeChats.find(chat => chat.contact._id === contact?._id)
            if (chat) {
                dispatch(setSelectedChat({ ...chat, openChatSection: true, generateChatId: false }))
            } else {
                generateChat({ contactId: contact?._id, meId: user, setIsLoading, dispatch, setSelectedChat })
            }
            dispatch(setCurrentTab(tabs.CHATS))
        }
    }

    return (
        <div className={cn("flex items-start justify-between px-2 py-4 cursor-pointer hover:bg-muted  transition duration-200 w-full animate-fade-up animate-duration-1000", isSelected ? "bg-muted" : "")} onClick={handleContactSelect}>
            <div className="flex items-start gap-4">
                <Avatar className="h-9 w-9">
                    <AvatarImage src={contact.avatar} alt="Avatar" />
                    <AvatarFallback>{(contact.name.split('')[0])}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                        {contact.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {contact.bio}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ChatContactCard
