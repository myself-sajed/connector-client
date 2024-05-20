import OtherPersonBubble from '../unit/OtherPersonBubble'
import YourBubble from '../unit/YourBubble'

const ChatBubbles = () => {
    return (
        <div className='flex-1'>
            <OtherPersonBubble />
            <YourBubble />
        </div>
    )
}

export default ChatBubbles
