import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type PropTypes = {
    setLanguage: Dispatch<SetStateAction<string>>;
    language: string;
}

const LanguageSection = ({ language, setLanguage }: PropTypes) => {

    return (
        <div className="w-full animate-fade-left animate-once animate-duration-[1500ms] animate-delay-500">
            <Tabs onValueChange={(lang) => setLanguage(lang)} defaultValue="html" className="w-full p-1 m-1">
                <TabsList className="md:space-x-10 sm:space-x-5 space-x-0">
                    {
                        languages.map((lang) => {
                            return <TabsTrigger className="flex md:flex-row flex-col items-center gap-2 p-2" key={lang.lang} value={lang.lang}>
                                <Image src={`/assets/${lang.icon}`} alt={lang.name} height={20} width={20} />
                                <span className="md:text-sm text-xs">{lang.name}</span>
                            </TabsTrigger>
                        })
                    }
                </TabsList>
            </Tabs>
        </div>
    )
}

export default LanguageSection




const languages = [
    {
        icon: 'html.svg',
        name: "HTML",
        lang: 'html'
    },
    {
        icon: 'css.svg',
        name: "CSS",
        lang: 'css'
    },
    {
        icon: 'javascript.svg',
        name: "JavaScript",
        lang: 'javascript'
    },
    {
        icon: 'json.png',
        name: "JSON",
        lang: 'json'
    },

]
