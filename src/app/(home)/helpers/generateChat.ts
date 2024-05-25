import { createChat } from "@/lib/api";
import { SelectedChat } from "@/redux/slices/activeSlice";
import {
  UnknownAction,
  Dispatch as ReduxDispatch,
  ActionCreatorWithPayload,
} from "@reduxjs/toolkit";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";

type ParamTypes = {
  contactId: string;
  meId: string;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  dispatch: ReduxDispatch<UnknownAction>;
  setSelectedChat: ActionCreatorWithPayload<
    SelectedChat | null,
    "active/setSelectedChat"
  >;
};

const generateChat = async ({
  contactId,
  meId,
  setIsLoading,
  dispatch,
  setSelectedChat,
}: ParamTypes) => {
  try {
    const res = await createChat(contactId, meId);
    if (res.data.status === "success") {
      dispatch(
        setSelectedChat({
          ...res.data.chat,
          openChatSection: true,
          generateChatId: false,
        })
      );
    } else if (res.data.status === "error") {
      dispatch(setSelectedChat(null));
    }
  } catch (error) {
    console.log("error in generating chat", error);
  } finally {
    setIsLoading(false);
  }
};

export default generateChat;
