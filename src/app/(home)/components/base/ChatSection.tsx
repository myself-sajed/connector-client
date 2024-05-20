import OtherPersonBubble from '../unit/OtherPersonBubble'
import YourBubble from '../unit/YourBubble'

const ChatSection = () => {
    return (
        <div className='flex-1 space-y-3'>
            <OtherPersonBubble />
            <YourBubble />
        </div>
    )
}

export default ChatSection
