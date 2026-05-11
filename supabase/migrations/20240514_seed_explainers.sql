-- Seed: Add explainer and tips content to all checklist items
-- Uses name matching since IDs are auto-generated

-- NURSERY
UPDATE public.checklist_items SET
  explainer = 'A crib is where your baby will spend the most time during their first year. Safety standards require firm, flat sleep surfaces with no soft bedding. Choose one that meets current safety certifications and fits your nursery space.',
  tips = 'Look for adjustable mattress heights, solid construction, and slats no more than 6cm apart. Convertible cribs that grow into toddler beds offer the best long-term value.'
WHERE name = 'Crib / cot';

UPDATE public.checklist_items SET
  explainer = 'You will change your baby roughly 10-12 times per day in the beginning. A dedicated changing area at the right height saves your back and keeps all supplies within reach.',
  tips = 'A sturdy dresser with a changing pad on top is more versatile than a standalone changing table — you keep it as regular furniture once the diaper phase ends.'
WHERE name = 'Changing table / dresser';

UPDATE public.checklist_items SET
  explainer = 'Baby clothes are tiny but pile up fast. A dedicated wardrobe or storage keeps everything organised and easy to find during those sleep-deprived early weeks.',
  tips = 'Opt for open shelving or shallow drawers — you can see everything at a glance. Dividers help separate sizes as baby grows.'
WHERE name = 'Wardrobe or clothing storage';

UPDATE public.checklist_items SET
  explainer = 'Wall shelves keep essentials like creams, pacifiers, and small decor items within reach during nappy changes without cluttering the dresser surface.',
  tips = 'Mount securely into wall studs and keep items out of baby''s reach once they can stand.'
WHERE name = 'Wall shelf';

UPDATE public.checklist_items SET
  explainer = 'You will spend many hours feeding and soothing your baby. A comfortable rocking chair or glider makes those midnight sessions much more bearable.',
  tips = 'Test before buying — look for good lumbar support, padded armrests, and a gentle gliding motion. Avoid chairs that are hard to get out of while holding a baby.'
WHERE name = 'Rocking chair / glider';

UPDATE public.checklist_items SET
  explainer = 'A baby monitor lets you keep an eye (or ear) on your sleeping baby from another room, giving you peace of mind and freedom to move around.',
  tips = 'Video monitors with night vision are most popular. Check the range covers your home. Wifi models let you watch from your phone but need reliable internet.'
WHERE name = 'Baby monitor';

UPDATE public.checklist_items SET
  explainer = 'A secure changing pad sits on top of your dresser and provides a safe, padded surface for nappy changes. Most have raised edges to prevent rolling.',
  tips = 'Choose one with a washable cover and safety straps. Make sure it fits your dresser surface snugly with no gaps.'
WHERE name = 'Changing pad for dresser';

UPDATE public.checklist_items SET
  explainer = 'A soft night light means you can check on baby, do nighttime feeds and nappy changes without turning on bright overhead lights that wake everyone up.',
  tips = 'Choose warm-toned, dimmable lights. Red/amber tones are least disruptive to sleep hormones. Avoid blue-white light.'
WHERE name = 'Night light';

UPDATE public.checklist_items SET
  explainer = 'A soft rug adds warmth and comfort to the nursery floor — great for tummy time, play, and barefoot parents during night feeds.',
  tips = 'Choose low-pile, washable rugs. Avoid anything with loose fibres. Use a non-slip pad underneath.'
WHERE name = 'Rug for nursery';

UPDATE public.checklist_items SET
  explainer = 'A firm, well-fitting mattress is the single most important item for safe sleep. It should fill the crib completely with no gaps where baby could get stuck.',
  tips = 'Press firmly in the centre and edges — it should spring back quickly. The gap between mattress and crib should be less than two fingers wide.'
WHERE name = 'Crib mattress';

UPDATE public.checklist_items SET
  explainer = 'Nappy blowouts and spit-ups happen frequently. Waterproof mattress protectors save you from having to wash or replace the entire mattress.',
  tips = 'Get at least two so you have a backup. Layer them with sheets for quick middle-of-the-night changes: protector → sheet → protector → sheet.'
