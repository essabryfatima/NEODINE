

import { Dish, Chef } from './types';

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/shrlqlwb3849?igsh=aXh3b2Ricm41NWp2",
  tiktok: "https://www.tiktok.com/@softscissorsasmr0?_r=1&_t=ZN-91kPfB2vrAU",
  facebook: "https://www.facebook.com/profile.php?id=100079676007045&mibextid=rS40aB7S9Ucbxw6v",
  telegram: "https://t.me/+212619110750"
};

export const LEGAL_CONTENT = {
  privacy: {
    title: "Privacy Policy",
    content: `
      Last Updated: 2026

      1. Data Collection
      We collect information you provide directly to us when you make a reservation, order food, or contact us. This includes name, email address, phone number, and payment information.

      2. Use of Information
      We use your information to provide, maintain, and improve our services, process transactions, and communicate with you.

      3. Data Storage
      Your data is stored securely on encrypted servers. We retain your personal information only for as long as necessary to fulfill the purposes we collected it for.

      4. Contact
      For privacy concerns, please contact privacy@neodine.com.
    `
  },
  terms: {
    title: "Terms of Service",
    content: `
      Last Updated: 2026

      1. Acceptance of Terms
      By accessing or using our website and services, you agree to be bound by these Terms.

      2. Use of Services
      You agree to use our services only for lawful purposes and in accordance with these Terms.

      3. Reservations and Orders
      All reservations and orders are subject to availability. We reserve the right to refuse service to anyone.

      4. Liability
      NEO DINE is not liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of our services.
    `
  },
  cookies: {
    title: "Cookie Policy",
    content: `
      Last Updated: 2026

      1. What are cookies?
      Cookies are small text files stored on your device when you visit our website.

      2. Types of Cookies We Use
      - Essential Cookies: Necessary for the website to function (e.g., cart, secure login).
      - Analytics Cookies: Help us understand how visitors interact with the website.
      - Marketing Cookies: Used to track visitors across websites to display relevant ads.

      3. Managing Cookies
      You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.
    `
  }
};

export const NAV_LINKS = ["Home", "Menu", "Reservations", "Chefs", "Track Order"];

export const CATEGORIES = [
  { id: 'breakfast', name: 'Sunrise Protocol', gradient: 'from-orange-400 to-yellow-300' },
  { id: 'starter', name: 'Cyber Starters', gradient: 'from-neon-blue to-blue-900' },
  { id: 'main', name: 'Mainframe Mains', gradient: 'from-purple-600 to-neon-pink' },
  { id: 'dessert', name: 'Digital Desserts', gradient: 'from-emerald-500 to-neon-green' },
  { id: 'drinks', name: 'Neon Elixirs', gradient: 'from-red-600 to-orange-600' },
];

