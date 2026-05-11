-- Seed: Curated baby checklist items with personalization conditions
-- conditions format: {"field_name": ["matching_value1", "matching_value2"]}
-- Empty conditions {} means the item is shown to everyone.

INSERT INTO public.checklist_items (name, description, category, priority, conditions, sort_order) VALUES
-- NURSERY
('Crib or bassinet', 'A safe sleep space for your baby — bassinet for early months, crib for longer use', 'nursery', 'essential', '{}', 1),
('Crib mattress', 'Firm, flat mattress that fits snugly in the crib', 'nursery', 'essential', '{}', 2),
('Fitted crib sheets (2-3)', 'Soft, breathable sheets — have extras for middle-of-the-night changes', 'nursery', 'essential', '{}', 3),
('Baby monitor', 'Audio or video monitor for peace of mind', 'nursery', 'recommended', '{}', 4),
('Changing table or pad', 'Dedicated changing space — a pad on a dresser works great too', 'nursery', 'recommended', '{}', 5),
('Dresser or storage', 'Organize tiny clothes, blankets, and supplies', 'nursery', 'recommended', '{"nursery_plan": ["yes"]}', 6),
('Night light', 'Soft glow for nighttime feedings and diaper changes', 'nursery', 'recommended', '{}', 7),
('Blackout curtains', 'Help baby sleep longer by blocking daylight', 'nursery', 'recommended', '{"nursery_plan": ["yes"]}', 8),
('Rocker or glider', 'Comfortable seating for feeding and soothing', 'nursery', 'nice_to_have', '{"nursery_plan": ["yes"]}', 9),
('Sound machine', 'White noise to help baby sleep through background sounds', 'nursery', 'nice_to_have', '{}', 10),
('Swaddle blankets (3-4)', 'Keeps newborns snug and secure for better sleep', 'nursery', 'essential', '{}', 11),
('Sleep sack', 'Safer alternative to loose blankets as baby grows', 'nursery', 'recommended', '{}', 12),

-- FEEDING
('Bottles (4-6)', 'Even if breastfeeding, useful for pumped milk or water later', 'feeding', 'essential', '{}', 1),
('Bottle brush', 'For thorough cleaning of bottles and nipples', 'feeding', 'essential', '{}', 2),
('Breast pump', 'Electric or manual pump for expressing milk', 'feeding', 'essential', '{"feeding_preference": ["breastfeeding", "combination"]}', 3),
('Nursing pillow', 'Supports baby during breastfeeding for better positioning', 'feeding', 'recommended', '{"feeding_preference": ["breastfeeding", "combination"]}', 4),
('Nursing bras (2-3)', 'Comfortable, easy-access bras for breastfeeding', 'feeding', 'recommended', '{"feeding_preference": ["breastfeeding", "combination"]}', 5),
('Breast pads', 'Absorbent pads to prevent leaks', 'feeding', 'recommended', '{"feeding_preference": ["breastfeeding", "combination"]}', 6),
('Formula dispenser', 'Pre-measure formula for easy on-the-go feeding', 'feeding', 'recommended', '{"feeding_preference": ["formula", "combination"]}', 7),
('Bottle drying rack', 'Keeps bottles organized and drip-free after washing', 'feeding', 'recommended', '{}', 8),
('Burp cloths (6-8)', 'Protect your clothes during and after feeding', 'feeding', 'essential', '{}', 9),
('High chair', 'For when baby starts solid foods around 6 months', 'feeding', 'recommended', '{}', 10),
('Bibs (5-8)', 'Keep clothes clean during feeding', 'feeding', 'recommended', '{}', 11),
('Bottle warmer', 'Quickly warm bottles to the right temperature', 'feeding', 'nice_to_have', '{}', 12),
('Nipple cream', 'Soothing relief for breastfeeding discomfort', 'feeding', 'recommended', '{"feeding_preference": ["breastfeeding", "combination"]}', 13),

-- DIAPERING
('Diapers (newborn + size 1)', 'Stock up on both sizes — newborns grow fast', 'diapering', 'essential', '{}', 1),
('Baby wipes', 'Fragrance-free, sensitive skin wipes', 'diapering', 'essential', '{}', 2),
('Diaper cream', 'Prevents and treats diaper rash', 'diapering', 'essential', '{}', 3),
('Diaper bag', 'Organized bag for all your on-the-go essentials', 'diapering', 'essential', '{}', 4),
('Changing pad (portable)', 'Fold-up pad for diaper changes anywhere', 'diapering', 'recommended', '{}', 5),
('Diaper pail', 'Contains odors from used diapers', 'diapering', 'recommended', '{}', 6),
('Diaper caddy', 'Keep supplies organized and portable at home', 'diapering', 'nice_to_have', '{}', 7),
('Cloth diapers starter set', 'Reusable diapers — eco-friendly alternative', 'diapering', 'nice_to_have', '{"shopping_preference": ["sustainability"], "parenting_approach": ["eco_conscious"]}', 8),

