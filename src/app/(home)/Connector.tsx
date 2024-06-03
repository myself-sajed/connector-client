/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import Sidebar from "./components/base/Sidebar"
import UserChatBar from "./components/base/UserChatBar"
import ChatContainer from "./components/base/ChatContainer"
import Header from "./components/base/Header"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { TabType, tabs } from "@/lib/constants"
import UserContactBar from "./components/base/UserContactBar"
import EditProfile from "./components/base/EditProfile"
import { useEffect, useState } from "react"
import socket from "@/lib/client-socket"
import { setContact, setSelectedChat } from "@/redux/slices/activeSlice"
import { Chat } from "@/lib/types"
import { toast } from "sonner"

export default function Connector() {

  const currentTab = useSelector((state: RootState) => state.active?.currentTab) as TabType
  const selectedContact = useSelector((state: RootState) => state.active?.selectedContact)
  const selectedChat = useSelector((state: RootState) => state.active?.selectedChat)

  const dispatch = useDispatch()

  const tabMap = {
    Chats: <UserChatBar />,
    Contacts: <UserContactBar />,
    Profile: <EditProfile />,
    Logout: <div>Loging out...</div>
  }

  const handleSeeMessage = (chat: Chat) => {
    dispatch(setSelectedChat({ ...chat, generateChatId: false, openChatSection: true }))
    dispatch(setContact(chat.contact))
  }

  useEffect(() => {
    socket.on("chat:notification", (chat) => {

      if (selectedChat?._id !== chat._id) {
        toast(`${chat.lastMessage.author.name} just messaged you.`, {
          description: `${chat.lastMessage.text}`,
          duration: 10000,
          position: "bottom-right",
          action: {
            label: "See message",
            onClick: () => {
              handleSeeMessage(chat)
            },
          },
        });
        const audio = new Audio("/assets/notification.mp3");
        audio.play().catch(() => console.log(''))
      }
    })

    return () => {
      socket.off("chat:notification")
    }
  }, [selectedChat])


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
