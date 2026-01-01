import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

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

export default ProductCard;