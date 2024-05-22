import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Chat } from '@/lib/types'
import { cn } from '@/lib/utils'
import { setContact } from '@/redux/slices/activeSlice'
import { useDispatch } from 'react-redux'

type PropType = {
    chat: Chat;
    isSelected: boolean;
}

const ChatUserCard = ({ chat, isSelected }: PropType) => {

    const contact = chat.contact
    const dispatch = useDispatch()

    const handleContactSelect = () => {
        dispatch(setContact(contact))
    }

    return (
        <div className={cn("flex items-start justify-between px-2 py-4 cursor-pointer hover:bg-muted  transition duration-200 w-full", isSelected ? "bg-muted" : "")} onClick={handleContactSelect}>
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
                        {chat.lastMessage?.text}
                    </p>
                </div>
            </div>
            {/* <div className="ml-auto font-medium">
                <Badge>+{2}</Badge>
            </div> */}
        </div>
    )
}

export default ChatUserCard
