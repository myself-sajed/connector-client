import { Message } from "@/lib/types";
import { ChevronDown } from "lucide-react";
import generateMessageTime from "../../helpers/generateMessageTime";

function ChatBubble({ message, isMe }: { message: Message, isMe?: boolean }) {
    return (
        <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-4 text-sm`}>
            <div
                className={`max-w-xs rounded-lg px-4 py-2 transition duration-200 group
                        ${isMe ? 'bg-primary text-right text-white'
                        : 'bg-gray-200 text-left text-black'} relative`
                }
                style={{
                    borderBottomLeftRadius: isMe ? '16px' : '0',
                    borderBottomRightRadius: isMe ? '0' : '16px',
                }}>


                {/* MESSAGE OPTION BUTTON */}

                <ChevronDown size={20} className={`absolute group-hover:block hidden top-2 right-2 cursor-pointer ${isMe ? 'text-muted' : 'text-muted-foreground'} transition duration-200`} />



                {/* MESSAGE */}
                <p className="mr-10">{message.text}</p>
                <time className='flex items-center justify-end text-[10px]'>{generateMessageTime(message.updatedAt)}</time>
            </div>
        </div>

    );
}


export default ChatBubble
