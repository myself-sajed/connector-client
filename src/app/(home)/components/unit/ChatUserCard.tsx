import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

const ChatUserCard = () => {
    return (
        <div className="flex items-start justify-between px-2 py-4 cursor-pointer">
            <div className="flex items-start gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                    <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                        Shaikh Sajed
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Hey, how are you doing???
                    </p>
                </div>
            </div>
            <div className="ml-auto font-medium">
                <Badge>+{2}</Badge>
            </div>
        </div>
    )
}

export default ChatUserCard
