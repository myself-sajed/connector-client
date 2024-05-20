import { Input } from "@/components/ui/input"
import ChatUserCard from "../unit/ChatUserCard"

const UserChatBar = () => {
    return (
        <div className="relative hidden flex-col items-start gap-2 md:flex">
            <Input type="search" placeholder="Search chats" className="sticky left-0 top-0" />
            <div className="divide-y overflow-y-auto w-full overflow-hidden max-h-[calc(100vh-137px)] pr-5">
                {
                    Array(15).fill(0).map((_, index) => (
                        <ChatUserCard key={index} />
                    ))
                }
            </div>
        </div>
    )
}

export default UserChatBar