export const DISHES: Dish[] = [
  // BREAKFAST FOOD (08:00 - 11:30)
  // ROW 1: 800 - 500 - 800
  {
    id: 20,
    name: "Anti-Gravity Pancakes",
    description: "Fluffy stacks suspended in mid-air, served with levitating maple spheres and nano-butter.",
    price: 14.00,
    image: "https://images.unsplash.com/photo-1598214886806-c87b84b7078b?w=800&auto=format&fit=crop&q=80",
    category: "breakfast",
    rating: 4.8,
    calories: 550,
    videoUrl: "https://cdn.pixabay.com/video/2016/11/29/6566-193666085_large.mp4"
  },
  {
    id: 21,
    name: "Binary Benedict",
    description: "Poached cyber-eggs on holographic toast with molecular hollandaise sauce.",
    price: 16.50,
    // Middle column: w=500
    image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=500&auto=format&fit=crop&q=80",
    category: "breakfast",
    rating: 4.9,
    calories: 420,
    videoUrl: "https://cdn.pixabay.com/video/2021/05/23/75043-554407981_large.mp4"
  },
  {
    id: 22,
    name: "Neon Smoothie Bowl",
    description: "Bioluminescent açai blend topped with crystallized dragon fruit and star dust.",
    price: 13.00,
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&auto=format&fit=crop&q=80",
    category: "breakfast",
    rating: 4.7,
    calories: 380,
    isVegan: true,
    videoUrl: "https://cdn.pixabay.com/video/2020/05/25/40133-424930030_large.mp4"
  },
  
  // ROW 2: 800 - 500 - 800
  {
    id: 23,
    name: "Quantum Coffee & Croissant",
    description: "Gold-dusted pastry paired with coffee brewed in a temporal vacuum.",
    price: 9.50,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop&q=80",
    category: "breakfast",
    rating: 4.9,
    calories: 300,
    videoUrl: "https://cdn.pixabay.com/video/2020/05/11/38437-419747209_large.mp4"
  },
  {
    id: 24,
    name: "Nebula Waffles",
    description: "Crispy Belgian waffles infused with starlight berries and electric syrup.",
    price: 12.50,
    // Middle column: w=500
    image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=500&auto=format&fit=crop&q=80",
    category: "breakfast",
    rating: 4.8,
    calories: 480,
    videoUrl: "https://cdn.pixabay.com/video/2017/01/04/7016-198165089_large.mp4"
  },
  {
    id: 25,
    name: "Sonic Avocado Toast",
    description: "Sourdough toasted with sound waves, topped with perfectly sliced cyber-avocados.",
    price: 15.00,
    // w=500 to match visible layout
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=500&auto=format&fit=crop&q=80",
    category: "breakfast",
    rating: 4.9,
    calories: 320,
    videoUrl: "https://cdn.pixabay.com/video/2021/09/06/87600-600329976_large.mp4"
  },

  // BREAKFAST HOT DRINKS (COFFEES FIRST)
  // ROW 3: 800 - 500 - 800
  {
    id: 30,
    name: "Nebula Espresso",
    description: "Hot concentrated dark matter coffee brewed under high-pressure stasis.",
    price: 6.00,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80",
    category: "breakfast",
    rating: 4.9,
    calories: 5,
    videoUrl: "https://cdn.pixabay.com/video/2020/05/11/38437-419747209_large.mp4"
  },
  {
    id: 70,
    name: "Cosmic Cappuccino",
    description: "Rich espresso topped with a milky way of micro-foam and stardust sprinkles.",
    price: 6.50,
    // Middle column: w=500
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=500&auto=format&fit=crop&q=80",
    category: "breakfast",
    rating: 4.8,
    calories: 120,
    videoUrl: "https://cdn.pixabay.com/video/2020/05/11/38437-419747209_large.mp4"
  },
  {
    id: 71,
    name: "Stardust Macchiato",
    description: "Layered espresso and steamed gravity-milk with a caramel comet trail.",
    price: 6.80,
    // w=800
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&auto=format&fit=crop&q=80",
    category: "breakfast",
    rating: 4.9,
    calories: 150,
    videoUrl: "https://cdn.pixabay.com/video/2020/05/11/38437-419747209_large.mp4"
  },

  // ROW 4: 800 - 500 - 800
  {
    id: 50,
    name: "Molten Mars Mocha",
    description: "Hot rich cocoa fused with espresso and topped with red dust foam.",
    price: 6.50,
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&auto=format&fit=crop&q=80",
    category: "breakfast",
    rating: 4.9,
    calories: 220,
    videoUrl: "https://cdn.pixabay.com/video/2020/05/11/38437-419747209_large.mp4"
  },
  {
    id: 51,
    name: "Solar Golden Milk",
    description: "Hot turmeric and ginger latte steaming with healing nano-particles.",
    price: 5.80,
    // Specific URL provided, w=500
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&auto=format&fit=crop&q=80",
    category: "breakfast",
    rating: 4.8,
    calories: 180,
    videoUrl: "https://cdn.pixabay.com/video/2016/11/29/6559-193663674_large.mp4"
  },
  {
    id: 52,
    name: "Steam-Punk Cider",
    description: "Hot spiced apple elixir with cinnamon vapor and star anise.",
    price: 5.50,
    image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=800&auto=format&fit=crop&q=80",
    category: "breakfast",
    rating: 4.7,
    calories: 140,
    videoUrl: "https://cdn.pixabay.com/video/2020/03/18/33823-398704648_large.mp4"
  },

  // ROW 5: 800 - 500 - 800
  {
    id: 32,
    name: "Lunar Herbal Infusion",
    description: "Hot steaming blend of moon-grown mint and soothing chamomile herbs.",
    price: 5.00,
    image: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=800&auto=format&fit=crop&q=80",
    category: "breakfast",
    rating: 4.7,
    calories: 0,
    isVegan: true,
    videoUrl: "https://cdn.pixabay.com/video/2020/03/18/33823-398704648_large.mp4"
  },
  {
    id: 31,
    name: "Plasma Earl Grey",
    description: "Hot bergamot-infused black tea with suspended glowing plasma particles.",
    price: 5.50,
    // Middle column: w=500
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=500&auto=format&fit=crop&q=80",
    category: "breakfast",
    rating: 4.8,
    calories: 0,
    isVegan: true,
    videoUrl: "https://cdn.pixabay.com/video/2016/11/29/6559-193663674_large.mp4"
  },
  {
    id: 72,
    name: "Aurora Matcha Latte",
    description: "Ceremonial grade matcha whisked with ionized milk and glowing green energy.",
    price: 7.00,
    image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=800&auto=format&fit=crop&q=80",
    category: "breakfast",
    rating: 4.9,
    calories: 180,
    isVegan: true,
    videoUrl: "https://cdn.pixabay.com/video/2021/04/09/70548-535340685_large.mp4"
  },


  // DESSERTS (SWEET & SIPS - Part 1)
  {
    id: 5,
    name: "Binary Brownie",
    description: "Dark matter chocolate with a core of molten gold caramel.",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80",
    category: "dessert",
    rating: 4.9,
    calories: 450,
    isVegan: true,
    videoUrl: "https://cdn.pixabay.com/video/2020/09/16/49964-459864275_large.mp4"
  },
  {
    id: 9,
    name: "Holo-Cheesecake",
    description: "Deconstructed cheesecake with holographic sugar shards and berry mist.",
    price: 16.00,
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&auto=format&fit=crop&q=80",
    category: "dessert",
    rating: 4.7,
    calories: 410,
    videoUrl: "https://cdn.pixabay.com/video/2020/05/01/37525-415510656_large.mp4"
  },
  {
    id: 11,
    name: "Nebula Lava Cake",
    description: "Molten dark chocolate core simulating a black hole event horizon.",
    price: 14.50,
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&auto=format&fit=crop&q=80",
    category: "dessert",
    rating: 4.9,
    calories: 520,
    videoUrl: "https://cdn.pixabay.com/video/2020/03/17/33816-398704257_large.mp4"
  },
  {
    id: 40,
    name: "Neon Lime Tart",
    description: "Tangy lime curd in a charcoal shell with glowing meringue peaks.",
    price: 13.50,
    image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=800&auto=format&fit=crop&q=80",
    category: "dessert",
    rating: 4.8,
    calories: 380,
    videoUrl: "https://cdn.pixabay.com/video/2020/05/04/37905-417436294_large.mp4" 
  },
  {
    id: 41,
    name: "Plasma Parfait",
    description: "Layers of suspended fruit gels and zero-g cream in a gravity glass.",
    price: 11.50,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80",
    category: "dessert",
    rating: 4.6,
    calories: 320,
    videoUrl: "https://cdn.pixabay.com/video/2016/10/29/6146-189600174_large.mp4"
  },
  {
    id: 42,
    name: "Quantum Cookie Skillet",
    description: "Warm cookie dough with shifting chocolate chunks and vanilla bean ice cream.",
    price: 14.00,
    image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=500&auto=format&fit=crop&q=80",
    category: "dessert",
    rating: 4.9,
    calories: 550,
    videoUrl: "https://cdn.pixabay.com/video/2020/09/16/49964-459864275_large.mp4"
  },
  {
    id: 43,
    name: "Android Apple Pie",
    description: "Deconstructed spiced apples with metallic sugar glass and cinnamon dust.",
    price: 12.00,
    image: "https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=800&auto=format&fit=crop&q=80",
    category: "dessert",
    rating: 4.7,
    calories: 390,
    videoUrl: "https://cdn.pixabay.com/video/2020/10/22/53323-472655787_large.mp4"
  },
  {
    id: 44,
    name: "Galactic Gelato",
    description: "Swirled ice cream resembling nebula clouds with popping candy stars.",
    price: 10.50,
    image: "https://images.unsplash.com/photo-1557142046-c704a3adf364?w=800&auto=format&fit=crop&q=80",
    category: "dessert",
    rating: 4.8,
    calories: 280,
    videoUrl: "https://cdn.pixabay.com/video/2020/06/19/42456-431326495_large.mp4"
  },
  {
    id: 45,
    name: "Void Velvet Cake",
    description: "Deep purple velvet cake with bioluminescent frosting and blackberry core.",
    price: 15.00,
    image: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=800&auto=format&fit=crop&q=80",
    category: "dessert",
    rating: 4.9,
    calories: 450,
    videoUrl: "https://cdn.pixabay.com/video/2020/05/01/37525-415510656_large.mp4"
  },

  // COLD DRINKS (SWEET & SIPS - Part 2)
  {
    id: 33,
    name: "Neutron Avocado Deluxe",
    description: "Rich avocado blended with Sweet Mango, cyber-dates, almonds, and walnuts, topped with meteorite dried fruits.",
    price: 9.00,
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=800&auto=format&fit=crop&q=80",
    category: "drinks",
    rating: 4.9,
    calories: 450,
    videoUrl: "https://cdn.pixabay.com/video/2021/08/04/83863-583279165_large.mp4"
  },
  {
    id: 34,
    name: "Gamma Avocado Shake",
    description: "Cold silky avocado blended with nutrient-dense cyber-honey and almond milk.",
    price: 8.50,
    image: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=800&auto=format&fit=crop&q=80",
    category: "drinks",
    rating: 4.9,
    calories: 250,
    isVegan: true,
    videoUrl: "https://cdn.pixabay.com/video/2020/05/04/37905-417436294_large.mp4"
  },
  {
    id: 35,
    name: "Kiwi Flux Nectar",
    description: "Cold radiant green kiwi juice charged with essential electrolytes.",
    price: 8.00,
    image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=800&auto=format&fit=crop&q=80",
    category: "drinks",
    rating: 4.7,
    calories: 140,
    isVegan: true,
    videoUrl: "https://cdn.pixabay.com/video/2020/07/04/43870-435760444_large.mp4"
  },
  
  // DRINKS (Continued - Cocktails)
  {
    id: 6,
    name: "Void Cocktail",
    description: "Color-shifting gin blend that glows under UV light.",
    price: 15.00,
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop&q=80",
    category: "drinks",
    rating: 4.8,
    calories: 150,
    videoUrl: "https://cdn.pixabay.com/video/2020/07/25/45688-444453531_large.mp4"
  },
  {
    id: 10,
    name: "Neural Nectar",
    description: "Energizing matcha blend with synaptic-enhancing pearls.",
    price: 12.50,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80",
    category: "drinks",
    rating: 4.6,
    calories: 120,
    videoUrl: "https://cdn.pixabay.com/video/2021/04/09/70548-535340685_large.mp4"
  },
  {
    id: 12,
    name: "Quantum Quencher",
    description: "Sparkling blue algae infusion that changes flavor frequency as you sip.",
    price: 11.00,
    image: "https://images.unsplash.com/photo-1546171753-97d7676e4602?w=800&auto=format&fit=crop&q=80",
    category: "drinks",
    rating: 4.7,
    calories: 90,
    videoUrl: "https://cdn.pixabay.com/video/2020/05/22/39735-424040182_large.mp4"
  },

  // MAINS & STARTERS (CHEF'S SIGNATURE)
  {
    id: 1,
    name: "Quantum Burger",
    description: "Lab-grown wagyu infused with truffle particles, levitating on a magnetic plate.",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80",
    category: "main",
    rating: 4.9,
    calories: 850,
    // videoUrl removed for static image
  },
  {
    id: 2,
    name: "Neon Ramen",
    description: "Bioluminescent broth with holographic noodles and nano-spiced pork.",
    price: 18.50,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
    category: "main",
    rating: 4.8,
    calories: 620,
    isSpicy: true,
    videoUrl: "https://cdn.pixabay.com/video/2019/05/29/24056-340868158_large.mp4"
  },
  {
    id: 3,
    name: "Cyber Sushi Set",
    description: "Precision-cut sashmi with edamame puree and liquid nitrogen fog.",
    price: 32.00,
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=80",
    category: "starter",
    rating: 5.0,
    calories: 400,
    videoUrl: "https://cdn.pixabay.com/video/2020/01/05/30919-383789392_large.mp4"
  },
  {
    id: 7,
    name: "Zero-G Scallops",
    description: "Pan-seared scallops served on a levitating bed of seafoam and coral dust.",
    price: 28.00,
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800&auto=format&fit=crop&q=80",
    category: "starter",
    rating: 4.9,
    calories: 320,
    // videoUrl removed
  },
  {
    id: 4,
    name: "Plasma Pizza",
    description: "Zero-gravity dough topped with radiant tomatoes and electric basil.",
    price: 22.00,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80",
    category: "main",
    rating: 4.7,
    calories: 900,
    videoUrl: "https://cdn.pixabay.com/video/2021/05/26/75421-555776092_large.mp4"
  },
  {
    id: 8,
    name: "Chrono Steak",
    description: "Aged in a temporal stasis field for perfect tenderness, served with void sauce.",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&auto=format&fit=crop&q=80",
    category: "main",
    rating: 5.0,
    calories: 950,
    videoUrl: "https://cdn.pixabay.com/video/2017/04/20/8807-214300431_large.mp4"
  },
  {
    id: 60,
    name: "Magnetic Mushroom Risotto",
    description: "Creamy arborio rice infused with magnetic truffles and levitating parmesan crisps.",
    price: 26.00,
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&auto=format&fit=crop&q=80",
    category: "starter",
    rating: 4.8,
    calories: 540,
    isVegan: true,
    videoUrl: "https://cdn.pixabay.com/video/2021/04/18/71408-538876403_large.mp4"
  },
  {
    id: 61,
    name: "Solar-Flare Lamb Chops",
    description: "Grilled over a mini-sun reactor, served with mint-plasma jelly.",
    price: 38.00,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
    category: "main",
    rating: 4.9,
    calories: 720,
    videoUrl: "https://cdn.pixabay.com/video/2016/11/18/6438-192131238_large.mp4"
  },
  {
    id: 62,
    name: "Chrono-Crusted Cod",
    description: "Line-caught cod with a time-dilated herb crust and lemon nebula foam.",
    price: 29.50,
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800&auto=format&fit=crop&q=80",
    category: "main",
    rating: 4.7,
    calories: 460,
    videoUrl: "https://cdn.pixabay.com/video/2020/03/01/33100-394432167_large.mp4"
  },
];

