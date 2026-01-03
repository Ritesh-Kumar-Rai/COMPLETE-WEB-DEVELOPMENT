import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { TbLockPassword } from "react-icons/tb";
import { MdEmail } from "react-icons/md";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

const SignIn = () => {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <section className='min-h-screen w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden'>
            <div className='relative overflow-hidden bg-accent bg-linear-to-tr from-accent to-gray-500/50 w-full h-full max-md:hidden'>
                <img src="https://images.unsplash.com/photo-1681163696928-e4d6e8b67314?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Auth Showcase Image" className='aspect-square object-cover w-full h-full' />
            </div>
            <div className='overflow-hidden flex items-center justify-center p-4'>
                <div className="space-y-4">
                    <h1 className='text-4xl font-bold'>Sign In</h1>
                    <p className='text-sm text-muted-foreground mb-6'>Enter your credentials to login to your account</p>
                    <Card className="p-4 my-4 bg-muted/50 shadow-2xl">
                        <form className='rounded-md w-100 flex flex-col gap-4' action="#" method="post">
                            <h2 className="font-bold text-2xl text-center gradient my-4">relivator.in</h2>
                            <Separator className="mb-2" />
                            <div className="flex flex-col gap-3">
                                <Label htmlFor='email-id'>Email</Label>
                                <InputGroup>
                                    <InputGroupInput type='email' name='email-id' id='email-id' placeholder='hanuman@iskcon.com' />
                                    <InputGroupAddon> <MdEmail /> </InputGroupAddon>
                                </InputGroup>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label htmlFor='password-input'>Password</Label>
                                <InputGroup>
                                    <InputGroupInput type={showPassword ? 'text' : 'password'} name='password-input' id='password-input' placeholder='••••••••' />
                                    <InputGroupAddon> <TbLockPassword /> </InputGroupAddon>
                                    <InputGroupAddon align="inline-end" className="cursor-pointer" aria-label={showPassword ? "Hide password" : "Show password"}
                                        aria-pressed={showPassword}
                                        aria-controls="password" onClick={() => setShowPassword(prev => !prev)}>
                                        {showPassword ? <VscEye strokeWidth={0.8} /> : <VscEyeClosed strokeWidth={0.8} />}
                                    </InputGroupAddon>
                                </InputGroup>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox id='remember-me-input' name='remember-me-input' />
                                <Label htmlFor='remember-me-input'>Remember Me</Label>
                            </div>
                            <Button type='submit'>Sign In</Button>
                            <div className="flex items-center justify-center gap-1 text-muted-foreground text-sm">
                                <span>Need an account?</span>
                                <Link to='/auth/sign-up' className="font-semibold text-primary hover:underline">Sign up</Link>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </section>
    )
}

export default SignIn;