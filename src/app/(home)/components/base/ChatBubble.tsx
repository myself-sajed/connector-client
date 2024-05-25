/* eslint-disable react-hooks/exhaustive-deps */
import { Message } from "@/lib/types";
import { Check, CheckCheck, ChevronDown } from "lucide-react";
import generateMessageTime from "../../helpers/generateMessageTime";
import { useEffect } from "react";
import socket from "@/lib/client-socket";
import { Card, CardContent } from "@/components/ui/card";

function ChatBubble({ message, isMe }: { message: Message, isMe?: boolean }) {

    return (
        <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-4 text-sm`}>
            <div
                className={`max-w-xs rounded-lg px-4 py-2 transition duration-200 group 
                        ${isMe ? 'bg-secondary-foreground text-left text-blue-900 border'
                        : 'bg-gray-200 border-2 text-left text-black'} relative`
                }
                style={{
                    borderBottomLeftRadius: isMe ? '16px' : '0',
                    borderBottomRightRadius: isMe ? '0' : '16px',
                }}>

                {/* MESSAGE OPTION BUTTON */}

                <ChevronDown size={20} className={`absolute group-hover:block hidden top-2 right-2 cursor-pointer transition duration-200`} />

                {/* MESSAGE */}
                <p className="mr-10">{message.text}</p>
                <p className='flex items-center justify-end text-[10px] mt-3 gap-3'>
                    {generateMessageTime(message.updatedAt)}
                    {isMe
                        && <span>
                            {message.status === "sent"
                                ? <Check size={18} />
                                : message.status === "delivered"
                                    ? <CheckCheck size={18} className="text-muted-foreground" />
                                    : <CheckCheck size={18} className="text-blue-900" />
                            }
                        </span>
                    }
                </p>


            </div>
        </div>

    );
}


export default ChatBubble