-- CLOTHING
('Onesies / bodysuits (6-8)', 'Short and long sleeve basics — the everyday staple', 'clothing', 'essential', '{}', 1),
('Sleepers / footie pajamas (4-6)', 'Easy zip or snap PJs for nighttime', 'clothing', 'essential', '{}', 2),
('Socks and booties (4-6 pairs)', 'Keep tiny feet warm', 'clothing', 'essential', '{}', 3),
('Hats (2-3)', 'Newborns lose heat through their heads', 'clothing', 'essential', '{}', 4),
('Scratch mittens', 'Prevent baby from scratching their face', 'clothing', 'recommended', '{}', 5),
('Going-home outfit', 'Special outfit for the trip home from hospital', 'clothing', 'recommended', '{}', 6),
('Light jacket or bunting', 'For cooler weather outings', 'clothing', 'recommended', '{}', 7),
('Pants / leggings (4-6)', 'Comfortable bottoms for everyday wear', 'clothing', 'recommended', '{}', 8),

-- BATHING
('Baby bathtub', 'Sized for newborns with support — makes bath time easier', 'bathing', 'essential', '{}', 1),
('Hooded towels (2-3)', 'Keeps baby warm right after bath', 'bathing', 'essential', '{}', 2),
('Baby washcloths (4-6)', 'Soft cloths for gentle cleaning', 'bathing', 'essential', '{}', 3),
('Baby soap / shampoo', 'Gentle, tear-free formula for sensitive skin', 'bathing', 'essential', '{}', 4),
('Baby lotion', 'Moisturize after bath to prevent dry skin', 'bathing', 'recommended', '{}', 5),
('Baby nail clippers or file', 'Keep tiny nails trimmed safely', 'bathing', 'recommended', '{}', 6),
('Soft hairbrush', 'Gentle brush for cradle cap and fine hair', 'bathing', 'nice_to_have', '{}', 7),

-- HEALTH & SAFETY
('Digital thermometer', 'Accurate temperature readings for when baby feels warm', 'health_safety', 'essential', '{}', 1),
('Nasal aspirator', 'Clears stuffy noses gently', 'health_safety', 'essential', '{}', 2),
('Baby first aid kit', 'Band-aids, saline drops, infant pain reliever, etc.', 'health_safety', 'essential', '{}', 3),
('Outlet covers', 'Childproof electrical outlets before baby becomes mobile', 'health_safety', 'recommended', '{}', 4),
('Cabinet locks', 'Keep cleaning supplies and sharp objects secure', 'health_safety', 'recommended', '{"home_type": ["small_house", "large_house"]}', 5),
('Baby gate (1-2)', 'Block stairs and restricted areas', 'health_safety', 'recommended', '{"home_type": ["small_house", "large_house"]}', 6),
('Corner guards', 'Protect against sharp furniture edges', 'health_safety', 'nice_to_have', '{}', 7),
('Smoke / CO detector check', 'Ensure all detectors are working and properly placed', 'health_safety', 'essential', '{}', 8),
('Baby-safe laundry detergent', 'Gentle formula for sensitive newborn skin', 'health_safety', 'recommended', '{}', 9),

-- TRAVEL & GEAR
('Car seat (infant)', 'Rear-facing infant car seat — required for hospital discharge', 'travel_gear', 'essential', '{}', 1),
('Stroller', 'Choose based on lifestyle: lightweight, jogging, or full-size', 'travel_gear', 'essential', '{}', 2),
('Baby carrier or wrap', 'Hands-free carrying — great for bonding and errands', 'travel_gear', 'recommended', '{}', 3),
('Car mirror', 'See rear-facing baby while driving', 'travel_gear', 'recommended', '{}', 4),
('Stroller rain cover', 'Protection for rainy day outings', 'travel_gear', 'nice_to_have', '{}', 5),
('Travel crib / pack-n-play', 'Portable sleeping solution for trips and visits', 'travel_gear', 'recommended', '{"travel_frequency": ["sometimes", "frequently"]}', 6),
('Car seat base (extra)', 'Second base for a second car — quick transfers', 'travel_gear', 'nice_to_have', '{"travel_frequency": ["frequently"]}', 7),
('Sunshade for car window', 'Protects baby from sun during car rides', 'travel_gear', 'nice_to_have', '{"travel_frequency": ["sometimes", "frequently"]}', 8),
('Stroller organizer', 'Attach-on storage for phone, keys, drinks', 'travel_gear', 'nice_to_have', '{}', 9),

-- PLAY & DEVELOPMENT
('Play mat / activity gym', 'Stimulates senses and encourages tummy time', 'play_development', 'recommended', '{}', 1),
('Rattles and soft toys', 'First toys for grasping and sensory exploration', 'play_development', 'recommended', '{}', 2),
('Soft books', 'High-contrast or textured books for early development', 'play_development', 'recommended', '{}', 3),
('Tummy time pillow', 'Supports baby during tummy time exercises', 'play_development', 'recommended', '{}', 4),
('Bouncer or swing', 'Safe spot for baby while you get things done', 'play_development', 'nice_to_have', '{}', 5),
('Teething toys', 'Soothes sore gums when teeth start coming in', 'play_development', 'recommended', '{}', 6),
('Mobile for crib', 'Visual stimulation and soothing movement', 'play_development', 'nice_to_have', '{"nursery_plan": ["yes"]}', 7);
