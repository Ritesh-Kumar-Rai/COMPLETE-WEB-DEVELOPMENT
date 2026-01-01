import { FiTwitter } from "react-icons/fi";
import { FaGithub, FaLinkedinIn, FaDiscord } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="w-full border-t p-10">
            <section className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10">
                    <article className="pr-4">
                        <Link to='/' className="font-bold text-lg gradient" aria-label="company logo: Relivator">Relivator</Link>
                        <p className="py-5 text-sm text-muted-foreground">Your one-stop shop for everything tech. Premium products at competitive prices.</p>
                        <ul className="flex items-center gap-4">
                            <li> <a href="#" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-accent inline-block shadow-2xs"> <FiTwitter /> </a> </li>
                            <li> <a href="#" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-accent inline-block shadow-2xs"> <FaGithub /> </a> </li>
                            <li> <a href="#" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-accent inline-block shadow-2xs"> <FaLinkedinIn /> </a> </li>
                            <li> <a href="#" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-accent inline-block shadow-2xs"> <FaDiscord /> </a> </li>
                        </ul>
                    </article>
                    <nav className="text-sm">
                        <h6 className="mb-5 font-semibold">Shop</h6>
                        <ul className="text-muted-foreground flex flex-col gap-2">
                            <li><Link className="hover:text-accent-foreground">All Products</Link></li>
                            <li><Link className="hover:text-accent-foreground">Audio</Link></li>
                            <li><Link className="hover:text-accent-foreground">Gaming Desk</Link></li>
                            <li><Link className="hover:text-accent-foreground">Consoles</Link></li>
                            <li><Link className="hover:text-accent-foreground">Gaming Laptops</Link></li>
                        </ul>
                    </nav>
                    <nav className="text-sm">
                        <h6 className="mb-5 font-semibold">Company</h6>
                        <ul className="text-muted-foreground flex flex-col gap-2">
                            <li><Link className="hover:text-accent-foreground">About Us</Link></li>
                            <li><Link className="hover:text-accent-foreground">Careers</Link></li>
                            <li><Link className="hover:text-accent-foreground">Blog</Link></li>
                            <li><Link className="hover:text-accent-foreground">Press</Link></li>
                            <li><Link className="hover:text-accent-foreground">Contact</Link></li>
                        </ul>
                    </nav>
                    <nav className="text-sm">
                        <h6 className="mb-5 font-semibold">Support</h6>
                        <ul className="text-muted-foreground flex flex-col gap-2">
                            <li><Link className="hover:text-accent-foreground">Help Center</Link></li>
                            <li><Link className="hover:text-accent-foreground">Shipping & Returns</Link></li>
                            <li><Link className="hover:text-accent-foreground">Warranty</Link></li>
                            <li><Link className="hover:text-accent-foreground">Privacy Policy</Link></li>
                            <li><Link className="hover:text-accent-foreground">Terms of Services</Link></li>
                        </ul>
                    </nav>
                </div>
                <div className="flex items-center max-md:justify-center justify-between gap-5 flex-wrap pt-5 text-sm text-muted-foreground border-t">
                    <span>&copy; 2026 Relivator. All rights reserved.</span>
                    <span>Developed by Ritesh Kumar Rai</span>
                </div>
            </section>
        </footer>
    )
}

export default Footer;