import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { tabs } from "@/lib/constants"
import { RootState } from "@/redux/store"
import Image from "next/image"
import { useSelector } from "react-redux"

const Header = () => {

    const currentTab = useSelector((state: RootState) => state.active?.currentTab || tabs.CHATS)
    const selectedContact = useSelector((state: RootState) => state.active?.selectedContact)

    return (
        <header className="sticky top-0 z-10 h-[57px] items-center grid gap-4 md:grid-cols-2 lg:grid-cols-3  border-b bg-background px-4 ">
            <h1 className="text-xl font-semibold flex items-center"><span>Connector</span> <span className="ml-4 text-primary-foreground text-base bg-primary px-3 rounded-xl">{currentTab}</span></h1>

            {
                selectedContact && <div className="flex items-start gap-5">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src={selectedContact.avatar} alt="Avatar" />
                        <AvatarFallback>{selectedContact.name}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <p className="font-semibold">{selectedContact.name}</p>
                        <span className="text-xs text-muted-foreground" style={{ lineHeight: '14px' }}>online</span>
                    </div>
                </div>
            }

        </header>
    )
}

export default Header
