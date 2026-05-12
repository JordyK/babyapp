-- Seed: Add good_second_hand and price_tier values to all checklist items

-- NURSERY — Furniture
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'mid' WHERE name = 'Crib / cot';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'mid' WHERE name = 'Changing table / dresser';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Wardrobe or clothing storage';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Wall shelf';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'mid' WHERE name = 'Rocking chair / glider';

-- NURSERY — Decor & Accessories
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'mid' WHERE name = 'Baby monitor';
UPDATE public.checklist_items SET good_second_hand = FALSE, price_tier = 'budget' WHERE name = 'Changing pad for dresser';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Night light';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Rug for nursery';

-- NURSERY — Crib Bedding
UPDATE public.checklist_items SET good_second_hand = FALSE, price_tier = 'mid' WHERE name = 'Crib mattress';
UPDATE public.checklist_items SET good_second_hand = FALSE, price_tier = 'budget' WHERE name = 'Mattress protector / moltons (2)';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Fitted crib sheets (3)';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Blankets (2) and sheets (3)';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Hot water bottles (2) with covers';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Canopy and pole';

-- NURSERY — Cradle
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'mid' WHERE name = 'Cradle / bedside crib';
UPDATE public.checklist_items SET good_second_hand = FALSE, price_tier = 'mid' WHERE name = 'Cradle mattress';
UPDATE public.checklist_items SET good_second_hand = FALSE, price_tier = 'budget' WHERE name = 'Cradle moltons (2)';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Cradle fitted sheets (3)';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Cradle blankets (2) and sheets (3)';

-- BATHING
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Baby bath / tummy tub + drain hose';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Bath stand';
UPDATE public.checklist_items SET good_second_hand = FALSE, price_tier = 'budget' WHERE name = 'Changing pad for downstairs';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Changing pad covers (3)';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Bath thermometer';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Comb and brush';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Baby wipes dispenser / easy-wipe box';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Manicure set / nail scissors';

-- Bathing — Textiles
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Large muslin cloths 120×120 cm (4)';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Standard muslin cloths 70×70 cm (18)';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Small mouth cloths (12)';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Washcloths (9)';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Bath capes / hooded towels (2-3)';

-- Bathing — Hygiene
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Thermometers — mother and child (2)';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Bath oil and baby oil';
UPDATE public.checklist_items SET good_second_hand = FALSE, price_tier = 'budget' WHERE name = 'Diaper cream and barrier cream';
UPDATE public.checklist_items SET good_second_hand = FALSE, price_tier = 'budget' WHERE name = 'Baby wipes';
UPDATE public.checklist_items SET good_second_hand = FALSE, price_tier = 'budget' WHERE name = 'Maternity care kit (for mother)';

-- FEEDING — Bottle
UPDATE public.checklist_items SET good_second_hand = FALSE, price_tier = 'budget' WHERE name = 'Bottles (4, incl. 2× 30cc starter)';
UPDATE public.checklist_items SET good_second_hand = FALSE, price_tier = 'budget' WHERE name = 'Bottles (2, incl. 2× 30cc starter)';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Bottle brush';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'mid' WHERE name = 'Bottle warmer';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'mid' WHERE name = 'Microwave steriliser';
UPDATE public.checklist_items SET good_second_hand = FALSE, price_tier = 'budget' WHERE name = 'Pacifiers (2-3)';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Milk powder dispenser';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Nursing pillow';
UPDATE public.checklist_items SET good_second_hand = FALSE, price_tier = 'budget' WHERE name = 'Nursing pads';

-- FEEDING — Breastfeeding
UPDATE public.checklist_items SET good_second_hand = FALSE, price_tier = 'budget' WHERE name = 'Nipple cream';
UPDATE public.checklist_items SET good_second_hand = FALSE, price_tier = 'budget' WHERE name = 'Nursing bra (2-3)';
UPDATE public.checklist_items SET good_second_hand = FALSE, price_tier = 'mid' WHERE name = 'Breast pump';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Breast milk storage bags / bottles';

-- FEEDING — For later
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'mid' WHERE name = 'High chair / grow-with-me chair';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'mid' WHERE name = 'Newborn set for high chair';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'High chair tray';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Safety harness for high chair';

-- DIAPERING
UPDATE public.checklist_items SET good_second_hand = FALSE, price_tier = 'budget' WHERE name = 'Diapers — newborn + size 1';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'mid' WHERE name = 'Odourless diaper pail';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'mid' WHERE name = 'Diaper bag';

-- CLOTHING
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Bodysuits size 50/56 (5) + size 62/68 (5)';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Rompers / onesies size 50/56 (2)';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Pants size 50/56 (3)';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Sweaters size 50/56 (3)';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Wrap shirts size 50/56 (3)';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Hats (3)';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Socks (4 pairs)';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Clothes hangers (15)';

-- TRAVEL — Stroller
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'mid' WHERE name = 'Stroller (frame + carrycot + seat unit)';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Stroller footmuff';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Car seat adapters for stroller';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Rain cover for stroller';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Mosquito net for stroller';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Parasol for stroller';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Cup holder for stroller';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Stroller travel bag';

-- TRAVEL — Carrycot
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Carrycot fitted sheets (2)';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Carrycot blanket and sheets';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Carrycot mattress protector';

-- TRAVEL — Car Seat
UPDATE public.checklist_items SET good_second_hand = FALSE, price_tier = 'mid' WHERE name = 'Infant car seat (Group 0)';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'mid' WHERE name = 'Isofix base';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Car seat footmuff';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Rear-view mirror for car';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Car seat protector for vehicle seat';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Car window sunshade';

-- HEALTH & SAFETY
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Stair gate (1-2)';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Safety items (outlet covers, corner guards, cabinet locks)';

-- PLAY & DEVELOPMENT
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'mid' WHERE name = 'Playpen';
UPDATE public.checklist_items SET good_second_hand = FALSE, price_tier = 'mid' WHERE name = 'Playpen mattress and fitted sheet';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Playpen mat';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Playpen mobile';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'mid' WHERE name = 'Baby carrier / wrap';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'mid' WHERE name = 'Travel cot + mattress + sheet';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'mid' WHERE name = 'Bouncer';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'mid' WHERE name = 'Baby nest or hammock';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Buggy (for later)';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'mid' WHERE name = 'Bike seat (for later)';
UPDATE public.checklist_items SET good_second_hand = TRUE, price_tier = 'budget' WHERE name = 'Walker or balance bike (for later)';
