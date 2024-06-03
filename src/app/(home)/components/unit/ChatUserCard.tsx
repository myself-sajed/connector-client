import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Chat } from '@/lib/types'
import { cn } from '@/lib/utils'
import { setContact, setSelectedChat } from '@/redux/slices/activeSlice'
import { useDispatch } from 'react-redux'
import { generateChatMessageTime } from '../../helpers/generateMessageTime'

type PropType = {
    chat: Chat;
    isSelected: boolean;
}

const ChatUserCard = ({ chat, isSelected }: PropType) => {

    const contact = chat.contact
    const dispatch = useDispatch()

    const handleContactSelect = () => {
        dispatch(setContact(contact))
        dispatch(setSelectedChat({ ...chat, openChatSection: true, generateChatId: false }))
    }

    return (
        <div className={cn("flex items-start justify-between px-2 py-4 cursor-pointer hover:bg-muted  transition duration-200 w-full animate-fade-up animate-duration-1000", isSelected ? "bg-muted" : "")} onClick={handleContactSelect}>
            <div className="flex items-start gap-4">
                <Avatar className="h-9 w-9">
                    <AvatarImage className='object-cover' src={contact.avatar} alt="Avatar" />
                    <AvatarFallback>{(contact.name.split(""))[0]}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                    <p className="text-sm font-semibold leading-none">
                        {contact.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {chat.lastMessage?.text}
                    </p>
                </div>
            </div>
            <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">{generateChatMessageTime(chat?.lastMessage?.updatedAt)}</span>
                {
                    (chat.unreadCount?.[chat.contact._id] && chat.unreadCount?.[chat.contact._id] > 0)
                        ? <div className="ml-auto font-medium">
                            <Badge>{chat.unreadCount?.[chat.contact._id]}</Badge>
                        </div> : ''
                }
            </div>
        </div>
    )
}

export default ChatUserCard
