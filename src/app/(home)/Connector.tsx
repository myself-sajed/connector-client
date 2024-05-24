"use client"

import Sidebar from "./components/base/Sidebar"
import UserChatBar from "./components/base/UserChatBar"
import ChatContainer from "./components/base/ChatContainer"
import Header from "./components/base/Header"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { TabType, tabs } from "@/lib/constants"
import UserContactBar from "./components/base/UserContactBar"

export default function Connector() {

  const currentTab = useSelector((state: RootState) => state.active?.currentTab) as TabType
  const selectedContact = useSelector((state: RootState) => state.active?.selectedContact)

  const tabMap = {
    Chats: <UserChatBar />,
    Contacts: <UserContactBar />,
    Status: <div>Status</div>,
    Settings: <div>Settings</div>,
    Profile: <div>Profile</div>
  }

  return (
    <div className="grid max-h-screen w-full pl-[56px]">
      <Sidebar />
      <div className="flex flex-col h-full">
        <Header />
        <main className="grid flex-1 gap-4 md:p-4 p-2 md:grid-cols-3 h-full">
          {tabMap?.[currentTab]}
          <ChatContainer />
        </main>
      </div>
    </div>
  )
}
