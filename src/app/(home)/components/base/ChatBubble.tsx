/* eslint-disable react-hooks/exhaustive-deps */
import { Message } from "@/lib/types";
import { Check, CheckCheck, ChevronDown, Clock3 } from "lucide-react";
import generateMessageTime from "../../helpers/generateMessageTime";
import { useEffect } from "react";
import socket from "@/lib/client-socket";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface PropType {
    message: Message;
    isMe?: boolean;
    setEditMessage: React.Dispatch<React.SetStateAction<Message | null>>;
    setMessageOperation: React.Dispatch<React.SetStateAction<"reply" | "unsend" | null>>
}

function ChatBubble({ message, isMe, setEditMessage, setMessageOperation }: PropType) {

    const editHandler = () => {
        setEditMessage(message)
    }

    const replyHandler = () => {
        setMessageOperation("reply")
        setEditMessage(message)
    }

    const deleteHandler = () => {
        setMessageOperation("unsend")
        setEditMessage(message)
    }

    const isReplyMessage = message.messageRepliedTo ? true : false

    return (
        <div onDoubleClick={replyHandler} className={`flex ${isMe ? 'justify-end' : 'justify-start'} sm:mb-4 mb-2 md:text-sm sm:text-sm text-[11px]`}>
            <div className={cn("max-w-xs rounded-t-lg", isReplyMessage ? `border ${isMe ? 'rounded-bl-2xl' : 'rounded-br-2xl'}` : '')}>
                {isReplyMessage && <div className="bg-muted p-2 rounded-t-lg">
                    <p className="text-muted-foreground text-xs">Replied to</p>
                    <p>{message.messageRepliedTo?.text}</p>
                </div>}
                <div
                    className={`${isReplyMessage ? "rounded-b-lg" : "rounded-lg"} px-4 py-2 transition duration-200 group 
                            ${isMe ? 'bg-primary text-left text-white'
                            : 'bg-gray-200 text-left text-black'} relative`
                    }
                    style={{
                        borderBottomLeftRadius: isMe ? '16px' : '0',
                        borderBottomRightRadius: isMe ? '0' : '16px',
                    }}>

                    {/* MESSAGE OPTION BUTTON */}
                    {
                        !Object.keys(message).includes('showChevron') &&
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div>
                                    <ChevronDown size={20} className={`absolute group-hover:block hidden top-2 right-2 cursor-pointer transition duration-200`} />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {isMe && <DropdownMenuItem onClick={editHandler}>Edit</DropdownMenuItem>}
                                <DropdownMenuItem onClick={replyHandler}>Reply</DropdownMenuItem>
                                {isMe && <DropdownMenuSeparator />}
                                {isMe && <DropdownMenuItem onClick={deleteHandler} className="text-destructive hover:text-destructive" >Unsend Message</DropdownMenuItem>}
                            </DropdownMenuContent>
                        </DropdownMenu>

                    }


                    {/* MESSAGE */}
                    {message.text && <p className="mr-10">{message.text}</p>}
                    {message.audioUrl && (
                        <audio controls >
                            <source src={message.audioUrl} className="w-full" type="audio/wav" />
                            Your browser does not support the audio element.
                        </audio>
                    )}
                    <p className='flex items-center justify-end sm:text-[10px] text-[9px] sm:mt-3 mt-1 gap-3'>
                        {generateMessageTime(message.updatedAt)} {message.isEdited && <span>Edited </span>}
                        {isMe
                            && <span>
                                {
                                    message.status === "optimistic"
                                        ? <Clock3 size={13} /> :
                                        message.status === "sent"
                                            ? <Check size={18} />
                                            : message.status === "delivered"
                                                ? <CheckCheck size={18} />
                                                : <CheckCheck size={18} className="text-blue-900" />
                                }
                            </span>
                        }
                    </p>


                </div>
            </div>
        </div>

    );
}


export default ChatBubble
