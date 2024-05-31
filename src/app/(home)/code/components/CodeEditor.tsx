/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import Editor, { loader } from "@monaco-editor/react";
import LanguageSection from "./LanguageSection";
import socket from "@/lib/client-socket";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { debounce, throttle } from "lodash";

type CodeType = {
    html: string;
    css: string;
    javascript: string;
    json: string;
};

function CodeEditor() {
    const [language, setLanguage] = useState("html");
    const selectedChat = useSelector((state: RootState) => state.active?.selectedChat);
    const [code, setCode] = useState<CodeType>({ html: "", css: "", javascript: "", json: "" });

    const userId = useSelector((state: RootState) => state.user.user)?._id;

    // Throttled function to emit typing event
    const emitTyping = useCallback(
        throttle(() => {
            socket.emit("client:typing", {
                _id: selectedChat?._id,
                contact: { _id: selectedChat?.contact?._id }
            });
        }, 1000),
        [selectedChat]
    );

    // Debounced function to emit stopped typing event
    const emitStoppedTyping = useCallback(
        debounce(() => {
            socket.emit("client:stoppedTyping", selectedChat);
        }, 1000),
        [selectedChat]
    );

    // Handle code change and emit typing events
    const handleChange = (value: string | undefined) => {
        setCode((prev: CodeType) => {
            return { ...prev, [language]: value || "" };
        });

        const chat = { chatId: selectedChat?._id, contactId: selectedChat?.contact?._id };
        socket.emit("client:code-change", { chat, code: value, language });

        emitTyping();
        emitStoppedTyping();
    };

    // Listen to server events for code changes
    useEffect(() => {
        type ServerCode = {
            chat: { chatId: string };
            code: string;
            language: keyof CodeType;
        };

        const handleServerCodeChange = ({ chat, code: serverCode, language }: ServerCode) => {
            if (chat.chatId === selectedChat?._id) {
                setCode((prev: CodeType) => {
                    return { ...prev, [language]: serverCode };
                });
            }
        };

        socket.on("server:code-change", handleServerCodeChange);

        return () => {
            socket.off("server:code-change", handleServerCodeChange);
        };
    }, [selectedChat?._id]);

    // Retrieve code when a new chat is selected
    useEffect(() => {
        type ServerCode = {
            chat: { chatId: string };
            serverCode: CodeType;
        };

        const handleCodeRetrieval = ({ chat, serverCode }: ServerCode) => {
            if (chat.chatId === selectedChat?._id) {
                setCode(() => serverCode);
            }
        };

        socket.on("server:code-retrieval", handleCodeRetrieval);

        return () => {
            socket.off("server:code-retrieval", handleCodeRetrieval);
        };
    }, [selectedChat?._id]);

    // Emit event to retrieve code for the selected chat
    useEffect(() => {
        const chat = { chatId: selectedChat?._id, contactId: selectedChat?.contact?._id };
        socket.emit("client:code-retrieval", chat);
    }, [selectedChat]);

    return (
        selectedChat && (
            <div className="w-full col-span-2 h-full animate-fade animate-once animate-duration-[800ms]">
                <LanguageSection language={language} setLanguage={setLanguage} />
                <Editor
                    language={language}
                    theme="vs-dark"
                    value={code?.[language as keyof CodeType] || ""}
                    onChange={handleChange}
                    defaultLanguage="html"
                    options={{
                        formatOnPaste: true,
                        formatOnType: true,
                        folding: true,
                        foldingHighlight: true,
                        detectIndentation: true,
                        mouseWheelZoom: true,
                        padding: {
                            top: 12,
                            bottom: 12
                        },
                        copyWithSyntaxHighlighting: true,
                        quickSuggestions: true,
                        showUnused: true,
                        smartSelect: {
                            selectLeadingAndTrailingWhitespace: true,
                            selectSubwords: true
                        },
                        snippetSuggestions: "bottom",
                        smoothScrolling: true,
                        minimap: { scale: 9, sectionHeaderFontSize: 12 }
                    }}
                />
            </div>
        )
    );
}

export default CodeEditor;
