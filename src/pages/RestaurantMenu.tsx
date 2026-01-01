import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { Restaurant } from '../data/restaurants';
import FoodItemCard from '../components/FoodItemCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Star, Clock, ChevronLeft } from 'lucide-react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function RestaurantMenu() {
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState(true);
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

    useEffect(() => {
        const fetchRestaurant = async () => {
            if (!id) return;
            try {
                const docRef = doc(db, 'restaurants', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setRestaurant(docSnap.data() as Restaurant);
                } else {
                    console.log("No such restaurant!");
                    setRestaurant(null);
                }
            } catch (error) {
                console.error("Error fetching restaurant:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurant();
    }, [id]);

    if (loading) {
        return (
            <div style={{ padding: '4rem 0' }}>
                <LoadingSpinner />
            </div>
        );
    }

    if (!restaurant) {
        return (
            <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
                <h2>Restaurant not found</h2>
                <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="container" style={{ paddingBottom: '4rem' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: '#666' }}>
                <ChevronLeft size={20} /> Back to Restaurants
            </Link>

            {/* Restaurant Info Header */}
            <div style={{
                display: 'flex',
                gap: '2rem',
                marginBottom: '3rem',
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '8px',
                boxShadow: 'var(--shadow)',
                flexWrap: 'wrap'
            }}>
                <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    style={{ width: '200px', height: '150px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }}
                />
                <div style={{ flexGrow: 1 }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{restaurant.name}</h1>
                    <p style={{ color: '#666', marginBottom: '1rem', fontSize: '1.1rem' }}>{restaurant.cuisine}</p>

                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#2ecc71', color: 'white', padding: '0.3rem 0.6rem', borderRadius: '4px', fontWeight: 'bold' }}>
                            {restaurant.rating} <Star size={16} fill="white" style={{ marginLeft: '4px' }} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#666' }}>
                            <Clock size={20} /> {restaurant.deliveryTime}
                        </div>
                        <div style={{ color: '#666' }}>
                            {restaurant.priceRange}
                        </div>
                    </div>
                </div>
            </div>

            <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Menu</h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '2rem'
            }}>
                {restaurant.menu.map(item => (
                    <FoodItemCard key={item.id} food={item} restaurantId={restaurant.id} />
                ))}
            </div>
        </div>
    );
}
