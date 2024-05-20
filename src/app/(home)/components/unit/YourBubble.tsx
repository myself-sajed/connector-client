import Image from "next/image"
import MessageActionButton from "./MessageActionButton"

const YourBubble = () => {
    return (
        <div className="flex items-start justify-end gap-2.5 bg-transparent cursor-pointer group">
            <div className="flex flex-col gap-1 w-full max-w-[320px]">
                <div className="flex flex-col leading-1.5 p-4 bg-blue-200 group-hover:bg-blue-100 duration-200 transition rounded-s-xl rounded-br-[2rem] text-black">
                    <p className="text-sm font-normal"> That is awesome. I think our users will really appreciate the improvements.</p>
                    <time className="text-[10px] w-full flex items-center justify-end font-normal text-gray-600">11:46 PM</time>
                </div>
            </div>
        </div>
    )
}

export default YourBubble
