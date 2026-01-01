export interface FoodItem {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
}

export interface Restaurant {
    id: number;
    name: string;
    rating: number;
    cuisine: string;
    deliveryTime: string;
    priceRange: string;
    image: string;
    menu: FoodItem[];
}

export const restaurants: Restaurant[] = [
    {
        id: 1,
        name: "Burger King",
        rating: 4.5,
        cuisine: "American, Fast Food",
        deliveryTime: "25-30 min",
        priceRange: "$$",
        image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&q=80",
        menu: [
            {
                id: 101,
                name: "Whopper Meal",
                price: 9.99,
                description: "Flame-grilled beef patty, topped with tomatoes, fresh cut lettuce, mayo, pickles, a swirl of ketchup, and sliced white onions on a soft sesame seed bun.",
                image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
            },
            {
                id: 102,
                name: "Chicken Royale",
                price: 8.49,
                description: "Crispy chicken breast with lettuce and mayo on a sesame seed bun.",
                image: "https://images.unsplash.com/photo-1615557960916-5f4791effe9d?w=800&q=80"
            },
            {
                id: 103,
                name: "Fries (Medium)",
                price: 3.99,
                description: "Classic salted fries.",
                image: "https://images.unsplash.com/photo-1630384060421-a4323ce5663e?w=800&q=80"
            }
        ]
    },
    {
        id: 2,
        name: "Pizza Hut",
        rating: 4.2,
        cuisine: "Italian, Pizza",
        deliveryTime: "30-40 min",
        priceRange: "$$",
        image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=800&q=80",
        menu: [
            {
                id: 201,
                name: "Pepperoni Pizza",
                price: 14.99,
                description: "Classic pepperoni with mozzarella cheese.",
                image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80"
            },
            {
                id: 202,
                name: "Veggie Supreme",
                price: 16.99,
                description: "Loaded with fresh vegetables and cheese.",
                image: "https://images.unsplash.com/photo-1571407970349-bc16e327c080?w=800&q=80"
            }
        ]
    },
    {
        id: 3,
        name: "Sushi Master",
        rating: 4.8,
        cuisine: "Japanese, Sushi",
        deliveryTime: "40-50 min",
        priceRange: "$$$",
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80",
        menu: [
            {
                id: 301,
                name: "Salmon Roll",
                price: 12.99,
                description: "Fresh salmon avocado roll.",
                image: "https://images.unsplash.com/photo-1617196019815-50a9070a5393?w=800&q=80"
            },
            {
                id: 302,
                name: "Tuna Sashimi",
                price: 18.99,
                description: "Thick slices of fresh tuna.",
                image: "https://images.unsplash.com/photo-1579584425555-d3715dfdf065?w=800&q=80"
            }
        ]
    },
    {
        id: 4,
        name: "Taco Bell",
        rating: 4.0,
        cuisine: "Mexican, Tacos",
        deliveryTime: "20-25 min",
        priceRange: "$",
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80",
        menu: [
            {
                id: 401,
                name: "Crunchy Taco",
                price: 2.99,
                description: "Seasoned beef, lettuce, and cheese in a crunchy shell.",
                image: "https://images.unsplash.com/photo-1613514785940-daed07799d9b?w=800&q=80"
            },
            {
                id: 402,
                name: "Burrito Supreme",
                price: 5.49,
                description: "Beef, beans, cheese, lettuce, tomatoes, onions, sour cream.",
                image: "https://images.unsplash.com/photo-1566740933430-b5e70b06d2d5?w=800&q=80"
            }
        ]
    }
];
