import ProductCard from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { homeData } from "@/constants/dummyproductsData";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useState } from "react";

const categories = ["All", "Audio", "Gaming Desk", "Consoles", "Gaming Laptops", "Accessories", "Video Games"];

const BrowseProducts = () => {

    const [selectedCategory, setSelectedCategory] = useState('All');

    return (
        <section className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                    <h5 className="text-2xl font-bold">Explore Products</h5>
                    <p className="text-muted-foreground">Browse our latest products and find something you'll love.</p>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                    {categories?.map(cat => <Badge key={cat} variant={`${cat === selectedCategory ? 'default' : 'outline'}`} className={'cursor-pointer select-none'} onClick={() => (selectedCategory !== cat) && setSelectedCategory(cat)}>{cat}</Badge>)}
                </div>
            </div>
            <div className="my-10">
                {/* All product Cards will be render below: */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
                    {homeData.map(product => <ProductCard key={product.id} imgSrc={product.imgSrc} title={product.title} category={product.category} rating={product.rating} stocks={product.stocks} price={product.price} discountPrice={product.discountPrice} />)}
                </div>
                {/* Pagination will be placed below */}
                <div className="mt-10">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </section>
    )
}

export default BrowseProducts;