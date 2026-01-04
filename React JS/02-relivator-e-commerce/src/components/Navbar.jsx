import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { BsCart2 } from "react-icons/bs";
import { GrFavorite } from "react-icons/gr";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useEffect, useState } from "react";
import { CgMenuRightAlt } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";
import Cart from "./Cart";
import { WishlistDropdown } from "./WishlistDropDown";
import { wishlistDummy } from "@/constants/dummyproductsData";

const Navbar = () => {

    const [isDark, setIsDark] = useState(() => {
        return sessionStorage.getItem("relivator-theme-state") === 'dark';
    });
    const [menuToggle, setMenuToggle] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        // 2. Use documentElement (html tag) instead of body
        const root = window.document.body;

        if (isDark) {
            root.classList.add('dark');
            sessionStorage.setItem("relivator-theme-state", 'dark');
        } else {
            root.classList.remove('dark');
            sessionStorage.setItem("relivator-theme-state", 'light');
        }
    }, [isDark]);

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
                    {/* Cart will place here */}
                    <Cart PassedBtn={<Button variant="outline" size="icon-sm" className="rounded-fulls relative"><BsCart2 /> <span className="bg-accent-foreground rounded-full text-xs text-white dark:text-black absolute -top-2 -right-1 w-4 h-4">3</span> </Button>} />
                    {/* Cart will place here */}
                    {/* Wishlist DropDownMenu will place here */}
                    <WishlistDropdown wishlistItems={wishlistDummy} PassedBtn={<Button variant="outline" size="icon-sm" className="relative"><GrFavorite /> <span className="bg-destructive rounded-full text-xs text-white absolute -top-2 -right-1 h-4 w-4">2</span> </Button>} />
                    {/* Wishlist DropDownMenu will place here */}
                    <div className="hidden md:flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => navigate("/auth/sign-in")}>Log in</Button>
                        <Button variant="default" size="sm" onClick={() => navigate("/auth/sign-up")}>Sign up</Button>
                    </div>
                    <Button variant="outline" size="icon-sm" className="rounded-full" onClick={() => setIsDark(prev => !prev)}>{isDark ? <MdDarkMode /> : <MdLightMode />}</Button>

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
                    <Button variant="outline" className="w-full mb-4" onClick={() => navigate("/auth/sign-in")}>Log in</Button>
                    <Button variant="default" size="sm" className="w-full" onClick={() => navigate("/auth/sign-up")}>Sign up</Button>
                </div>
            </div>}
        </header>
    )
}

export default Navbar;