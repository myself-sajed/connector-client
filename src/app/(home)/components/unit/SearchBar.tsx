import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { RotateCw } from 'lucide-react'
import React from 'react'


type PropType = {
    refetch: () => void;
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isLoading: boolean;
    isFetching: boolean;
    tooltipText: string;
}

const SearchBar = ({ refetch, isLoading, isFetching, tooltipText, onSearch }: PropType) => {
    return (
        <div className="flex items-center w-full gap-2">
            <Input type="search" onChange={onSearch} placeholder="Search contact" className="sticky left-0 top-0 flex-1" />

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <Button onClick={() => refetch()} disabled={isLoading || isFetching} variant="secondary"><RotateCw className={cn("text-muted-foreground", (isLoading || isFetching) ? "text-muted-foreground" : "")} /></Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        {tooltipText}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

        </div>
    )
}

export default SearchBar
