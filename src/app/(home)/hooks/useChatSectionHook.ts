/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from "react";
import { Chat, Contact, Message } from "@/lib/types";
import { getMessages } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import socket from "@/lib/client-socket";
import { SelectedChat } from "@/redux/slices/activeSlice";
import { MessagesState } from "../components/base/ChatContainer";
import { scrollToBottomInstantly } from "../helpers/chatSectionHelpers";

interface SelectedContactUser extends Chat {
  contact: Contact;
}

interface ServerMessage {
  selectedContactUser: SelectedContactUser;
  message: Message;
  tempMessageId: string;
}

type PropType = {
  setMessages: React.Dispatch<
    React.SetStateAction<{ [key: string]: Message[] }>
  >;
  messages: { [key: string]: Message[] };
  selectedChat: SelectedChat;
  chatId: string;
  user: string | null;
  setChatId: React.Dispatch<React.SetStateAction<string>>;
  chatContainerRef: React.RefObject<HTMLDivElement>;
};

const useChatSectionHook = ({
  setMessages,
  messages,
  selectedChat,
  chatId,
  user,
  setChatId,
  chatContainerRef,
}: PropType) => {
  const {
    data: serverMessages,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["message-list", chatId, user],
    queryFn: () => getMessages(chatId),
    enabled: !!chatId,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (selectedChat) {
      setChatId(selectedChat?._id!);
    }
  }, [selectedChat]);

  useEffect(() => {
    if (serverMessages?.data && serverMessages.data?.length > 0) {
      setMessages((prev) => ({
        ...prev,
        [chatId]: serverMessages?.data,
      }));
    }
  }, [serverMessages?.data]);

  useEffect(() => {
    const handleServerMessage = (serverMessage: ServerMessage) => {
      const socketMessageChatId = serverMessage?.message.chatId;
      const tempMessageId = serverMessage?.tempMessageId;
      if (!chatId) {
        setChatId(socketMessageChatId);
      }

      if (serverMessage.message.author._id === user) {
        setMessages((prev) => ({
          ...prev,
          [socketMessageChatId]: (prev[socketMessageChatId] || []).map(
            (msg: Message): Message => {
              return msg._id === tempMessageId ? serverMessage?.message : msg;
            }
          ),
        }));
      } else {
        setMessages((prev) => ({
          ...prev,
          [socketMessageChatId]: [
            ...(prev[socketMessageChatId] || []),
            serverMessage?.message,
          ],
        }));

        if (selectedChat?._id === serverMessage?.message?.chatId) {
          socket.emit("client:status:delivered", {
            chatId,
            userId: user,
            contactId: selectedChat?.contact?._id,
          });
        }
      }
    };

    socket.on("message:server", handleServerMessage);

    return () => {
      socket.off("message:server", handleServerMessage);
    };
  }, [user, socket]);

  useEffect(() => {
    const handleMessageServerEdit = (serverMessage: ServerMessage) => {
      const socketMessageChatId = serverMessage?.message.chatId;
      const tempMessageId = serverMessage?.tempMessageId;

      if (!chatId) {
        setChatId(socketMessageChatId);
      }

      setMessages((prev) => ({
        ...prev,
        [socketMessageChatId]: (prev[socketMessageChatId] || []).map(
          (msg: Message): Message => {
            return msg._id === tempMessageId ? serverMessage?.message : msg;
          }
        ),
      }));

      if (serverMessage.message.author._id !== user) {
        if (selectedChat?._id === serverMessage?.message?.chatId) {
          socket.emit("client:status:delivered", {
            chatId,
            userId: user,
            contactId: selectedChat?.contact?._id,
          });
        }
      }
    };

    socket.on("message:server:edit", handleMessageServerEdit);

    return () => {
      socket.off("message:server:edit", handleMessageServerEdit);
    };
  }, [user, socket]);

  useEffect(() => {
    socket.on("message:status:update", (data) => {
      const { messageId, status } = data;
      setMessages((prev: MessagesState) => {
        const updatedMessages = { ...prev };
        Object.keys(updatedMessages).forEach((chatId) => {
          updatedMessages[chatId] = updatedMessages[chatId].map((msg) => {
            if (msg._id === messageId) {
              return { ...msg, status: status };
            }
            return msg;
          });
        });
        return updatedMessages;
      });
    });

    return () => {
      socket.off("message:status:update");
    };
  }, [socket]);

  useEffect(() => {
    socket.on("server:status:delivered", (message) => {
      setMessages((prev: MessagesState) => {
        return {
          ...prev,
          [message.chatId]: (prev[message.chatId] || []).map((msg) => {
            return msg._id === message._id ? { ...msg, status: "seen" } : msg;
          }),
        };
      });
    });

    return () => {
      socket.off("server:status:delivered");
    };
  }, [socket]);

  useEffect(() => {
    socket.emit("client:status:delivered", { chatId, userId: user });
  }, []);

  useEffect(() => {
    const handleMessageDelete = (message: Message) => {
      if (message.author._id !== user) {
        setMessages((prev: MessagesState) => {
          return {
            ...prev,
            [message.chatId]: (prev[message.chatId] || []).filter(
              (msg) => msg._id !== message._id
            ),
          };
        });
      }
    };

    socket.on("message:server:delete", handleMessageDelete);

    return () => {
      socket.off("message:server:delete", handleMessageDelete);
    };
  }, [socket]);

  useEffect(() => {
    scrollToBottomInstantly(chatContainerRef);
  }, [messages, chatId]);

  return { isError, isLoading };
};

export default useChatSectionHook;