WHERE name = 'Mattress protector / moltons (2)';

UPDATE public.checklist_items SET
  explainer = 'You will change crib sheets often — sometimes daily. Having three means you always have a clean one ready while others are in the wash.',
  tips = 'Jersey cotton is soft and stretchy for easy fitting. Buy the exact size for your mattress to ensure a snug, safe fit.'
WHERE name = 'Fitted crib sheets (3)';

UPDATE public.checklist_items SET
  explainer = 'Light blankets and sheets provide warmth without overheating. Multiple sets mean you are always covered during laundry days.',
  tips = 'Choose breathable cotton or muslin. Avoid heavy duvets for babies under 12 months. Always tuck blankets below chest height.'
WHERE name = 'Blankets (2) and sheets (3)';

UPDATE public.checklist_items SET
  explainer = 'Pre-warming the crib with a hot water bottle (removed before placing baby) helps baby settle more easily when transitioning from your warm arms.',
  tips = 'Always remove the hot water bottle before placing baby in the crib. Use lukewarm water only. The covers prevent accidental contact burns.'
WHERE name = 'Hot water bottles (2) with covers';

UPDATE public.checklist_items SET
  explainer = 'A decorative canopy creates a cosy, sheltered feeling around the crib and can help block some light during daytime naps.',
  tips = 'Ensure it is securely mounted and the fabric is out of baby''s reach. Remove once baby can pull up to standing.'
WHERE name = 'Canopy and pole';

UPDATE public.checklist_items SET
  explainer = 'A bedside crib or cradle keeps your newborn within arm''s reach for nighttime feeds, making those early weeks much easier for both of you.',
  tips = 'Bedside cribs that attach to your bed are most convenient for breastfeeding. Check the height adjusts to match your mattress.'
WHERE name = 'Cradle / bedside crib';

UPDATE public.checklist_items SET
  explainer = 'A properly fitting cradle mattress is essential for safe sleep. It should be firm, flat, and fit without gaps.',
  tips = 'Always buy the mattress recommended for your specific cradle model to ensure a perfect fit.'
WHERE name = 'Cradle mattress';

UPDATE public.checklist_items SET
  explainer = 'Waterproof protection for the cradle — same principle as the crib protectors, but sized for the smaller cradle mattress.',
  tips = 'Two moltons let you layer them with sheets for fast nighttime changes.'
WHERE name = 'Cradle moltons (2)';

UPDATE public.checklist_items SET
  explainer = 'Fitted sheets sized for the cradle, ensuring a snug fit. You will need to change these frequently in the newborn phase.',
  tips = 'Buy sheets specifically made for your cradle dimensions. Standard crib sheets will not fit safely.'
WHERE name = 'Cradle fitted sheets (3)';

UPDATE public.checklist_items SET
  explainer = 'Lightweight blankets and sheets for the cradle, providing warmth without bulk in a smaller sleeping space.',
  tips = 'Use thin, breathable layers. The smaller space of a cradle retains warmth better than a full crib.'
WHERE name = 'Cradle blankets (2) and sheets (3)';

-- BATHING
UPDATE public.checklist_items SET
  explainer = 'A baby bath gives you a safe, contained space to bathe your newborn. Tummy tubs mimic the womb and can be very calming for babies.',
  tips = 'A drain hose makes emptying much easier. Skip bathing in the big bath until baby has good head control — around 3-4 months.'
WHERE name = 'Baby bath / tummy tub + drain hose';

UPDATE public.checklist_items SET
  explainer = 'A bath stand raises the baby bath to waist height, saving your back from bending over the floor or low bathtub.',
  tips = 'Make sure it is compatible with your bath model and rated for the weight. Check stability on your floor surface.'
WHERE name = 'Bath stand';

UPDATE public.checklist_items SET
  explainer = 'Having a second changing spot downstairs saves you from running upstairs 10+ times per day. A portable pad on a table or couch works fine.',
  tips = 'A simple fold-out changing mat is sufficient. Keep a small basket of nappies and wipes nearby.'
