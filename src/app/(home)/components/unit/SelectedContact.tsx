"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Contact } from "@/lib/types"
import { cn } from "@/lib/utils"
import { setContact, setSelectedChat } from "@/redux/slices/activeSlice"
import { RootState } from "@/redux/store"
import { ArrowLeft } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"

const SelectedContact = ({ className }: { className?: string }) => {

    const selectedContact = useSelector((state: RootState) => state.active?.selectedContact)
    const dispatch = useDispatch()
    const handleBack = () => {

        if (window.matchMedia('(max-width: 767px)').matches) {
            dispatch(setContact(null))
            dispatch(setSelectedChat(null))
        }

    }

    return (selectedContact && <div className={cn("flex items-center gap-3", className)}>
        <div className="flex items-center gap-2 hover:bg-muted md:hover:bg-transparent rounded-full cursor-pointer p-2" onClick={handleBack}>
            <ArrowLeft className="size-5 md:hidden block" />
            <Avatar className="md:h-9 h-7 md:w-9 w-7 flex">
                <AvatarImage src={selectedContact.avatar} alt="Avatar" />
                <AvatarFallback>{selectedContact.name}</AvatarFallback>
            </Avatar>
        </div>
        <div className="flex flex-col">
            <p className="font-semibold" >{selectedContact.name}</p>
            <span className="text-xs text-muted-foreground" style={{ lineHeight: '14px' }}>online</span>
        </div>
    </div>
    )
}

export default SelectedContact
