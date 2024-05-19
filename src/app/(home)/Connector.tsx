import Sidebar from "./components/base/Sidebar"
import UserChatBar from "./components/base/UserChatBar"
import ChatContainer from "./components/base/ChatContainer"
import Header from "./components/base/Header"

export default function Connector() {
  return (
    <div className="grid max-h-screen w-full pl-[56px]">
      <Sidebar />
      <div className="flex flex-col h-full">
        <Header />
        <main className="grid flex-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 h-full">
          <UserChatBar />
          <ChatContainer />
        </main>
      </div>
    </div>
  )
}
