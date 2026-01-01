import { Button } from "@/components/ui/button";
import { FaGithub, FaArrowRight } from "react-icons/fa";
import { PiTruckDuotone } from "react-icons/pi";
import { FiClock } from "react-icons/fi";
import { FaArrowRightLong } from "react-icons/fa6";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

import { Heart, ShoppingCart, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { homeData, userFeedbacks } from "@/constants/dummyproductsData";
import { Link } from "react-router-dom";
import { RiShoppingBag3Line } from "react-icons/ri";




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
    title = "Macbook Pro and Sony PS4 Controller",
    category = "Accessories",
    price = 120,
    discountPrice = 89,
    rating = 2.5,
    reviews = 128,
    imgSrc = "https://images.unsplash.com/photo-1542280756-2992e05fef7e?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fHBzNHxlbnwwfHwwfHx8MA%3D%3D"
}) => {

    const discountPercentage = Math.round(((price - discountPrice) / price) * 100);

    return (
        <Card className='max-md:w-full w-3xs p-2 overflow-hidden gap-1 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl ease-in-out will-change-transform group'>
            <CardHeader className="p-0 m-0 relative border-0">
                {/* badges */}
                {/* Wishlist Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-3 top-3 z-10 rounded-full bg-accent transition-colors hover:bg-white hover:text-red-500 active:text-red-500 active:scale-95"
                >
                    <Heart className="h-5 w-5" />
                </Button>
                {/* Discount Badge */}
                {discountPercentage > 0 && (
                    <Badge className="absolute bottom-3 right-3 z-10 bg-green-600/90 text-white">
                        {discountPercentage}% OFF
                    </Badge>
                )}

                {/* product image */}
                <div className="rounded-md p-0 pb-0 m-0 bg-linear-30 to-gray-700 w-full overflow-hidden shadow-2xs">
                    <img src={imgSrc} alt={title} title={title} className="object-cover aspect-square group-hover:scale-110 transition-transform duration-200 ease-in" />
                </div>
            </CardHeader>
            <CardContent className="p-0 m-0">
                {/* Category Badge */}
                <Badge variant={'secondary'} className="text-sm">
                    {category}
                </Badge>
                <h4 className="font-bold my-3 line-clamp-1">{title}</h4>
                <div className="flex items-center text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-current" : "text-muted-foreground"}`}
                        />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1 font-medium">({rating})</span>
                </div>
                <hr style={{ marginBlock: '10px' }} />
                <div className="font-bold text-lg flex items-center gap-2">
                    <span>₹{discountPrice}</span>
                    <strike className='text-muted-foreground'>₹{price}</strike>
                </div>
            </CardContent>
            <CardFooter className="mt-3">
                <Button className="w-full gap-2 font-semibold active:scale-95"><ShoppingCart className="h-4 w-4" /> Add to Cart</Button>
            </CardFooter>
        </Card>
    );
};


const BenefitCard = ({ icon, label = '', content = '' }) => {
    return (<Card className="w-2xs">
        <CardContent>
            <span className="bg-zinc-300 dark:bg-accent p-3 inline-block rounded-full"> {icon} </span>
            <h5 className="font-semibold">{label}</h5>
        </CardContent>
        <CardFooter className="text-muted-foreground">
            {content}
        </CardFooter>
    </Card>);
}



const FeedbackCard = ({ imgSrc = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face", fullname = "Sophia Martinez", username = "@sophiareviews", msg = 'lorem ipsum, hare krsna..' }) => {
    return (<Card className="max-w-2xs">
        <CardHeader className="flex items-center gap-2">
            <div className="w-12 h-12 overflow-hidden rounded-full">
                <img src={imgSrc} alt={fullname} className="object-cover" title={fullname} />
            </div>
            <div className="flex flex-col gap-0">
                <h6 className="font-bold">{fullname}</h6>
                <span className="text-xs text-muted-foreground">{username}</span>
            </div>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
            {msg}
        </CardContent>
    </Card>);
};


const Home = () => {
    return (
        <>
            <section className="max-w-7xl mx-auto py-10 px-4 flex flex-col lg:flex-row items-center justify-between gap-10">

                {/* Article: Text content */}
                {/* w-full for mobile, lg:w-1/2 for desktop */}
                <article className="w-full lg:w-1/2 p-0 md:p-5 text-center lg:text-left">

                    <Button size="sm" variant="secondary" className="mb-4">
                        Relivator: A One Stop Game Solution | <FaGithub className="ml-2" />
                    </Button>

                    {/* Adjusted text size: 3xl on mobile, 5xl on desktop */}
                    <h1 className="mb-6 text-3xl md:text-5xl gradient font-bold leading-tight">
                        Your One-Stop Shop <br className="hidden md:block" /> for Every Tech | Games
                    </h1>

                    <p className="mb-6 text-muted-foreground gradient max-w-lg mx-auto lg:mx-0">
                        Discover premium products at competitive prices, with fast shipping and exceptional customer service.
                    </p>

                    <div className="mb-6">
                        <Button size="lg" className="w-full sm:w-auto">
                            Shop Now <FaArrowRightLong className="ml-2" />
                        </Button>
                    </div>

                    {/* Features: Stack on mobile, inline on desktop */}
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                        <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                            <PiTruckDuotone size={20} /> Free shipping over $50
                        </span>
                        <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                            <FiClock size={20} /> 24/7 Customer Support
                        </span>
                    </div>
                </article>

                {/* Image Container */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-10">
                    <img
                        src="https://plus.unsplash.com/premium_photo-1687919417131-c50f7d9a407a?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGdhbWV8ZW58MHx8MHx8fDA%3D"
                        alt="game zone banner image"
                        className="w-full max-w-125 lg:max-w-full object-cover rounded-2xl shadow-2xl transition-transform duration-500 hover:scale-105"
                    />
                </div>
            </section>
            <hr />

            <section className="max-w-7xl mx-auto py-20">
                <h2 className="custom-heading text-3xl font-bold text-center">Shop by Category</h2>
                <p className="text-muted-foreground text-center my-4">Find the perfect device for your needs from our curated collections</p>
                <div className="py-3 flex items-center justify-center gap-8 flex-wrap">
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
                    <div className="py-3 max-md:px-10 flex items-center justify-center gap-8 flex-wrap">
                        {homeData.map(product => {
                            return <ProductCard key={product.id} title={product.title} category={product.category} price={product.price} discountPrice={product.discountPrice} rating={product.rating} imgSrc={product.imgSrc} />;
                        })}
                    </div>
                </div>
                <div className="my-5 flex items-center justify-center">
                    <Link className="flex mx-auto items-center gap-2 bg-white hover:bg-gray-200 dark:bg-black/10 hover:shadow-xl hover:gap-4 transition-all duration-300 ease-in-out p-2 border border-zinc-300 dark:border-black/20 rounded-sm font-semibold">View All Products <FaArrowRight /> </Link>
                </div>
            </section>

            {/* why choose section */}
            <section className="py-20">
                <article className="max-w-7xl mx-auto px-3">

                    <h2 className="custom-heading text-3xl font-bold text-center">Why Choose Us</h2>
                    <p className="text-muted-foreground text-center my-4">We offer the best shopping experience with premium features</p>
                    <div className="my-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4 justify-center">
                        <BenefitCard icon={<PiTruckDuotone size={25} />} label="Free Shipping" content="Free shipping on all orders over ₹5000. Fast and reliable delivery to your doorstep." />
                        <BenefitCard icon={<RiShoppingBag3Line size={25} />} label="Secure Checkout" content="Your payment information is always safe and secure with us. We use industry-leading encryption." />
                        <BenefitCard icon={<FiClock size={25} />} label="24/7 Support" content="Our customer support team is always available to help with any questions or concerns." />
                        <BenefitCard icon={<Star size={25} />} label="Quality Guarantee" content="We stand behind the quality of every product we sell. 30-day money-back guarantee." />
                    </div>
                </article>
            </section>

            <section className="w-full py-20 bg-muted/50">
                <article className="relative max-w-7xl py-20 mx-auto bg-white dark:bg-black/20">
                    <div className="feedback-loop-container"></div>
                    <h2 className="custom-heading text-4xl font-bold text-center">What Our Customers Say</h2>
                    <p className="text-muted-foreground text-center my-8">Don't just take our word for it - hear from our satisfied customers</p>
                    <div className="marquee">
                        {/* Group 1 */}
                        <div className="marquee-group">
                            {userFeedbacks.map((feedback, index) => <FeedbackCard key={index} imgSrc={feedback.imgSrc} fullname={feedback.fullname} username={feedback.username} msg={feedback.msg} />)}
                        </div>

                        {/* Group 2 (Exact copy of Group 1) */}
                        <div aria-hidden="true" className="marquee-group">
                            {userFeedbacks.map((feedback, index) => <FeedbackCard key={index} imgSrc={feedback.imgSrc} fullname={feedback.fullname} username={feedback.username} msg={feedback.msg} />)}
                        </div>
                    </div>
                </article>
            </section>
        </>
    )
}

export default Home;