"use client"

import { useQuery } from "@tanstack/react-query"
import { getUsers } from "@/lib/api"
import ChatContactCard from "../unit/ChatContactCard"
import { Badge } from "@/components/ui/badge"
import Loading from "@/components/ui/loading"
import { Contact } from "@/lib/types"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import EmptyBar from "../unit/EmptyBar"
import { tabs } from "@/lib/constants"
import SearchBar from "../unit/SearchBar"

const UserContactBar = () => {

    const user = useSelector((state: RootState) => state.user?.user) || null
    const selectedContact = useSelector((state: RootState) => state.active?.selectedContact)

    const { data: contact, isLoading, isError, isFetching, refetch } = useQuery({
        queryKey: ['contact-list'],
        queryFn: () => getUsers(user),
        enabled: !!user,
        staleTime: 100000
    })

    const onSearch = () => {

    }

    return (
        <div className="relative flex-col items-start gap-2 flex">
            <SearchBar tooltipText="Refresh Contacts" isLoading={isLoading} isFetching={isFetching} refetch={refetch} onSearch={onSearch} />
            {
                isError
                    ? <Badge variant="destructive" className="my-10">
                        Error fetching users...
                    </Badge>
                    : isLoading
                        ? <Loading title="Fetching Contacts..." />
                        : contact?.data?.length > 0 ? <div className="divide-y overflow-y-auto w-full overflow-hidden min-h-[calc(100vh-137px)] max-h-[calc(100vh-137px)] pr-5">
                            {
                                contact?.data.map((contact: Contact) => {
                                    return <ChatContactCard key={contact._id} contact={contact} isSelected={contact._id === selectedContact?._id} />
                                })
                            }
                        </div>

                            :

                            <div className="overflow-y-auto w-full overflow-hidden min-h-[calc(100vh-137px)] max-h-[calc(100vh-137px)] pr-5">
                                <EmptyBar type={tabs.CONTACTS} />
                            </div>
            }

        </div>
    )
}

export default UserContactBar
