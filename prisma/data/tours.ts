// prisma/data/tours.ts
export const tours = [
    {
      title: "Bali Paradise Tour",
      slug: "bali-paradise-tour",
      description: "Experience the beauty and culture of Bali with this comprehensive tour package. Visit ancient temples, pristine beaches, and lush rice terraces.",
      summary: "A 7-day journey through Bali's most beautiful destinations",
      price: 1299.99,
      duration: 7,
      maxGroupSize: 12,
      difficulty: "EASY",
      location: "Bali, Indonesia",
      startLocation: "Denpasar",
      featured: true,
      images: [
        {
          url: "/uploads/bali-temple.jpg",
          publicId: "bali-temple"
        },
        {
          url: "/uploads/bali-beach.jpg",
          publicId: "bali-beach"
        },
        {
          url: "/uploads/bali-terrace.jpg",
          publicId: "bali-terrace"
        }
      ],
      itinerary: [
        {
          day: 1,
          title: "Arrival in Bali",
          description: "Welcome to Bali! Transfer to your hotel in Ubud. Evening orientation and welcome dinner."
        },
        {
          day: 2,
          title: "Temples and Culture",
          description: "Visit ancient temples including Tirta Empul and Gunung Kawi. Experience traditional dance performance."
        },
        {
          day: 3,
          title: "Rice Terraces",
          description: "Explore the stunning Tegalalang rice terraces. Visit local villages and learn about traditional farming."
        },
        {
          day: 4,
          title: "Beach Day",
          description: "Relax at Nusa Dua beach. Optional water sports activities available."
        },
        {
          day: 5,
          title: "Volcano Adventure",
          description: "Sunrise trek at Mount Batur. Visit coffee plantations and hot springs."
        },
        {
          day: 6,
          title: "Free Day",
          description: "Free day to explore Ubud. Optional spa treatments and shopping."
        },
        {
          day: 7,
          title: "Departure",
          description: "Transfer to airport for departure."
        }
      ],
      included: [
        "6 nights accommodation",
        "All transportation",
        "Daily breakfast",
        "Welcome dinner",
        "Temple entrance fees",
        "Traditional dance performance",
        "Professional guide",
        "Airport transfers"
      ],
      notIncluded: [
        "International flights",
        "Travel insurance",
        "Personal expenses",
        "Optional activities",
        "Additional meals"
      ]
    },
    {
      title: "Japanese Culture Explorer",
      slug: "japanese-culture-explorer",
      description: "Immerse yourself in Japanese culture with this comprehensive tour. Experience traditional customs, modern technology, and stunning landscapes.",
      summary: "A 10-day journey through Japan's cultural highlights",
      price: 2499.99,
      duration: 10,
      maxGroupSize: 8,
      difficulty: "MEDIUM",
      location: "Japan",
      startLocation: "Tokyo",
      featured: true,
      images: [
        {
          url: "/uploads/japan-temple.jpg",
          publicId: "japan-temple"
        },
        {
          url: "/uploads/japan-garden.jpg",
          publicId: "japan-garden"
        },
        {
          url: "/uploads/japan-city.jpg",
          publicId: "japan-city"
        }
      ],
      itinerary: [
        {
          day: 1,
          title: "Tokyo Arrival",
          description: "Welcome to Tokyo! Transfer to hotel. Evening orientation and welcome dinner."
        },
        {
          day: 2,
          title: "Tokyo Exploration",
          description: "Visit Tsukiji Outer Market, Senso-ji Temple, and Tokyo Skytree."
        },
        {
          day: 3,
          title: "Tokyo to Kyoto",
          description: "Bullet train to Kyoto. Visit Fushimi Inari Shrine and Gion district."
        },
        {
          day: 4,
          title: "Kyoto Temples",
          description: "Explore Kinkaku-ji, Ryoan-ji, and Arashiyama Bamboo Forest."
        },
        {
          day: 5,
          title: "Traditional Arts",
          description: "Tea ceremony experience. Kimono wearing and calligraphy workshop."
        },
        {
          day: 6,
          title: "Kyoto to Osaka",
          description: "Visit Nara Deer Park and Todai-ji Temple. Evening in Osaka."
        },
        {
          day: 7,
          title: "Osaka Exploration",
          description: "Visit Osaka Castle and Dotonbori district. Food tour."
        },
        {
          day: 8,
          title: "Hiroshima Day Trip",
          description: "Visit Hiroshima Peace Memorial Park and Miyajima Island."
        },
        {
          day: 9,
          title: "Back to Tokyo",
          description: "Return to Tokyo. Free time for shopping and exploration."
        },
        {
          day: 10,
          title: "Departure",
          description: "Transfer to airport for departure."
        }
      ],
      included: [
        "9 nights accommodation",
        "Bullet train passes",
        "All transportation",
        "Daily breakfast",
        "Welcome dinner",
        "Temple entrance fees",
        "Tea ceremony",
        "Professional guide",
        "Airport transfers"
      ],
      notIncluded: [
        "International flights",
        "Travel insurance",
        "Personal expenses",
        "Optional activities",
        "Additional meals"
      ]
    }
  ]