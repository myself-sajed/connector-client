import React from 'react';

function ChatBubble({ message, isMe }: { message: string, isMe?: boolean }) {
    return (

        <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-4 text-sm`}>
            <div
                className={`max-w-xs rounded-lg px-4 py-2 transition duration-200 cursor-pointer
                ${isMe ? 'hover:bg-blue-500 bg-blue-600 text-right text-white'
                        : 'hover:bg-gray-100 bg-gray-200 text-left text-black'}`}
                style={{
                    borderBottomLeftRadius: isMe ? '16px' : '0',
                    borderBottomRightRadius: isMe ? '0' : '16px',
                }}
            >
                <p>{message}</p>
                <time className='flex items-center justify-end text-[10px]'>11:24 pm</time>
            </div>

        </div>
    );
}


export default ChatBubble
