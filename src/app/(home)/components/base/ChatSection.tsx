import React from 'react'
import ChatBubble from './ChatBubble'

const ChatSection = () => {
    return (
        <div className='h-[75%] overflow-hidden overflow-y-auto pr-4'>
            <ChatBubble isMe={true} message='Hello' />
            <ChatBubble isMe={false} message='Hey!' />
            <ChatBubble isMe={true} message='Coming to the party??' />
            <ChatBubble isMe={false} message='Yeah.' />
            <ChatBubble isMe={true} message='Meet you at 6 then!' />
            <ChatBubble isMe={false} message='Sure shot!!' />
            <ChatBubble isMe={false} message='Hey' />
            <ChatBubble isMe={false} message='Hii' />
            <ChatBubble isMe={false} message='Hii' />
            <ChatBubble isMe={false} message='Hii' />
            <ChatBubble isMe={false} message='Hii' />
            <ChatBubble isMe={false} message='Hii' />
            <ChatBubble isMe={false} message='Hii' />
            <ChatBubble isMe={false} message='Hii' />
            <ChatBubble isMe={true} message='Meet you at 6 then!' />
            <ChatBubble isMe={true} message='What??' />
        </div>
    )
}

export default ChatSection
