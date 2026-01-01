import { Link } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';
import type { Restaurant } from '../data/restaurants';

interface RestaurantCardProps {
    restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
    return (
        <div className="card">
            <div style={{ height: '200px', overflow: 'hidden' }}>
                <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>
            <div style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{restaurant.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#2ecc71', color: 'white', padding: '0.2rem 0.4rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                        {restaurant.rating} <Star size={12} fill="white" style={{ marginLeft: '2px' }} />
                    </div>
                </div>

                <p style={{ color: 'var(--light-text)', fontSize: '0.9rem', marginBottom: '1rem' }}>{restaurant.cuisine}</p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Clock size={16} /> {restaurant.deliveryTime}
                    </div>
                    <div>{restaurant.priceRange}</div>
                </div>

                <Link to={`/restaurant/${restaurant.id}`} className="btn btn-outline" style={{ width: '100%' }}>
                    View Menu
                </Link>
            </div>
        </div>
    );
}
