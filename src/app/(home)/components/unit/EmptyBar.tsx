"use client"

import { Button } from '@/components/ui/button';
import config from '@/lib/config';
import { tabs } from '@/lib/constants';
import { setCurrentTab } from '@/redux/slices/activeSlice';
import { ChevronRight, ExternalLink, MessageCircle, Users } from 'lucide-react';
import React from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

type PropType = {
    type: string;
}

const EmptyBar = ({ type }: PropType) => {

    const dispatch = useDispatch()

    const inviteLink = () => {
        const link = config.FRONTEND_URL + '/signup'
        navigator.clipboard.writeText(link)
        toast.success("Invite link copied, send it to your friends.")
    }

    return (
        <div className="w-full flex items-center justify-center flex-col gap-4 h-full">
            {type === tabs.CHATS
                ? <MessageCircle className="size-7 text-muted-foreground" />
                : <Users className="size-7 text-muted-foreground" />
            }
            <p className="text-muted-foreground text-sm">No {type === tabs.CHATS ? "Chats" : "Users"} Found</p>
            {
                type === tabs.CHATS ? <Button onClick={() => dispatch(setCurrentTab(tabs.CONTACTS))} className='mt-5 flex items-center justify-center gap-3'><span>Select Contact to Chat</span><ChevronRight strokeWidth={2.5} size={17} /></Button> : <Button onClick={inviteLink} className='mt-5 flex items-center justify-center gap-3'><span>Invite friends to Connector</span><ExternalLink strokeWidth={2.5} size={15} /></Button>
            }
        </div>
    )
}

export default EmptyBar