WHERE name = 'Changing pad for downstairs';

UPDATE public.checklist_items SET
  explainer = 'Changing pad covers keep things hygienic and comfortable. They get dirty quickly so multiple covers are essential.',
  tips = 'Terry cloth or jersey covers are soft and washable. Waterproof-backed ones add extra protection.'
WHERE name = 'Changing pad covers (3)';

UPDATE public.checklist_items SET
  explainer = 'Newborns cannot regulate temperature well. A bath thermometer takes the guesswork out of getting water to a safe 37°C.',
  tips = 'Digital thermometers are fastest. Some float in the water and show continuous readings throughout bath time.'
WHERE name = 'Bath thermometer';

UPDATE public.checklist_items SET
  explainer = 'A soft brush helps with cradle cap (very common) and keeps fine baby hair tidy. The comb is useful as hair grows in.',
  tips = 'Choose extra-soft bristles. Use the brush gently on cradle cap with a little oil before bath time.'
WHERE name = 'Comb and brush';

UPDATE public.checklist_items SET
  explainer = 'When you have a squirming baby on the changing mat, being able to grab a wipe one-handed is a game changer.',
  tips = 'Any container with a one-handed flip lid works. Mount it within arm''s reach of the changing pad.'
WHERE name = 'Baby wipes dispenser / easy-wipe box';

UPDATE public.checklist_items SET
  explainer = 'Baby nails grow surprisingly fast and are sharp enough to scratch their face. Regular trimming from the first week is important.',
  tips = 'Baby nail scissors with rounded tips are safest. Trim after a bath when nails are soft, or while baby sleeps.'
WHERE name = 'Manicure set / nail scissors';

UPDATE public.checklist_items SET
  explainer = 'Large muslins are incredibly versatile — use them for swaddling, as a nursing cover, light blanket, sun shade, burp cloth, or clean surface anywhere.',
  tips = 'Bamboo-cotton blends are softest and most breathable. They get softer with every wash. You can never have too many.'
WHERE name = 'Large muslin cloths 120×120 cm (4)';

UPDATE public.checklist_items SET
  explainer = 'The workhorse of baby textiles. Use them over your shoulder for burping, as spit-up catchers, impromptu bibs, and general clean-up cloths.',
  tips = '18 sounds like a lot but you will go through several per day. Pre-fold and stash them in every room.'
WHERE name = 'Standard muslin cloths 70×70 cm (18)';

UPDATE public.checklist_items SET
  explainer = 'Small cloths for wiping milk dribbles and spit-up around baby''s mouth after feeds. Smaller and more convenient than full muslin cloths.',
  tips = 'Keep a few in your pocket, the nappy bag, and next to every feeding spot.'
WHERE name = 'Small mouth cloths (12)';

UPDATE public.checklist_items SET
  explainer = 'Soft washcloths for gentle face and body cleaning during bath time. Much gentler than adult cloths on newborn skin.',
  tips = 'Plain cotton or bamboo. Avoid cloths with rough textures or decorative stitching.'
WHERE name = 'Washcloths (9)';

UPDATE public.checklist_items SET
  explainer = 'Babies lose heat quickly after a bath. A hooded towel wraps them up immediately, keeping their head warm while you dry them.',
  tips = 'Choose thick, absorbent cotton. Having 2-3 means one is always clean and dry.'
WHERE name = 'Bath capes / hooded towels (2-3)';

UPDATE public.checklist_items SET
  explainer = 'Two thermometers serve different purposes: one for checking bath water temperature, one for monitoring baby''s body temperature when they seem unwell.',
  tips = 'A digital ear or forehead thermometer gives the fastest body readings. Keep the bath thermometer near the baby bath.'
WHERE name = 'Thermometers — mother and child (2)';

UPDATE public.checklist_items SET
  explainer = 'Gentle bath oil makes the water soft and moisturising. Baby oil after the bath protects delicate skin from drying out.',
  tips = 'Choose fragrance-free, hypoallergenic products. A few drops of bath oil in the water is enough — less is more.'
WHERE name = 'Bath oil and baby oil';

