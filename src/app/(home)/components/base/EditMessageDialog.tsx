import { Send } from "lucide-react"
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
    setMessages: Dispatch<SetStateAction<MessagesState>>
}

function EditMessageDialog({ editMessage, setEditMessage, selectedChat, setMessages }: PropType) {

    const [message, setMessage] = useState<string | null>(null)
    const userId = useSelector((state: RootState) => state.user?.user)

    useEffect(() => {
        if (editMessage) {
            setMessage(editMessage?.text)
        }
    }, [editMessage])

    const handleSubmit = () => {

        if (message) {

            // optimistic message

            const optimisticMessage = {
                _id: editMessage?._id,
                text: message,
                updatedAt: new Date().getTime(),
                author: { _id: userId },
                status: "optimistic",
                showChevron: false,
                isEdited: true
            }


            const chatData = {
                messageId: editMessage?._id,
                messageContent: message,
                author: userId,
                selectedChat
            }

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
            setMessage(null)
            setEditMessage(null)
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // Prevent newline
            handleSubmit();
        }
    };


    return (
        <Dialog open={editMessage ? true : false} onOpenChange={(open) => !open && setEditMessage(null)} >
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Edit Message</DialogTitle>
                    <DialogDescription>
                        You will not be able to edit a message 15 minutes after it has been sent.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid flex-1 gap-2 w-full">
                    <Label htmlFor="link" className="sr-only">
                        Message
                    </Label>
                    <Textarea
                        defaultValue={editMessage?.text || ''}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        value={message || ''}
                        autoFocus={true}
                        placeholder="Type your message here..."
                        className="resize-none border-2 p-3 outline-none focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-offset-0"
                    />
                </div>
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <div className="flex items-center gap-4">
                            <Button type="button" variant="secondary" onClick={() => setEditMessage(null)}>
                                Cancel
                            </Button>
                            <Button onClick={handleSubmit} type="submit" className="ml-auto gap-1.5">
                                Send
                                <Send className="size-3.5" />
                            </Button>
                        </div>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


export default EditMessageDialog