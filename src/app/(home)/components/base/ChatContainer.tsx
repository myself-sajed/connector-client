import ChatBubbles from "./ChatBubbles"
import SendMessageInput from "./SendMessageInput"

const ChatContainer = () => {
    return (
        <div className="relative flex flex-col rounded-xl bg-muted/50 p-4 col-span-2">
            <ChatBubbles />
            <SendMessageInput />
        </div>
    )
}

export default ChatContainer
