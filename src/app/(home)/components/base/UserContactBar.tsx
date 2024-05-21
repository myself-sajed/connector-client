"use client"

import { Input } from "@/components/ui/input"
import { useQuery } from "@tanstack/react-query"
import { getUsers } from "@/lib/api"
import ChatContactCard from "../unit/ChatContactCard"
import { Badge } from "@/components/ui/badge"
import Loading from "@/components/ui/loading"
import { Contact } from "@/lib/types"

const UserContactBar = () => {

    const { data: contact, isLoading, isError } = useQuery({
        queryKey: ['contact-list'],
        queryFn: () => getUsers()
    })

    return (
        <div className="relative hidden flex-col items-start gap-2 md:flex">
            <Input type="search" placeholder="Search contact" className="sticky left-0 top-0" />
            {
                isError
                    ? <Badge variant="destructive" className="my-10">
                        Error fetching users...
                    </Badge>
                    : isLoading
                        ? <Loading title="Fetching Contacts..." />
                        : <div className="divide-y overflow-y-auto w-full overflow-hidden max-h-[calc(100vh-137px)] pr-5">
                            {
                                contact?.data.map((contact: Contact) => (
                                    <ChatContactCard key={contact._id} contact={contact} />
                                ))
                            }
                        </div>
            }

        </div>
    )
}

export default UserContactBar
