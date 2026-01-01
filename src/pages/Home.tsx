import { useState, useEffect } from 'react';
import { restaurants as initialRestaurants, type Restaurant } from '../data/restaurants';
import RestaurantCard from '../components/RestaurantCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Search } from 'lucide-react';
import { db } from '../firebase';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCuisine, setSelectedCuisine] = useState('All');

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'restaurants'));
                if (querySnapshot.empty) {
                    console.log("Seeding initial data to Firestore...");
                    const seededData: Restaurant[] = [];
                    for (const r of initialRestaurants) {
                        // Use string ID for document
                        await setDoc(doc(db, 'restaurants', String(r.id)), r);
                        seededData.push(r);
                    }
                    setRestaurants(seededData);
                } else {
                    const fetchedRestaurants: Restaurant[] = [];
                    querySnapshot.forEach((doc) => {
                        fetchedRestaurants.push(doc.data() as Restaurant);
                    });
                    // Sort by ID to ensure consistent order
                    fetchedRestaurants.sort((a, b) => a.id - b.id);
                    setRestaurants(fetchedRestaurants);
                }
            } catch (error) {
                console.error("Error fetching restaurants:", error);
                // Fallback to local data if fetch fails (e.g. permission issues)
                setRestaurants(initialRestaurants);
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurants();
    }, []);

    const cuisines = ['All', ...new Set(restaurants.map(r => r.cuisine.split(',')[0].trim()))];

    const filteredRestaurants = restaurants.filter(restaurant => {
        const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCuisine = selectedCuisine === 'All' || restaurant.cuisine.includes(selectedCuisine);

        return matchesSearch && matchesCuisine;
    });

    if (loading) {
        return (
            <div style={{ padding: '4rem 0' }}>
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div>
            {/* Hero Section */}
            <section style={{
                backgroundColor: '#1a1a1a',
                color: 'white',
                padding: '4rem 0',
                marginBottom: '3rem',
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                textAlign: 'center'
            }}>
                <div className="container">
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 800 }}>Order Food From Your Favorite Restaurants</h1>
                    <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto 2rem auto' }}>
                        Delicious meals delivered to your doorstep. Browse top-rated restaurants and order now.
                    </p>

                    <div style={{ position: 'relative', maxWidth: '500px', margin: '0 auto' }}>
                        <input
                            type="text"
                            placeholder="Search for restaurants or cuisines..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '1rem 1rem 1rem 3rem',
                                fontSize: '1rem',
                                borderRadius: '50px',
                                border: 'none',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                            }}
                        />
                        <Search size={20} color="#666" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                    </div>
                </div>
            </section>

            {/* Restaurant List */}
            <main className="container" style={{ paddingBottom: '4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <h2 style={{ fontSize: '2rem', borderBottom: '2px solid var(--primary-color)', display: 'inline-block', paddingBottom: '0.5rem' }}>
                        Popular Restaurants
                    </h2>

                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {cuisines.map(cuisine => (
                            <button
                                key={cuisine}
                                onClick={() => setSelectedCuisine(cuisine)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: '20px',
                                    border: '1px solid #ddd',
                                    backgroundColor: selectedCuisine === cuisine ? 'var(--primary-color)' : 'white',
                                    color: selectedCuisine === cuisine ? 'white' : '#666',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {cuisine}
                            </button>
                        ))}
                    </div>
                </div>

                {filteredRestaurants.length > 0 ? (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '2rem'
                    }}>
                        {filteredRestaurants.map(restaurant => (
                            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '4rem 0', color: '#666' }}>
                        <h3>No restaurants found</h3>
                        <p>Try adjusting your search or filters.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