UPDATE public.checklist_items SET
  explainer = 'Nappy rash is extremely common. Barrier cream prevents it by protecting skin from moisture, and diaper cream treats it when it appears.',
  tips = 'Apply a thin layer of barrier cream at every change as prevention. Use thicker zinc-based cream for active rash.'
WHERE name = 'Diaper cream and barrier cream';

UPDATE public.checklist_items SET
  explainer = 'You will use thousands of wipes in the first year. They are essential for every nappy change and general clean-up.',
  tips = 'Choose fragrance-free, alcohol-free wipes for sensitive newborn skin. Water wipes are gentlest for the first weeks.'
WHERE name = 'Baby wipes';

UPDATE public.checklist_items SET
  explainer = 'Post-birth recovery essentials for the mother — maternity pads, perineal care items, and other comfort supplies for the first weeks.',
  tips = 'Ask your midwife for a recommended list. Many pharmacies sell pre-packed maternity kits with everything included.'
WHERE name = 'Maternity care kit (for mother)';

-- FEEDING
UPDATE public.checklist_items SET
  explainer = 'Even if you plan to breastfeed, having bottles ready is practical for expressed milk, water, or if plans change. Formula feeding parents need a full set.',
  tips = 'Start with smaller 30cc bottles for newborns — their stomachs are tiny. Anti-colic designs can help with gas and fussiness.'
WHERE name = 'Bottles (4, incl. 2× 30cc starter)';

UPDATE public.checklist_items SET
  explainer = 'A couple of bottles for expressed breast milk or occasional supplementing. Useful when someone else needs to feed baby.',
  tips = 'Choose bottles with slow-flow nipples that mimic breastfeeding to avoid nipple confusion.'
WHERE name = 'Bottles (2, incl. 2× 30cc starter)';

UPDATE public.checklist_items SET
  explainer = 'Thorough cleaning of bottles prevents bacterial growth. The narrow brush reaches the bottom and sides that a regular sponge cannot.',
  tips = 'Get one with a nipple brush attachment. Replace the brush every 2-3 months when bristles wear down.'
WHERE name = 'Bottle brush';

UPDATE public.checklist_items SET
  explainer = 'Warms bottles to body temperature quickly and evenly, which is safer and more consistent than microwaving or hot water.',
  tips = 'Choose a model that works with your bottle brand. Some also defrost frozen breast milk — a bonus feature.'
WHERE name = 'Bottle warmer';

UPDATE public.checklist_items SET
  explainer = 'Sterilising kills bacteria on bottles and pacifiers. A microwave steriliser is fast (2-5 minutes) and does not take up counter space.',
  tips = 'Check it fits your bottle sizes. Items stay sterile for several hours inside the closed steriliser.'
WHERE name = 'Microwave steriliser';

UPDATE public.checklist_items SET
  explainer = 'Pacifiers satisfy the natural sucking reflex and can be very soothing. Most babies develop a preference for a specific shape.',
  tips = 'Buy 2-3 different brands to see what baby prefers. Orthodontic shapes support jaw development. Replace every 4-6 weeks.'
WHERE name = 'Pacifiers (2-3)';

UPDATE public.checklist_items SET
  explainer = 'Pre-measured formula portions make nighttime feeds and outings much easier — just add water and shake.',
  tips = 'Stackable tower dispensers hold multiple portions. Some parents pre-fill them for the whole day.'
WHERE name = 'Milk powder dispenser';

UPDATE public.checklist_items SET
  explainer = 'A nursing pillow wraps around your waist and supports baby at the right height during feeding, reducing strain on your arms, neck, and back.',
  tips = 'Firm pillows maintain position better than soft ones. Useful for both breast and bottle feeding.'
WHERE name = 'Nursing pillow';

UPDATE public.checklist_items SET
  explainer = 'Absorbent pads worn inside your bra to catch milk leaks between feeds. Very common in the early weeks when supply is establishing.',
  tips = 'Disposable pads are most convenient. Reusable bamboo pads are softer and more eco-friendly. Keep extras in your bag.'
WHERE name = 'Nursing pads';

