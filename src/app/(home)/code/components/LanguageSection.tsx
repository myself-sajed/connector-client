import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type PropTypes = {
    setLanguage: Dispatch<SetStateAction<string>>;
    language: string;
}

const LanguageSection = ({ language, setLanguage }: PropTypes) => {

    return (
        <div className="w-full">
            <Tabs onValueChange={(lang) => setLanguage(lang)} defaultValue="html" className="w-full">
                <TabsList className="space-x-10">
                    {
                        languages.map((lang) => {
                            return <TabsTrigger className="flex items-center gap-2" key={lang.lang} value={lang.lang}>
                                <Image src={`/assets/${lang.icon}`} alt={lang.name} height={20} width={20} />
                                <span>{lang.name}</span>
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
