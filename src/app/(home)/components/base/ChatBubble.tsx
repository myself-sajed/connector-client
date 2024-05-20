import { ChevronDown } from "lucide-react";

function ChatBubble({ message, isMe }: { message: string, isMe?: boolean }) {
    return (
        <>
            <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-4 text-sm group`}>
                <div
                    className={`max-w-xs rounded-lg px-4 py-2 transition duration-200
                        ${isMe ? 'hover:bg-blue-500 bg-blue-600 text-right text-white'
                            : 'hover:bg-gray-100 bg-gray-200 text-left text-black'} relative`
                    }
                    style={{
                        borderBottomLeftRadius: isMe ? '16px' : '0',
                        borderBottomRightRadius: isMe ? '0' : '16px',
                    }}>


                    {/* MESSAGE OPTION BUTTON */}

                    <ChevronDown size={20} className={`absolute group-hover:block hidden top-2 right-2 cursor-pointer ${isMe ? 'text-muted' : 'text-muted-foreground'} transition duration-200`} />







                    {/* MESSAGE */}
                    <p className="mr-10">{message}</p>
                    <time className='flex items-center justify-end text-[10px]'>11:24 pm</time>
                </div>
            </div>

        </>

    );
}


export default ChatBubble
