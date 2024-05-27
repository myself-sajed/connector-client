/* eslint-disable react-hooks/exhaustive-deps */
import { Send, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { SelectedChat } from "@/redux/slices/activeSlice"
import { Message } from "@/lib/types"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { v4 as uuid } from "uuid"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import socket from "@/lib/client-socket"
import { MessagesState } from "./ChatContainer"


interface PropType {
    editMessage: Message | null;
    setEditMessage: React.Dispatch<React.SetStateAction<Message | null>>;
    selectedChat: SelectedChat;
    setMessages: Dispatch<SetStateAction<MessagesState>>;
    messageOperation: "reply" | "unsend" | null;
    setMessageOperation: React.Dispatch<React.SetStateAction<"reply" | "unsend" | null>>
}

function EditReplyMessageDialog({ editMessage, setEditMessage, selectedChat, setMessages, messageOperation, setMessageOperation }: PropType) {

    const [message, setMessage] = useState<string | null>(null)
    const userId = useSelector((state: RootState) => state.user?.user)

    useEffect(() => {
        if (editMessage && messageOperation === null) {
            setMessage(editMessage?.text)
        }
    }, [editMessage, messageOperation])

    const handleSubmit = () => {

        if (message) {

            // optimistic message

            let optimisticMessage = {}
            const tempMessageId = uuid()


            if (!messageOperation) {
                optimisticMessage = {
                    _id: editMessage?._id,
                    text: message,
                    updatedAt: new Date().getTime(),
                    author: { _id: userId },
                    status: "optimistic",
                    showChevron: false,
                    isEdited: true
                }
            } else if (messageOperation === "reply") {
                optimisticMessage = {
                    _id: tempMessageId,
                    text: message,
                    updatedAt: new Date().getTime(),
                    author: { _id: userId },
                    status: "optimistic",
                    showChevron: false,
                    messageRepliedTo: editMessage,
                    isEdited: false
                }
            }

            const chatData = {
                messageId: editMessage?._id,
                messageContent: message,
                author: userId,
                selectedChat
            }

            if (messageOperation) {

                const chatData = {
                    selectedChat,
                    messageContent: message,
                    author: userId,
                    tempMessageId,
                    messageRepliedTo: editMessage
                }

                socket.emit('message:client', chatData)
                if (selectedChat && selectedChat._id) {
                    const chatId = selectedChat._id as string;
                    // @ts-ignore
                    setMessages((prev: MessagesState) => {
                        return {
                            ...prev,
                            [chatId]: [...(prev[chatId] || []), optimisticMessage]
                        };
                    });
                } else {
                    console.error("Selected chat or chat ID is null or undefined");
                }
            } else {
                socket.emit('message:client:edit', chatData)
                if (selectedChat && selectedChat._id) {
                    const chatId = selectedChat._id as string;
                    // @ts-ignore
                    setMessages((prev: MessagesState) => {
                        return {
                            ...prev,
                            [chatId]: (prev[chatId] || []).map((msg) => {
                                return msg._id === editMessage?._id ? optimisticMessage : msg
                            })
                        };
                    });
                } else {
                    console.error("Selected chat or chat ID is null or undefined");
                }
            }

            setMessage(null)
            setEditMessage(null)
            setMessageOperation(null)
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // Prevent newline
            handleSubmit();
        }
    };

    const handleOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            setMessageOperation(() => null);
            setEditMessage(() => null);
            setMessage("")
        }
    }

    const handleDelete = () => {
        const chatId = editMessage?.chatId
        setMessages((prev: MessagesState) => {
            return {
                ...prev,
                [chatId as string]: (prev[chatId!] || []).filter((msg: Message) => msg._id !== editMessage?._id)
            };
        });

        socket.emit("message:client:delete", editMessage)
    }


    return (
        <Dialog open={editMessage ? true : false} onOpenChange={handleOpenChange} >
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{!messageOperation ? "Edit" : messageOperation === "reply" ? "Reply" : "Unsend"} Message</DialogTitle>
                    <DialogDescription className="text-xs">
                        {!messageOperation ? "You will not be able to edit a message 15 minutes after it has been sent." : messageOperation === "reply" ? "Even though you delete the message that was replied, it shows in replied message." : "Deleting message is non-reversible action. You will not be able to retrieve your deleted message."}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid flex-1 gap-2 w-full">
                    <Label htmlFor="link" className="sr-only">
                        Message
                    </Label>
                    {
                        !messageOperation ? <Textarea
                            defaultValue={editMessage?.text || ''}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            value={message || ''}
                            autoFocus={true}
                            placeholder="Type your message here..."
                            className="resize-none border-2 p-3 outline-none focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-offset-0"
                        /> : messageOperation === "reply" ? <div className="border-2 rounded-md">
                            <div className="bg-muted p-2">
                                <p className="text-muted-foreground text-xs">Replying to message of <span className="font-semibold">{editMessage?.author.name}</span></p>
                                <p>{editMessage?.text}</p>
                            </div>
                            <Textarea
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={handleKeyDown}
                                value={message || ''}
                                autoFocus={true}
                                placeholder="Type your message here..."
                                className="resize-none border-none p-3 outline-none focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0"
                            />
                        </div>
                            :
                            <div>
                                <div className="bg-muted p-2">
                                    <p className="text-muted-foreground text-xs">Message to delete</p>
                                    <p>{editMessage?.text}</p>
                                </div>

                                <div className="my-5 text-center text-destructive text-lg font-semibold">
                                    Are you sure you want to delete this message?
                                </div>
                            </div>
                    }

                </div>
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <div className="flex items-center gap-4">
                            <Button type="button" variant="secondary">
                                Cancel
                            </Button>

                            {
                                messageOperation === "unsend"
                                    ? <Button variant="destructive" onClick={handleDelete} type="submit" className="ml-auto gap-1.5">
                                        <Trash className="size-3.5" />
                                        Delete Message
                                    </Button>
                                    : <Button onClick={handleSubmit} type="submit" className="ml-auto gap-1.5">
                                        Send
                                        <Send className="size-3.5" />
                                    </Button>
                            }
                        </div>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


export default EditReplyMessageDialog