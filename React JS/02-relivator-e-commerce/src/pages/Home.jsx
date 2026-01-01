import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { PiTruckDuotone } from "react-icons/pi";
import { FiClock } from "react-icons/fi";
import { FaArrowRightLong } from "react-icons/fa6";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

import { Heart, ShoppingCart, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";


const CategoryCard = ({ label = 'Nothing', imgSrc = '', count_text = '0 empty!' }) => {
    return (<Card className='w-2xs p-0 overflow-hidden gap-1 hover:scale-105 transition-all hover:shadow-2xl duration-200 will-change-transform gradient group'>
        <CardContent className={"p-0 m-0 overflow-hidden"}>
            <img src={imgSrc} alt={`${label} image`} className="object-cover aspect-video group-hover:scale-110 transition-transform duration-300 delay-150 ease-in-out" />
        </CardContent>
        <CardFooter className={'flex pt-1 pb-3 px-2 m-0 flex-col gap-1 items-start'}>
            <h4 className="font-bold line-clamp-1">{label}</h4>
            <span className="text-muted-foreground text-sm line-clamp-1">{count_text}</span>
        </CardFooter>
    </Card>);
}


const ProductCard = ({
    title = "Premium Leather Backpack",
    category = "Accessories",
    price = 120,
    discountPrice = 89,
    rating = 2.5,
    reviews = 128,
    imgSrc = "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop"
}) => {

    const discountPercentage = Math.round(((price - discountPrice) / price) * 100);

    return (
        <Card className='w-3xs p-2 overflow-hidden gap-1 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl ease-in-out will-change-transform group'>
            <CardHeader className="p-0 m-0 relative border-0">
                {/* badges */}
                {/* Wishlist Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-3 top-3 z-10 rounded-full bg-accent transition-colors hover:bg-white hover:text-red-500"
                >
                    <Heart className="h-5 w-5" />
                </Button>
                {/* Discount Badge */}
                {discountPercentage > 0 && (
                    <Badge variant="destructive" className="absolute bottom-3 right-3 z-10">
                        {discountPercentage}% OFF
                    </Badge>
                )}

                {/* product image */}
                <div className="rounded-md p-0 pb-0 m-0 bg-amber-300 w-full overflow-hidden shadow-2xs">
                    <img src={imgSrc} alt={title} className="object-cover aspect-square group-hover:scale-110 transition-transform duration-200 ease-in" />
                </div>
            </CardHeader>
            <CardContent className="p-0 m-0">
                {/* Category Badge */}
                <Badge variant={'secondary'} className="text-sm">
                    {category}
                </Badge>
                <h4 className="font-bold my-3">Sony PlayStation 4 1TB</h4>
                <div className="flex items-center text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-current" : "text-muted-foreground"}`}
                        />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">({reviews} reviews)</span>
                </div>
            </CardContent>
        </Card>
    );
};


const Home = () => {
    return (
        <>
            <section className="max-w-7xl mx-auto  py-10 flex items-center justify-between gap-2">
                <article className="w-[50%] p-5">
                    <Button size="sm" variant="secondary">Relivator: A One Stop Game Solution | <FaGithub /> </Button>
                    <h1 className="my-6 text-5xl gradient font-bold">Your One-Stop Shop <br /> for Every Tech | Games</h1>
                    <p className="my-4 text-muted-foreground gradient">Discover premium products at competitive prices, with fast shipping and exceptional customer service.</p>
                    <div className="mb-4">
                        <Button size="lg">Shop Now <FaArrowRightLong /> </Button>
                    </div>
                    <span className="inline-flex items-center gap-2 my-3 mr-4 text-sm text-muted-foreground"> <PiTruckDuotone size={20} /> Free shipping over $50 </span>
                    <span className="inline-flex items-center gap-2 my-3 text-sm text-muted-foreground"> <FiClock size={20} /> 24/7 Customer Support </span>
                </article>
                <div className="w-[50%] flex items-center justify-center p-10">
                    <img src="https://images.unsplash.com/photo-1665041974623-d398d035023e?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fHBsYXlzdGF0aW9ufGVufDB8fDB8fHww" alt="game zone banner image" className="object-cover rounded-2xl shadow-2xl" />
                </div>
            </section>
            <hr />

            <section className="max-w-7xl mx-auto py-20">
                <h2 className="custom-heading text-3xl font-bold text-center">Shop by Category</h2>
                <p className="text-muted-foreground text-center my-4">Find the perfect device for your needs from our curated collections</p>
                <div className="py-3 flex items-center gap-8 flex-wrap">
                    <CategoryCard label="Audio" imgSrc="https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1730&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" count_text="12 products" />
                    <CategoryCard label="Gaming Desk" imgSrc="https://plus.unsplash.com/premium_photo-1683326528070-4ebec9188ae1?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njl8fGRlc2t8ZW58MHx8MHx8fDA%3D" count_text="8 products" />
                    <CategoryCard label="Consoles" imgSrc="https://images.unsplash.com/photo-1591196702597-062a87208fed?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHMyfGVufDB8fDB8fHww" count_text="16 products" />
                    <CategoryCard label="Gaming Laptop" imgSrc="https://images.unsplash.com/photo-1640955014216-75201056c829?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FtaW5nJTIwbGFwdG9wfGVufDB8fDB8fHww" count_text="12 products" />

                </div>
            </section>

            <section className="py-20 bg-accent">
                <div className="max-w-7xl mx-auto ">

                    <h2 className="custom-heading text-3xl font-bold text-center">Featured Products</h2>
                    <p className="text-muted-foreground text-center my-4">Check out our latest and most popular tech items</p>
                    <div className="py-3 flex items-center gap-8 flex-wrap">
                        <ProductCard />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home;