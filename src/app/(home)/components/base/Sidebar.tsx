import {
    CircleDashed,
    Loader,
    LogOut,
    MessageCircle,
    Settings,
    SquareUser,
    Users,
    Waypoints,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { tabs } from "@/lib/constants"
import { useDispatch, useSelector } from "react-redux"
import { setContact, setCurrentTab, setSelectedChat } from "@/redux/slices/activeSlice"
import { RootState } from "@/redux/store"
import { useState } from "react"
import { logout } from "@/lib/api"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { removeUserToken } from "../../helpers/localStorageHandler"



const upperTabs = [
    {
        name: tabs.CHATS,
        icon: <MessageCircle className="size-5" />,
    },
    {
        name: tabs.CONTACTS,
        icon: <Users className="size-5" />,
    },
]

const lowerTabs = [
    {
        name: tabs.PROFILE,
        icon: <SquareUser className="size-5" />,
    },
    {
        name: tabs.LOGOUT,
        icon: <LogOut className="size-5" />,
    },
]


const Sidebar = () => {

    const dispatch = useDispatch()
    const currentTab = useSelector((state: RootState) => state.active?.currentTab || tabs.CHATS)
    const user = useSelector((state: RootState) => state.user?.user)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()


    const handleTabChange = (tabName: string) => {
        dispatch(setCurrentTab(tabName))
    }

    const handleLogout = async () => {
        removeUserToken()
        window.location.reload()
        router.replace('/login')
        toast.success("Logged out successfully.")

    }

    return (
        <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
            <div className="border-b p-2">
                <Button variant="outline" size="icon" aria-label="Home">
                    <Waypoints strokeWidth={2.5} className="fill-foreground" />
                </Button>
            </div>
            <nav className="grid gap-3 p-2">

                {
                    upperTabs.map((tab) => {
                        return <TooltipProvider key={tab.name}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant={tab.name == currentTab ? "default" : "ghost"}
                                        size="icon"
                                        className={`rounded-lg`}
                                        aria-label={tab.name}
                                        onClick={() => handleTabChange(tab.name)}
                                    >
                                        {tab.icon}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="right" sideOffset={5}>
                                    {tab.name}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    })
                }

            </nav>
            <nav className="mt-auto grid gap-3 p-2">
                {
                    lowerTabs.map((tab) => {
                        return <TooltipProvider key={tab.name}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant={tab.name == currentTab ? "default" : "ghost"}
                                        size="icon"
                                        className={`rounded-lg`}
                                        aria-label={tab.name}
                                        onClick={() => {
                                            tab.name === tabs.LOGOUT ? handleLogout() : handleTabChange(tab.name);
                                            dispatch(setSelectedChat(null))
                                            dispatch(setContact(null))
                                        }}
                                    >
                                        {tab.name === tabs.PROFILE
                                            ? <Avatar className="w-8 h-8 flex">
                                                <AvatarImage
                                                    className="object-cover"
                                                    src={user?.avatar}
                                                    alt="Avatar"
                                                />
                                                <AvatarFallback>
                                                    {user?.name.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            : tab.icon}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="right" sideOffset={5}>
                                    {tab.name}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    })
                }
            </nav>
        </aside>
    )
}

export default Sidebar
