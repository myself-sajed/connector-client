import Image from "next/image"

const Header = () => {
    return (
        <header className="sticky top-0 z-10 h-[57px] items-center grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3  border-b bg-background px-4">
            <h1 className="text-xl font-semibold flex items-center"><span>Connector</span> <span className="ml-4 text-primary-foreground text-base bg-primary px-3 rounded-xl">Chats</span></h1>

            <div className="flex items-center gap-5">
                <Image src="/assets/sender.jpg" className="rounded-full" alt="profile" height={32} width={32} />
                <span className="font-semibold">Shaikh Sajed</span>
            </div>
        </header>
    )
}

export default Header
