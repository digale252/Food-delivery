import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useToast } from './ToastContext';
import { useAuth } from './AuthContext';
import { db } from '../firebase';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';

export interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
    restaurantId: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: Omit<CartItem, 'quantity'>) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
    cartTotal: number;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const { showToast } = useToast();
    const { currentUser } = useAuth();

    // Load from LocalStorage for guest or setup Firestore listener for User
    useEffect(() => {
        if (!currentUser) {
            const storedCart = localStorage.getItem('foodkart_cart');
            if (storedCart) {
                setCartItems(JSON.parse(storedCart));
            }
            return;
        }

        // Firestore Listener
        const cartRef = doc(db, 'carts', currentUser.uid);
        const unsubscribe = onSnapshot(cartRef, (doc) => {
            if (doc.exists()) {
                setCartItems(doc.data().items || []);
            } else {
                setCartItems([]);
            }
        });

        return () => unsubscribe();
    }, [currentUser]);

    // Save to LocalStorage if guest
    useEffect(() => {
        if (!currentUser) {
            localStorage.setItem('foodkart_cart', JSON.stringify(cartItems));
        }
    }, [cartItems, currentUser]);

    const saveToFirestore = async (items: CartItem[]) => {
        if (!currentUser) return;
        try {
            await setDoc(doc(db, 'carts', currentUser.uid), { items });
        } catch (error) {
            console.error("Error saving cart:", error);
        }
    };

    const addToCart = (item: Omit<CartItem, 'quantity'>) => {
        let newItems = [...cartItems];
        const existing = newItems.find(i => i.id === item.id);

        if (existing) {
            newItems = newItems.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            showToast(`Updated quantity for ${item.name}`, 'success');
        } else {
            newItems = [...newItems, { ...item, quantity: 1 }];
            showToast(`Added ${item.name} to cart`, 'success');
        }

        setCartItems(newItems); // Optimistic update
        if (currentUser) saveToFirestore(newItems);
    };

    const removeFromCart = (id: number) => {
        const newItems = cartItems.filter(item => item.id !== id);
        setCartItems(newItems);
        showToast('Item removed from cart', 'info');
        if (currentUser) saveToFirestore(newItems);
    };

    const updateQuantity = (id: number, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(id);
            return;
        }
        const newItems = cartItems.map(item => item.id === id ? { ...item, quantity } : item);
        setCartItems(newItems);
        if (currentUser) saveToFirestore(newItems);
    };

    const clearCart = () => {
        setCartItems([]);
        if (currentUser) saveToFirestore([]);
    };

    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}>
            {children}
        </CartContext.Provider>
    );
}
