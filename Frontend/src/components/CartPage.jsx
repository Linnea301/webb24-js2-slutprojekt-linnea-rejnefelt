import { Cart } from "./Cart";
import { PayButton } from "./PayButton";
import { EmptyCartButton } from "./EmptyCartButton";

export function CartPage({ cart, setCart, setPage, resetCartCount }) {
  
    const handlePayment = async () => {
        try {
            await fetch('http://localhost:3000/updateStock', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cart),
            });

            setCart([]); 
            resetCartCount(); 
            setPage('purchase'); 
        } catch (error) {
            console.error("Något gick fel, lagersaldot uppdaterades inte:", error);
        }
    };
   
    return (
        <>
            <Cart cart={cart} />
            <PayButton handlePayment={handlePayment} setPage={setPage}/> 
            <EmptyCartButton setCart={setCart} resetCartCount={resetCartCount} setPage={setPage} /> 
        </>
    );
}