import { Check, CheckCheck, Clock3 } from "lucide-react";

type PropType = {
    isMe: boolean | undefined;
    status: string | undefined
}

const MessageStatus = ({ isMe, status }: PropType) => {
    return (isMe
        && <span>
            {
                status === "optimistic"
                    ? <Clock3 size={13} /> :
                    status === "sent"
                        ? <Check size={18} />
                        : status === "delivered"
                            ? <CheckCheck size={18} />
                            : <CheckCheck size={18} className="text-blue-900" />
            }
        </span>
    )
}

export default MessageStatus
