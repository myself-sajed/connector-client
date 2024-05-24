import { cn } from "@/lib/utils"

const LogoHeading = ({ className, currentTab }: { className: string, currentTab: string }) => {

    return (
        <div className={cn(className)}>
            <h1 className="lg:text-xl text-lg font-semibold md:leading-none leading-4">Connector</h1>
            {currentTab && <span className="md:ml-4 text-primary-foreground text-[11px] sm:text-xs md:text-base bg-primary px-3 py-[3px] md:py-0 rounded-xl inline font-semibold">{currentTab}</span>}
        </div>
    )
}

export default LogoHeading
