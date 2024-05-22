"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { tabs } from '@/lib/constants'
import { Contact } from '@/lib/types'
import { setContact, setCurrentTab } from '@/redux/slices/activeSlice'
import { useDispatch } from 'react-redux'

interface PropType {
    contact: Contact
}

const ChatContactCard = ({ contact }: PropType) => {

    const dispatch = useDispatch()

    const handleContactSelect = () => {
        dispatch(setContact(contact))
        dispatch(setCurrentTab(tabs.CHATS))
    }


    return (
        <div className="flex items-start justify-between px-2 py-4 cursor-pointer hover:bg-muted transition duration-200" onClick={handleContactSelect}>
            <div className="flex items-start gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage src={contact.avatar} alt="Avatar" />
                    <AvatarFallback>{contact.name}</AvatarFallback>
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
