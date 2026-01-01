import { Link, NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { BsCart2 } from "react-icons/bs";
import { GrFavorite } from "react-icons/gr";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useEffect, useState } from "react";
import { CgMenuRightAlt } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {

    const [darkTheme, setDarkTheme] = useState(false);
    const [menuToggle, setMenuToggle] = useState(false);

    useEffect(() => {
        const htmlBody = document.body;
        if (!darkTheme) {
            htmlBody.classList.remove('dark');
        } else {
            htmlBody.classList.add('dark')
        }
    }, [darkTheme]);

    return (
        <header className="w-full py-2.5 px-2 shadow-2xs sticky top-0 backdrop-blur-md bg-white/50 dark:bg-black/50 border-b z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <Link to='/' className="font-bold text-lg gradient">Relivator</Link>
                    <nav className="hidden md:block">
                        <ul className="flex items-center gap-3">
                            <li><NavLink to='/' className={({ isActive }) => `${isActive ? 'font-semibold text-primary' : 'text-muted-foreground hover:text-primary'}`}>Home</NavLink></li>
                            <li><NavLink to='/browse-products' className={({ isActive }) => `${isActive ? 'font-semibold text-primary' : 'text-muted-foreground hover:text-primary'}`}>Products</NavLink></li>
                        </ul>
                    </nav>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="icon-sm" className="rounded-fulls relative"><BsCart2 /> <span className="bg-accent-foreground rounded-full text-xs text-white dark:text-black absolute -top-2 -right-1 w-4 h-4">3</span> </Button>
                    <Button variant="outline" size="icon-sm" className="relative"><GrFavorite /> <span className="bg-destructive rounded-full text-xs text-white absolute -top-2 -right-1 h-4 w-4">2</span> </Button>
                    <div className="hidden md:flex items-center gap-2">
                        <Button variant="outline" size="sm">Log in</Button>
                        <Button variant="default" size="sm">Sign up</Button>
                    </div>
                    <Button variant="outline" size="icon-sm" className="rounded-full" onClick={() => setDarkTheme(prev => !prev)}>{darkTheme ? <MdDarkMode /> : <MdLightMode />}</Button>

                    <Button variant="outline" size="icon" onClick={() => setMenuToggle(prev => !prev)} className='md:hidden'>{menuToggle ? <IoMdClose size={20} /> : <CgMenuRightAlt size={20} />}</Button>
                </div>
            </div>
            {menuToggle && <div className="max-md:flex hidden flex-col items-center gap-5">
                <nav className="mt-8 w-full">
                    <ul className="flex flex-col items-center gap-3">
                        <li className="w-full"><NavLink to='/' className={({ isActive }) => `${isActive ? 'bg-black/90 text-white dark:bg-accent' : 'hover:bg-black/80 hover:text-white hover:dark:bg-accent/80'} block rounded-md p-2 text-center`}>Home</NavLink></li>
                        <li className="w-full"><NavLink to='/browse-products' className={({ isActive }) => `${isActive ? 'bg-black/90 text-white dark:bg-accent' : 'hover:bg-black/80 hover:text-white hover:dark:bg-accent/80'} block rounded-md p-2 text-center`}>Products</NavLink></li>
                    </ul>
                </nav>
                <hr className="w-full" />
                <div className="w-full mt-4">
                    <Button variant="outline" className="w-full mb-4">Log in</Button>
                    <Button variant="default" size="sm" className="w-full">Sign up</Button>
                </div>
            </div>}
        </header>
    )
}

export default Navbar;