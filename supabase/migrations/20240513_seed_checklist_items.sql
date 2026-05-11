-- Seed: Curated baby checklist items based on comprehensive essentials list.
-- conditions format: {"field_name": ["matching_value1", "matching_value2"]}
-- Empty conditions {} means the item is shown to everyone.

INSERT INTO public.checklist_items (name, description, category, priority, conditions, sort_order) VALUES

-- =============================================
-- NURSERY — Furniture
-- =============================================
('Crib / cot', 'Safe sleep space for your baby — the centerpiece of the nursery', 'nursery', 'essential', '{}', 1),
('Changing table / dresser', 'Dedicated changing area — a dresser with a changing pad works great', 'nursery', 'essential', '{}', 2),
('Wardrobe or clothing storage', 'Organise tiny clothes, blankets, and supplies', 'nursery', 'essential', '{"nursery_plan": ["yes"]}', 3),
('Wall shelf', 'Extra storage for books, decor, and small items', 'nursery', 'nice_to_have', '{"nursery_plan": ["yes"]}', 4),
('Rocking chair / glider', 'Comfortable seating for feeding and soothing', 'nursery', 'nice_to_have', '{"nursery_plan": ["yes"]}', 5),

-- NURSERY — Decor & Accessories
('Baby monitor', 'Audio or video monitor for peace of mind', 'nursery', 'essential', '{}', 6),
('Changing pad for dresser', 'Secure pad that fits on top of your dresser', 'nursery', 'essential', '{}', 7),
('Night light', 'Soft glow for nighttime feedings and diaper changes', 'nursery', 'recommended', '{}', 8),
('Rug for nursery', 'Soft, warm floor covering for the nursery', 'nursery', 'nice_to_have', '{"nursery_plan": ["yes"]}', 9),

-- NURSERY — Crib Bedding
('Crib mattress', 'Firm, flat mattress that fits snugly — no gaps', 'nursery', 'essential', '{}', 10),
('Mattress protector / moltons (2)', 'Waterproof layer to protect the mattress', 'nursery', 'essential', '{}', 11),
('Fitted crib sheets (3)', 'Have extras for middle-of-the-night changes', 'nursery', 'essential', '{}', 12),
('Blankets (2) and sheets (3)', 'Layering for warmth and easy washing', 'nursery', 'essential', '{}', 13),
('Hot water bottles (2) with covers', 'Pre-warm the bed before putting baby down', 'nursery', 'recommended', '{}', 14),
('Canopy and pole', 'Decorative and creates a cosy sleeping nook', 'nursery', 'nice_to_have', '{"nursery_plan": ["yes"]}', 15),

-- NURSERY — Cradle (for bedroom use)
('Cradle / bedside crib', 'Keep baby close during the first months', 'nursery', 'essential', '{"sleeping_preference": ["our_bedroom", "combination", "not_sure"]}', 16),
('Cradle mattress', 'Fits snugly inside the cradle', 'nursery', 'essential', '{"sleeping_preference": ["our_bedroom", "combination", "not_sure"]}', 17),
('Cradle moltons (2)', 'Waterproof protection for the cradle mattress', 'nursery', 'essential', '{"sleeping_preference": ["our_bedroom", "combination", "not_sure"]}', 18),
('Cradle fitted sheets (3)', 'Soft sheets sized for the cradle', 'nursery', 'essential', '{"sleeping_preference": ["our_bedroom", "combination", "not_sure"]}', 19),
('Cradle blankets (2) and sheets (3)', 'Lightweight layering for the cradle', 'nursery', 'essential', '{"sleeping_preference": ["our_bedroom", "combination", "not_sure"]}', 20),

-- =============================================
-- BATHING & CARE
-- =============================================
('Baby bath / tummy tub + drain hose', 'Sized for newborns — makes bath time easier and safer', 'bathing', 'essential', '{}', 1),
('Bath stand', 'Raises the bath to a comfortable height for parents', 'bathing', 'recommended', '{}', 2),
('Changing pad for downstairs', 'Second changing spot so you do not have to run upstairs', 'bathing', 'recommended', '{}', 3),
('Changing pad covers (3)', 'Soft, washable covers for the changing pad', 'bathing', 'essential', '{}', 4),
('Bath thermometer', 'Check water temperature for safe bathing (37°C)', 'bathing', 'essential', '{}', 5),
('Comb and brush', 'Gentle brush for cradle cap and fine hair', 'bathing', 'recommended', '{}', 6),
('Baby wipes dispenser / easy-wipe box', 'One-handed wipe access during changes', 'bathing', 'recommended', '{}', 7),
('Manicure set / nail scissors', 'Keep tiny nails trimmed safely', 'bathing', 'essential', '{}', 8),

