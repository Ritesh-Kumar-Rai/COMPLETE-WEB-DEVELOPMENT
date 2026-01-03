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
import { FaUser } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

const SignUp = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);

    return (
        <section className='min-h-screen w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden'>
            <div className='relative overflow-hidden bg-accent bg-linear-to-tr from-black to-gray-500/50 w-full h-full max-md:hidden'>
                <img src="https://images.unsplash.com/photo-1647471922959-e5515db63a28?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Auth Showcase Image" className='aspect-square object-cover w-full h-full' />
            </div>
            <div className='overflow-hidden flex items-center justify-center p-4'>
                <div className="space-y-4">
                    <h1 className='text-3xl md:text-4xl font-bold'>Sign Up</h1>
                    <p className='text-sm text-muted-foreground mb-6'>Enter your credentials to create your account</p>
                    <Card className="p-4 my-4 bg-muted/50 shadow-2xl">
                        <form className='rounded-md w-full lg:w-80 flex flex-col gap-4' action="#" method="post">
                            <h2 className="font-bold text-2xl text-center gradient my-4">relivator.in</h2>
                            <Separator className="mb-2" />
                            <div className="flex flex-col gap-3">
                                <Label htmlFor='fullname'>Full Name</Label>
                                <InputGroup>
                                    <InputGroupInput type='text' name='fullname' id='fullname' placeholder='pralad kumar' />
                                    <InputGroupAddon> <FaUser /> </InputGroupAddon>
                                </InputGroup>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label htmlFor='email-id'>Email</Label>
                                <InputGroup>
                                    <InputGroupInput type='email' name='email-id' id='email-id' placeholder='pralad@iskcon.com' />
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
                            <div className="flex flex-col gap-3">
                                <Label htmlFor='password-input'>Confirm Password</Label>
                                <InputGroup>
                                    <InputGroupInput type={showCPassword ? 'text' : 'password'} name='password-input' id='password-input' placeholder='••••••••' />
                                    <InputGroupAddon> <TbLockPassword /> </InputGroupAddon>
                                    <InputGroupAddon align="inline-end" className="cursor-pointer" aria-label={showCPassword ? "Hide password" : "Show password"}
                                        aria-pressed={showCPassword}
                                        aria-controls="password" onClick={() => setShowCPassword(prev => !prev)}>
                                        {showCPassword ? <VscEye strokeWidth={0.8} /> : <VscEyeClosed strokeWidth={0.8} />}
                                    </InputGroupAddon>
                                </InputGroup>
                            </div>
                            <Button type='submit'>Create Account</Button>
                            <div className="flex items-center justify-center gap-1 text-muted-foreground text-sm">
                                <span>Already have an account?</span>
                                <Link to='/auth/sign-in' className="font-semibold text-primary hover:underline">Sign in</Link>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </section>
    )
}

export default SignUp;