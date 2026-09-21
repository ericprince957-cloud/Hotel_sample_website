-- Seed rooms data
INSERT INTO rooms (slug, name, type, price_per_night, max_guests, bed_type, size_sqm, short_description, description, amenities, images, is_available, is_featured, sort_order) VALUES
(
  'standard',
  'Standard Room',
  'standard',
  45000,
  2,
  'Queen-size bed',
  22,
  'A clean, comfortable room with everything you need for a good night''s rest.',
  'Our Standard Room is perfect for solo travellers or couples who want a restful stay without paying for extras they won''t use. You get a quality queen-size bed, fast Wi-Fi, a clean bathroom with hot water, and a calm space to unwind after a busy day in Lagos. Simple, warm, and well taken care of.',
  ARRAY['Air conditioning', 'Free Wi-Fi', 'Flat-screen TV', 'Hot water', 'Complimentary water', 'Daily housekeeping', 'In-room safe', 'Tea & coffee maker'],
  ARRAY[
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&q=80',
    'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80'
  ],
  true,
  false,
  1
),
(
  'deluxe',
  'Deluxe Room',
  'deluxe',
  75000,
  2,
  'King-size bed',
  30,
  'More space, better finishes, and a king-size bed for a restful stay.',
  'The Deluxe Room gives you extra room to breathe. A king-size bed, a work desk by the window, and finishes that feel considered — not flashy, just well done. Whether you''re in town for business or a weekend away, this room keeps you comfortable from morning to night.',
  ARRAY['Air conditioning', 'Free Wi-Fi', '55-inch Smart TV', 'Hot & cold water', 'Work desk', 'Mini fridge', 'Complimentary water & snacks', 'Daily housekeeping', 'In-room safe', 'Premium toiletries', 'Bathrobe & slippers'],
  ARRAY[
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
    'https://images.unsplash.com/photo-1582719478261-c8dbf3c45a24?w=800&q=80',
    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80'
  ],
  true,
  true,
  2
),
(
  'executive',
  'Executive Room',
  'executive',
  120000,
  3,
  'King-size bed + sofa bed',
  40,
  'A spacious room with a separate sitting area — ideal for work or relaxing.',
  'The Executive Room is built for people who need space and quiet. A separate sitting area lets you work or host a small meeting without disturbing the bedroom. Premium bedding, a rainfall shower, and thoughtful touches throughout. It''s the room you choose when comfort is the priority.',
  ARRAY['Air conditioning', 'High-speed Wi-Fi', '65-inch Smart TV', 'Rainfall shower', 'Separate sitting area', 'Work desk with ergonomic chair', 'Mini bar', 'Nespresso machine', 'Complimentary breakfast', 'Daily housekeeping', 'In-room safe', 'Premium toiletries', 'Bathrobe & slippers', 'Laptop-sized safe'],
  ARRAY[
    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80',
    'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80'
  ],
  true,
  true,
  3
),
(
  'suite',
  'The Calabash Suite',
  'suite',
  220000,
  4,
  'King-size bed + living area',
  65,
  'Our finest room — a full suite with living area, dining space, and premium finishes.',
  'The Calabash Suite is the best room in the house. A generous living area, a separate bedroom with premium linens, a dining space for two, and a bathroom that feels like a private spa. Floor-to-ceiling windows bring in natural light and a view of the city. This is the room for celebrations, long weekends, or whenever you want to treat yourself properly.',
  ARRAY['Climate control', 'High-speed Wi-Fi', '75-inch Smart TV in living area', '55-inch Smart TV in bedroom', 'Rainfall shower & separate bathtub', 'Full living area with sofa', 'Dining table for two', 'Fully stocked mini bar', 'Nespresso machine & kettle', 'Complimentary breakfast for two', 'Evening turndown service', 'Daily housekeeping', 'Premium toiletries', 'Bathrobes & slippers', 'Welcome fruit basket', 'Priority restaurant reservation', 'Airport transfer (one way)'],
  ARRAY[
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
    'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=800&q=80',
    'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80'
  ],
  true,
  true,
  4
);

-- Seed gallery images
INSERT INTO gallery_images (url, category, caption, alt_text, sort_order) VALUES
('https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80', 'rooms', 'Standard Room - Comfortable and clean', 'Standard room with queen bed', 1),
('https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80', 'rooms', 'Deluxe Room - More space to relax', 'Deluxe room with king bed', 2),
('https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80', 'rooms', 'Executive Room - Perfect for business', 'Executive room with sitting area', 3),
('https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80', 'rooms', 'The Calabash Suite - Our finest room', 'Luxury suite with living area', 4),
('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', 'dining', 'Restaurant - Nigerian and international cuisine', 'Hotel restaurant interior', 5),
('https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80', 'dining', 'Bar - Relax with a drink', 'Hotel bar with seating', 6),
('https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80', 'facilities', 'Swimming Pool - Cool off in the afternoon', 'Hotel swimming pool', 7),
('https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80', 'facilities', 'Fitness Center - Stay active', 'Hotel gym with equipment', 8),
('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80', 'exterior', 'Hotel Exterior - Welcome to The Calabash', 'Hotel building exterior', 9),
('https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80', 'exterior', 'Entrance - Your stay begins here', 'Hotel entrance', 10),
('https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80', 'exterior', 'Garden - A peaceful outdoor space', 'Hotel garden area', 11),
('https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80', 'facilities', 'Conference Room - For your business needs', 'Hotel conference room', 12);

-- Seed site settings
INSERT INTO site_settings (
  hotel_name,
  tagline,
  phone,
  whatsapp,
  email,
  address,
  check_in_time,
  check_out_time,
  instagram_url,
  facebook_url,
  hero_headline,
  hero_subtext,
  hero_image_url
) VALUES (
  'The Calabash Hotel',
  'Rest well. Wake up ready.',
  '+234 801 234 5678',
  '2348012345678',
  'hello@thecalabashhotel.ng',
  '14 Adeola Odeku Street, Victoria Island, Lagos',
  '2:00 PM',
  '12:00 PM',
  'https://instagram.com/thecalabashhotel',
  'https://facebook.com/thecalabashhotel',
  'A quiet place to rest in the heart of Lagos',
  'Comfortable rooms, warm service, and everything you need for a restful stay.',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400&q=80'
);
