/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChangeEvent, useState, useCallback } from 'react';
import { Username } from '../page';
import { Loader } from 'lucide-react';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import debounce from 'lodash/debounce';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

type StepOneFieldsProps<T> = {
    handleInputChange: (e: ChangeEvent<HTMLInputElement>, key: keyof T) => void;
    formData: T;
    setUsername: React.Dispatch<React.SetStateAction<Username>>
    username: Username;
};

const StepOneFields = <T extends Record<string, any>>({
    handleInputChange,
    formData,
    setUsername,
    username
}: StepOneFieldsProps<T>) => {

    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector((state: RootState) => state.user.user)

    const validateUsername = (username: string): boolean => {
        const isValid = /^[a-zA-Z0-9_]+$/.test(username);
        if (!isValid) {
            setUsername((prev) => ({
                ...prev,
                isValid: false
            }));

            toast.error("Special characters are not allowed")
        }
        return isValid;
    };

    const debouncedCheckUsername = useCallback(
        debounce(async (typeText: string) => {

            let text = typeText.toLowerCase().trim()

            try {
                if (text.length >= 4 && validateUsername(text)) {

                    if (user?.username === text) {
                        setUsername((prev) => {
                            return { ...prev, username: text, isValid: true }
                        })

                        return
                    } else {
                        const res = await api.post('/users/checkUsername', { username: text });
                        if (res.data.status === 'success') {
                            setUsername((prev) => ({
                                ...prev,
                                isValid: res.data.isValid,
                            }));
                        } else {
                            toast.error('Internal server error');
                        }
                    }


                } else {
                    setUsername((prev) => ({
                        ...prev,
                        isValid: false
                    }));
                }
            } catch (error) {
                setUsername((prev) => {
                    return { ...prev, text: "", isValid: false, }
                });
            } finally {
                setIsLoading(false);
            }
        }, 500),
        []
    );

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newUsername = event.target.value;
        setUsername((prev) => ({
            ...prev,
            text: newUsername
        }));

        setIsLoading(true);
        debouncedCheckUsername(newUsername);
    };


    return (
        <>
            <div className="grid gap-2">
                <div className='flex items-end justify-between w-full'>
                    <Label htmlFor="username">Username</Label>
                    {
                        !username.text ?
                            <p className='flex-1 text-xs text-right'>Be creative about your username</p>
                            : username.text.length < 4
                                ? <p className='flex-1 text-xs text-right text-destructive'>Username must have at least 4 characters</p>
                                : (
                                    isLoading ? <Loader size={12} className='animate-spin' />
                                        : username.isValid
                                            ? <p className='flex-1 text-xs text-right text-green-700'>Username is available</p>
                                            : <p className='flex-1 text-xs text-right text-destructive'>Username is not available.</p>
                                )
                    }
                </div>
                <div className='flex item-center'>
                    <Button className='secondary border-e-none border-l border-y rounded-e-none' variant="secondary">@</Button>
                    <Input
                        onChange={handleUsernameChange}
                        value={username.text.toLowerCase()}
                        type="text"
                        placeholder="username"
                        required
                        className='rounded-m-md rounded-s-none'
                    />
                </div>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                    onChange={(e) => handleInputChange(e, 'name')}
                    value={formData.name}
                    type="text"
                    placeholder="Shaikh Sajed"
                    required
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    onChange={(e) => handleInputChange(e, 'email')}
                    value={formData.email}
                    type="email"
                    placeholder="m@example.com"
                    required
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="bio">Bio (optional)</Label>
                <Input
                    onChange={(e) => handleInputChange(e, 'bio')}
                    value={formData.bio}
                    type="text"
                    placeholder="What is in your mind..."
                />
            </div>
        </>
    );
};

export default StepOneFields;
