import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";


const ProductDetails = () => {
    const rating = 3;
    return (
        <section className="w-full px-8 py-2">
            <div className="pb-4 ">
                <Link to="/browse-products"><Button variant="ghost"> <HiOutlineArrowNarrowLeft /> Back to Products </Button></Link>
            </div>
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="relative  bg-linear-to-r from-accent to-muted/50 aspect-square rounded-md overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2R1Y3RzfGVufDB8fDB8fHww" alt="product" className="object-cover w-full" />
                    <Badge className="absolute top-2 left-2 z-10 bg-green-600/90 text-white">
                        {15}% OFF
                    </Badge>
                </div>
                <article>
                    <h1 className="text-4xl font-bold">Ergonomic Office Chair</h1>
                    <div className="flex items-center text-yellow-500 mt-2 mb-6">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-current" : "text-muted-foreground"}`}
                            />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1 font-medium">({rating})</span>
                    </div>
                    <span aria-label="category" className="text-lg my-2 font-semibold text-muted-foreground">Accessories</span>
                    <div className="my-4 flex items-center gap-3">
                        <h3 className="text-3xl font-bold">₹1,45,000</h3>
                        <h4 className="line-through text-muted-foreground text-2xl font-semibold">₹2,14,000</h4>
                    </div>
                    <p className="text-muted-foreground">Work in comfort with our ergonomic office chair designed for all-day support. Features adjustable height, lumbar support, and breathable mesh back.</p>
                    <span className="text-green-500 font-semibold inline-block my-4">In Stock</span>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center">
                            <Button variant="outline" size="sm" className="active:scale-95" disabled><FaMinus /></Button>
                            <span className="select-none w-12 inline-block text-center">1</span>
                            <Button variant="outline" size="sm" className="active:scale-95"><FaPlus /></Button>
                        </div>
                        <Button className="flex-1 gap-2 font-semibold active:scale-95"><ShoppingCart className="h-4 w-4" /> Add to Cart</Button>
                    </div>
                </article>
            </div>
            <hr style={{ marginBlock: '2rem' }} />
            <article className="grid grid-cols-1 lg:grid-cols-2 max-md:gap-8 gap-4">
                <div>
                    <h5 className="text-2xl font-bold mb-4">Features</h5>
                    <ul className="text-sm list-disc">
                        <li>Adjustable height and armrests</li>
                        <li>Breathable mesh back</li>
                        <li>Lumbar support</li>
                        <li>360° swivel</li>
                        <li>Heavy-duty base with smooth-rolling casters</li>
                        <li>Weight capacity: 300 lbs</li>
                    </ul>
                </div>
                <div>
                    <h5 className="text-2xl font-bold mb-4">Specifications</h5>
                    <div className="space-y-2 text-sm">
                        {/* specification line starts */}
                        <div className="flex justify-between gap-2 border-b pb-2">
                            <span className="font-medium capitalize">adjustable Height</span>
                            <span className="text-muted-foreground">16-20 inches</span>
                        </div>
                        {/* specification line end */}
                        {/* specification line starts */}
                        <div className="flex justify-between gap-2 border-b pb-2">
                            <span className="font-medium capitalize">brand</span>
                            <span className="text-muted-foreground">ErgoComfort</span>
                        </div>
                        {/* specification line end */}
                        {/* specification line starts */}
                        <div className="flex justify-between gap-2 border-b pb-2">
                            <span className="font-medium capitalize">dimensions</span>
                            <span className="text-muted-foreground">26"W x 26"D x 38-42"H</span>
                        </div>
                        {/* specification line end */}
                        {/* specification line starts */}
                        <div className="flex justify-between gap-2 border-b pb-2">
                            <span className="font-medium capitalize">material</span>
                            <span className="text-muted-foreground">Mesh back, fabric seat</span>
                        </div>
                        {/* specification line end */}
                        {/* specification line starts */}
                        <div className="flex justify-between gap-2 border-b pb-2">
                            <span className="font-medium capitalize">max Weight</span>
                            <span className="text-muted-foreground">300 lbs</span>
                        </div>
                        {/* specification line end */}
                        {/* specification line starts */}
                        <div className="flex justify-between gap-2 border-b pb-2">
                            <span className="font-medium capitalize">model</span>
                            <span className="text-muted-foreground">Executive Pro</span>
                        </div>
                        {/* specification line end */}
                        {/* specification line starts */}
                        <div className="flex justify-between gap-2 border-b pb-2">
                            <span className="font-medium capitalize">warranty</span>
                            <span className="text-muted-foreground">5 years</span>
                        </div>
                        {/* specification line end */}
                    </div>
                </div>
            </article>
        </section>
    )
}

export default ProductDetails;