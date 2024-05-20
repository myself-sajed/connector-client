import ChatSection from "./ChatSection"
import Empty from "./Empty"
import SendMessageInput from "./SendMessageInput"

const ChatContainer = () => {
    return (
        <div className="relative rounded-xl bg-muted/50 p-4 col-span-2 max-h-[calc(100vh-90px)] overflow-hidden">
            <>
                <ChatSection />
                <SendMessageInput />
            </>
            {/* <Empty /> */}

        </div>
    )
}

export default ChatContainer
