"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Empty from "../components/base/Empty"
import { Lock, Waypoints } from "lucide-react"
import { FormEvent, useRef } from "react"
import { useDispatch } from "react-redux"
import { setLoggedInUser } from "@/redux/slices/loggedInUserSlice"
import { useRouter } from "next/navigation"

function Login() {

    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const dispatch = useDispatch()
    const router = useRouter()

    const handleLogin = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (emailRef.current) {
            dispatch(setLoggedInUser(emailRef.current?.value))
            router.push('/')
        }
    }


    return (
        <div className="w-full lg:grid lg:grid-cols-2 h-screen">
            <div className="flex items-center justify-center py-12">
                <form onSubmit={handleLogin} className="mx-auto grid w-[50%] gap-6">
                    <div className="grid gap-1 text-center items-center">
                        <Waypoints strokeWidth={2} size={40} className="text-primary mx-auto mb-5" />
                        <h1 className="text-3xl font-bold mt-3">Login to Connector</h1>
                        <p className="text-balance text-sm text-muted-foreground">
                            Enter your email below to login to your account
                        </p>
                    </div>
                    <div className="grid gap-4 mt-5">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                ref={emailRef}
                                id="email"
                                type="text"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" required />
                        </div>
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="#" className="underline">
                            Sign up
                        </Link>
                    </div>
                </form>
            </div>
            <div className="hidden bg-gray-100 lg:block">
                <div className="relative z-30 flex items-center justify-center flex-col h-full">
                    <Waypoints strokeWidth={2} size={100} className="text-primary" />
                    <p style={{ lineHeight: '85px' }} className="text-[5rem] font-bold mt-10 text-primary">Connector</p>
                    <p>The most trusted & secure chatting platform for everyone.</p>


                    <div className="flex items-center gap-2 justify-center text-muted-foreground text-sm mt-[7rem]">
                        <Lock size={13} /> Your chats are end-to-end encrypted.
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Login
