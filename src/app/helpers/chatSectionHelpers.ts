import React, { Ref } from "react";

export const scrollToBottom = (chatEndRef: any) => {
  chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
};

export const scrollToBottomInstantly = (chatContainerRef: any) => {
  if (chatContainerRef.current) {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }
};

export const handleScroll = (
  chatContainerRef: any,
  setShowScrollButton: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (chatContainerRef.current) {
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    if (scrollHeight - scrollTop > clientHeight + 100) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  }
};
