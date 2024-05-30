"use client"

import Sidebar from "./components/base/Sidebar"
import UserChatBar from "./components/base/UserChatBar"
import ChatContainer from "./components/base/ChatContainer"
import Header from "./components/base/Header"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { TabType, tabs } from "@/lib/constants"
import UserContactBar from "./components/base/UserContactBar"
import EditProfile from "./components/base/EditProfile"
import { useState } from "react"

export default function Connector() {

  const currentTab = useSelector((state: RootState) => state.active?.currentTab) as TabType
  const selectedContact = useSelector((state: RootState) => state.active?.selectedContact)

  const tabMap = {
    Chats: <UserChatBar />,
    Contacts: <UserContactBar />,
    Profile: <EditProfile />,
    Logout: <div>Logoing out...</div>
  }


  return (
    <div className="grid max-h-screen w-full pl-[56px]">
      <Sidebar />
      <div className="flex flex-col h-full">
        <Header />
        <main className="grid flex-1 gap-4 md:p-3 p-2 md:grid-cols-3 h-full">

          {/* SHOWING COMPONENTS NORMALLY UNTIL REACHES BELOW md */}
          <div className="hidden md:block">{tabMap?.[currentTab]}</div>
          <ChatContainer className={"hidden md:block"} />

          {/* SHOWING COMPONENTS BASED ON PRIORITY WHEN SCREEN IS BELOW md. IF CONTACT IS SELECTED THEN SHOW CHAT CONTAINER 
          OTHERWISE SHOW THE CURRENTLY SELECTED TAB */}
          {
            selectedContact
              ? <ChatContainer className="block md:hidden " />
              : <div className="block md:hidden">{tabMap?.[currentTab]}</div>
          }
        </main>
      </div>
    </div>
  )
}
