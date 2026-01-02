import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useState } from "react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { IoClose } from "react-icons/io5";
import { Badge } from "./ui/badge";
import { GoPlus } from "react-icons/go";
import { HiMinus } from "react-icons/hi2";
import { ScrollArea } from "@radix-ui/react-scroll-area";


const CardItem = () => {
    return (<div className="overflow-hidden flex items-center gap-3 p-2 w-full border rounded-md bg-card">
        {/* Image Section */}
        <div className="h-20 w-20 aspect-square rounded-md overflow-hidden bg-muted shrink-0">
            <img
                src="https://images.unsplash.com/photo-1590845947376-2638caa89309?q=80&w=1740&auto=format&fit=crop"
                alt="Product"
                className="object-cover h-full w-full"
            />
        </div>

        {/* Info Section */}
        <div className="flex-1 flex flex-col justify-between h-20">
            <div className="flex items-center justify-between">
                <h6 className="font-bold text-sm line-clamp-2 leading-tight">PS4 Dual Shock 4</h6>
                {/* Using standard h-6 w-6 for a "smaller" icon button */}
                <Button variant="ghost" className="h-6 w-6 p-0 shrink-0">
                    <IoClose className="h-4 w-4" />
                </Button>
            </div>

            <div className="flex items-center justify-between gap-2">
                <Badge variant='outline' className="text-[10px] px-1 py-0 h-4">Accessories</Badge>
                <Badge variant='destructive' className="text-[10px] px-1 py-0 h-4">Out of Stock</Badge>
            </div>

            <div className="flex items-center mt-1 justify-between">
                <div className="flex items-center border rounded-md">
                    {/* Manual override for smaller buttons: h-7 w-7 */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-none border-r active:scale-95"
                        disabled
                    >
                        <HiMinus className="h-2 w-2" />
                    </Button>

                    <span className="select-none w-8 text-center text-xs font-medium">1</span>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-none border-l active:scale-95"
                    >
                        <GoPlus className="h-2 w-2" />
                    </Button>
                </div>
                <span aria-label="product-price" className="font-bold text-sm">₹12,300</span>
            </div>
        </div>
    </div>);
};

const Cart = ({ PassedBtn }) => {

    const [isOpen, setIsOpen] = useState(false);

    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (<Sheet>
            <SheetTrigger asChild>
                {PassedBtn}
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Shopping Cart</SheetTitle>
                    <SheetDescription>Your Cart has 3 items in your cart</SheetDescription>
                </SheetHeader>
                {/* <div className="p-2 overflow-y-scroll"> */}
                <ScrollArea className="h-[400px] w-[300px]">
                    <div className="p-2 space-y-4"> {/* Padding and spacing here */}
                        {[...Array(30)].map((_, i) => <CardItem key={i} />)}
                    </div>
                </ScrollArea>
                {/* </div> */}
                <SheetFooter>
                    <div className="flex flex-col gap-3 mb-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span className="font-semibold">₹5700</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Shipping</span>
                            <span className="font-semibold">Calculated at checkout</span>
                        </div>
                        <hr />
                        <div className="flex items-center justify-between">
                            <span className="font-semibold">Total</span>
                            <span className="font-semibold">₹5978</span>
                        </div>
                    </div>
                    <Button className="mb-2">Checkout</Button>
                    <div className="flex items-center justify-between gap-4">
                        <SheetClose asChild>
                            <Button variant="outline">Continue Shopping</Button>
                        </SheetClose>
                        <Button variant="outline" className="hover:text-red-500">Clear Cart</Button>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>);
    }

    return (
        <aside>Drawer</aside>
    )
}

export default Cart;