UPDATE public.checklist_items SET
  explainer = 'Breastfeeding can cause sore, cracked nipples in the early days. Nipple cream provides immediate soothing relief and helps healing.',
  tips = 'Lanolin-based creams are most popular and safe for baby — no need to wipe off before feeding.'
WHERE name = 'Nipple cream';

UPDATE public.checklist_items SET
  explainer = 'Nursing bras provide easy access for breastfeeding with drop-down cups, while offering comfort and support throughout the day.',
  tips = 'Get fitted after birth when your size has settled. Wireless designs are most comfortable for sleeping in too.'
WHERE name = 'Nursing bra (2-3)';

UPDATE public.checklist_items SET
  explainer = 'A breast pump lets you express milk for others to feed baby, maintain supply, and build a freezer stash for when you return to work.',
  tips = 'Electric pumps are faster; manual pumps are portable. Double pumps halve the time. Many insurance plans cover a pump.'
WHERE name = 'Breast pump';

UPDATE public.checklist_items SET
  explainer = 'Store expressed milk safely in the fridge (up to 5 days) or freezer (up to 6 months) for future feeds.',
  tips = 'Lay bags flat to freeze for efficient storage. Label with date and amount. Thaw in the fridge overnight, never microwave.'
WHERE name = 'Breast milk storage bags / bottles';

UPDATE public.checklist_items SET
  explainer = 'Baby starts solid food around 6 months. A good high chair or grow-with-me chair is used daily for years and is worth investing in.',
  tips = 'Grow-with-me chairs (like the Stokke Tripp Trapp) adjust from baby to adult and offer the best long-term value.'
WHERE name = 'High chair / grow-with-me chair';

UPDATE public.checklist_items SET
  explainer = 'A newborn insert lets you use the high chair from birth as a comfortable lounger at the family table.',
  tips = 'Check compatibility with your specific chair model. Not all chairs offer newborn sets.'
WHERE name = 'Newborn set for high chair';

UPDATE public.checklist_items SET
  explainer = 'A tray provides a contained eating surface for self-feeding, keeping mess on the tray instead of everywhere else.',
  tips = 'Choose a tray with raised edges and a smooth surface for easy cleaning.'
WHERE name = 'High chair tray';

UPDATE public.checklist_items SET
  explainer = 'An additional safety harness provides extra security, keeping active babies safely seated during meals.',
  tips = 'A 5-point harness is safest for younger babies. Check that it is compatible with your chair.'
WHERE name = 'Safety harness for high chair';

-- DIAPERING
UPDATE public.checklist_items SET
  explainer = 'You will change 10-12 nappies per day initially. Stock newborn size and size 1 — some babies outgrow newborn size within the first week.',
  tips = 'Do not buy too many newborn size — babies grow fast. Size 1 is the safer bet for stocking up.'
WHERE name = 'Diapers — newborn + size 1';

UPDATE public.checklist_items SET
  explainer = 'A sealed diaper pail contains odours effectively, keeping the nursery and bathroom smelling fresh between bin collections.',
  tips = 'Look for one that seals each nappy individually. Avoid models with expensive proprietary refill bags if possible.'
WHERE name = 'Odourless diaper pail';

UPDATE public.checklist_items SET
  explainer = 'Your mobile changing station for outings. A well-organised nappy bag means you are always prepared wherever you go.',
  tips = 'Backpack styles are most practical — they keep your hands free. Look for insulated bottle pockets and a built-in changing pad.'
WHERE name = 'Diaper bag';

-- CLOTHING
UPDATE public.checklist_items SET
  explainer = 'Bodysuits are the foundation of a newborn wardrobe — worn daily under everything. Two sizes ensures you are prepared as baby grows.',
  tips = 'Envelope necklines make dressing easier. Buy a mix of short and long sleeve. Organic cotton is gentlest on newborn skin.'
WHERE name = 'Bodysuits size 50/56 (5) + size 62/68 (5)';

UPDATE public.checklist_items SET
  explainer = 'All-in-one rompers are the easiest outfit — one piece, no matching required. Perfect for newborns who mostly sleep.',
  tips = 'Zip-up rompers are much faster than snap buttons at 3am. Front zips are easier than back zips.'
