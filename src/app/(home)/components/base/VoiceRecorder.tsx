import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, StopCircle } from "lucide-react";

interface VoiceRecorderProps {
    onStop: (audioBlob: Blob) => void;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onStop }) => {
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data);
        };

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
            audioChunksRef.current = [];
            onStop(audioBlob);
        };

        mediaRecorder.start();
        mediaRecorderRef.current = mediaRecorder;
        setIsRecording(true);
    };

    const stopRecording = () => {
        mediaRecorderRef.current?.stop();
        setIsRecording(false);
    };

    return (
        <div>
            {isRecording ? (
                <Button variant="destructive" onClick={stopRecording} size="icon" className='animate-pulse'>
                    <StopCircle className="size-6" />
                </Button>
            ) : (
                <Button onClick={startRecording} variant="ghost" size="icon">
                    <Mic className="size-4" />
                </Button>
            )}
        </div>
    );
};

export default VoiceRecorder;
