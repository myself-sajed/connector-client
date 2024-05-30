import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import config from '@/lib/config';
import { RootState } from '@/redux/store';
import { Loader, RefreshCw } from 'lucide-react';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StepOneFields from '../../signup/components/StepOneFields';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { editUser } from '@/lib/api';
import { setCurrentTab } from '@/redux/slices/activeSlice';
import { tabs } from '@/lib/constants';
import { setLoggedInUser } from '@/redux/slices/loggedInUserSlice';

type EditProfileFormData = {
    name: string;
    email: string;
    bio: string;
    avatar: number;
};


const EditProfile = () => {
    const user = useSelector((state: RootState) => state.user?.user);
    const router = useRouter()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState<EditProfileFormData>({
        name: '',
        email: '',
        bio: '',
        avatar: 1,
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (user) {
            const avatarNumber = parseInt((user.avatar.split('-')[1]).charAt(0));
            setFormData({
                name: user.name,
                email: user.email,
                bio: user.bio,
                avatar: avatarNumber,
            });
        }
    }, [user]);

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement>,
        key: keyof EditProfileFormData
    ) => {
        setFormData((prev) => {
            return { ...prev, [key]: e.target.value };
        });
    };

    const handleAvatarChange = () => {
        const nextAvatar = formData.avatar + 1;
        setFormData((prev) => {
            return { ...prev, avatar: nextAvatar > 10 ? 1 : nextAvatar };
        });
    };


    const handleEditProfile = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (formData.avatar > 10) {
            toast.error("Please select a valid avatar")
            return
        }

        if (formData.name && formData.email) {

            try {
                setIsLoading(true)
                const res = await editUser({ ...formData, userId: user?._id! });
                if (res.data.status === 'success') {
                    console.log(res.data)
                    toast.success("Profile Updated")
                    dispatch(setCurrentTab(tabs.CHATS))
                    dispatch(setLoggedInUser(res.data.user))
                } else {
                    toast.error(res.data.message)
                }
            } catch (error) {
                toast.error("Internal Server Error")
            } finally {
                setIsLoading(false)
            }
        } else {
            toast.error("Please enter all fields.")
            return
        }

    }

    return (
        <div>
            <p className="text-xl text-primary font-semibold pb-2">Your Profile</p>
            <div className="flex items-start gap-5 my-5">
                <Avatar className="md:w-16 md:h-16 w-12 h-12 flex">
                    <AvatarImage
                        className="object-cover"
                        src={`${config.BACKEND_URL}/api/users/avatar/avatar-${formData.avatar}.jpg`}
                        alt="Avatar"
                    />
                    <AvatarFallback>
                        <Loader size={20} className="animate-spin" />
                    </AvatarFallback>
                </Avatar>
                <div className="space-y-5">
                    <div>
                        <p className="md:text-base text-sm">Avatar Selection</p>
                        <p className="text-xs text-muted-foreground">
                            Please select any avatar you like.
                        </p>
                    </div>

                    <Button
                        onClick={handleAvatarChange}
                        type="button"
                        variant="link"
                        disabled={isLoading}
                        className="p-0 h-0 flex items-center gap-2 md:text-base text-sm"
                    >
                        <RefreshCw strokeWidth={3} size={12} />
                        <span className="text-sm">Try a different Avatar</span>
                    </Button>
                </div>
            </div>

            <div className="h-7"></div>

            <form onSubmit={handleEditProfile} className='space-y-5'>
                <StepOneFields formData={formData} handleInputChange={handleInputChange} />
                <Button disabled={isLoading} type="submit" className="w-full">
                    {isLoading ? <Loader size={20} className="animate-spin" /> : "Update Profile"}
                </Button>
            </form>
        </div>
    );
};

export default EditProfile;
