import { tabs } from "@/lib/constants"
import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"
import SelectedContact from "../unit/SelectedContact"

const Header = () => {

    const currentTab = useSelector((state: RootState) => state.active?.currentTab || tabs.CHATS)


    return (
        <header className="sticky top-0 z-10 h-[57px] items-center gap-4 flex justify-between md:grid md:grid-cols-3 border-b bg-background px-4">

            <div className="hidden sm:block md:flex md:items-center">
                <h1 className="lg:text-xl text-lg font-semibold md:leading-none leading-4">Connector</h1>
                <span className="md:ml-4 text-primary-foreground text-[11px] sm:text-xs md:text-base bg-primary px-3 py-[3px] md:py-0 rounded-xl inline font-semibold">{currentTab}</span>
            </div>

            <SelectedContact />

            <div className="block sm:hidden md:hidden">
                <h1 className="lg:text-xl text-lg font-semibold md:leading-none leading-4">Connector</h1>
                <span className="md:ml-4 text-primary-foreground text-[11px] sm:text-xs md:text-base bg-primary px-3 py-[3px] md:py-0 rounded-xl inline font-semibold">{currentTab}</span>
            </div>

        </header>
    )
}

export default Header
