import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ScrollArea } from "@/components/ui/scroll-area"
import { Heart, Trash2, ShoppingCart } from "lucide-react"
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const WishlistCard = ({ item }) => {
    return (
        <div
            key={item.id}
            className="flex items-center w-full gap-3 p-3 hover:bg-muted/50 transition-colors border-b last:border-0"
        >
            {/* Product Image */}
            <div className="h-12 w-12 rounded bg-muted overflow-hidden shrink-0">
                <img src={item.image} alt={item.name} className="h-full w-full aspect-square" />
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
                <Link to={`/browse-products/${item.id}`} className="text-sm font-medium line-clamp-2">{item.name}</Link>
                <p className="text-xs text-muted-foreground">₹{item.price}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                    <ShoppingCart className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};



export function WishlistDropdown({ wishlistItems = [], PassedBtn }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                {PassedBtn}
            </DropdownMenuTrigger>

            {/* Set a fixed width and max-height for the dropdown */}
            <DropdownMenuContent className="w-80 p-0 mx-auto" align="end">
                <DropdownMenuLabel className="p-4 flex justify-between items-center">
                    Wishlist ({wishlistItems.length})
                    <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="m-0" />

                {wishlistItems.length === 0 ? (
                    <div className="p-8 text-center text-sm text-muted-foreground">
                        Your wishlist is empty.
                    </div>
                ) : (
                    <>
                        <ScrollArea className="h-[350px]">
                            <div className="flex flex-col">
                                {wishlistItems.map((item) => <WishlistCard item={item} />)}
                            </div>
                        </ScrollArea>

                        <DropdownMenuSeparator className="m-0" />
                        <DropdownMenuItem className="p-2">
                            <Button className="w-full text-xs h-9" variant="outline">
                                View Full Wishlist
                            </Button>
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}