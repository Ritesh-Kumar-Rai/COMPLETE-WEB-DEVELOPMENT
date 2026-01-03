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
import { ScrollArea } from "./ui/scroll-area";
import { ShoppingCart } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import { PiTruckDuotone } from "react-icons/pi";


const CardItem = () => {
    const isInStock = (Math.floor(Math.random() * 2) === 1);
    return (<div className="overflow-hidden flex items-center gap-3 p-2 w-full border rounded-md bg-card">
        {/* Image Section */}
        <div className="h-20 w-20 aspect-square rounded-md overflow-hidden bg-muted shrink-0">
            <img
                src="https://images.unsplash.com/photo-1590845947376-2638caa89309?q=80&w=1740&auto=format&fit=crop"
                alt="Product"
                className="aspect-square h-full w-full"
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
                {!isInStock && <Badge variant='destructive' className="text-[10px] px-1 py-0 h-4">Out of Stock</Badge>}
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

    const cartDummy = [...Array(8)];

    if (isDesktop) {
        return (<Sheet>
            <SheetTrigger asChild>
                {PassedBtn}
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Shopping Cart</SheetTitle>
                    <SheetDescription>Your Cart has <span style={{ fontWeight: 500 }}>{cartDummy.length}</span> items in your cart</SheetDescription>
                </SheetHeader>
                {cartDummy.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-6">
                        {/* Large muted icon */}
                        <div className="bg-muted rounded-full p-6">
                            <ShoppingCart className="h-12 w-12 text-muted-foreground opacity-50" />
                        </div>

                        <div className="space-y-1">
                            <h3 className="text-lg font-semibold tracking-tight">Your cart is empty</h3>
                            <p className="text-sm text-muted-foreground max-w-[200px]">
                                Looks like you haven't added anything to your cart yet.
                            </p>
                        </div>

                        {/* CTA to get them back to products */}
                        <SheetClose asChild>
                            <Button className="mt-4 px-8">
                                Continue Shopping
                            </Button>
                        </SheetClose>
                    </div>
                ) : (
                    <>
                        <div className="px-3 m-0 shrink">
                            <Alert className={'text-green-500'}><PiTruckDuotone /> <AlertDescription className={'text-green-500'}>You've unlocked free shipping!</AlertDescription> </Alert>
                        </div>
                        <ScrollArea className="flex-1 min-h-0">
                            <div className="p-3 space-y-2">
                                {/* Padding and spacing here */}
                                {cartDummy.map((_, i) => <CardItem key={i} />)}

                            </div>

                        </ScrollArea>
                        <SheetFooter className={'mt-auto'}>
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
                        </SheetFooter></>)}
            </SheetContent>
        </Sheet>);
    }

    return (
        <aside>Drawer</aside>
    )
}

export default Cart;