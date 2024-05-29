"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Empty from "../components/base/Empty"
import { Loader, Lock, Waypoints } from "lucide-react"
import { FormEvent, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { setLoggedInUser } from "@/redux/slices/loggedInUserSlice"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { login } from "@/lib/api"
import LoginRegisterHero from "./components/LoginRegisterHero"

function Login() {

    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()
    const router = useRouter()

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (emailRef.current && passwordRef.current) {
            setIsLoading(true)

            try {
                const res = await login({ email: emailRef.current.value, password: passwordRef.current.value })

                if (res.data.status === "success") {
                    toast.success("Logged in successfully")
                    router.push('/')
                } else if (res.data.status === "error") {
                    toast.error(res.data.message)
                }
            } catch (error) {
                toast.error("Internal Server Error")
                console.log(error)
            } finally {
                setIsLoading(false)
            }

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
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input ref={passwordRef} id="password" type="password" required />
                        </div>
                        <Button disabled={isLoading} type="submit" className="w-full">
                            {isLoading ? <Loader size={20} className="animate-spin" /> : "Login"}
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="underline">
                            Sign up
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


export default Login
