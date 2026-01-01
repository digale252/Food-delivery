import { Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import type { FoodItem } from '../data/restaurants';

interface FoodItemCardProps {
    food: FoodItem;
    restaurantId: number;
}

export default function FoodItemCard({ food, restaurantId }: FoodItemCardProps) {
    const { cartItems, addToCart, updateQuantity } = useCart();

    // Check if item is in cart (matching id and restaurantId, though id is unique in mock data, good practice)
    const cartItem = cartItems.find(item => item.id === food.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    const handleAdd = () => {
        addToCart({ ...food, restaurantId });
    };

    const handleIncrement = () => {
        updateQuantity(food.id, quantity + 1);
    };

    const handleDecrement = () => {
        updateQuantity(food.id, quantity - 1);
    };

    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ height: '180px', overflow: 'hidden' }}>
                <img src={food.image} alt={food.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{food.name}</h3>
                    <span style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>${food.price}</span>
                </div>
                <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem', flexGrow: 1 }}>{food.description}</p>

                {quantity === 0 ? (
                    <button onClick={handleAdd} className="btn btn-outline" style={{ width: '100%' }}>Add to Cart</button>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', backgroundColor: 'var(--gray-100)', padding: '0.5rem', borderRadius: '4px' }}>
                        <button onClick={handleDecrement} style={{ padding: '4px', borderRadius: '4px', backgroundColor: 'white', border: '1px solid #ddd' }}>
                            <Minus size={16} />
                        </button>
                        <span style={{ fontWeight: 'bold' }}>{quantity}</span>
                        <button onClick={handleIncrement} style={{ padding: '4px', borderRadius: '4px', backgroundColor: 'white', border: '1px solid #ddd' }}>
                            <Plus size={16} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
