import { Lock, Waypoints } from 'lucide-react'
import React from 'react'

const LoginRegisterHero = () => {
    return (
        <div className="relative z-30 flex items-center justify-center flex-col h-full">
            <Waypoints strokeWidth={2} size={100} className="text-primary" />
            <p style={{ lineHeight: '85px' }} className="text-[5rem] font-bold mt-10 text-primary">Connector</p>
            <p>The most efficient chatting & code sharing platform for everyone.</p>


            <div className="flex items-center gap-2 justify-center text-muted-foreground text-sm mt-[7rem]">
                <Lock size={13} /> Your chats are end-to-end encrypted.
            </div>
        </div>
    )
}

export default LoginRegisterHero
