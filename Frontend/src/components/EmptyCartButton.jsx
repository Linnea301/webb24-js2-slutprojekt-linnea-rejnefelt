export function EmptyCartButton({ setCart, resetCartCount }) {
    const handleEmptyCart = () => {
        setCart([]);
        resetCartCount(); 
        setTimeout(() => { window.location.reload() }, 1000);
    };

    return (
        <button onClick={handleEmptyCart}>Töm Varukorg</button>
    );
}