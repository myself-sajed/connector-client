import Image from "next/image"
import MessageActionButton from "./MessageActionButton"

const OtherPersonBubble = () => {
    return (
        <div className="flex items-start gap-2.5 bg-transparent cursor-pointer group">
            <div className="flex flex-col gap-1 w-full max-w-[320px]">
                <div className="flex flex-col leading-1.5 p-4 bg-blue-700 group-hover:bg-blue-600 transition duration-200 rounded-tr-xl rounded-e-xl rounded-bl-[2rem] text-white">
                    <p className="text-sm font-normal"> That is awesome. I think our users will really appreciate the improvements.</p>
                    <time className="text-[10px] w-full flex items-center justify-end font-normal text-gray-200">11:46 PM</time>
                </div>
            </div>
        </div>

    )
}

export default OtherPersonBubble
