import Editor, { loader } from "@monaco-editor/react";
import LanguageSection from "./LanguageSection";
import { useEffect, useState } from "react";
import socket from "@/lib/client-socket";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type CodeType = {
    html: string;
    css: string;
    javascript: string;
    json: string;
}

function CodeEditor() {


    const [language, setLanguage] = useState("html")
    const selectedChat = useSelector((state: RootState) => state.active?.selectedChat)
    const [code, setCode] = useState<CodeType>({ html: "", css: "", javascript: "", json: "" })

    const handleChange = (value: string | undefined) => {
        setCode((prev: CodeType) => {
            return { ...prev, [language]: value }
        })
        const chat = { chatId: selectedChat?._id, contactId: selectedChat?.contact?._id }
        socket.emit("client:code-change", { chat, code: value, language })
    }

    useEffect(() => {

        type ServerCode = {
            chat: { chatId: string };
            code: string,
            language: keyof ServerCode
        }
        const handleServerCodeChange = ({ chat, code: serverCode, language }: ServerCode) => {
            if (chat.chatId === selectedChat?._id) {
                setCode((prev: CodeType) => {
                    return { ...prev, [language]: serverCode }
                })
            }
        }

        socket.on("server:code-change", handleServerCodeChange)

        return () => {
            socket.off("server:code-change", handleServerCodeChange)
        }
    }, [selectedChat?._id])


    useEffect(() => {

        type ServerCode = {
            chat: { chatId: string };
            serverCode: CodeType
        }

        const handleCodeRetrieval = ({ chat, serverCode }: ServerCode) => {
            if (chat.chatId === selectedChat?._id) {
                setCode(() => serverCode)
            }
        }

        socket.on("server:code-retrieval", handleCodeRetrieval)

        return () => {
            socket.off("server:code-retrieval", handleCodeRetrieval)
        }
    }, [selectedChat?._id])


    useEffect(() => {
        const chat = { chatId: selectedChat?._id, contactId: selectedChat?.contact?._id }
        socket.emit("client:code-retrieval", chat)
    }, [selectedChat])


    return (
        selectedChat && <div className="w-full col-span-2 h-full">
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
                        bottom: 12,
                    },
                    copyWithSyntaxHighlighting: true,
                    quickSuggestions: true,
                    showUnused: true,
                    smartSelect: {
                        selectLeadingAndTrailingWhitespace: true,
                        selectSubwords: true,
                    },
                    snippetSuggestions: "bottom",
                    smoothScrolling: true,
                    minimap: { scale: 9, sectionHeaderFontSize: 12 }
                }}
            />
        </div>
    );
}
export default CodeEditor;