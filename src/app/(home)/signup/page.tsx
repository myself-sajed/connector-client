"use client"
import React, { FormEvent, useRef, useState } from 'react'
import LoginRegisterHero from '../login/components/LoginRegisterHero'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ChevronLeft, Loader, RefreshCw, Waypoints } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import config from '@/lib/config'

const SignUp = () => {

    const [step, setStep] = useState(2)
    const [currentAvatar, setCurrentAvatar] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const name = useRef<HTMLInputElement>(null)
    const email = useRef<HTMLInputElement>(null)
    const bio = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)
    const passwordAgain = useRef<HTMLInputElement>(null)



    const handleAvatarChange = () => {
        const nextAvatar = currentAvatar + 1
        setCurrentAvatar(nextAvatar > 10 ? 1 : nextAvatar)
    }

    const handleRegistration = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (step === 1) {
            setStep(2)
        }
    }

    return (
        <div className="w-full lg:grid lg:grid-cols-2 h-screen">
            <div className="flex items-center justify-center py-12">
                <form onSubmit={handleRegistration} className="mx-auto grid md:w-[50%] w-[80%] gap-6">
                    <div className="grid gap-1 text-center items-center">
                        <Waypoints strokeWidth={2} size={40} className="text-primary mx-auto mb-5" />
                        <h1 className="sm:text-3xl text-2xl font-bold mt-3">Signup to Connector</h1>
                        <p className="text-balance text-xs sm:text-sm  text-muted-foreground">
                            Enter your details to create your account
                        </p>
                    </div>
                    <div className="grid gap-4 mt-5">
                        {
                            step === 1 && <>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Full Name</Label>
                                    <Input ref={name} id="name" type="text" placeholder="Shaikh Sajed" required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input ref={email} id="email" type="email" placeholder="m@example.com" required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="bio">Bio (optional)</Label>
                                    <Input ref={bio} id="bio" type="bio" placeholder="Tell us something..." />
                                </div>
                            </>
                        }

                        {
                            step === 2 && <>
                                <div className="flex sm:items-center gap-5">
                                    <Avatar className="md:w-20 md:h-20 w-16 h-16 flex">
                                        <AvatarImage className="object-cover" src={`${config.BACKEND_URL}/api/users/avatar/avatar-${currentAvatar}.jpg`} alt="Avatar" />
                                        <AvatarFallback>
                                            <Loader size={20} className="animate-spin" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className='space-y-5'>
                                        <div>
                                            <p className='md:text-base text-sm'>Avatar Selection</p>
                                            <p className="text-xs text-muted-foreground">Please select any avatar you like.</p>
                                        </div>

                                        <Button onClick={handleAvatarChange} type="button" variant="link" disabled={isLoading} className="p-0 h-0 flex items-center gap-2 md:text-base text-sm"><RefreshCw strokeWidth={3} size={12} />Try a different Avatar</Button>
                                    </div>
                                </div>
                                <div className="grid gap-2 mt-3">
                                    <Label htmlFor="password">Password</Label>
                                    <Input ref={password} id="password" type="password" required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password, again</Label>
                                    <Input ref={passwordAgain} id="passwordAgain" type="password" required />
                                </div>
                            </>
                        }

                        {
                            step === 1 && <Button disabled={isLoading} type="submit" className="w-full mt-5">
                                Go to Next Step
                            </Button>
                        }


                        {
                            step === 2 && <div className='flex items-center gap-2 mt-5'>
                                <Button type="button" disabled={isLoading} onClick={() => setStep(1)} variant="secondary" ><ChevronLeft /></Button>
                                <Button disabled={isLoading} type="submit" className="w-full">
                                    {isLoading ? <Loader size={20} className="animate-spin" /> : "Create an account"}
                                </Button>
                            </div>
                        }



                    </div>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="underline">
                            Login
                        </Link>
                    </div>
                </form>
            </div>
            <div className="hidden bg-gray-100 lg:block">
                <LoginRegisterHero />
            </div>
        </div>
    )
}

export default SignUp