WHERE name = 'Rompers / onesies size 50/56 (2)';

UPDATE public.checklist_items SET
  explainer = 'Comfortable, soft pants for everyday wear. Combined with a bodysuit, they make a simple daily outfit.',
  tips = 'Elastic waistbands only — no zips or buttons needed at this stage. Soft jersey fabric moves with baby.'
WHERE name = 'Pants size 50/56 (3)';

UPDATE public.checklist_items SET
  explainer = 'A warm layer for cooler days or going outside. Layering is key since babies cannot regulate temperature well.',
  tips = 'Choose soft knits or fleece. Avoid anything with hoods, strings, or small buttons that could be hazards.'
WHERE name = 'Sweaters size 50/56 (3)';

UPDATE public.checklist_items SET
  explainer = 'Wrap shirts open at the front and tie at the side, so you never need to pull anything over a newborn''s fragile head.',
  tips = 'The kimono-style wrap is the easiest to put on a newborn. Great for the first weeks when babies dislike being dressed.'
WHERE name = 'Wrap shirts size 50/56 (3)';

UPDATE public.checklist_items SET
  explainer = 'Newborns lose a significant amount of body heat through their head. Hats are essential in the first weeks, especially outdoors.',
  tips = 'Soft cotton for indoors, warmer knit for outdoors. Hospital-style knotted hats stay on better than beanies.'
WHERE name = 'Hats (3)';

UPDATE public.checklist_items SET
  explainer = 'Tiny feet need warmth but babies kick off shoes instantly. Soft socks with fold-over cuffs or gentle grip dots stay on best.',
  tips = 'Buy a few identical pairs so losing one is not a problem. Avoid tight elastic bands.'
WHERE name = 'Socks (4 pairs)';

UPDATE public.checklist_items SET
  explainer = 'Baby clothes on regular hangers slide off and get tangled. Small hangers keep the wardrobe organised and clothes wrinkle-free.',
  tips = 'Velvet or rubberised hangers prevent slipping. Match the hanger size to baby clothes — adult hangers stretch tiny shoulders.'
WHERE name = 'Clothes hangers (15)';

-- TRAVEL & GEAR
UPDATE public.checklist_items SET
  explainer = 'Your main transport system for the first 3+ years. A good stroller with carrycot (for newborns) and seat unit (for older babies) covers all stages.',
  tips = 'Test-drive in a shop — check folding mechanism, weight, and boot fit. Consider your daily routes: city pavements vs countryside paths.'
WHERE name = 'Stroller (frame + carrycot + seat unit)';

UPDATE public.checklist_items SET
  explainer = 'Keeps baby warm and cosy during cold weather walks. Essential for autumn/winter babies but useful year-round.',
  tips = 'Universal footmuffs fit most strollers. Look for washable linings and adjustable openings for temperature control.'
WHERE name = 'Stroller footmuff';

UPDATE public.checklist_items SET
  explainer = 'Adapters let you click your infant car seat directly onto the stroller frame — no need to wake a sleeping baby when transitioning from car to walk.',
  tips = 'Check compatibility between your specific car seat and stroller brands. Some travel systems include adapters.'
WHERE name = 'Car seat adapters for stroller';

UPDATE public.checklist_items SET
  explainer = 'Rain does not stop walks. A rain cover keeps baby completely dry and still allows airflow so they do not overheat.',
  tips = 'Universal covers fit most strollers but brand-specific ones fit better. Ventilation openings are important.'
WHERE name = 'Rain cover for stroller';

UPDATE public.checklist_items SET
  explainer = 'Protects baby from insect bites during summer walks, especially near water or in parks.',
  tips = 'Fine mesh that allows airflow. Elasticated edges ensure a snug fit over the carrycot or seat.'
WHERE name = 'Mosquito net for stroller';

UPDATE public.checklist_items SET
  explainer = 'A parasol clips onto the stroller to shade baby from direct sun, which is especially important as babies cannot wear sunscreen until 6 months.',
  tips = 'Choose UPF 50+ fabric. Flexible arms let you adjust the angle as the sun moves.'