-- Bathing — Textiles
('Large muslin cloths 120×120 cm (4)', 'Multi-use: swaddling, sun shade, nursing cover', 'bathing', 'essential', '{}', 9),
('Standard muslin cloths 70×70 cm (18)', 'Everyday essentials for spit-ups, burping, and cleaning', 'bathing', 'essential', '{}', 10),
('Small mouth cloths (12)', 'Handy for quick clean-ups during and after feeds', 'bathing', 'essential', '{}', 11),
('Washcloths (9)', 'Soft cloths for bath time and face cleaning', 'bathing', 'essential', '{}', 12),
('Bath capes / hooded towels (2-3)', 'Keeps baby warm right after bath', 'bathing', 'essential', '{}', 13),

-- Bathing — Hygiene products
('Thermometers — mother and child (2)', 'One for bath water, one for body temperature', 'bathing', 'essential', '{}', 14),
('Bath oil and baby oil', 'Gentle moisturising during and after bath', 'bathing', 'recommended', '{}', 15),
('Diaper cream and barrier cream', 'Prevents and treats diaper rash', 'bathing', 'essential', '{}', 16),
('Baby wipes', 'Fragrance-free, sensitive-skin wipes', 'bathing', 'essential', '{}', 17),
('Maternity care kit (for mother)', 'Post-birth recovery essentials', 'bathing', 'essential', '{}', 18),

-- =============================================
-- FEEDING — Bottle Feeding
-- =============================================
('Bottles (4, incl. 2× 30cc starter)', 'Start with small bottles for newborn feeds', 'feeding', 'essential', '{"feeding_preference": ["formula", "combination", "not_sure"]}', 1),
('Bottles (2, incl. 2× 30cc starter)', 'For expressed milk or occasional supplementing', 'feeding', 'essential', '{"feeding_preference": ["breastfeeding"]}', 2),
('Bottle brush', 'Thorough cleaning of bottles and nipples', 'feeding', 'essential', '{}', 3),
('Bottle warmer', 'Quickly warms bottles to the right temperature', 'feeding', 'recommended', '{"feeding_preference": ["formula", "combination", "not_sure"]}', 4),
('Microwave steriliser', 'Quick and easy sterilisation of bottles and pacifiers', 'feeding', 'recommended', '{"feeding_preference": ["formula", "combination", "not_sure"]}', 5),
('Pacifiers (2-3)', 'Comfort sucking — try different shapes to find the right fit', 'feeding', 'essential', '{}', 6),
('Milk powder dispenser', 'Pre-measure formula for easy on-the-go feeds', 'feeding', 'recommended', '{"feeding_preference": ["formula", "combination"]}', 7),
('Nursing pillow', 'Supports baby during feeding for better positioning', 'feeding', 'recommended', '{}', 8),
('Nursing pads', 'Absorbent pads to prevent leaks', 'feeding', 'recommended', '{}', 9),

-- FEEDING — Breastfeeding extras
('Nipple cream', 'Soothing relief for breastfeeding discomfort', 'feeding', 'recommended', '{"feeding_preference": ["breastfeeding", "combination"]}', 10),
('Nursing bra (2-3)', 'Comfortable, easy-access bras for breastfeeding', 'feeding', 'recommended', '{"feeding_preference": ["breastfeeding", "combination"]}', 11),
('Breast pump', 'Electric or manual pump for expressing milk', 'feeding', 'recommended', '{"feeding_preference": ["breastfeeding", "combination"]}', 12),
('Breast milk storage bags / bottles', 'Store expressed milk in fridge or freezer', 'feeding', 'recommended', '{"feeding_preference": ["breastfeeding", "combination"]}', 13),

-- FEEDING — For later
('High chair / grow-with-me chair', 'For when baby starts solid foods around 6 months', 'feeding', 'recommended', '{}', 14),
('Newborn set for high chair', 'Insert to safely use the high chair from birth', 'feeding', 'nice_to_have', '{}', 15),
('High chair tray', 'Eating surface for self-feeding and play', 'feeding', 'nice_to_have', '{}', 16),
('Safety harness for high chair', 'Extra security while baby is seated', 'feeding', 'recommended', '{}', 17),

-- =============================================
-- DIAPERING
-- =============================================
('Diapers — newborn + size 1', 'Stock up on both sizes, newborns grow fast', 'diapering', 'essential', '{}', 1),
('Odourless diaper pail', 'Contains used-diaper odours effectively', 'diapering', 'essential', '{}', 2),
('Diaper bag', 'Organised bag for all your on-the-go essentials', 'diapering', 'essential', '{}', 3),

-- =============================================
-- CLOTHING
-- =============================================
('Bodysuits size 50/56 (5) + size 62/68 (5)', 'Short and long sleeve basics — the everyday staple', 'clothing', 'essential', '{}', 1),
('Rompers / onesies size 50/56 (2)', 'Easy all-in-one outfits for the first weeks', 'clothing', 'essential', '{}', 2),
('Pants size 50/56 (3)', 'Comfortable bottoms for everyday wear', 'clothing', 'essential', '{}', 3),
('Sweaters size 50/56 (3)', 'Warm top layer for cooler days', 'clothing', 'essential', '{}', 4),
('Wrap shirts size 50/56 (3)', 'Easy to put on over a newborn head', 'clothing', 'essential', '{}', 5),
('Hats (3)', 'Newborns lose heat through their head', 'clothing', 'essential', '{}', 6),
('Socks (4 pairs)', 'Keep tiny feet warm', 'clothing', 'essential', '{}', 7),
('Clothes hangers (15)', 'Small hangers for tiny clothes — keep the wardrobe tidy', 'clothing', 'recommended', '{}', 8),

