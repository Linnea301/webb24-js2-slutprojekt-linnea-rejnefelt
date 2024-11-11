import { useState, useEffect } from 'react';
import { ProductPage } from "./ProductPage";
import { CartPage } from "./CartPage";
import { PurchasePage } from "./PurchasePage";
import { Navbar } from "./Navbar";
import { getItemCardInfo } from '../utils/fetchItemCardDB';

export function App() {
    // Hanterar vilken sida som ska visas
    const [page, setPage] = useState('products');

    // Kundvagnens produkter
    const [cart, setCart] = useState([]);
    // Antal produkter i kundvagnen
    const [cartCount, setCartCount] = useState(0); 
    // Hämta alla produkter från databasen
    const [products, setProducts] = useState([]); 

   
    const fetchItemInfo = async () => {
        try {
            const data = await getItemCardInfo();
            setProducts(data); 
        } catch (error) {
            console.error("Kunde inte hämta produktdata:", error);
        }
    };


    // Anropa fetchItemInfo när sidan laddas för att hämta produkter
    useEffect(() => {
        fetchItemInfo();
    }, []);

 

    const addToCart = (product) => {
        if (product.stock > 0) {
            const existingProduct = cart.find(item => item.id === product.id);

            if (existingProduct) {
                setCart(cart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                ));
            } else {
                setCart([...cart, { ...product, quantity: 1 }]);
            }

           
            setProducts(products.map(item =>
                item.id === product.id ? { ...item, stock: item.stock - 1 } : item
            ));

           
            setCartCount(cartCount + 1);
        } else {
            console.warn(`Produkt ${product.name} har slut på lager.`);
        }
    };

    const resetCartCount = () => {
        setCartCount(0);
    };

    const handlePurchaseComplete = async () => {
        await fetchItemInfo(); 
    };

    // Rendera rätt sida beroende på vilken page som är vald
    const renderPage = () => {
        if (page === 'products') {
            return <ProductPage addToCart={addToCart} products={products} />;
        } 
     
        if (page === 'cart') {
            return <CartPage cart={cart} setPage={setPage} setCart={setCart} resetCartCount={resetCartCount} />;
        } 
        if (page === 'purchase') {
            return <PurchasePage 
                cart={cart} 
                setCart={setCart} 
                resetCartCount={resetCartCount} 
                handlePurchaseComplete={handlePurchaseComplete} 
            />;
        } 
       
        return <ProductPage addToCart={addToCart} products={products} />;
    };

    return (
        <>
            <Navbar setPage={setPage} cartCount={cartCount} />
            {renderPage()}
        </>
    );
}