WHERE name = 'Parasol for stroller';

UPDATE public.checklist_items SET
  explainer = 'A simple convenience that keeps your drink secure while pushing the stroller — small luxury, big quality-of-life improvement.',
  tips = 'Universal clip-on models fit most handles. Insulated ones keep drinks warm or cold.'
WHERE name = 'Cup holder for stroller';

UPDATE public.checklist_items SET
  explainer = 'Protects your stroller during air travel. Airlines can be rough with luggage — a bag prevents scratches and damage.',
  tips = 'Padded bags offer the best protection. Check it fits your stroller when folded. Gate-check bags are free on most airlines.'
WHERE name = 'Stroller travel bag';

UPDATE public.checklist_items SET
  explainer = 'Fitted sheets for the carrycot keep the sleeping surface clean and comfortable during walks and naps on the go.',
  tips = 'Buy the size that matches your specific carrycot model. Two sheets means always having a clean one.'
WHERE name = 'Carrycot fitted sheets (2)';

UPDATE public.checklist_items SET
  explainer = 'Light layering for the carrycot during outdoor naps and walks. Newborns need warmth but should not overheat.',
  tips = 'Thin cotton or muslin layers let you adjust for temperature. Avoid heavy blankets in the carrycot.'
WHERE name = 'Carrycot blanket and sheets';

UPDATE public.checklist_items SET
  explainer = 'Protects the carrycot mattress from spit-ups and nappy leaks during walks and outdoor naps.',
  tips = 'A thin waterproof sheet sized for the carrycot is sufficient.'
WHERE name = 'Carrycot mattress protector';

UPDATE public.checklist_items SET
  explainer = 'Legally required and the most important safety item. Your baby cannot leave the hospital without a properly installed car seat.',
  tips = 'Buy new, not second-hand — you cannot verify crash history. Rear-facing Group 0 seats are safest for newborns up to ~13kg.'
WHERE name = 'Infant car seat (Group 0)';

UPDATE public.checklist_items SET
  explainer = 'An Isofix base clicks into your car''s Isofix points, making car seat installation foolproof and much safer than seatbelt-only fitting.',
  tips = 'Check your car has Isofix anchor points (most cars from 2006+). The base stays in the car — the seat clicks on and off.'
WHERE name = 'Isofix base';

UPDATE public.checklist_items SET
  explainer = 'Keeps baby warm in the car seat during cold weather without the bulk of a winter coat (which compromises harness safety).',
  tips = 'Choose a footmuff designed for car seats with harness slots. Never put baby in a thick coat under car seat straps.'
WHERE name = 'Car seat footmuff';

UPDATE public.checklist_items SET
  explainer = 'A mirror attached to the back seat headrest lets you see your rear-facing baby in your rearview mirror while driving.',
  tips = 'Shatterproof mirrors with a large viewing angle are best. Make sure it attaches securely and does not obstruct the headrest.'
WHERE name = 'Rear-view mirror for car';

UPDATE public.checklist_items SET
  explainer = 'Car seat bases and buckles can dent and mark your car''s upholstery. A seat protector prevents permanent damage.',
  tips = 'Choose a non-slip protector that covers the full seat. Mesh pockets on the back are a handy bonus.'
WHERE name = 'Car seat protector for vehicle seat';

UPDATE public.checklist_items SET
  explainer = 'Static cling or suction cup sunshades block direct sun through side windows, keeping baby comfortable and protected.',
  tips = 'Roller-blind style shades are easiest to use. Make sure they do not obstruct the driver''s view.'
WHERE name = 'Car window sunshade';

-- HEALTH & SAFETY
UPDATE public.checklist_items SET
  explainer = 'Once baby is crawling (around 8-10 months), stairs become a major hazard. Gates prevent falls and restrict access to unsafe areas.',
  tips = 'Screw-mounted gates are safest for stairs. Pressure-mounted gates work for doorways. Measure the width before buying.'
WHERE name = 'Stair gate (1-2)';

