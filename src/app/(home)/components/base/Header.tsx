import { activities, tabs } from "@/lib/constants"
import { RootState } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"
import SelectedContact from "../unit/SelectedContact"
import LogoHeading from "../unit/LogoHeading"
import { Button } from "@/components/ui/button"
import { LogOut, MessageCircleX, MessageSquareCode, MessageSquareText } from "lucide-react"
import { setContact, setCurrentActivity, setSelectedChat } from "@/redux/slices/activeSlice"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { TooltipTrigger } from "@radix-ui/react-tooltip"

const Header = () => {
    const currentTab = useSelector((state: RootState) => state.active?.currentTab || tabs.CHATS)
    const selectedChat = useSelector((state: RootState) => state.active.selectedChat)
    const dispatch = useDispatch()
    const closeChat = () => {
        dispatch(setSelectedChat(null))
        dispatch(setContact(null))
        dispatch(setCurrentActivity(activities.CHAT))
    }





    return (
        <header className="sticky top-0 z-10 h-[57px] items-center gap-4 flex justify-between md:grid md:grid-cols-3 border-b bg-background px-1.5 md:px-4">
            <LogoHeading className="hidden md:flex md:items-center" currentTab={currentTab} />
            {selectedChat &&
                <div className="w-full flex items-center justify-between col-span-2 animate-fade">
                    <SelectedContact />
                    <div className="flex items-center gap-2 justify-end">
                        <Tabs onValueChange={(tab) => dispatch(setCurrentActivity(tab))} defaultValue={activities.CHAT}>
                            <TabsList>
                                <TabsTrigger value={activities.CHAT}>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <MessageSquareText size={20} />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                Chat
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </TabsTrigger>
                                <TabsTrigger value={activities.CODE}>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <MessageSquareCode size={20} />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                Code
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <Button onClick={closeChat} variant="secondary" className="hidden items-center gap-2 md:flex"><MessageCircleX size={17} /><span>Close Chat</span></Button>
                    </div>
                </div>
            }

            <LogoHeading className="hidden sm:block md:hidden" currentTab={currentTab} />

        </header>
    )
}

export default Header
