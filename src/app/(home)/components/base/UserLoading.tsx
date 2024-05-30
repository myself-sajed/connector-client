import { cn } from '@/lib/utils'
import { CheckCheck, Waypoints } from 'lucide-react'
import React from 'react'
import generateMessageTime from '../../helpers/generateMessageTime'

const UserLoading = () => {
    return (
        <div className='h-screen overflow-hidden w-full'>
            <div className='md:grid grid-cols-3 gap-2 items-center h-full'>
                <div className='flex flex-col gap-5 items-center justify-center col-span-2 h-full bg-primary-foreground'>
                    <Waypoints size={50} className='animate-pulse' />
                    <div className='text-center'>
                        <p className='text-xl font-bold'>Connecting to <span className='text-primary'>Connector</span></p>
                        <p className="text-xs">Authenticating...</p>
                    </div>
                </div>

                <div className='mx-auto space-y-10 md:block hidden'>
                    <MockChatBubble className='animate-fade-right' isMe={false} text="Hey! Welcome to connector." />
                    <MockChatBubble isMe={true} className='animate-fade-left animate-delay-[1000ms]' text="It's gonna be fun!!!" />
                </div>

            </div>

        </div>
    )
}

export default UserLoading


const MockChatBubble = ({ isMe, text, className }: { isMe: boolean, text: string, className?: string }) => {
    return <div className={`flex ${isMe ? 'justify-end ml-28' : 'justify-start mr-28'} my-4 text-sm ${className}`}>
        <div className={cn("max-w-xs")}>
            <div
                className={`rounded-lg px-4 py-2 transition duration-200 group 
                    ${isMe ? 'bg-primary text-left text-white'
                        : 'bg-gray-200 text-left text-black'} relative`
                }
                style={{
                    borderBottomLeftRadius: isMe ? '16px' : '0',
                    borderBottomRightRadius: isMe ? '0' : '16px',
                }}>


                {/* MESSAGE */}
                <p className="mr-10">{text}</p>

                <p className='flex items-center justify-end text-[10px] mt-3 gap-3'>
                    just now
                    {isMe
                        && <span>
                            <CheckCheck size={18} className="text-blue-900" />
                        </span>
                    }
                </p>


            </div>
        </div>
    </div>
}