UPDATE public.checklist_items SET
  explainer = 'Childproofing your home prevents accidents as baby becomes mobile. Outlet covers, corner guards, and cabinet locks are the basics.',
  tips = 'Crawl through your home at baby level to spot hazards. Start childproofing before baby is mobile — it creeps up fast.'
WHERE name = 'Safety items (outlet covers, corner guards, cabinet locks)';

-- PLAY & DEVELOPMENT
UPDATE public.checklist_items SET
  explainer = 'A playpen gives baby a safe space to play while you cook, clean, or take a quick break. It is a sanity-saver for parents.',
  tips = 'Choose one large enough for play but small enough for your space. Mesh sides let you see baby from anywhere in the room.'
WHERE name = 'Playpen';

UPDATE public.checklist_items SET
  explainer = 'A mattress and fitted sheet make the playpen comfortable for play and safe for naps.',
  tips = 'Buy the mattress and sheet sized for your specific playpen model. The mattress should fit snugly with no gaps.'
WHERE name = 'Playpen mattress and fitted sheet';

UPDATE public.checklist_items SET
  explainer = 'A padded mat on the playpen floor provides cushioning for rolling, crawling, and the inevitable tumbles during play.',
  tips = 'Choose a washable, non-toxic mat. Foam puzzle mats are popular but ensure pieces are large enough to not be a choking hazard.'
WHERE name = 'Playpen mat';

UPDATE public.checklist_items SET
  explainer = 'A mobile hanging above the playpen provides visual stimulation, entertainment, and can help soothe baby during quiet time.',
  tips = 'High-contrast black and white mobiles are best for newborns. Musical mobiles add an extra soothing element.'
WHERE name = 'Playpen mobile';

UPDATE public.checklist_items SET
  explainer = 'A baby carrier or wrap keeps your hands free while keeping baby close. Babies love the warmth and movement, and it is great for bonding.',
  tips = 'Structured carriers are easiest to use. Wraps offer more flexibility but take practice. Try before you buy if possible.'
WHERE name = 'Baby carrier / wrap';

UPDATE public.checklist_items SET
  explainer = 'A portable sleeping solution for overnight trips, visits to grandparents, or holidays. Much safer than improvised sleeping arrangements.',
  tips = 'Choose a lightweight model that folds compactly. Check it comes with a firm mattress — if not, buy one separately.'
WHERE name = 'Travel cot + mattress + sheet';

UPDATE public.checklist_items SET
  explainer = 'A bouncer gently rocks or vibrates, keeping baby entertained and content while you eat, shower, or get things done nearby.',
  tips = 'Choose one with a natural bounce (no batteries needed). Mesh fabric versions are cooler in summer. Use on the floor only, never on tables.'
WHERE name = 'Bouncer';

UPDATE public.checklist_items SET
  explainer = 'A baby nest creates a cosy, contained sleeping or lounging spot. Great for supervised daytime naps and relaxation.',
  tips = 'Use only for supervised rest — never for unsupervised sleep. Breathable fabrics and firm sides are important safety features.'
WHERE name = 'Baby nest or hammock';

UPDATE public.checklist_items SET
  explainer = 'A lightweight, compact buggy replaces the stroller once baby can sit up independently (around 6 months). Easier to fold and carry.',
  tips = 'Look for one-hand folding, lightweight frame, and a decent sun canopy. Test it in a shop for manoeuvrability.'
WHERE name = 'Buggy (for later)';

UPDATE public.checklist_items SET
  explainer = 'A rear-mounted bike seat lets you cycle with your toddler (from about 9 months). Great for active parents.',
  tips = 'Rear seats are safest. Check the maximum weight limit and ensure it fits your bike frame. A windscreen model adds comfort.'
WHERE name = 'Bike seat (for later)';

UPDATE public.checklist_items SET
  explainer = 'Balance bikes help toddlers learn balance and coordination from around 18 months. They make the transition to pedal bikes much easier later.',
  tips = 'Start with a walker for younger toddlers, then graduate to a balance bike. Adjustable seat height grows with the child.'
WHERE name = 'Walker or balance bike (for later)';
