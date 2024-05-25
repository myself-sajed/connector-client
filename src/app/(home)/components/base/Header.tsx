import { tabs } from "@/lib/constants"
import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"
import SelectedContact from "../unit/SelectedContact"
import LogoHeading from "../unit/LogoHeading"

const Header = () => {

    const currentTab = useSelector((state: RootState) => state.active?.currentTab || tabs.CHATS)


    return (
        <header className="sticky top-0 z-10 h-[57px] items-center gap-4 flex justify-between md:grid md:grid-cols-3 border-b bg-background px-1.5 md:px-4">
            <LogoHeading className="hidden md:flex md:items-center" currentTab={currentTab} />
            <SelectedContact />
            <LogoHeading className="block md:hidden" currentTab={currentTab} />
        </header>
    )
}

export default Header