-- =============================================
-- TRAVEL & GEAR — Stroller
-- =============================================
('Stroller (frame + carrycot + seat unit)', 'Your main travel system — choose based on lifestyle', 'travel_gear', 'essential', '{}', 1),
('Stroller footmuff', 'Keeps baby warm during autumn and winter walks', 'travel_gear', 'essential', '{}', 2),
('Car seat adapters for stroller', 'Click the car seat onto the stroller frame', 'travel_gear', 'recommended', '{}', 3),
('Rain cover for stroller', 'Protection for rainy-day outings', 'travel_gear', 'essential', '{}', 4),
('Mosquito net for stroller', 'Protection during summer walks', 'travel_gear', 'nice_to_have', '{}', 5),
('Parasol for stroller', 'Shade for sunny days', 'travel_gear', 'nice_to_have', '{}', 6),
('Cup holder for stroller', 'Keep your drink handy during walks', 'travel_gear', 'nice_to_have', '{}', 7),
('Stroller travel bag', 'Protective bag for flights or storage', 'travel_gear', 'nice_to_have', '{"travel_frequency": ["frequently"]}', 8),

-- TRAVEL — Carrycot Bedding
('Carrycot fitted sheets (2)', 'Soft sheets for the stroller carrycot', 'travel_gear', 'essential', '{}', 9),
('Carrycot blanket and sheets', 'Lightweight layering for the carrycot', 'travel_gear', 'essential', '{}', 10),
('Carrycot mattress protector', 'Waterproof layer for the carrycot mattress', 'travel_gear', 'recommended', '{}', 11),

-- TRAVEL — Car Seat
('Infant car seat (Group 0)', 'Rear-facing car seat — required for hospital discharge', 'travel_gear', 'essential', '{}', 12),
('Isofix base', 'Secure base for quick and safe car seat installation', 'travel_gear', 'essential', '{}', 13),
('Car seat footmuff', 'Keeps baby warm in the car seat during cold months', 'travel_gear', 'recommended', '{}', 14),
('Rear-view mirror for car', 'See your rear-facing baby while driving', 'travel_gear', 'recommended', '{}', 15),
('Car seat protector for vehicle seat', 'Protects your car upholstery from dents and dirt', 'travel_gear', 'nice_to_have', '{}', 16),
('Car window sunshade', 'Protects baby from direct sun during car rides', 'travel_gear', 'nice_to_have', '{"travel_frequency": ["sometimes", "frequently"]}', 17),

-- =============================================
-- HEALTH & SAFETY
-- =============================================
('Stair gate (1-2)', 'Block stairs and restricted areas — needed once baby is mobile', 'health_safety', 'recommended', '{"home_type": ["small_house", "large_house"]}', 1),
('Safety items (outlet covers, corner guards, cabinet locks)', 'Childproof the house before baby becomes mobile', 'health_safety', 'recommended', '{}', 2),

-- =============================================
-- PLAY & DEVELOPMENT — In the House & For Later
-- =============================================
('Playpen', 'Safe enclosed play space while you handle tasks', 'play_development', 'recommended', '{}', 1),
('Playpen mattress and fitted sheet', 'Comfortable base for the playpen', 'play_development', 'recommended', '{}', 2),
('Playpen mat', 'Soft play surface inside the playpen', 'play_development', 'recommended', '{}', 3),
('Playpen mobile', 'Visual stimulation and entertainment above the playpen', 'play_development', 'nice_to_have', '{}', 4),
('Baby carrier / wrap', 'Hands-free carrying — great for bonding and errands', 'play_development', 'recommended', '{}', 5),
('Travel cot + mattress + sheet', 'Portable sleeping solution for trips and visits', 'play_development', 'recommended', '{"travel_frequency": ["sometimes", "frequently"]}', 6),
('Bouncer', 'Safe spot for baby while you get things done', 'play_development', 'recommended', '{}', 7),
('Baby nest or hammock', 'Cosy resting spot — great for daytime naps', 'play_development', 'nice_to_have', '{}', 8),
('Buggy (for later)', 'Lightweight stroller for when baby can sit up', 'play_development', 'nice_to_have', '{}', 9),
('Bike seat (for later)', 'For cycling with your toddler', 'play_development', 'nice_to_have', '{"travel_frequency": ["sometimes", "frequently"]}', 10),
('Walker or balance bike (for later)', 'Helps toddlers learn to walk and balance', 'play_development', 'nice_to_have', '{}', 11);
