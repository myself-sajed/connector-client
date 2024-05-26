import { tabs } from "@/lib/constants"
import { RootState } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"
import SelectedContact from "../unit/SelectedContact"
import LogoHeading from "../unit/LogoHeading"
import { Button } from "@/components/ui/button"
import { MessageCircleX } from "lucide-react"
import { setContact, setSelectedChat } from "@/redux/slices/activeSlice"

const Header = () => {

    const currentTab = useSelector((state: RootState) => state.active?.currentTab || tabs.CHATS)
    const selectedChat = useSelector((state: RootState) => state.active.selectedChat)
    const dispatch = useDispatch()
    const closeChat = () => {
        dispatch(setSelectedChat(null))
        dispatch(setContact(null))
    }

    return (
        <header className="sticky top-0 z-10 h-[57px] items-center gap-4 flex justify-between md:grid md:grid-cols-3 border-b bg-background px-1.5 md:px-4">
            <LogoHeading className="hidden md:flex md:items-center" currentTab={currentTab} />
            <div className="w-full flex items-center justify-between col-span-2">
                <SelectedContact />
                {selectedChat && <Button onClick={closeChat} variant="secondary" className="hidden items-center gap-2 md:flex text-black"><MessageCircleX size={17} /><span>Close Chat</span></Button>}
            </div>
            <LogoHeading className="block md:hidden" currentTab={currentTab} />
        </header>
    )
}

export default Header
