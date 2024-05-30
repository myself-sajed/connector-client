"use client"
import React, { ChangeEvent, FormEvent, useRef, useState } from 'react'
import LoginRegisterHero from '../login/components/LoginRegisterHero'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ChevronLeft, Loader, RefreshCw, Waypoints } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import config from '@/lib/config'
import { toast } from 'sonner'
import { createUser } from '@/lib/api'
import { useRouter } from 'next/navigation'

const SignUp = () => {

    const [step, setStep] = useState(1)
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({ name: '', email: '', password: '', passwordAgain: '', bio: '', avatar: 1 })

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {
        setFormData((prev) => {
            return { ...prev, [key]: e.target.value }
        })
    }


    const handleAvatarChange = () => {
        const nextAvatar = formData.avatar + 1
        setFormData((prev) => {
            return { ...prev, avatar: nextAvatar > 10 ? 1 : nextAvatar }
        })
    }

    const handleRegistration = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (step === 1) {
            setStep(2)
            return
        }

        if (step === 2) {

            if (formData.password !== formData.passwordAgain) {
                toast.error("Passwords doesn't match, try again...")
                return
            }

            if (formData.avatar > 10) {
                toast.error("Please select a valid avatar")
                return
            }

            if (formData.name && formData.email) {

                try {
                    setIsLoading(true)
                    const res = await createUser(formData);
                    console.log(res)
                    if (res.data.status === 'success') {
                        toast.success("Registration Successfull")
                        router.push("/")
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
                                    <Input onChange={(e) => handleInputChange(e, "name")} value={formData["name"]} type="text" placeholder="Shaikh Sajed" required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input onChange={(e) => handleInputChange(e, "email")} value={formData["email"]} type="email" placeholder="m@example.com" required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="bio">Bio (optional)</Label>
                                    <Input onChange={(e) => handleInputChange(e, "bio")} value={formData["bio"]} type="bio" placeholder="What is in your mind..." />
                                </div>
                            </>
                        }


                        {
                            step === 2 && <>
                                <div className="flex sm:items-center gap-5">
                                    <Avatar className="md:w-20 md:h-20 w-16 h-16 flex">
                                        <AvatarImage className="object-cover" src={`${config.BACKEND_URL}/api/users/avatar/avatar-${formData.avatar}.jpg`} alt="Avatar" />
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
                                    <Input onChange={(e) => handleInputChange(e, "password")} value={formData["password"]} type="password" required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password, again</Label>
                                    <Input onChange={(e) => handleInputChange(e, "passwordAgain")} value={formData["passwordAgain"]} type="password" required />
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