export const CHEFS: Chef[] = [
  {
    id: 101,
    name: "Chef A.I.da",
    specialty: "Molecular Gastronomy",
    image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=800&auto=format&fit=crop&q=80",
    availability: "Tonight",
    rating: 5.0,
    bio: "An industry icon in modern molecular gastronomy, formerly the executive chef at The Alchemist. Known for merging chemistry with high-art plating.",
    education: "The Culinary Institute of America (CIA) - 2018",
    experience: [
      "2018-2020: Sous Chef at Alinea, Chicago",
      "2021-2023: Executive Chef at The Void, London",
      "2024-Present: Head Culinary Director at NEO DINE"
    ],
    philosophy: "Dining is not just eating; it is an experiment in emotion and science.",
    stats: {
      creativity: 98,
      precision: 100,
      speed: 95,
      tech: 99
    }
  },
  {
    id: 102,
    name: "Marcus Void",
    specialty: "Nordic-Japanese Fusion",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&auto=format&fit=crop&q=80",
    availability: "Tomorrow",
    rating: 4.9,
    bio: "A renowned expert in sustainable foraging and precision knife skills. He combines the minimalism of Japan with the earthy flavors of the Nordic region.",
    education: "Le Cordon Bleu, Paris - 2019",
    experience: [
      "2019-2021: Chef de Partie at Frantzén, Stockholm",
      "2022-2024: Head Chef at Kaze, Tokyo",
      "2025: Awarded 'Best New Chef' by Global Gastronomy"
    ],
    philosophy: "Nature provides the ingredients; I simply curate the silence between flavors.",
    stats: {
      creativity: 95,
      precision: 98,
      speed: 92,
      tech: 85
    }
  },
  {
    id: 103,
    name: "Elena Cyber",
    specialty: "Avant-Garde Pastry",
    image: "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?w=800&auto=format&fit=crop&q=80",
    availability: "Tonight",
    rating: 4.9,
    bio: "An architect turned pastry chef who designs desserts with structural integrity and zero-gravity aesthetics. Famous for her 'floating' sugar work.",
    education: "École Ducasse, France - 2020",
    experience: [
      "2020-2022: Lead Pastry Chef at Pierre Hermé Paris",
      "2023: Winner of the World Chocolate Masters",
      "2025-Present: Director of Sweet Innovation at NEO DINE"
    ],
    philosophy: "Sugar is the only medium that can be both liquid glass and edible air.",
    stats: {
      creativity: 100,
      precision: 95,
      speed: 88,
      tech: 96
    }
  },
  {
    id: 104,
    name: "Hiroshi Quantum",
    specialty: "Modern Kaiseki",
    image: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=800&auto=format&fit=crop&q=80",
    availability: "Tomorrow",
    rating: 5.0,
    bio: "A third-generation sushi master who integrates modern dry-aging technology with centuries-old tradition to create unmatched textures.",
    education: "Tsuji Culinary Institute, Osaka - 2015",
    experience: [
      "2015-2020: Apprentice at Sukiyabashi Jiro",
      "2021-2023: Executive Chef at Narisawa",
      "2024: Featured in 'Chef's Table: Future Edition'"
    ],
    philosophy: "Respect the ingredient, master the time, and the flavor will follow.",
    stats: {
      creativity: 92,
      precision: 100,
      speed: 96,
      tech: 90
    }
  }
];
