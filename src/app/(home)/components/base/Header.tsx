import { tabs } from "@/lib/constants"
import { RootState } from "@/redux/store"
import Image from "next/image"
import { useSelector } from "react-redux"

const Header = () => {

    const currentTab = useSelector((state: RootState) => state.active?.currentTab || tabs.CHATS)

    return (
        <header className="sticky top-0 z-10 h-[57px] items-center grid gap-4 md:grid-cols-2 lg:grid-cols-3  border-b bg-background px-4 ">
            <h1 className="text-xl font-semibold flex items-center"><span>Connector</span> <span className="ml-4 text-primary-foreground text-base bg-primary px-3 rounded-xl">{currentTab}</span></h1>

            <div className="flex items-start gap-5">
                <Image src="/assets/sender.jpg" className="rounded-full" alt="profile" height={32} width={32} />
                <div className="flex flex-col">
                    <p className="font-semibold">Shaikh Sajed</p>
                    <span className="text-xs text-muted-foreground" style={{ lineHeight: '10px' }}>online</span>
                </div>
            </div>
        </header>
    )
}

export default Header
