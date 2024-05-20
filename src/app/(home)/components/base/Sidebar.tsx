import {
    Book,
    Bot,
    CircleDashed,
    Code2,
    LifeBuoy,
    MessageCircle,
    Settings,
    Settings2,
    SquareTerminal,
    SquareUser,
    Triangle,
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


const Sidebar = () => {
    return (
        <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
            <div className="border-b p-2">
                <Button variant="outline" size="icon" aria-label="Home">
                    <Waypoints strokeWidth={2.5} className="fill-foreground" />
                </Button>
            </div>
            <nav className="grid gap-1 p-2">

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-lg bg-muted"
                                aria-label="Chats"
                            >
                                <MessageCircle className="size-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={5}>
                            Chats
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-lg"
                                aria-label="Communities"
                            >
                                <Users className="size-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={5}>
                            Communities
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>



                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-lg"
                                aria-label="Status"
                            >
                                <CircleDashed className="size-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={5}>
                            Status
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>


            </nav>
            <nav className="mt-auto grid gap-1 p-2">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="mt-auto rounded-lg"
                                aria-label="Settings"
                            >
                                <Settings className="size-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={5}>
                            Settings
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="mt-auto rounded-lg"
                                aria-label="Account"
                            >
                                <SquareUser className="size-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={5}>
                            Account
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </nav>
        </aside>
    )
}

export default Sidebar
