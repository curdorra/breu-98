'use strict';

// If startup throws, say so on the splash (tap to reload) instead of leaving people staring at it.
addEventListener('error', () => {
  const b = document.getElementById('boot');
  if (!b || b.hidden || b.classList.contains('out') || b.classList.contains('failed')) return;
  b.classList.add('failed');
  b.addEventListener('click', () => location.reload());
});
const METHODS = {
  'V60': {
    cat:'Drippers', ratio:16, grind:'Medium-fine', temp:'93 °C', time:'2:30–3:00', espresso:false,
    body:'Light–medium', clarity:'High', sensitivity:'Demanding',
    description:'The V60 rewards attention. Its conical bed and single large hole create a continuous drawdown — water contacts grounds from bloom to final drop, revealing the full flavor arc of a coffee with unusual clarity.',
    steps:[
      { text:'Rinse paper filter with hot water; discard rinse from your server.', why:'Removes papery taste compounds (trimethylamine) and preheats the dripper to stabilise brew temperature.' },
      { text:'Add ground coffee; create a small well in the centre.', why:'The well helps water penetrate the dry puck evenly during the bloom pour, preventing surface channelling.' },
      { text:'Bloom: pour 2–3× dose weight (≈30–45 g) in a slow spiral. Wait 30–45 s.', why:'CO₂ from fresh coffee outgasses during the bloom. Skipping it traps gas bubbles that create uneven extraction — sour pockets alongside dry channels.' },
      { text:'Continue in slow concentric spirals — keep water level steady.', why:'A consistent water level maintains stable pressure and even contact time across the entire bed. Aggressive pours disturb the grounds and cause channelling.' },
      { text:'Complete all pours by 2:15. Target total drain by 3:00.', why:'Contact time beyond 3:30 leads to over-extraction — harsh, bitter, astringent notes. Drain under 2:00 signals too coarse a grind or too fast a pour.' },
    ],
    dialIn:[
      'Draining too fast (< 2:30)? Grind finer by 1–2 clicks.',
      'Draining too slow (> 3:30)? Grind coarser, or reduce pour volume per stroke.',
      'Sour despite correct time? Extend the bloom to 45 s — CO₂ may still be escaping.',
      'Uneven surface at end? Pours may be too aggressive — aim for the centre and slow down.',
      'Inconsistent results day-to-day? Weigh water and time every pour until the recipe is locked.',
    ],
    bestWith:'Best with light to medium roasts. Ethiopian naturals and Kenyan washed coffees are particularly expressive — the V60 conveys floral, citrus, and stone fruit notes with exceptional clarity.',
  },
  'Chemex': {
    cat:'Drippers', ratio:15, grind:'Medium-coarse', temp:'93 °C', time:'4:00–5:00', espresso:false,
    body:'Light', clarity:'Very high', sensitivity:'Moderate',
    description:'The Chemex\'s thick bonded filter (20–30% heavier than standard) removes nearly all oils and fine particles. The result is a remarkably clean, almost tea-like cup — ideal for showcasing delicate, high-grown coffees.',
    steps:[
      { text:'Fold Chemex filter with 3 layers toward the spout. Rinse and discard.', why:'3 layers face the spout to prevent collapse during brewing. Rinsing removes papery notes and heats the glass vessel.' },
      { text:'Add grounds and level gently.', why:'An even bed prevents water from finding low-resistance paths through the grounds.' },
      { text:'Bloom with 45–60 g water, wait 45 s.', why:'The Chemex\'s thick filter slows drawdown, so bloom degassing is especially important — trapped CO₂ can cause significant channelling.' },
      { text:'Pour in large spirals every 45–60 s, keeping water off the glass walls.', why:'Pouring down the walls bypasses the coffee bed entirely. Stay centered and let water pass through the grounds uniformly.' },
      { text:'Total brew time 4:00–5:00.', why:'The thick filter\'s slow drawdown naturally extends brew time. If you\'re running fast, grind coarser — don\'t compensate by pouring slower.' },
    ],
    dialIn:[
      'Running bitter? The thick filter extracts efficiently — try dropping temp to 91 °C.',
      'Too weak? Chemex filters strip body; increase dose slightly (try 1:14) rather than slowing the pour.',
      'Grounds piling up on filter walls? Wet the walls gently mid-brew to drop them back into the slurry.',
      'Filter collapsing? Make sure 3 layers face the spout — this is the structural side.',
    ],
    bestWith:'Best with washed light roasts — Central Americans (Guatemala, Colombia), East Africans. The lipid-free brew amplifies brightness and delicate aromatics. Avoid very dark roasts: the clean extraction can make them taste thin and bitter.',
  },
  'Kalita 102': {
    cat:'Drippers', ratio:15, grind:'Medium', temp:'93 °C', time:'2:30–3:00', espresso:false,
    body:'Medium', clarity:'Medium–high', sensitivity:'Forgiving',
    description:'The Kalita 102 is a small flat-bed dripper for 1–2 cups. Its three small holes slow the drawdown compared to a V60, and the flat bed means all grounds extract simultaneously — producing a more consistent, sweeter cup with less technique sensitivity.',
    steps:[
      { text:'Fold 102 paper filter edges; rinse in the dripper and discard water.', why:'The folded edges seal the dripper corners and prevent bypass. Rinsing preheats the ceramic and removes papery taste.' },
      { text:'Add grounds and level the flat bed.', why:'The entire flat bed drains at once — an uneven surface creates an uneven water table and inconsistent extraction.' },
      { text:'Bloom: pour 45 g water, wait 30 s.', why:'Flat beds are slightly less prone to CO₂ channelling than cones, but blooming still locks in freshness and evenness.' },
      { text:'Pour in tight concentric circles — keep water level consistent.', why:'Unlike a cone, water doesn\'t naturally funnel toward a single drain point. Keeping the level even ensures the whole bed stays equally saturated.' },
      { text:'Aim for total drain time 2:30–3:00.', why:'Flat beds drain slightly slower than a V60 at the same grind. If you\'re running long, try a coarser grind before adjusting pour technique.' },
    ],
    dialIn:[
      'Channelling on one side? Your bed may be uneven — use a gentle shake after dosing to level.',
      'Running too long? The 102 is small — check you\'re not overdosing for the dripper size (10–18 g max).',
      'Want more body? Try a 1:14 ratio — the flat bed holds extra water well without muddying the cup.',
      'Bitter despite correct time? Drop temp to 91 °C; the flat bed is efficient and can over-extract quickly.',
    ],
    bestWith:'Versatile. Works with medium roasts where you want sweetness and balance — Colombian, Brazilian, Guatemalan origins. The flat bed tames acidity slightly, making it gentler than a V60 on bright naturals.',
  },
  'Origami': {
    cat:'Drippers', ratio:15, grind:'Medium', temp:'93 °C', time:'2:30–3:30', espresso:false,
    body:'Light–medium', clarity:'High', sensitivity:'Moderate',
    description:'The Origami\'s pleated ceramic form is designed for both paper and cloth filters. Paper produces a V60-style clean cup; cloth allows oils through for a fuller body. The ceramic retains heat exceptionally well — one of the most temperature-stable manual drippers available.',
    steps:[
      { text:'Place Origami on a server; insert filter and rinse.', why:'Origami can be used with several filter types. Rinsing bonds the filter to the pleats, which is especially important with paper to prevent bypass.' },
      { text:'Add grounds. Bloom with 2–3× dose weight, 30–45 s.', why:'Same principle as any pour-over — degassing the bed before main pours ensures even extraction front-to-back.' },
      { text:'Pour in controlled spirals — ceramic retains heat, so stay consistent.', why:'The ceramic mass keeps the slurry temperature stable longer than plastic drippers, meaning extraction is more forgiving of slow pour technique.' },
      { text:'Adjust timing based on filter type: cloth runs slightly faster.', why:'Cloth filters have no binders and let water pass more freely. You may need to grind finer when switching from paper to cloth to maintain target brew time.' },
    ],
    dialIn:[
      'Switching to cloth? Grind 1–2 steps finer to maintain the same brew time.',
      'Getting a papery aftertaste? Rinse more thoroughly — 100 ml of hot water, discard completely.',
      'Inconsistent temperature? Preheat the ceramic with boiling water for 30 s before brewing.',
      'Want more body with paper? Try a coarser grind and shorter total brew time to limit lipid filtering.',
    ],
    bestWith:'Excellent with single origins at any roast level. The ceramic body makes it a favourite for tasting flights — heat stability lets you brew back-to-back cups with minimal drift.',
  },
  'Clever Dripper': {
    cat:'Drippers', ratio:15, grind:'Medium', temp:'90 °C', time:'4:00', espresso:false,
    body:'Medium', clarity:'Medium', sensitivity:'Very forgiving',
    description:'The Clever Dripper is a full-immersion brewer that releases only when placed on a vessel. Unlike pour-over methods, all grounds steep simultaneously — eliminating the pour technique variable entirely. Ideal for consistent, repeatable results without the learning curve.',
    steps:[
      { text:'Rinse filter; sit Clever on a cup to keep the valve closed.', why:'The valve opens automatically when placed on a vessel. Resting on a cup keeps it closed during brewing.' },
      { text:'Add grounds; pour all water at once.', why:'Full immersion means you don\'t need to pace your pours — add all water immediately after grounds for complete saturation.' },
      { text:'Stir once, then lid on.', why:'One stir ensures all grounds are wet. The lid traps heat and prevents evaporation during the steep.' },
      { text:'Steep 3:00–4:00.', why:'Unlike pour-overs, steep time is your primary extraction variable. 3:00 is lighter; 4:00 is fuller. Adjust in 30-second increments when dialling in.' },
      { text:'Place on your vessel — the valve opens automatically. Let drain completely.', why:'The drawdown takes about 60–90 s. Unlike French press, grounds are filtered through paper — no sediment in the cup.' },
    ],
    dialIn:[
      'Bitter? Shorten steep to 3:00 or grind coarser. The immersion is efficient.',
      'Sour/weak? Extend steep to 4:30 or grind finer by 1–2 clicks.',
      'Want more body? Try coarser grind + 4:30 steep — a longer immersion extracts more oils.',
      'Getting sediment? Your filter may have micro-holes. Use a double filter or switch brands.',
      'Inconsistent results? Time the steep exactly — even 30 s variation produces noticeable difference in immersion brewing.',
    ],
    bestWith:'Great for medium to dark roasts, origins with chocolatey or nutty profiles — Brazilian, Colombian, Sumatran. Beginners benefit most from its forgiveness; the Clever rewards clean water and consistent steep time above all else.',
  },
  'French Press': {
    cat:'Immersion', ratio:15, grind:'Coarse', temp:'93 °C', time:'4:00', espresso:false,
    body:'Full', clarity:'Low', sensitivity:'Forgiving',
    description:'The French press is the purest full-immersion method — no filter, complete contact. The metal mesh allows oils and fine particles through, producing a rich, textured, full-bodied cup. What it sacrifices in clarity it gains in depth and mouthfeel.',
    steps:[
      { text:'Preheat French press with hot water; discard.', why:'Glass and metal lose heat quickly. A 30-second preheat keeps brew temperature within 1–2 °C of target throughout the steep.' },
      { text:'Add coarse grounds; pour all water.', why:'Coarse grind compensates for the long steep time. Finer grinds in a French press produce over-extracted, muddy cups — the grounds have too much surface area over 4 minutes.' },
      { text:'Stir the top layer to saturate all grounds.', why:'Dry grounds on the surface extract unevenly. One stir ensures uniform initial saturation before leaving to steep.' },
      { text:'Steep exactly 4 minutes. Place lid, do not press yet.', why:'The lid traps heat and aromatics. Starting the plunge early shortens contact time; most of the extraction happens between 2:00 and 4:00.' },
      { text:'Press slowly. Pour immediately — do not leave grounds in contact.', why:'Pressing slowly keeps fine particles below the mesh. Leaving brewed coffee sitting on grounds continues extraction, producing bitter over-extraction within minutes.' },
    ],
    dialIn:[
      'Gritty sediment in cup? Grind coarser — fine particles pass through the mesh easily.',
      'Bitter? Pour immediately after plunging — don\'t leave coffee sitting on grounds.',
      'Weak? Try 1:12 ratio, or extend steep to 5:00. French press is forgiving with longer times.',
      'Oily sheen bothering you? That\'s natural coffee lipids — this is correct for French press. Unavoidable without a filter.',
      'Pressing requires too much force? Grind is too fine, or you\'re pressing too fast. Slow down and grind coarser.',
    ],
    bestWith:'Best with medium to dark roasts — Brazilian, Sumatran, Ethiopian dry process, Colombian. The oil-rich cup amplifies chocolate, tobacco, and earthy notes. Works poorly with very light, acidic roasts where the lack of clarity turns acidity into tartness.',
  },
  'AeroPress': {
    cat:'Immersion', ratio:15, grind:'Medium-fine', temp:'85 °C', time:'1:30–2:30', espresso:false,
    body:'Medium–full', clarity:'Medium', sensitivity:'Flexible',
    description:'The AeroPress is the most versatile home brewer — pressure, immersion time, grind, and temperature are all variable. The competition community has produced hundreds of world-class recipes. Lower temperature (80–86 °C) is a signature technique that extracts sweetness without harshness.',
    steps:[
      { text:'Standard: insert filter in cap, pre-wet. Set plunger at position 4.', why:'Pre-wetting the paper filter bonds it to the cap and removes papery taste. Position 4 sets the maximum water volume for a standard brew.' },
      { text:'Add grounds; pour water to fill.', why:'The AeroPress holds about 220 ml at position 4. Adjust your dose/ratio to fit the chamber — or use the inverted method for more flexibility.' },
      { text:'Stir 10 s; lock on the cap.', why:'Stirring ensures full saturation before the cap goes on. Locking the cap before flipping (inverted) or pressing (standard) seals the immersion.' },
      { text:'Steep 1:00–2:00; press slowly over 20–30 s.', why:'The AeroPress extracts faster than most methods due to higher pressure. Over 2:00 steep + slow press often produces over-extraction. Stop pressing when you hear hissing.' },
      { text:'Inverted option: fill, stir, cap, flip at 1:30, press over 30 s.', why:'Inverted method prevents early drip-through during steep, giving you full control over contact time. More repeatable, but requires care with the flip.' },
    ],
    dialIn:[
      'Too bitter? Lower temperature to 80–82 °C. AeroPress extracts efficiently — cooler water is a legitimate tool.',
      'Too sour? Raise temp, extend steep, or grind finer.',
      'Pressing is too hard? Grind coarser, or slow your press rate — the pressure builds from speed, not force.',
      'Want espresso-style? Use 1:6 ratio, fine grind, 93 °C — produces a concentrated base for milk drinks.',
      'Hissing during press? That\'s the final air pushing through. Stop here — pressing further extracts bitter compounds from the puck.',
    ],
    bestWith:'Nearly any coffee works. Competition recipes often use light, fruity East Africans. The flexibility makes it ideal for exploring how temperature affects extraction — run the same recipe at 80 °C and 93 °C to hear the same coffee speak two different languages.',
  },
  'Espresso': {
    cat:'Pressure', ratio:2, grind:'Fine', temp:'93 °C', time:'25–30 s', espresso:true,
    body:'Very full', clarity:'Low', sensitivity:'Very demanding',
    description:'Espresso is extraction under pressure — 9 bars forces water through a compacted puck in 25–30 seconds, extracting a concentrated shot with crema. Every variable (grind, dose, tamp, temperature, pressure profile) interacts; small changes have large effects.',
    steps:[
      { text:'Flush group head for 2–3 s. Weigh dose to ±0.1 g.', why:'Flushing stabilises group head temperature. Dose consistency is critical — even 0.5 g changes flow resistance significantly at fine grind sizes.' },
      { text:'Distribute grounds evenly; tamp level at ~15 kg pressure.', why:'An uneven puck channels water through low-density areas, producing simultaneous under- and over-extraction. Levelling matters more than tamp pressure — consistency is the goal.' },
      { text:'Lock in portafilter; start timer immediately.', why:'The timer starts the moment you engage the pump. Pre-infusion (if your machine supports it) at low pressure for 5–8 s reduces channelling risk in dense pucks.' },
      { text:'Target first drops at 7–10 s; full 2× yield by 25–30 s.', why:'First drops at 7 s indicate appropriate puck resistance. Early drops (< 5 s) = too coarse or underweight; late drops (> 12 s) = too fine, overdosed, or poor distribution.' },
      { text:'Adjust grind to dial in. Finer = slower = more extraction. Coarser = faster = less.', why:'Grind size is the primary dial in espresso. Dose and yield are fixed by recipe — the grinder is your instrument. Change by 1 click at a time and taste before changing again.' },
    ],
    dialIn:[
      'Shot running fast (< 20 s)? Grind finer, or check your dose and distribution.',
      'Shot running slow (> 35 s)? Grind coarser, or reduce dose by 0.5 g.',
      'Channelling (blonde streak)? Improve distribution — use a WDT tool before tamping.',
      'Sour espresso? Under-extracted — slow the shot (finer grind) or raise temperature.',
      'Bitter espresso? Over-extracted — speed up the shot (coarser grind) or lower temperature to 91 °C.',
      'No crema? Coffee may be stale (> 3 weeks post-roast) or grind is too coarse.',
    ],
    bestWith:'Medium roasts highlight espresso\'s complexity best — you want caramelised sweetness without the flatness of dark roast or the sourness risk of very light roast. Ethiopian naturals produce a remarkable fruit-forward espresso; Brazilian and Colombian blends are classic for milk-based drinks.',
  },
  'Moka Pot': {
    cat:'Pressure', ratio:7, grind:'Medium-fine', temp:'Stovetop', time:'≈5:00', espresso:false,
    body:'Full', clarity:'Low', sensitivity:'Moderate',
    description:'The Moka pot brews at 1–2 bar — far less than espresso\'s 9 bar. It\'s not espresso, but it produces a rich, intense, oil-heavy concentrate. The stovetop classic since 1933, it rewards low heat and patience over high heat and speed.',
    steps:[
      { text:'Fill bottom chamber with cold water to just below the safety valve.', why:'Hot water in the bottom skips the temperature ramp-up, which can cause the coffee to cook unevenly. Cold water gives a controlled, gradual heat-up. Some prefer hot water to reduce total brew time — experiment with both.' },
      { text:'Fill basket loosely; do not tamp or compress.', why:'At 1–2 bar, a tamped puck creates too much resistance. Grounds should be loosely filled and levelled — no mound, no compression.' },
      { text:'Assemble; place on medium-low heat.', why:'High heat produces steam faster than the coffee can extract cleanly, leading to a burnt, bitter cup. Low and slow gives the water time to do proper extraction work.' },
      { text:'Keep lid open; watch for coffee to begin flowing.', why:'Watching lets you see the flow character. A steady, dark flow is ideal. A violent, sputtering boil means the heat is too high.' },
      { text:'Remove from heat when flow turns pale or starts to sputter.', why:'The pale, blonde flow at the end is over-extracted water being forced through depleted grounds. Removing at this point preserves the quality of what\'s already brewed.' },
    ],
    dialIn:[
      'Burnt taste? Heat is too high, or you\'re not removing it at the right moment.',
      'Weak? Grind finer (not too fine — risk of muddy grounds blocking the filter plate).',
      'Coffee leaking from the seal? Grounds may be on the rim — clean the gasket seat before assembling.',
      'Want a lighter result? Use a 1:8 ratio instead of 1:7 by filling to slightly below the valve.',
      'Spitting violently? Turn heat down significantly — you want a gentle, continuous flow.',
    ],
    bestWith:'Dark to medium-dark roasts with chocolate, caramel, and smoky notes. Brazilian, Italian-style blends, and Cuban coffees are traditional. Light roasts tend to produce high acidity in the Moka pot. The Bialetti is the original; any stovetop-safe pot in aluminium or stainless works.',
  },
  'Turkish': {
    cat:'Traditional', ratio:10, grind:'Extra-fine (powder)', temp:'<100 °C', time:'≈4:00', espresso:false,
    body:'Very full', clarity:'None', sensitivity:'Moderate',
    description:'Turkish coffee (also Cezve, Ibrik, Džezva) is one of the oldest brewing methods — unfiltered, boiled slowly to produce a thick, intensely flavoured coffee where grounds settle in the cup. The foam (kaimaki) is culturally prized and forms during the careful heating process.',
    steps:[
      { text:'Add cold water to the cezve, then extra-fine coffee (and sugar if desired). Don\'t stir.', why:'Starting with cold water and adding coffee on top minimises clumping. Sugar, if used, goes in now — adding it after boiling gives a different (less traditional) result. Do not stir yet.' },
      { text:'Place over very low heat. Heat slowly.', why:'Low heat is essential. The goal is a slow, controlled temperature rise that extracts gently. High heat scalds the grounds at the bottom before the water can distribute the extraction.' },
      { text:'Watch for foam (kaimaki) to rise to the rim. Do not let it boil over.', why:'The foam is formed by CO₂ and proteins — it is a sign of freshness and is considered the best part. Boiling over destroys the foam and introduces harsh flavours. Some practitioners heat to foam twice.' },
      { text:'Spoon foam into cups first, then slowly pour.', why:'Spooning the foam first ensures each cup gets an equal share of the kaimaki. The slow pour minimises disturbance — you want grounds to stay in the pot, not the cup.' },
      { text:'Wait 30 s for grounds to settle completely before drinking.', why:'The grounds are unfiltered and will be in the cup. The first sip should be taken carefully — the bottom third of the cup will be thick with sediment. Never drain a Turkish cup completely.' },
    ],
    dialIn:[
      'No foam forming? Coffee may be stale — the foam requires CO₂ from fresh coffee. Or heat may be too high, collapsing bubbles before they can accumulate.',
      'Bitter? Reduce heat further; boiling is the enemy of Turkish coffee.',
      'Gritty? Grounds are not fine enough — Turkish grind should be powder-fine, the finest setting on almost any grinder.',
      'Want it sweeter? Add sugar before heating (traditional) — the three levels are sade (no sugar), az şekerli (a little), çok şekerli (very sweet).',
    ],
    bestWith:'Medium roasts work well — the method is intense enough to handle body but clear enough to benefit from some sweetness and complexity. Classic blends often include cardamom in Middle Eastern traditions. Ethiopian, Yemeni, and Turkish single origins are especially traditional.',
  },
  'Indian Filter': {
    cat:'Traditional', ratio:4, grind:'Extra-fine', temp:'~95 °C', time:'15–20 min', espresso:false,
    body:'Very full', clarity:'Low', sensitivity:'Forgiving',
    description:'Indian filter coffee (kaapi) is a two-vessel metal filter producing a slow decoction — not drip coffee, but a concentrated liquid blended with hot milk and sugar. Chicory is traditionally added to the blend for body and a distinctive bittersweet note.',
    steps:[
      { text:'Add coffee blend (often 20–30% chicory) to the upper chamber.', why:'Chicory (Cichorium intybus) adds body, colour, and a slightly bitter caramel note. Traditional Indian filter blends are premixed with chicory; adjusting the percentage changes the character of the decoction.' },
      { text:'Tamp firmly; press the disc firmly onto the grounds.', why:'The metal pressing disc applies even pressure across the bed, slowing the decoction drip rate. Inconsistent tamping = uneven drip. Tight pressure = slower, more concentrated decoction.' },
      { text:'Pour near-boiling water over the grounds; place the lid.', why:'Near-boiling water (95 °C) is needed to percolate slowly through the dense, fine bed. The lid traps steam and keeps the upper chamber warm for the duration of the drip.' },
      { text:'Wait 15–20 min for the decoction to drip through.', why:'This is a slow extraction by design. The drip rate is controlled by the tamp and grind — if your decoction drips in under 10 min, tamp harder or grind finer. Over 25 min, loosen slightly.' },
      { text:'Mix 1 part decoction with 3 parts boiled milk. Sweeten to taste.', why:'Traditional kaapi is served in a tumbler and davara set — poured back and forth to cool and aerate. The 1:3 ratio is traditional; adjust to taste. Unsweetened kaapi is uncommon in India.' },
    ],
    dialIn:[
      'Drip too fast (< 10 min)? Tamp harder, grind finer, or increase chicory percentage.',
      'Drip too slow (> 25 min)? Loosen tamp, coarsen grind slightly.',
      'Decoction too weak? Increase dose per cup or tamp harder to slow the drip.',
      'No chicory available? Use 100% coffee and add a small pinch of dark roast — the body will be lighter.',
    ],
    bestWith:'Robusta-Arabica blends are traditional and produce the most authentic flavour. Indian origins — Coorg, Chikmagalur, Araku Valley — work beautifully. Medium to medium-dark roasts. The milk dilutes intensity, so a stronger roast holds up better than a light origin.',
  },
  'Phin': {
    cat:'Traditional', ratio:10, grind:'Medium-coarse', temp:'95 °C', time:'≈6:00', espresso:false,
    body:'Full', clarity:'Low–medium', sensitivity:'Forgiving',
    description:'The Vietnamese Phin is a gravity drip filter producing a slow, concentrated brew. Traditionally enjoyed with sweetened condensed milk (sữa) or over ice, it is one of the simplest brewers — four pieces, no paper needed.',
    steps:[
      { text:'Place Phin on a glass; add grounds and press the insert gently.', why:'The internal press disc controls drip rate by adjusting resistance. A light press = faster drip; firm press = slower, more concentrated brew. Fingerprint pressure is usually correct.' },
      { text:'Bloom: pour ≈30 ml water, wait 30 s.', why:'The Phin\'s fine metal filter can clog if grounds are very fine. The bloom softens grounds and primes the filter plate before the full pour.' },
      { text:'Fill Phin with remaining hot water; place lid on top.', why:'The lid is critical — it traps steam and maintains temperature during the slow drip. Without it, the brew temperature drops significantly before extraction is complete.' },
      { text:'Allow to drip at its own pace — roughly 4–6 minutes.', why:'Do not agitate or press. If the drip is too slow (> 8 min), the insert may be too tight. If too fast (< 3 min), the insert is too loose or grind is too coarse.' },
      { text:'Serve over sweetened condensed milk, or over ice for cà phê sữa đá.', why:'Condensed milk\'s sugar and fat balance the strong, sometimes bitter brew. For iced, brew at full strength — ice dilution is factored into the traditional recipe.' },
    ],
    dialIn:[
      'Dripping in under 3 min? Grind finer, or press the insert more firmly.',
      'Barely dripping (> 10 min)? Loosen the insert or grind slightly coarser.',
      'Too bitter? Vietnamese coffee is naturally robust — try a lighter roast or higher ratio (1:12).',
      'No condensed milk? Substitute 2 tsp sugar + 1 tbsp evaporated milk as an approximation.',
    ],
    bestWith:'Robusta or Robusta-Arabica blends are traditional — Vietnamese Robusta coffees (Đắk Lắk province) have a characteristic earthiness and chocolate bitterness that complements condensed milk perfectly. Light Arabica roasts will feel thin by comparison. The Trung Nguyen brand is widely available and faithful to the original.',
  },
  'Cold Brew': {
    cat:'Cold', ratio:8, grind:'Coarse', temp:'Room temp', time:'12–18 h', espresso:false,
    body:'Full', clarity:'Medium', sensitivity:'Very forgiving',
    description:'Cold brew steeps coarsely ground coffee in cold or room-temperature water for 12–18 hours — bypassing heat entirely. The absence of heat produces a chemically different extraction: less acid, less bitterness, more sweetness and chocolate. The resulting concentrate is diluted before serving.',
    steps:[
      { text:'Combine coarse grounds and cold or room-temperature water in a jar.', why:'Coarse grind compensates for the long steep time. Finer grinds in a 12+ hour cold steep produce over-extracted, bitter concentrates — the long contact time does the extraction work that temperature normally does.' },
      { text:'Stir thoroughly to wet all grounds.', why:'Dry grounds float on the surface and extract unevenly. A thorough initial stir ensures complete saturation. You can stir again at 4–6 h if desired — it slightly increases extraction.' },
      { text:'Cover and steep 12–18 h at room temp, or 18–24 h refrigerated.', why:'Room temperature steeps faster due to slightly higher energy. Refrigerator steeps are slower but the extended time produces a smoother result. Room-temp concentrates can become sour if left beyond 20 h.' },
      { text:'Strain through fine mesh, then a paper filter for clarity.', why:'The two-stage strain removes coarse grounds (mesh) and fines/oils (paper). Skipping the paper filter leaves a turbid concentrate that shortens shelf life and produces a gritty mouthfeel.' },
      { text:'Store concentrate in fridge up to 2 weeks. Dilute 1:1 to 1:2 before serving.', why:'Cold brew concentrate has enough dissolved compounds to inhibit bacterial growth for up to 2 weeks refrigerated. Diluting 1:1 with water approaches espresso strength; 1:2 is standard filter strength. Dilute with milk for a cold latte.' },
    ],
    dialIn:[
      'Too bitter even after dilution? Steep time is too long, or grind is too fine. Reduce to 10–12 h room temp.',
      'Too weak? Increase dose (try 1:6 ratio for concentrate), or extend steep time.',
      'Sour notes? Room-temp steep may have gone too long. Reduce to 12 h, or switch to refrigerator method.',
      'Gritty texture? Strain through paper after the mesh — you\'re getting fine particle pass-through.',
      'Want nitro-style? Force-carbonate the diluted cold brew with a cream whipper and two N₂O chargers.',
    ],
    bestWith:'Medium to medium-dark roasts with chocolate, caramel, and nutty profiles benefit most — Brazilian, Colombian, Guatemalan single origins. Light, floral, acidic roasts lose their defining characteristics in cold brew and tend toward flat sweetness. Dark roasts work well but can produce a very strong concentrate — dilute generously.',
  },
};

const SYMPTOMS = [
  {
    tag:'Sour / sharp', cause:'Under-extracted', pos:15,
    science:'Sour notes indicate that soluble acids were extracted before sweeter compounds could develop. Sourness in coffee is primarily citric, malic, and acetic acid — the first compounds to dissolve. Sweet and bitter compounds require more time, heat, or surface area to extract.',
    fixes:['Grind finer — more surface area increases extraction rate.','Raise brew temperature by 2–3 °C — heat accelerates dissolution of all compounds.','Extend bloom time to 45 s — CO₂ may be blocking water contact.','Pour more slowly, or steep longer (immersion methods).','Check that your grinder is actually grinding finer — burrs may be worn or a timer-dosing grinder may be losing dose weight.'],
  },
  {
    tag:'Bitter / harsh', cause:'Over-extracted', pos:85,
    science:'Bitterness results from over-extraction of bitter alkaloids (caffeine, trigonelline) and phenolic compounds that develop after the sweet compounds have been depleted. This happens when water stays in contact with grounds too long, or temperature is too high.',
    fixes:['Grind coarser — reduces surface area and slows extraction.','Lower temperature by 2–3 °C.','Shorten total brew time.','For French press / AeroPress: reduce steep time.','Stop the pour or press before the very end — the last liquid through a bed is always the most extracted.'],
  },
  {
    tag:'Weak / watery', cause:'Under-strength (low TDS)', pos:25,
    science:'Strength and extraction are different axes. Weak coffee has a low concentration of dissolved solids (TDS) — it may be correctly extracted (good EY%) but simply diluted. Increase dose or reduce water to increase strength.',
    fixes:['Increase dose — use more coffee per litre of water.','Decrease ratio — try 1:14 instead of 1:16.','Check your grinder — weak output can indicate worn burrs producing inconsistent particle sizes.','Ensure water temperature is adequate — below 85 °C, extraction drops sharply.','Verify your scale — a dosing error of 1–2 g in a 15 g recipe noticeably changes strength.'],
  },
  {
    tag:'Too strong', cause:'Over-strength (high TDS)', pos:72,
    science:'High TDS means more dissolved solids per unit of liquid — either from a high dose, low water volume, or over-extracted compounds. Dilution is always an option; the chemistry is already set after brewing.',
    fixes:['Reduce dose (fewer grams of coffee).','Increase ratio — try 1:17 or 1:18 for filter.','Add water post-brew (Americano style) — doesn\'t change extraction, only concentration.','If also bitter: the issue is extraction, not just strength — see the Bitter fix.'],
  },
  {
    tag:'Dry / astringent', cause:'Over-extracted + tannins', pos:92,
    science:'Astringency is a tactile sensation — a drying, puckering mouthfeel caused by polyphenols (tannins) binding to saliva proteins. It\'s distinct from bitterness (taste) and indicates the most extreme over-extraction, often compounded by high mineral water.',
    fixes:['Grind significantly coarser.','Lower water temperature to 87–89 °C.','Avoid agitating grounds at end of brew — the last agitation strips tannins.','Check water mineral content — very hard water (> 300 ppm TDS) amplifies astringency dramatically.','Shorten steep time (French press) or bloom time considerably.'],
  },
  {
    tag:'Flat / dull', cause:'Stale coffee or underpowered extraction', pos:35,
    science:'Flatness is the absence of aromatic complexity — volatiles have off-gassed (stale coffee), never extracted (low temperature), or were killed by chlorine or mineral imbalance in the water. Fresh coffee, proper temperature, and filtered water are the three non-negotiables.',
    fixes:['Use coffee within 4 weeks of roast date — volatile aromatics degrade rapidly after roasting.','Raise water temperature. Flat cups at correct time often benefit from 92–94 °C.','Use filtered water — chlorine actively degrades aromatic compounds.','Grind immediately before brewing — pre-ground coffee goes flat within 15–30 minutes.','Check your water\'s mineral content: too soft (< 50 ppm) and water lacks the magnesium ions that bind aroma compounds during extraction.'],
  },
  {
    tag:'Sour + bitter', cause:'Uneven extraction / channelling', pos:50,
    science:'Simultaneous sourness and bitterness indicates different parts of the puck extracting at vastly different rates. Some grounds are under-extracted (sour), others over-extracted (bitter). This is the signature of channelling — water finding a low-resistance path and flushing those grounds while ignoring others.',
    fixes:['Improve ground distribution — use a WDT tool (espresso) or stir the bed before pouring (pour-over).','Tamp level and even, not slanted.','For pour-over: slow your first pour and aim for the centre — aggressive perimeter pours create channels.','For espresso: check portafilter basket for holes — a blocked hole creates a guaranteed channel.',],
  },
];

const DRINKS = [
  // ── Espresso ──
  { name:'Espresso', cat:'Espresso',
    tagline:'Pure concentrated coffee — the foundation of every espresso drink.',
    ratio:'1 : 2', serve:'Hot · 30–40 ml',
    layers:[
      { label:'Crema',    pct:18, color:'#7A4820' },
      { label:'Espresso', pct:82, color:'#180C06' },
    ],
    steps:[
      'Dose 18–21 g, grind fine.',
      'Extract 36–42 g yield in 25–30 s at 93 °C.',
      'Serve immediately in a pre-warmed 60 ml cup.',
    ],
  },
  { name:'Ristretto', cat:'Espresso',
    tagline:'Short, sweet, intense. Half the yield of an espresso — maximum sweetness, minimum bitterness.',
    ratio:'1 : 1', serve:'Hot · 15–20 ml',
    layers:[
      { label:'Crema',     pct:22, color:'#7A4820' },
      { label:'Ristretto', pct:78, color:'#0F0704' },
    ],
    steps:[
      'Dose 18–21 g, grind 1–2 clicks finer than your espresso setting.',
      'Stop extraction at 18–21 g yield — around 20–25 s.',
      'Syrupy, fruit-forward, no bitterness. Serve in a pre-warmed 30 ml cup.',
    ],
  },
  { name:'Lungo', cat:'Espresso',
    tagline:'Long pull — more water, more caffeine, more bitter. The Italian breakfast shot.',
    ratio:'1 : 3', serve:'Hot · 60–90 ml',
    layers:[
      { label:'Crema', pct:10, color:'#7A4820' },
      { label:'Lungo', pct:90, color:'#251408' },
    ],
    steps:[
      'Dose 18–21 g, grind 1 click coarser than espresso.',
      'Let extraction run to 60–70 g yield in 35–45 s.',
      'More bitter and more caffeine than a standard espresso.',
    ],
  },
  { name:'Americano', cat:'Espresso',
    tagline:'Espresso diluted with hot water — filter-coffee strength with espresso character.',
    ratio:'1 : 4', serve:'Hot · 180–240 ml',
    layers:[
      { label:'Espresso',  pct:22, color:'#180C06' },
      { label:'Hot water', pct:78, color:'#2C180E' },
    ],
    steps:[
      'Pour 120–180 ml hot water into a pre-warmed cup.',
      'Pull a double espresso (36–42 g) over the water.',
      'Espresso over water preserves crema on the surface.',
    ],
  },
  { name:'Long Black', cat:'Espresso',
    tagline:'The Australian/NZ Americano — espresso pulled through hot water, crema intact.',
    ratio:'1 : 3', serve:'Hot · 150–180 ml',
    layers:[
      { label:'Crema',     pct:14, color:'#7A4820' },
      { label:'Espresso',  pct:26, color:'#180C06' },
      { label:'Hot water', pct:60, color:'#2C180E' },
    ],
    steps:[
      'Add 100–120 ml hot (not boiling) water to a pre-warmed cup.',
      'Pull a double espresso directly into the water.',
      'The crema floats clean on top — do not stir.',
    ],
  },
  // ── Milk ──
  { name:'Latte', cat:'Milk',
    tagline:'The most ordered café drink — espresso with abundant steamed milk and a thin foam layer.',
    ratio:'1 : 6', serve:'Hot · 240–360 ml',
    layers:[
      { label:'Microfoam',    pct:10, color:'#DDD8C8' },
      { label:'Steamed milk', pct:68, color:'#B8A890' },
      { label:'Espresso',     pct:22, color:'#180C06' },
    ],
    steps:[
      'Pull a double espresso into a 240–360 ml cup.',
      'Steam milk to 60–65 °C — thin, velvety microfoam, no large bubbles.',
      'Pour steamed milk low over the espresso, tilt to float foam on top.',
      'Finish with latte art for presentation.',
    ],
  },
  { name:'Cappuccino', cat:'Milk',
    tagline:'The classic third — equal parts espresso, steamed milk, and foam.',
    ratio:'1 : 1 : 1', serve:'Hot · 150–180 ml',
    layers:[
      { label:'Foam',         pct:34, color:'#D8D3C3' },
      { label:'Steamed milk', pct:33, color:'#B8A890' },
      { label:'Espresso',     pct:33, color:'#180C06' },
    ],
    steps:[
      'Pull a double espresso into a pre-warmed 150–180 ml cup.',
      'Steam milk to 60–65 °C with a thick, airy foam (2–3 cm head).',
      'Pour milk then spoon foam on top generously.',
      'Dry cap = more foam; wet cap = more milk. Both are correct.',
    ],
  },
  { name:'Flat White', cat:'Milk',
    tagline:'Ristretto-based, velvety microfoam only — small, intense, silky.',
    ratio:'2 : 3', serve:'Hot · 150–165 ml',
    layers:[
      { label:'Microfoam (thin)', pct:8,  color:'#DDD8C8' },
      { label:'Steamed milk',     pct:60, color:'#B8A890' },
      { label:'Ristretto',        pct:32, color:'#0F0704' },
    ],
    steps:[
      'Pull a double ristretto (28–30 g yield) into a 150 ml cup.',
      'Steam milk to 60–65 °C — glossy, paint-like microfoam, no thick layer.',
      'Pour close to the surface for a silky, integrated texture.',
      'The ristretto base stays sweet through the milk.',
    ],
  },
  { name:'Cortado', cat:'Milk',
    tagline:'Espresso "cut" with equal warm milk — no foam, just balance.',
    ratio:'1 : 1', serve:'Hot · 60–90 ml',
    layers:[
      { label:'Milk',     pct:50, color:'#B8A890' },
      { label:'Espresso', pct:50, color:'#180C06' },
    ],
    steps:[
      'Pull a double espresso into a 90 ml glass.',
      'Add equal amount of warm steamed milk — no frothing, just heated.',
      'The milk softens acidity without masking the espresso\'s character.',
    ],
  },
  { name:'Macchiato', cat:'Milk',
    tagline:'Espresso "stained" with just a spoonful of milk foam.',
    ratio:'10 : 1', serve:'Hot · 35–45 ml',
    layers:[
      { label:'Foam dot', pct:22, color:'#D8D3C3' },
      { label:'Espresso', pct:78, color:'#180C06' },
    ],
    steps:[
      'Pull a single or double espresso.',
      'Spoon a small dollop of dense foam on top.',
      'This is a marker — just enough milk to soften the first sip.',
    ],
  },
  { name:'Piccolo', cat:'Milk',
    tagline:'A latte in miniature — ristretto with steamed milk in a small 90 ml glass.',
    ratio:'1 : 2', serve:'Hot · 90 ml',
    layers:[
      { label:'Microfoam',    pct:12, color:'#DDD8C8' },
      { label:'Steamed milk', pct:55, color:'#B8A890' },
      { label:'Ristretto',    pct:33, color:'#0F0704' },
    ],
    steps:[
      'Pull a single ristretto into a 90 ml demitasse or small latte glass.',
      'Steam a small portion of milk with thin microfoam.',
      'Fill to the top — ristretto sweetness shines through the milk.',
    ],
  },
  { name:'Mocha', cat:'Milk',
    tagline:'Espresso meets chocolate — indulgent, rich, a café classic.',
    ratio:'Varies', serve:'Hot · 240–360 ml',
    layers:[
      { label:'Whip / foam',  pct:12, color:'#DDD8C8' },
      { label:'Steamed milk', pct:55, color:'#B8A890' },
      { label:'Chocolate',    pct:11, color:'#3D1A0A' },
      { label:'Espresso',     pct:22, color:'#180C06' },
    ],
    steps:[
      'Add 20–30 ml chocolate sauce (or 2 tbsp cocoa + sugar) to the cup.',
      'Pull a double espresso over the chocolate and mix.',
      'Steam milk to 60–65 °C; pour over the espresso-chocolate base.',
      'Top with whipped cream or foam. Chocolate drizzle optional.',
    ],
  },
  // ── Cold ──
  { name:'Iced Latte', cat:'Cold',
    tagline:'Espresso over ice and cold milk — the everyday cold coffee.',
    ratio:'1 : 4', serve:'Cold · 350–470 ml',
    layers:[
      { label:'Espresso',   pct:20, color:'#180C06' },
      { label:'Cold milk',  pct:48, color:'#9A8E7A' },
      { label:'Ice',        pct:32, color:'#5A6B5A' },
    ],
    steps:[
      'Fill a tall glass with ice.',
      'Add 120–180 ml cold milk over the ice.',
      'Pull a double espresso and pour over the milk — it layers beautifully.',
      'Stir before drinking. Add syrup to the espresso first for even sweetness.',
    ],
  },
  { name:'Iced Americano', cat:'Cold',
    tagline:'Espresso over cold water and ice — clean and refreshing.',
    ratio:'1 : 4', serve:'Cold · 300–420 ml',
    layers:[
      { label:'Espresso',   pct:20, color:'#180C06' },
      { label:'Cold water', pct:45, color:'#3A4A3A' },
      { label:'Ice',        pct:35, color:'#5A6B5A' },
    ],
    steps:[
      'Fill glass with ice, add 150–200 ml cold water.',
      'Pull a double espresso directly over the water and ice.',
      'Do not stir — let the crema float. Stir at the table.',
    ],
  },
  { name:'Frappuccino', cat:'Cold',
    tagline:'Blended frozen coffee — creamy, sweet, infinitely customisable.',
    ratio:'By recipe', serve:'Frozen · 350–470 ml',
    layers:[
      { label:'Whipped cream',    pct:14, color:'#DDD8C8' },
      { label:'Blended ice base', pct:86, color:'#7A5A40' },
    ],
    steps:[
      'Combine 2 shots espresso (or 120 ml cold brew) with 180 ml whole milk.',
      'Add 200 g ice and 2–3 tbsp simple syrup or flavour sauce.',
      'Blend on high until smooth and thick — no ice chunks.',
      'Pour into a chilled cup. Top with whipped cream and drizzle.',
    ],
  },
  { name:'Shakerato', cat:'Cold',
    tagline:'Italian iced espresso — shaken to a cold, silky froth.',
    ratio:'1 : 1', serve:'Cold · 80–100 ml',
    layers:[
      { label:'Cold foam',      pct:30, color:'#A89070' },
      { label:'Chilled espresso', pct:70, color:'#281608' },
    ],
    steps:[
      'Pull a double espresso; dissolve 1–2 tsp sugar into it while hot.',
      'Pour into a cocktail shaker with a large handful of ice.',
      'Shake hard for 12–15 s until very cold and frothy.',
      'Strain into a chilled martini or coupe glass — thick cold foam forms on top.',
    ],
  },
  { name:'Nitro Cold Brew', cat:'Cold',
    tagline:'Cold brew infused with nitrogen — creamy, foamy, no milk required.',
    ratio:'Concentrate', serve:'Cold · 240–350 ml',
    layers:[
      { label:'Nitrogen head',  pct:14, color:'#6A7A6A' },
      { label:'Nitro cold brew', pct:86, color:'#181E18' },
    ],
    steps:[
      'Brew cold brew concentrate at 1:4 ratio, steep 12–18 h.',
      'Charge with nitrogen via a whipped cream dispenser + N₂ charger, or use a nitro tap.',
      'Pour slowly down the side of the glass — do not stir.',
      'The nitrogen creates a cascading pour and a thick, cream-like head.',
    ],
  },
  { name:'Affogato', cat:'Cold',
    tagline:'Espresso "drowned" over vanilla ice cream — dessert and coffee in one.',
    ratio:'1 : 1', serve:'Cold · 120 ml',
    layers:[
      { label:'Espresso',  pct:40, color:'#180C06' },
      { label:'Ice cream', pct:60, color:'#C4B890' },
    ],
    steps:[
      'Scoop 1–2 balls of vanilla gelato into a chilled bowl or wide glass.',
      'Pull a single or double espresso.',
      'Pour the hot espresso directly over the ice cream at the table.',
      'Eat immediately — the contrast of hot espresso and cold gelato is everything.',
    ],
  },
];

// ── HELPERS ───────────────────────────────────────────────────────────────────

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
const pick = a => a[Math.floor(Math.random() * a.length)];
const isPhone = () => matchMedia('(max-width: 700px)').matches;

// Everything the app remembers lives in this browser's localStorage under "breu98:*" and nowhere else.
let storeLocked = false;
const store = {
  get(k, d) { try { const v = localStorage.getItem('breu98:' + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { if (storeLocked) return false; try { localStorage.setItem('breu98:' + k, JSON.stringify(v)); return true; } catch { return false; } },
  wipe() {
    storeLocked = true;
    try { Object.keys(localStorage).filter(k => k.startsWith('breu98:')).forEach(k => localStorage.removeItem(k)); } catch {}
  },
};
const isObj = v => v !== null && typeof v === 'object' && !Array.isArray(v);
const own = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
const savedSettings = store.get('settings', {});
const settings = Object.assign({ theme: 'sky', fx: true, pop: true, snd: true, calm: false, bootEvery: false }, isObj(savedSettings) ? savedSettings : {});
if (settings.v !== 2) { settings.snd = true; settings.v = 2; }
const saveSettings = () => store.set('settings', settings);

// ── PIXEL ICONS ───────────────────────────────────────────────────────────────

const PAL = {
  k:'#3a2344', w:'#ffffff', p:'#f7a8c8', P:'#e070a0', l:'#c9a8f0', L:'#8a68e0', b:'#8fd0f0', B:'#4f86e0',
  m:'#9ee8d8', y:'#ffe08a', Y:'#e0b040', c:'#c89060', C:'#5a3420', g:'#dcd6e6', G:'#9a94a8', r:'#ff5a7a',
};
const ICONS = {
  cup: [
    '................','...w...w...w....','....w...w...w...','...w...w...w....','................',
    '.kkkkkkkkkkkk...','.kCCCCCCCCCCkkk.','.kpppppppppwk.k.','.kpppppppppwk.k.','.kpppPpPppppk.k.',
    '.kppppPppppwkkk.','..kppppppppwk...','..kppppppppk....','...kkkkkkkk.....','kkkkkkkkkkkkkkk.','.kgggggggggggk..'],
  drink: [
    '..........kk....','.........kr.....','........kr......','..kkkkkkrkkkk...','..kwwwwwrwwwk...',
    '..kmmmmmrmmmk...','..kwmmwmrmwmk...','..kccccccccck...','..kccccccccck...','..kCCCCCCCCCk...',
    '..kCCCCCCCCCk...','...kCCCCCCCk....','...kCCCCCCCk....','...kkkkkkkkk....'],
  fix: [
    '................','....kkkkk.......','...kbbbbbk......','..kbwwbbbbk.....','..kbwbrbrbk.....',
    '..kbbrrrrrk.....','..kbbrrrrrk.....','..kbbbrrrbk.....','...kbbrbbk......','....kkkkkkk.....',
    '..........kPk...','...........kPk..','............kPk.','.............kk.'],
  chart: [
    '................','kkkkkkkkkkkkkkkk','kwwwwwwwwwwwwwwk','kwwwwwwwwwwPPwwk','kwwwwwwwwwwPPwwk',
    'kwwwwwwllwwPPwwk','kwwwwwwllwwPPwwk','kwwbbwwllwwPPwwk','kwwbbwwllwwPPwwk','kwwbbwwllwwPPwwk',
    'kwkkkkkkkkkkkkwk','kwwwwwwwwwwwwwwk','kkkkkkkkkkkkkkkk'],
  folder: [
    '................','................','.kkkkk..........','kyyyyyk.........','kyyyyyykkkkkkkk.',
    'kyyyyyyyyyyyyyk.','kYYYYYYYYYYYYYYk','kyyyyyyyyyyyyyyk','kyyyyyyyyyyyyyyk','kyyyyyyyyyyyyyyk',
    'kyyyyyyyyyyyyyyk','kyyyyyyyyyyyyyyk','kYYYYYYYYYYYYYYk','kkkkkkkkkkkkkkkk'],
  bin: [
    '................','.....kkkkk......','..kkkkkkkkkkk...','..kgggggggggk...','..kkkkkkkkkkk...',
    '...kwgwgwgwk....','...kwgwgwgwk....','...kwgwgwgwk....','...kwgwgwgwk....','...kwgwgwgwk....',
    '...kwgwgwgwk....','...kwgwgwgwk....','....kkkkkkk.....'],
  note: [
    '................','......kkkkkkkk..','......kLLLLLLk..','......kkkkkkkk..','......k......k..',
    '......k......k..','......k......k..','......k......k..','....kkk....kkk..','...kLLLk..kLLLk.',
    '...kLLLk..kLLLk.','....kkk....kkk..'],
  monitor: [
    '................','.kkkkkkkkkkkkkk.','.kggggggggggggk.','.kgkkkkkkkkkkgk.','.kgkbbbbbbbbkgk.',
    '.kgkblllpppbkgk.','.kgkbbllppbbkgk.','.kgkbbbbbbbbkgk.','.kgkkkkkkkkkkgk.','.kggggggggggggk.',
    '.kkkkkkkkkkkkkk.','......kggk......','....kkkkkkkk....','....kggggggk....','....kkkkkkkk....'],
  notepad: [
    '..k.k.k.k.k.....','.kkkkkkkkkkkk...','.kwwwwwwwwwwk...','.kwkkkkkkkkwk...','.kwwwwwwwwwwk...',
    '.kwkkkkkkwwwk...','.kwwwwwwwwwwk...','.kwkkkkkkkkwk...','.kwwwwwwwwwwk...','.kwkkkkkwwwwk...',
    '.kwwwwwwwwwwk...','.kkkkkkkkkkkk...'],
  floppy: [
    'kkkkkkkkkkkkkkk.','kLLkwwwwwwwkLLk.','kLLkwwwwwwwkLLk.','kLLkwwwwwwwkLLk.','kLLkkkkkkkkkLLk.',
    'kLLLLLLLLLLLLLk.','kLLkkkkkkkkkLLk.','kLLkgggggGgkLLk.','kLLkgggggGgkLLk.','kLLkgggggGgkLLk.',
    'kkkkkkkkkkkkkkk.'],
  heart: [
    '..kkk.....kkk...','.krrrk...krrrk..','krwwrrk.krrrrrk.','krwrrrrkrrrrrrk.','krrrrrrrrrrrrrk.',
    'krrrrrrrrrrrrrk.','.krrrrrrrrrrrk..','..krrrrrrrrrk...','...krrrrrrrk....','....krrrrrk.....',
    '.....krrrk......','......krk.......','.......k........'],
  speaker: [
    '................','......k.........','.....kk.....k...','....kgk...k..k..','kkkkggk....k.k..',
    'kggggGk..k..k.k.','kggggGk..k..k.k.','kkkkggk....k.k..','....kgk...k..k..','.....kk.....k...','......k.........'],
  muted: [
    '................','......k.........','.....kk.........','....kgk..r...r..','kkkkggk...r.r...',
    'kggggGk....r....','kggggGk....r....','kkkkggk...r.r...','....kgk..r...r..','.....kk.........','......k.........'],
  lock: [
    '................','.....kkkkkk.....','....kgggggGk....','...kgk....kGk...','...kgk....kGk...',
    '...kgk....kGk...','..kkkkkkkkkkkk..','..kyyyyyyyyyYk..','..kyyyykkyyyYk..','..kyyyykkyyyYk..',
    '..kyyyyykyyyYk..','..kyyyyyyyyyYk..','..kYYYYYYYYYYk..','..kkkkkkkkkkkk..'],
  thumb: [
    'kkkkkkkkk','kwwwwwwwk','.kwwwwwk.','..kwwwk..','...kwk...','....k....'],
};
function pix(name) {
  const rows = ICONS[name]; if (!rows) return '';
  const W = Math.max(...rows.map(r => r.length));
  let rects = '';
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const ch = row[x]; let n = 1;
      while (row[x + n] === ch) n++;
      if (PAL[ch]) rects += `<rect x="${x}" y="${y}" width="${n}" height="1" fill="${PAL[ch]}"/>`;
      x += n;
    }
  });
  return `<svg viewBox="0 0 ${W} ${Math.max(W, rows.length)}" shape-rendering="crispEdges" aria-hidden="true">${rects}</svg>`;
}
const GLYPH = {
  min:   '<svg viewBox="0 0 10 10" aria-hidden="true"><rect x="1" y="7" width="6" height="2" fill="currentColor"/></svg>',
  max:   '<svg viewBox="0 0 10 10" aria-hidden="true"><path d="M1 1h8v8H1z M2 3v5h6V3z" fill="currentColor" fill-rule="evenodd"/></svg>',
  close: '<svg viewBox="0 0 10 10" aria-hidden="true"><path d="M1 1h2l2 2 2-2h2v2L7 5l2 2v2H7L5 7 3 9H1V7l2-2-2-2z" fill="currentColor"/></svg>',
  play:  '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2l10 6-10 6z" fill="currentColor"/></svg>',
  pause: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 2h4v12H3zM9 2h4v12H9z" fill="currentColor"/></svg>',
  prev:  '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 2h2v12H2zM14 2v12L5 8z" fill="currentColor"/></svg>',
  next:  '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M12 2h2v12h-2zM2 2v12l9-6z" fill="currentColor"/></svg>',
};
const ico = n => GLYPH[n] || pix(n);

// ── AUDIO ENGINE ──────────────────────────────────────────────────────────────
// Everything is synthesized in code — no samples. A shared bus (glue compressor, generated
// room reverb, tape echo) feeds small instrument voices used by the effects and the music.

let actx = null, bus = null;
function ac() {
  if (!actx) {
    const C = window.AudioContext || window.webkitAudioContext; if (!C) return null;
    try { actx = new C(); bus = makeBus(actx); } catch { actx = null; return null; }
  }
  if (actx.state === 'suspended') actx.resume().catch(() => {});
  return actx;
}
function chain(...nodes) { for (let i = 0; i < nodes.length - 1; i++) nodes[i].connect(nodes[i + 1]); return nodes[nodes.length - 1]; }
function send(from, to, amt) { const g = actx.createGain(); g.gain.value = amt; chain(from, g, to); }

function makeBus(a) {
  const comp = a.createDynamicsCompressor();
  comp.threshold.value = -18; comp.knee.value = 12; comp.ratio.value = 3; comp.attack.value = .004; comp.release.value = .25;
  chain(comp, a.destination);
  // stereo room impulse: filtered noise that darkens and decays
  const len = Math.floor(a.sampleRate * 2.4), ir = a.createBuffer(2, len, a.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = ir.getChannelData(ch); let lp = 0;
    for (let i = 0; i < len; i++) { const k = i / len; lp += (Math.random() * 2 - 1 - lp) * (.85 - .7 * k); d[i] = lp * Math.pow(1 - k, 3); }
  }
  const verb = a.createConvolver(); verb.buffer = ir;
  const verbIn = a.createGain(); verbIn.gain.value = .5;
  chain(verbIn, verb, comp);
  // tape echo: each repeat a little darker
  const dly = a.createDelay(2), fb = a.createGain(), dlp = a.createBiquadFilter(), dlyIn = a.createGain();
  dly.delayTime.value = .36; fb.gain.value = .35; dlp.type = 'lowpass'; dlp.frequency.value = 2400;
  chain(dlyIn, dly, dlp, fb, dly); dlp.connect(comp); dlp.connect(verbIn);
  const noise = a.createBuffer(1, a.sampleRate, a.sampleRate), nd = noise.getChannelData(0);
  for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
  const sfxOut = a.createGain(); sfxOut.gain.value = .9; sfxOut.connect(comp);
  const musicOut = a.createGain(); musicOut.connect(comp);
  return { comp, verb: verbIn, dly: dlyIn, dlyTime: dly.delayTime, noise, sfx: sfxOut, music: musicOut };
}

const hz = m => 440 * Math.pow(2, (m - 69) / 12);

// One enveloped note. Options: glide, lowpass sweep (cut → cutEnd), FM (ratio fm, index fmIdx),
// vibrato (cents), tape wobble, stereo pan, reverb/echo sends.
function note(o) {
  const a = actx, t = o.t, dur = o.dur, vol = o.vol ?? .1, att = o.att ?? .005;
  const osc = a.createOscillator(), env = a.createGain();
  osc.type = o.type || 'triangle';
  osc.frequency.setValueAtTime(o.f, t);
  if (o.glide) osc.frequency.exponentialRampToValueAtTime(o.glide, t + (o.glideT || dur));
  if (o.detune) osc.detune.value = o.detune;
  if (o.wobble) o.wobble.connect(osc.detune);
  const extras = [];
  if (o.fm) {
    const m = a.createOscillator(), mg = a.createGain();
    m.frequency.value = o.f * o.fm;
    mg.gain.setValueAtTime(o.f * (o.fmIdx || 2), t);
    mg.gain.exponentialRampToValueAtTime(o.f * .02 + .01, t + (o.fmDecay || dur));
    chain(m, mg, osc.frequency); extras.push(m);
  }
  if (o.vib) {
    const l = a.createOscillator(), lg = a.createGain();
    l.frequency.value = o.vibRate || 5.3; lg.gain.setValueAtTime(0, t); lg.gain.linearRampToValueAtTime(o.vib, t + Math.min(.3, dur));
    chain(l, lg, osc.detune); extras.push(l);
  }
  let head = osc;
  if (o.cut) {
    const f = a.createBiquadFilter(); f.type = 'lowpass'; f.Q.value = o.q || .7;
    f.frequency.setValueAtTime(o.cut, t);
    if (o.cutEnd) f.frequency.exponentialRampToValueAtTime(o.cutEnd, t + (o.cutT || dur));
    head = chain(osc, f);
  }
  env.gain.setValueAtTime(0, t);
  env.gain.linearRampToValueAtTime(vol, t + att);
  if (o.hold) env.gain.setValueAtTime(vol, t + att + o.hold);
  env.gain.exponentialRampToValueAtTime(.0001, t + dur);
  let tail = chain(head, env);
  if (o.pan && a.createStereoPanner) { const p = a.createStereoPanner(); p.pan.value = o.pan; tail = chain(env, p); }
  tail.connect(o.out || bus.sfx);
  if (o.verb) send(tail, bus.verb, o.verb);
  if (o.echo) send(tail, bus.dly, o.echo);
  [osc, ...extras].forEach(n => { n.start(t); n.stop(t + dur + .05); });
}
// Filtered noise burst (clicks, hats, snares, shimmer).
function hiss(o) {
  const a = actx, s = a.createBufferSource(), f = a.createBiquadFilter(), g = a.createGain();
  s.buffer = bus.noise; s.loop = true;
  f.type = o.ftype || 'bandpass'; f.frequency.setValueAtTime(o.f, o.t); f.Q.value = o.q || 1;
  if (o.fEnd) f.frequency.exponentialRampToValueAtTime(o.fEnd, o.t + o.dur);
  g.gain.setValueAtTime(0, o.t); g.gain.linearRampToValueAtTime(o.vol, o.t + (o.att || .001));
  g.gain.exponentialRampToValueAtTime(.0001, o.t + o.dur);
  let tail = chain(s, f, g);
  if (o.pan && a.createStereoPanner) { const p = a.createStereoPanner(); p.pan.value = o.pan; tail = chain(g, p); }
  tail.connect(o.out || bus.sfx);
  if (o.verb) send(tail, bus.verb, o.verb);
  s.start(o.t, Math.random() * .9); s.stop(o.t + o.dur + .02);
}

const SFX = {
  click: t => {
    hiss({ t, dur: .016, f: 4200, q: 1.4, vol: .2 });
    note({ t, f: 2600, glide: 1400, dur: .018, type: 'sine', vol: .025 });
  },
  open: t => {
    note({ t, f: 440, glide: 990, glideT: .08, dur: .14, type: 'triangle', vol: .08, cut: 3000, verb: .2 });
    note({ t: t + .05, f: hz(88), dur: .5, type: 'sine', fm: 3.5, fmIdx: 1.1, fmDecay: .15, vol: .03, verb: .45, pan: .3 });
  },
  close: t => {
    note({ t, f: 880, glide: 400, glideT: .09, dur: .13, type: 'triangle', vol: .07, cut: 2400, verb: .15 });
    hiss({ t, dur: .08, f: 1600, fEnd: 500, q: .8, vol: .04 });
  },
  error: t => {
    note({ t, f: hz(45), dur: .3, type: 'triangle', vol: .1, cut: 600 });
    [[76, 0, -.25], [69, .1, .25]].forEach(([m, d, pan]) =>
      note({ t: t + d, f: hz(m), dur: 1.3, type: 'sine', fm: 3.5, fmIdx: 2.2, fmDecay: .45, vol: .09, verb: .45, pan }));
  },
  yay: t => {
    [72, 76, 79, 84, 88].forEach((m, i) =>
      note({ t: t + i * .065, f: hz(m), dur: .8, type: 'sine', fm: 2, fmIdx: 1.8, fmDecay: .25, vol: .055, verb: .45, echo: .1, pan: -.4 + i * .2 }));
    hiss({ t: t + .2, dur: .7, f: 9000, ftype: 'highpass', att: .25, vol: .03, verb: .6 });
  },
  chime: t => {   // startup: a warm Cmaj9 swell with a bell motif on top
    [48, 55, 59, 62, 64, 67].forEach((m, i) => [-8, 8].forEach(dt =>
      note({ t, f: hz(m), detune: dt, type: 'sawtooth', att: .7, hold: .6, dur: 3.8, vol: .014, cut: 350, cutEnd: 2200, cutT: 1.4, verb: .5, pan: (i % 2 ? .3 : -.3) * Math.sign(dt) })));
    note({ t, f: hz(36), dur: 3, type: 'sine', att: .4, vol: .11 });
    [79, 84, 86, 91, 88].forEach((m, i) =>
      note({ t: t + .45 + i * .17, f: hz(m), dur: 1.8, type: 'sine', fm: 3.5, fmIdx: 1.4, fmDecay: .35, vol: .045, verb: .6, echo: .15, pan: i % 2 ? .4 : -.4 }));
    hiss({ t, dur: 2, f: 7000, ftype: 'highpass', att: 1, vol: .02, verb: .6 });
  },
};
function sfx(name) {
  if (!settings.snd) return;
  const a = ac(); if (!a) return;
  try { SFX[name](a.currentTime + .01); } catch {}
}

// ── WINDOW MANAGER ────────────────────────────────────────────────────────────

const APPS = {
  brew:    { title:'Brew.exe',           icon:'cup',     tpl:'t-brew',    w:540, h:640, x:110, y:14,
             menu:[['<u>S</u>ave brew…', () => openSave()], ['<u>M</u>y Brews', () => openApp('brews')], ['<u>H</u>elp', () => openApp('readme')]] },
  drinks:  { title:'Drinks.exe',         icon:'drink',   tpl:'t-drinks',  w:600, h:560, x:190, y:40,
             menu:[['<u>H</u>elp', () => openApp('readme')]] },
  fix:     { title:'Fix.exe',            icon:'fix',     tpl:'t-fix',     w:500, h:600, x:260, y:30,
             menu:[['<u>M</u>easure…', () => openApp('measure')], ['<u>H</u>elp', () => openApp('readme')]] },
  measure: { title:'Measure.exe',        icon:'chart',   tpl:'t-measure', w:540, h:640, x:320, y:20,
             menu:[['<u>C</u>lear', () => clearEY()], ['<u>F</u>ix…', () => openApp('fix')], ['<u>H</u>elp', () => openApp('readme')]] },
  brews:   { title:'My Brews',           icon:'folder',  tpl:'t-brews',   w:560, h:340, x:150, y:120 },
  bin:     { title:'Recycle Bin',        icon:'bin',     tpl:'t-bin',     w:440, h:300, x:220, y:160 },
  music:   { title:'Music Player',       icon:'note',    tpl:'t-music',   w:300, h:290, x:420, y:260 },
  display: { title:'Display Properties', icon:'monitor', tpl:'t-display', w:420, h:400, x:260, y:80 },
  readme:  { title:'readme.txt - Notes', icon:'notepad', tpl:'t-readme', w:500, h:420, x:200, y:60 },
  legal:   { title:'Legal & Privacy',    icon:'lock',    tpl:'t-legal',   w:520, h:500, x:240, y:40 },
};
const DESK_ICONS = [
  ['brew', 'Brew.exe'], ['drinks', 'Drinks.exe'], ['fix', 'Fix.exe'], ['measure', 'Measure.exe'],
  ['brews', 'My Brews'], ['music', 'Music Player'], ['bin', 'Recycle Bin'], ['display', 'Display'], ['readme', 'readme.txt'],
];
const winState = {};   // id -> 'closed' | 'open' | 'min'
const placed = {};
let zTop = 10, focusedId = null;

function makeWin(id) {
  const A = APPS[id];
  const el = document.createElement('section');
  el.className = 'win'; el.id = 'w-' + id; el.hidden = true;
  el.setAttribute('role', 'dialog'); el.setAttribute('aria-label', A.title);
  el.innerHTML = `
    <div class="win-title">${pix(A.icon)}<h2>${esc(A.title)}</h2>
      <button class="tbtn" data-act="min" aria-label="Minimize">${GLYPH.min}</button>
      <button class="tbtn maxb" data-act="max" aria-label="Maximize">${GLYPH.max}</button>
      <button class="tbtn close" data-act="close" aria-label="Close">${GLYPH.close}</button>
    </div>
    ${A.menu ? `<div class="win-menu">${A.menu.map((m, i) => `<button data-menu="${i}">${m[0]}</button>`).join('')}</div>` : ''}
    <div class="win-body"></div>
    <div class="win-status"><span id="st-${id}">Ready</span><span>breu 98</span></div>
    <div class="grip" aria-hidden="true"></div>`;
  el.querySelector('.win-body').append($('#' + A.tpl).content.cloneNode(true));
  $('#wins').append(el);

  el.addEventListener('pointerdown', () => focusWin(id), true);
  el.querySelector('.win-title').addEventListener('click', e => {
    const b = e.target.closest('[data-act]'); if (!b) return;
    sfx('click');
    if (b.dataset.act === 'min') minWin(id);
    else if (b.dataset.act === 'max') { el.classList.toggle('max'); saveLayout(); }
    else closeWin(id);
  });
  el.querySelector('.win-title').addEventListener('dblclick', e => { if (!e.target.closest('button')) { el.classList.toggle('max'); saveLayout(); } });
  el.querySelector('.win-menu')?.addEventListener('click', e => {
    const b = e.target.closest('[data-menu]'); if (b) { sfx('click'); A.menu[+b.dataset.menu][1](); }
  });
  dragify(el, el.querySelector('.win-title'), 'move');
  dragify(el, el.querySelector('.grip'), 'size');
  return el;
}

function dragify(el, handle, mode) {
  handle.addEventListener('pointerdown', e => {
    if (e.button !== 0 || e.target.closest('button') || isPhone() || el.classList.contains('max')) return;
    e.preventDefault();
    const desk = $('#desktop').getBoundingClientRect();
    const sx = e.clientX, sy = e.clientY;
    const r0 = { l: el.offsetLeft, t: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight };
    handle.setPointerCapture(e.pointerId);
    let dx = 0, dy = 0, raf = 0;
    const apply = () => {
      raf = 0;
      if (mode === 'move') {
        el.style.left = Math.min(desk.width - 60, Math.max(60 - r0.w, r0.l + dx)) + 'px';
        el.style.top  = Math.min(desk.height - 24, Math.max(0, r0.t + dy)) + 'px';
      } else {
        el.style.width  = Math.max(250, r0.w + dx) + 'px';
        el.style.height = Math.max(140, r0.h + dy) + 'px';
      }
    };
    const move = ev => { dx = ev.clientX - sx; dy = ev.clientY - sy; if (!raf) raf = requestAnimationFrame(apply); };
    const up = () => {
      handle.removeEventListener('pointermove', move); handle.removeEventListener('pointerup', up); handle.removeEventListener('pointercancel', up);
      if (raf) { cancelAnimationFrame(raf); apply(); }
      saveLayout();
    };
    handle.addEventListener('pointercancel', up);
    handle.addEventListener('pointermove', move);
    handle.addEventListener('pointerup', up);
  });
}

function placeWin(id) {
  const A = APPS[id], el = $('#w-' + id), d = $('#desktop');
  const w = Math.min(A.w, d.clientWidth - 12), h = Math.min(A.h, d.clientHeight - 12);
  el.style.width = w + 'px'; el.style.height = h + 'px';
  el.style.left = Math.max(4, Math.min(A.x, d.clientWidth - w - 6)) + 'px';
  el.style.top  = Math.max(4, Math.min(A.y, d.clientHeight - h - 6)) + 'px';
  placed[id] = true;
}

function openApp(id) {
  closeStart();
  const el = $('#w-' + id);
  if (!placed[id]) placeWin(id);
  if (winState[id] !== 'open') sfx('open');
  el.hidden = false; winState[id] = 'open';
  focusWin(id);
  APPS[id].onOpen?.();
}
function focusWin(id) {
  if (focusedId === id && $('#w-' + id).style.zIndex == zTop) return;
  focusedId = id;
  $$('.win:not(.dlg)').forEach(w => w.classList.toggle('focused', w.id === 'w-' + id));
  $('#w-' + id).style.zIndex = ++zTop;
  renderTasks(); saveLayout();
}
function minWin(id) { $('#w-' + id).hidden = true; winState[id] = 'min'; if (focusedId === id) focusedId = null; renderTasks(); saveLayout(); }
function closeWin(id) {
  $('#w-' + id).hidden = true; winState[id] = 'closed';
  if (focusedId === id) focusedId = null;
  sfx('close'); APPS[id].onClose?.(); renderTasks(); saveLayout();
}

let layoutTimer;
function saveLayout() {
  clearTimeout(layoutTimer);
  layoutTimer = setTimeout(() => {
    const wins = {};
    Object.keys(APPS).forEach(id => {
      if (!winState[id] || winState[id] === 'closed') return;
      const el = $('#w-' + id), px = v => parseInt(v, 10) || null;
      wins[id] = { s: winState[id], x: px(el.style.left), y: px(el.style.top), w: px(el.style.width), h: px(el.style.height),
                   max: el.classList.contains('max'), z: +el.style.zIndex || 0 };
    });
    store.set('layout', { wins, focus: focusedId });
  }, 250);
}
function restoreLayout() {
  const L = store.get('layout', null);
  const ids = L && L.wins ? Object.keys(L.wins).filter(id => APPS[id]).sort((a, b) => L.wins[a].z - L.wins[b].z) : [];
  if (!ids.length) return false;
  const d = $('#desktop');
  ids.forEach(id => {
    const g = L.wins[id], el = $('#w-' + id), A = APPS[id];
    const w = Math.min(g.w || A.w, d.clientWidth - 12), h = Math.min(g.h || A.h, d.clientHeight - 12);
    el.style.width = w + 'px'; el.style.height = h + 'px';
    el.style.left = Math.max(60 - w, Math.min(g.x ?? A.x, d.clientWidth - 60)) + 'px';
    el.style.top  = Math.max(0, Math.min(g.y ?? A.y, d.clientHeight - 30)) + 'px';
    el.classList.toggle('max', !!g.max);
    el.style.zIndex = ++zTop;
    placed[id] = true;
    winState[id] = g.s === 'min' ? 'min' : 'open';
    el.hidden = winState[id] !== 'open';
  });
  const f = winState[L.focus] === 'open' ? L.focus : ids.filter(id => winState[id] === 'open').pop();
  if (f) focusWin(f); else renderTasks();
  return true;
}
function setStatus(id, text) { const s = $('#st-' + id); if (s) s.textContent = text; }

// ── TASKBAR + START ───────────────────────────────────────────────────────────

function renderTasks() {
  $('#tasks').innerHTML = Object.keys(APPS).filter(id => winState[id] && winState[id] !== 'closed').map(id =>
    `<button class="btn${id === focusedId && winState[id] === 'open' ? ' on' : ''}" data-id="${id}" title="${esc(APPS[id].title)}">${pix(APPS[id].icon)}<span>${esc(APPS[id].title)}</span></button>`
  ).join('');
}
$('#tasks').addEventListener('click', e => {
  const b = e.target.closest('[data-id]'); if (!b) return;
  const id = b.dataset.id; sfx('click');
  if (winState[id] === 'open' && focusedId === id) minWin(id); else openApp(id);
});

const START_ITEMS = [
  ['brew', 'Brew.exe'], ['drinks', 'Drinks.exe'], ['fix', 'Fix.exe'], ['measure', 'Measure.exe'], '-',
  ['brews', 'My Brews'], ['music', 'Music Player'], '-',
  ['display', 'Display Properties'], ['readme', 'readme.txt'], ['legal', 'Legal & Privacy'], '-',
  ['shutdown', 'Shut Down…'],
];
$('#start-list').innerHTML = START_ITEMS.map(it => it === '-' ? '<li role="separator"><hr></li>' :
  `<li><button role="menuitem" data-id="${it[0]}">${pix(it[0] === 'shutdown' ? 'monitor' : APPS[it[0]].icon)}${esc(it[1])}</button></li>`).join('');
$('#start-ico').innerHTML = pix('cup');

function closeStart() { $('#start-menu').hidden = true; $('#start-btn').classList.remove('on'); $('#start-btn').setAttribute('aria-expanded', 'false'); }
$('#start-btn').addEventListener('click', e => {
  e.stopPropagation(); sfx('click');
  const open = $('#start-menu').hidden;
  $('#start-menu').hidden = !open;
  $('#start-btn').classList.toggle('on', open);
  $('#start-btn').setAttribute('aria-expanded', String(open));
  if (open) $('#start-list button').focus();
});
$('#start-list').addEventListener('click', e => {
  const b = e.target.closest('[data-id]'); if (!b) return;
  closeStart();
  if (b.dataset.id === 'shutdown') shutDown(); else openApp(b.dataset.id);
});
document.addEventListener('pointerdown', e => {
  if (!$('#start-menu').hidden && !e.target.closest('#start-menu, #start-btn')) closeStart();
  if (!e.target.closest('.dicon')) $$('.dicon.sel').forEach(d => d.classList.remove('sel'));
});

function tick() {
  $('#clock').textContent = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

function renderSoundBtn() {
  const b = $('#snd-btn');
  b.innerHTML = pix(settings.snd ? 'speaker' : 'muted');
  b.setAttribute('aria-label', settings.snd ? 'Sound on' : 'Sound off');
  b.title = b.getAttribute('aria-label');
  const o = $('#opt-snd'); if (o) o.checked = settings.snd;
}
$('#snd-btn').addEventListener('click', () => { settings.snd = !settings.snd; saveSettings(); renderSoundBtn(); sfx('click'); });

// ── DESKTOP ICONS ─────────────────────────────────────────────────────────────

$('#icons').innerHTML = DESK_ICONS.map(([id, label]) =>
  `<button class="dicon" role="listitem" data-id="${id}">${pix(APPS[id].icon)}<span>${esc(label)}</span></button>`).join('');
$('#icons').addEventListener('click', e => {
  const b = e.target.closest('.dicon'); if (!b) return;
  $$('.dicon.sel').forEach(d => d.classList.remove('sel'));
  b.classList.add('sel');
  if (matchMedia('(pointer: coarse)').matches || e.detail === 0) openApp(b.dataset.id);
});
$('#icons').addEventListener('dblclick', e => { const b = e.target.closest('.dicon'); if (b) openApp(b.dataset.id); });

// ── DIALOGS ───────────────────────────────────────────────────────────────────

let dlgOpen = 0;
function dialog({ title = 'Message', text = '', icon = 'heart', buttons = ['OK'], input = null, sound = 'error' }) {
  return new Promise(resolve => {
    const el = document.createElement('section');
    el.className = 'win dlg focused'; el.setAttribute('role', 'alertdialog'); el.setAttribute('aria-label', title);
    el.style.zIndex = 7000 + (++dlgOpen);
    el.innerHTML = `
      <div class="win-title">${pix(icon)}<h2>${esc(title)}</h2><button class="tbtn close" data-i="-1" aria-label="Close">${GLYPH.close}</button></div>
      <div class="win-body">${pix(icon)}<div><p>${esc(text)}</p>${input !== null ? `<input class="field sm" style="margin-top:8px;" maxlength="${NAME_MAX}" value="${esc(input)}" aria-label="${esc(text)}">` : ''}</div></div>
      <div class="dlg-btns">${buttons.map((b, i) => `<button class="btn" data-i="${i}">${esc(b)}</button>`).join('')}</div>`;
    document.body.append(el);
    const inp = el.querySelector('input');
    const done = i => { dlgOpen--; el.remove(); document.removeEventListener('keydown', key); sfx('click'); resolve(input !== null ? { i, value: inp.value.trim() } : i); };
    const key = e => { if (e.key === 'Escape') done(-1); if (e.key === 'Enter' && inp) done(0); };
    el.addEventListener('click', e => { const b = e.target.closest('[data-i]'); if (b) done(+b.dataset.i); });
    document.addEventListener('keydown', key);
    (inp || el.querySelector('.dlg-btns .btn')).focus();
    if (inp) inp.select();
    sfx(sound);
  });
}

const POPS = {
  under: [
    { t: "coffee.exe is under-extracted :( it wants more time with the grounds.", b: ['cry', 'grind finer', 'ok'] },
    { t: "error 18%: your cup is shy and a little sour. give it some love (and heat).", b: ['aww', 'raise temp', 'ok'] },
  ],
  over: [
    { t: "coffee.exe got too clingy with the grounds. bitter vibes detected.", b: ['sob', 'go coarser', 'drink it anyway'] },
    { t: "warning: extraction over 22%. your cup has entered its emo phase.", b: ['relatable', 'fix it', 'ok'] },
  ],
  ideal: [
    { t: "golden cup achieved! you're doing amazing sweetie.", b: ['yay', 'yay!!', 'yay!!!'] },
    { t: "perfect extraction. the beans are so proud of you.", b: ['blush', 'sip', 'ok'] },
  ],
  sym: [
    { t: "coffee.exe tastes like a lemon wearing a tiny sweater :(", b: ['cry', 'grind finer', 'ok'] },
    { t: "your cup is being dramatic. bitter AND harsh?? rude.", b: ['sob', 'go coarser', 'ok'] },
    { t: "is this coffee or sad bean water? (it's sad bean water)", b: ['lol', 'more beans', 'ok'] },
    { t: "your coffee could lift a car. please hydrate it.", b: ['flex', 'add water', 'ok'] },
    { t: "your tongue now feels like a wool sock. tannins did that.", b: ['blep', 'go coarser', 'ok'] },
    { t: "coffee.exe has lost its sparkle. when were these beans roasted?", b: ['idk', 'fresh beans', 'ok'] },
    { t: "fatal error: channelling detected. the water took a shortcut.", b: ['cry', 'fix my puck', 'ok'] },
  ],
};
const seenPops = new Set();
function silly(pop, sound = 'error', key) {
  if (!settings.pop || dlgOpen || seenPops.has(key)) return;
  seenPops.add(key);
  dialog({ title: sound === 'yay' ? 'Message' : 'Error', text: pop.t, buttons: pop.b, sound });
}

// ── BOOT / SHUTDOWN ───────────────────────────────────────────────────────────

let booted = false;
function finishBoot() {
  if (booted) return; booted = true;
  const b = $('#boot'); b.classList.add('out');
  setTimeout(() => { b.hidden = true; }, 420);
  sfx('chime');
  store.set('visited', true);
  if (!restoreLayout()) openApp('brew');
}
function boot(force) {
  booted = false;
  const b = $('#boot');
  if (!force && !settings.bootEvery && store.get('visited', false)) { b.hidden = true; finishBoot(); return; }
  b.hidden = false; b.classList.remove('out');
  setTimeout(finishBoot, 1900);
}
$('#boot').addEventListener('click', finishBoot);

async function shutDown() {
  const i = await dialog({ title: 'Shut Down breu 98', icon: 'monitor', text: 'Are you sure you want to shut down? Your coffee will wait for you.', buttons: ['Shut down', 'Cancel'], sound: 'click' });
  if (i !== 0) return;
  Object.keys(APPS).forEach(id => { if (winState[id] && winState[id] !== 'closed') closeWin(id); });
  $('#shutdown').hidden = false;
}
$('#shutdown').addEventListener('click', () => { $('#shutdown').hidden = true; boot(true); });

// ── BUILD WINDOWS ─────────────────────────────────────────────────────────────

Object.keys(APPS).forEach(makeWin);
$$('[data-ico]').forEach(s => { s.outerHTML = ico(s.dataset.ico); });

function tabStrip(el, list, active) {
  el.innerHTML = list.map(c => `<button class="tab" role="tab" aria-selected="${c === active}" data-v="${esc(c)}">${esc(c)}</button>`).join('');
}

// ── BREW ──────────────────────────────────────────────────────────────────────

const CATEGORIES = ['Drippers', 'Immersion', 'Pressure', 'Traditional', 'Cold'];
let activeCat = 'Drippers', activeMethod = 'V60';

function buildCatTabs() { tabStrip($('#cat-tabs'), CATEGORIES, activeCat); }
function buildMethodChips() {
  const names = Object.keys(METHODS).filter(k => METHODS[k].cat === activeCat);
  $('#method-chips').innerHTML = names.map(n =>
    `<button class="btn${n === activeMethod ? ' on' : ''}" aria-pressed="${n === activeMethod}" data-m="${esc(n)}">${esc(n)}</button>`).join('');
}
$('#cat-tabs').addEventListener('click', e => {
  const b = e.target.closest('[data-v]'); if (!b) return;
  sfx('click'); activeCat = b.dataset.v; buildCatTabs();
  const first = Object.keys(METHODS).find(k => METHODS[k].cat === activeCat);
  if (first && first !== activeMethod) selectMethod(first); else buildMethodChips();
});
$('#method-chips').addEventListener('click', e => {
  const b = e.target.closest('[data-m]'); if (b) { sfx('click'); selectMethod(b.dataset.m); }
});

function setAcc(btnId, bodyId, open) {
  $('#' + btnId).setAttribute('aria-expanded', String(open));
  $('#' + bodyId).hidden = !open;
}
$('#guide-btn').addEventListener('click', () => { sfx('click'); setAcc('guide-btn', 'guide-body', $('#guide-body').hidden); });
$('#dialin-btn').addEventListener('click', () => { sfx('click'); setAcc('dialin-btn', 'dialin-body', $('#dialin-body').hidden); });

function selectMethod(name, keepRatio) {
  activeMethod = name;
  activeCat = METHODS[name].cat;
  buildCatTabs(); buildMethodChips();
  const m = METHODS[name];
  $('#p-grind').textContent = m.grind;
  $('#p-temp').textContent  = m.temp;
  $('#p-time').textContent  = m.time;
  $('#p-ratio').textContent = '1 : ' + m.ratio;
  $('#p-body').textContent  = m.body;
  $('#p-clarity').textContent = m.clarity;
  $('#p-sens').textContent  = m.sensitivity;
  $('#method-desc').textContent = m.description;
  if (!keepRatio) $('#ratio').value = m.ratio;

  $('#guide-steps').innerHTML = m.steps.map((s, i) =>
    `<li><span class="n">${String(i + 1).padStart(2, '0')}</span><span>${esc(s.text)}</span><span></span><span class="why">${esc(s.why)}</span></li>`).join('');
  $('#dialin-tips').innerHTML = m.dialIn.map(t => `<li><span class="n">→</span><span>${esc(t)}</span></li>`).join('');
  $('#best-with').textContent = m.bestWith;

  setAcc('guide-btn', 'guide-body', false);
  setAcc('dialin-btn', 'dialin-body', false);
  calcBrew();
}

function brewNumbers() {
  const val = (sel, max) => { const v = parseFloat($(sel).value); return v > 0 && v <= max ? v : 0; };
  const dose = val('#dose', 2000), ratio = val('#ratio', 100);
  if (!dose || !ratio) return { dose, ratio, water: '—', cup: '—' };
  const water = Math.round(dose * ratio);
  let cup;
  if (METHODS[activeMethod].espresso) cup = Math.round(dose * ratio) + ' g';
  else { const inCup = Math.round(water - dose * 2); cup = inCup > 0 ? inCup + ' ml' : '—'; }
  return { dose, ratio, water: water + ' g', cup };
}
function calcBrew() {
  const n = brewNumbers();
  $('#out-water').textContent = n.water;
  $('#out-cup').textContent   = n.cup;
  setStatus('brew', n.dose && n.ratio ? `${activeMethod} · ${n.dose} g · 1:${n.ratio} · ${n.water} water` : activeMethod);
}
$('#dose').addEventListener('input', calcBrew);
$('#ratio').addEventListener('input', calcBrew);

// ── MY BREWS + RECYCLE BIN ────────────────────────────────────────────────────

// Saved data is re-validated on load: anything malformed or unexpected is dropped, never rendered.
const NAME_MAX = 60, BREWS_MAX = 200, BIN_MAX = 50;
const isDate = v => typeof v === 'string' && !isNaN(Date.parse(v));
function cleanBrew(b) {
  if (!isObj(b) || typeof b.method !== 'string' || !own(METHODS, b.method) || !isDate(b.saved)) return null;
  const num = v => Number.isFinite(+v) && +v > 0 ? Math.round(+v * 100) / 100 : null;
  const dose = num(b.dose), ratio = num(b.ratio);
  if (!dose || !ratio) return null;
  const out = { id: String(b.id).replace(/[^a-z0-9]/gi, '').slice(0, 20) || Math.random().toString(36).slice(2),
    name: String(b.name ?? b.method).slice(0, NAME_MAX), method: b.method, dose, ratio, water: Math.round(dose * ratio) + ' g', saved: b.saved };
  if (isDate(b.deleted)) out.deleted = b.deleted;
  return out;
}
const loadList = (k, max) => { const v = store.get(k, []); return Array.isArray(v) ? v.map(cleanBrew).filter(Boolean).slice(0, max) : []; };
let brews = loadList('brews', BREWS_MAX);
let bin   = loadList('bin', BIN_MAX).filter(b => b.deleted);
let selBrew = null, selBin = null;
const persistBrews = () => {
  brews = brews.slice(0, BREWS_MAX); bin = bin.slice(0, BIN_MAX);
  return store.set('brews', brews) & store.set('bin', bin);
};
const fmtDate = iso => new Date(iso).toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' ' +
  new Date(iso).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

async function openSave() {
  openApp('brew');
  const n = brewNumbers();
  if (!n.dose || !n.ratio) { dialog({ title: 'Save brew', text: 'Enter a dose and ratio first.', buttons: ['OK'] }); return; }
  const r = await dialog({ title: 'Save As', icon: 'floppy', text: 'Name this brew:', input: `${activeMethod} ${n.dose}g 1:${n.ratio}`, buttons: ['Save', 'Cancel'], sound: 'click' });
  if (r.i !== 0) return;
  if (brews.length >= BREWS_MAX) { dialog({ title: 'Disk full', icon: 'folder', text: `My Brews holds up to ${BREWS_MAX} brews. Delete a few to make room.`, buttons: ['OK'] }); return; }
  brews.unshift({ id: Date.now().toString(36), name: (r.value || activeMethod).slice(0, NAME_MAX), method: activeMethod, dose: n.dose, ratio: n.ratio, water: n.water, saved: new Date().toISOString() });
  const ok = persistBrews(); renderBrews();
  if (!ok) { dialog({ title: 'Save brew', icon: 'floppy', text: "Saved for now, but this browser won't let breu 98 keep it after you close the page (private mode or storage blocked).", buttons: ['OK'] }); return; }
  const j = await dialog({ title: 'Message', icon: 'floppy', text: 'Brew saved to My Brews.', buttons: ['yay', 'Open folder'], sound: 'yay' });
  if (j === 1) openApp('brews');
}
$('#save-brew').addEventListener('click', () => { sfx('click'); openSave(); });
$('#open-brews').addEventListener('click', () => openApp('brews'));

function renderBrews() {
  $('#mb-rows').innerHTML = brews.map(b =>
    `<tr data-id="${esc(b.id)}" class="${b.id === selBrew ? 'sel' : ''}"><td>${pix('floppy').replace('<svg', '<svg width="14" height="14" style="vertical-align:-2px;margin-right:6px"')}${esc(b.name)}</td><td>${esc(b.method)}</td><td>${esc(b.dose)} g</td><td>1:${esc(b.ratio)}</td><td>${esc(b.water)}</td><td>${esc(fmtDate(b.saved))}</td></tr>`).join('');
  $('#mb-empty').hidden = brews.length > 0;
  $('#mb-open').disabled = $('#mb-del').disabled = !brews.some(b => b.id === selBrew);
  setStatus('brews', `${brews.length} object(s)`);
}
function renderBin() {
  $('#bin-rows').innerHTML = bin.map(b =>
    `<tr data-id="${esc(b.id)}" class="${b.id === selBin ? 'sel' : ''}"><td>${esc(b.name)}</td><td>${esc(b.method)}</td><td>${esc(fmtDate(b.deleted))}</td></tr>`).join('');
  $('#bin-none').hidden = bin.length > 0;
  $('#bin-restore').disabled = !bin.some(b => b.id === selBin);
  $('#bin-empty').disabled = !bin.length;
  setStatus('bin', `${bin.length} object(s)`);
}
function loadBrew(id) {
  const b = brews.find(x => x.id === id); if (!b || !METHODS[b.method]) return;
  openApp('brew');
  selectMethod(b.method, true);
  $('#dose').value = b.dose; $('#ratio').value = b.ratio;
  calcBrew();
}
$('#mb-rows').addEventListener('click', e => { const r = e.target.closest('tr'); if (r) { selBrew = r.dataset.id; renderBrews(); } });
$('#mb-rows').addEventListener('dblclick', e => { const r = e.target.closest('tr'); if (r) loadBrew(r.dataset.id); });
$('#mb-open').addEventListener('click', () => loadBrew(selBrew));
$('#mb-del').addEventListener('click', () => {
  const b = brews.find(x => x.id === selBrew); if (!b) return;
  brews = brews.filter(x => x !== b);
  bin.unshift({ ...b, deleted: new Date().toISOString() });
  selBrew = null; persistBrews(); renderBrews(); renderBin(); sfx('close');
});
$('#bin-rows').addEventListener('click', e => { const r = e.target.closest('tr'); if (r) { selBin = r.dataset.id; renderBin(); } });
$('#bin-restore').addEventListener('click', () => {
  const b = bin.find(x => x.id === selBin); if (!b) return;
  bin = bin.filter(x => x !== b);
  const { deleted, ...rest } = b; brews.unshift(rest);
  selBin = null; persistBrews(); renderBrews(); renderBin(); sfx('open');
});
$('#bin-empty').addEventListener('click', async () => {
  const i = await dialog({ title: 'Confirm Delete', icon: 'bin', text: `Permanently delete ${bin.length} brew(s)? They'll be gone like the last sip.`, buttons: ['Delete', 'Keep'] });
  if (i !== 0) return;
  bin = []; selBin = null; persistBrews(); renderBin();
});

// ── DRINKS ────────────────────────────────────────────────────────────────────

const DRINK_CATS = ['All', 'Espresso', 'Milk', 'Cold'];
let activeDrinkCat = 'All', openDrink = null;

function soften(hex, t = .06) {
  const n = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
  return `rgb(${n.map(v => Math.round(v * (1 - t) + 255 * t)).join(',')})`;
}
function buildDrinks() {
  tabStrip($('#drink-cats'), DRINK_CATS, activeDrinkCat);
  const list = activeDrinkCat === 'All' ? DRINKS : DRINKS.filter(d => d.cat === activeDrinkCat);
  $('#drinks-grid').innerHTML = list.map(d => {
    const total = d.layers.reduce((s, l) => s + l.pct, 0);
    const glass = d.layers.map(l => `<i style="flex:${l.pct / total}; background:${soften(l.color)}"></i>`).join('');
    const open = d.name === openDrink;
    return `<div class="drink${open ? ' open' : ''}">
      <button class="drink-hd" aria-expanded="${open}" data-d="${esc(d.name)}">
        <span class="glass" aria-hidden="true">${glass}</span>
        <span><span class="h4">${esc(d.name)}</span><span class="serve">${esc(d.serve)}</span><span class="tag">${esc(d.tagline)}</span></span>
      </button>
      ${open ? `<div class="recipe">
        <span class="lbl">Recipe</span>
        <ol class="steps">${d.steps.map((s, i) => `<li><span class="n">${String(i + 1).padStart(2, '0')}</span><span>${esc(s)}</span></li>`).join('')}</ol>
        <div class="layers">${d.layers.map(l => `<span><i style="background:${soften(l.color)}"></i>${esc(l.label)} ${l.pct}%</span>`).join('')}</div>
        <div class="recipe-foot"><span class="lbl" style="margin:0">Ratio</span><span class="num">${esc(d.ratio)}</span></div>
      </div>` : ''}
    </div>`;
  }).join('');
  setStatus('drinks', `${list.length} object(s)` + (openDrink ? ` · ${openDrink}` : ''));
}
$('#drink-cats').addEventListener('click', e => {
  const b = e.target.closest('[data-v]'); if (!b) return;
  sfx('click'); activeDrinkCat = b.dataset.v; openDrink = null; buildDrinks();
});
$('#drinks-grid').addEventListener('click', e => {
  const b = e.target.closest('[data-d]'); if (!b) return;
  sfx('click'); openDrink = openDrink === b.dataset.d ? null : b.dataset.d; buildDrinks();
  $(`[data-d="${CSS.escape(b.dataset.d)}"]`)?.focus();
});

// ── FIX ───────────────────────────────────────────────────────────────────────

$('#spec-thumb').innerHTML = pix('thumb');
$('#ey-thumb').innerHTML = pix('thumb');
$('#sym-chips').innerHTML = SYMPTOMS.map((s, i) => `<button class="btn" aria-pressed="false" data-s="${i}">${esc(s.tag)}</button>`).join('');
$('#sym-chips').addEventListener('click', e => {
  const b = e.target.closest('[data-s]'); if (!b) return;
  const i = +b.dataset.s, s = SYMPTOMS[i];
  $$('#sym-chips .btn').forEach((el, j) => { el.classList.toggle('on', j === i); el.setAttribute('aria-pressed', String(j === i)); });
  const th = $('#spec-thumb'); th.style.left = s.pos + '%'; th.style.opacity = '1';
  $('#fix-hint').hidden = true; $('#fix-result').hidden = false;
  $('#fix-tag').textContent = s.tag;
  $('#fix-cause').textContent = s.cause;
  $('#fix-science').textContent = s.science;
  $('#fix-list').innerHTML = s.fixes.map(f => `<li><span class="n">→</span><span>${esc(f)}</span></li>`).join('');
  setStatus('fix', `${s.tag} → ${s.cause}`);
  sfx('click');
  silly(POPS.sym[i], 'error', 'sym' + i);
});

// ── MEASURE ───────────────────────────────────────────────────────────────────

let lastVerdict = null;
function calcEY() {
  const tds = parseFloat($('#ey-tds').value), dose = parseFloat($('#ey-dose').value), bev = parseFloat($('#ey-bev').value);
  const th = $('#ey-thumb'), dot = $('#chart-dot');
  if (!(tds > 0 && tds < 30 && dose > 0 && bev > 0)) {
    $('#ey-val').textContent = '—'; $('#ey-verdict').hidden = true;
    th.style.opacity = '0'; dot.setAttribute('opacity', '0');
    setStatus('measure', 'Ready'); lastVerdict = null;
    return;
  }
  const ey = tds * bev / dose;
  $('#ey-val').textContent = ey.toFixed(1) + '%';
  let key, label, color, note;
  if (ey < 18)       { key = 'under'; label = 'Under-extracted'; color = 'var(--under)'; note = 'Target 18–22% for filter coffee'; }
  else if (ey <= 22) { key = 'ideal'; label = 'Ideal';           color = 'var(--ideal)'; note = 'SCA Golden Cup zone'; }
  else               { key = 'over';  label = 'Over-extracted';  color = 'var(--over)';  note = 'Target 18–22% for filter coffee'; }
  const badge = $('#ey-badge'); badge.textContent = label; badge.style.background = color;
  $('#ey-note').textContent = note; $('#ey-verdict').hidden = false;
  th.style.left = Math.min(100, Math.max(0, (ey - 14) / 12 * 100)) + '%'; th.style.opacity = '1';

  const cx = 52 + (tds - 0.8) / 0.8 * 320, cy = 228 - (ey - 14) / 12 * 212;
  if (cx >= 52 && cx <= 372 && cy >= 16 && cy <= 228) { dot.setAttribute('transform', `translate(${cx.toFixed(1)} ${cy.toFixed(1)})`); dot.setAttribute('opacity', '1'); }
  else dot.setAttribute('opacity', '0');
  setStatus('measure', `EY ${ey.toFixed(1)}% · TDS ${tds}% · ${label}`);
  lastVerdict = key;
}
function clearEY() { ['#ey-tds', '#ey-dose', '#ey-bev'].forEach(s => { $(s).value = ''; }); calcEY(); }
['#ey-tds', '#ey-dose', '#ey-bev'].forEach(s => {
  $(s).addEventListener('input', calcEY);
  $(s).addEventListener('change', () => { if (lastVerdict) silly(pick(POPS[lastVerdict]), lastVerdict === 'ideal' ? 'yay' : 'error', 'ey-' + lastVerdict); });
});

// ── DISPLAY PROPERTIES ────────────────────────────────────────────────────────

const THEMES = [
  { id: 'sky',   name: 'Pastel Sky',  desk: '#7db3e8', face: '#f9c6d8', t1: '#b98be6', t2: '#f3a6c8' },
  { id: 'dream', name: 'Lilac Dream', desk: '#c7b3ec', face: '#efd9f7', t1: '#6f4fd0', t2: '#b596f2' },
  { id: 'holo',  name: 'Holo Liquid', desk: 'linear-gradient(135deg,#3b62c8,#b9a4ee,#4f86e0,#8fe0f0)', face: '#ece9e0', t1: '#0b4fd1', t2: '#5c9cf5' },
];
function applySettings() {
  if (!THEMES.some(t => t.id === settings.theme)) settings.theme = 'sky';
  document.documentElement.dataset.theme = settings.theme;
  document.body.classList.toggle('fx', !!settings.fx);
  document.body.classList.toggle('calm', !!settings.calm);
  bakeWall();
  $('#theme-list').innerHTML = THEMES.map(t => `
    <button class="btn${t.id === settings.theme ? ' on' : ''}" aria-pressed="${t.id === settings.theme}" data-t="${t.id}" style="flex-direction:column; padding:8px; height:auto;">
      <span aria-hidden="true" style="display:block; width:100%; height:54px; background:${t.desk}; box-shadow:var(--in); position:relative;">
        <span style="position:absolute; left:18%; top:22%; width:62%; height:58%; background:${t.face}; box-shadow:0 0 0 1px #3a2344;">
          <span style="display:block; height:7px; background:linear-gradient(90deg,${t.t1},${t.t2});"></span></span></span>
      <span>${t.name}</span>
    </button>`).join('');
  $('#opt-fx').checked = settings.fx;
  $('#opt-pop').checked = settings.pop;
  $('#opt-boot').checked = !!settings.bootEvery;
  $('#opt-motion').checked = !!settings.calm;
  renderSoundBtn();
}
$('#theme-list').addEventListener('click', e => {
  const b = e.target.closest('[data-t]'); if (!b) return;
  settings.theme = b.dataset.t; saveSettings(); applySettings(); sfx('click');
  setStatus('display', THEMES.find(t => t.id === settings.theme).name);
});
$('#opt-fx').addEventListener('change', e => { settings.fx = e.target.checked; saveSettings(); applySettings(); });
$('#opt-pop').addEventListener('change', e => { settings.pop = e.target.checked; saveSettings(); });
$('#opt-snd').addEventListener('change', e => { settings.snd = e.target.checked; saveSettings(); renderSoundBtn(); sfx('click'); });
$('#opt-boot').addEventListener('change', e => { settings.bootEvery = e.target.checked; saveSettings(); });
$('#opt-motion').addEventListener('change', e => { settings.calm = e.target.checked; saveSettings(); applySettings(); });

// ── LEGAL & PRIVACY ───────────────────────────────────────────────────────────

const LEGAL_TABS = ['Privacy', 'Terms', 'Credits', 'Trademarks'];
function showLegal(tab) {
  tabStrip($('#legal-tabs'), LEGAL_TABS, tab);
  $$('#legal-body > section').forEach(sec => { sec.hidden = sec.dataset.sec !== tab; });
  setStatus('legal', tab);
}
$('#legal-tabs').addEventListener('click', e => { const b = e.target.closest('[data-v]'); if (b) { sfx('click'); showLegal(b.dataset.v); } });
$('#wipe-data').addEventListener('click', async () => {
  const i = await dialog({ title: 'Delete all data', icon: 'bin', text: 'Delete every saved brew, the Recycle Bin, your settings and window layout from this browser? This cannot be undone.', buttons: ['Delete everything', 'Cancel'] });
  if (i !== 0) return;
  clearTimeout(layoutTimer); store.wipe(); location.reload();
});

// ── MUSIC PLAYER (original lo-fi tracks, synthesized live) ────────────────────
// Each track is 8 bars of 16th-note steps. The song cycles intro → full → breakdown → full
// (with a second melody), so it evolves instead of looping one phrase.

const PC = { C: 0, 'C#': 1, Db: 1, D: 2, Eb: 3, E: 4, F: 5, 'F#': 6, G: 7, Ab: 8, A: 9, Bb: 10, B: 11 };
const QUAL = { maj7: [0, 4, 7, 11], maj9: [0, 4, 7, 11, 14], m7: [0, 3, 7, 10], m9: [0, 3, 7, 10, 14],
  7: [0, 4, 7, 10], sus: [0, 5, 7, 10], 6: [0, 4, 7, 9] };
// Each track has its own band: chord instrument, bass, drum kit and lead, plus its own
// tape wobble and brightness, so no two tracks share a sound.
const TRACKS = [
  { name: 'morning bloom', bpm: 80, swing: .22, key: 5, seed: 3, crackle: .5, warm: 5200, wobble: 6,
    chords: 'ep', bassInst: 'round', kit: 'boombap', lead: 'soft',
    prog: [['F', 'maj9'], ['A', 'm7'], ['D', 'm9'], ['C', 'sus'], ['Bb', 'maj7'], ['A', 'm7'], ['G', 'm9'], ['C', '7']],
    kick: 'x.........x.....', snare: '....x.......x...', hat: 'x.x.x.x.x.x.x.x.',
    comp: [[0, 5], [6, 3], [11, 5]], bass: [[0, 6, 0], [7, 2, 7], [10, 5, 0]],
    rhythm: ['x-.x-.x-..x-x---', '..x-x.x-x---....'] },
  { name: 'rain on the window', bpm: 70, swing: .12, key: 9, minor: true, seed: 11, crackle: .3, rain: true, pad: true, warm: 4200, wobble: 8,
    chords: 'piano', bassInst: 'sub', kit: 'soft', lead: 'bell',
    prog: [['A', 'm9'], ['F', 'maj7'], ['C', 'maj7'], ['G', '6'], ['D', 'm9'], ['F', 'maj7'], ['E', 'm7'], ['E', '7']],
    kick: 'x.......x.x.....', snare: '....x.......x...', hat: '..x...x...x...x.',
    comp: [[0, 7], [8, 7]], bass: [[0, 11, 0], [12, 4, 7]],
    rhythm: ['x---..x-x---....', 'x-x-x---....x---'] },
  { name: '3am latte', bpm: 96, swing: 0, key: 2, seed: 7, crackle: 0, warm: 14000, wobble: 0, arp: true,
    chords: null, bassInst: 'pulse', kit: 'chip', lead: 'chip',
    prog: [['D', 'maj7'], ['B', 'm7'], ['G', 'maj7'], ['A', 'sus'], ['F#', 'm7'], ['B', 'm7'], ['E', 'm9'], ['A', '7']],
    kick: 'x.....x...x.....', snare: '....x.......x..x', hat: 'xxx.xxx.xxx.xxx.',
    comp: [], bass: [[0, 2, 0], [3, 1, 12], [6, 2, 0], [10, 2, 7], [14, 2, 12]],
    rhythm: ['x.x.x-x.x---x.x.', 'x---x.x.x-x-x---'] },
  { name: 'crema drift', bpm: 84, swing: 0, key: 3, seed: 19, crackle: .2, warm: 6500, wobble: 4,
    chords: 'pluck', bassInst: 'upright', kit: 'brush', lead: 'flute',
    prog: [['Eb', 'maj9'], ['C', 'm9'], ['Ab', 'maj7'], ['Bb', 'sus'], ['G', 'm7'], ['C', 'm7'], ['F', 'm9'], ['Bb', '7']],
    kick: 'x.....x.x.....x.', snare: 'x..x..x...x.x...', hat: 'x.x.x.x.x.x.x.x.',     // bossa: clave on the rim, brushes on top
    comp: [[0, 2], [3, 2], [6, 2], [10, 2], [12, 3]], bass: [[0, 6, 0], [6, 2, 0], [8, 6, 7], [14, 2, 7]],
    rhythm: ['..x-x-x---..x-x-', 'x-x---x-.x-x----'] },
  { name: 'last sip', bpm: 66, swing: .15, key: 0, seed: 29, crackle: .6, pad: true, warm: 4000, wobble: 14,
    chords: 'musicbox', bassInst: 'sub', kit: 'soft', lead: 'whistle',
    prog: [['C', 'maj9'], ['A', 'm9'], ['F', 'maj9'], ['G', '6'], ['E', 'm7'], ['A', 'm7'], ['D', 'm9'], ['G', 'sus']],
    kick: 'x..x............', snare: '................', hat: '..x...x...x...x.',   // a slow heartbeat
    comp: [[0, 8], [8, 8]], bass: [[0, 15, 0]],
    rhythm: ['x-----x-x-------', 'x---x---x-----..'] },
];
const mp = { track: 0, playing: false, step: 0, next: 0, timer: null, started: 0, lastSec: -1, rig: null, song: null };

function mulberry(seed) { return () => { seed = (seed + 0x6D2B79F5) | 0; let x = Math.imul(seed ^ seed >>> 15, 1 | seed); x ^= x + Math.imul(x ^ x >>> 7, 61 | x); return ((x ^ x >>> 14) >>> 0) / 4294967296; }; }

// Close-position voicings that move smoothly from chord to chord.
function voiceProg(T) {
  let center = 64;
  return T.prog.map(([r, q]) => {
    const used = new Set();
    const v = QUAL[q].map(i => {
      const pc = (PC[r] + i) % 12;
      let m = pc + 12 * Math.round((center - pc) / 12);
      while (used.has(m)) m += 12;
      used.add(m); return m;
    }).sort((x, y) => x - y);
    center = (v[0] + v[v.length - 1]) / 2 * .5 + 64 * .5;
    return v;
  });
}
// Melody: rhythm from the track, pitches walk the scale and land on chord tones on the beat.
function composeMelody(T, voicings, variation) {
  const rnd = mulberry(T.seed * 131 + variation * 977);
  const scale = (T.minor ? [0, 2, 3, 5, 7, 8, 10] : [0, 2, 4, 5, 7, 9, 11]).map(i => (i + T.key) % 12);
  let prev = 72 + ((T.key + 5) % 12) - 5, dir = 1;
  return voicings.map((v, bar) => {
    const chordPcs = v.map(m => m % 12), steps = Array(16).fill(null);
    const pat = bar === 7 ? 'x-------........' : T.rhythm[(bar + variation) % 2];
    for (let s = 0; s < 16; s++) {
      if (pat[s] !== 'x') continue;
      let len = 1; while (pat[s + len] === '-') len++;
      const strong = s % 4 === 0 || len >= 4;
      if (rnd() < .3) dir = -dir;
      if (prev > 81) dir = -1; if (prev < 67) dir = 1;
      const ok = m => (strong ? chordPcs : scale).includes(m % 12);
      let m = prev + dir, tries = 0;
      while (!ok(m) && tries++ < 12) m += dir;
      if (rnd() < .25) { m += dir; while (!ok(m) && tries++ < 24) m += dir; }   // occasional leap
      steps[s] = { m, len }; prev = m;
    }
    return steps;
  });
}

// Per-play signal chain, so stopping can fade out notes already scheduled ahead.
function musicRig() {
  const a = actx, out = a.createGain(), duck = a.createGain(), drums = a.createGain(), dlp = a.createBiquadFilter(), warm = a.createBiquadFilter();
  out.gain.value = $('#mp-vol').value / 100;
  warm.type = 'lowpass'; warm.frequency.value = TRACKS[mp.track].warm || 5200;   // lo-fi top end
  chain(duck, warm, out, bus.music);
  dlp.type = 'lowpass'; dlp.frequency.value = 6500; chain(drums, dlp, out);
  const wob = a.createOscillator(), wobAmt = a.createGain();     // tape wow
  wob.frequency.value = .55; wobAmt.gain.value = TRACKS[mp.track].wobble ?? 6; chain(wob, wobAmt); wob.start();
  const beds = [];
  const T = TRACKS[mp.track];
  if (T.crackle) {                                               // vinyl crackle + hiss
    const len = a.sampleRate * 3, buf = a.createBuffer(1, len, a.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * .015 + (Math.random() < .0006 ? (Math.random() * 2 - 1) * .8 : 0);
    const s = a.createBufferSource(), f = a.createBiquadFilter(), g = a.createGain();
    s.buffer = buf; s.loop = true; f.type = 'bandpass'; f.frequency.value = 2600; f.Q.value = .4; g.gain.value = .12 * T.crackle;
    chain(s, f, g, out); s.start(); beds.push(s);
  }
  if (T.rain) {                                                  // soft rain bed
    const s = a.createBufferSource(), hp = a.createBiquadFilter(), lp = a.createBiquadFilter(), g = a.createGain();
    s.buffer = bus.noise; s.loop = true; hp.type = 'highpass'; hp.frequency.value = 400; lp.type = 'lowpass'; lp.frequency.value = 1800; g.gain.value = .035;
    chain(s, hp, lp, g, out); s.start(); beds.push(s);
  }
  return { out, duck, drums, wobble: wobAmt, stop: [wob, ...beds] };
}
function retireRig(rig) {
  if (!rig) return;
  const t = actx.currentTime;
  rig.out.gain.cancelScheduledValues(t); rig.out.gain.setTargetAtTime(0, t, .08);
  setTimeout(() => { rig.stop.forEach(n => { try { n.stop(); } catch {} }); rig.out.disconnect(); }, 2500);
}

const pump = (r, t, depth = .55) => { r.duck.gain.setTargetAtTime(depth, t, .008); r.duck.gain.setTargetAtTime(1, t + .07, .12); };

const CHORD_INST = {
  ep: (r, t, m, dur, vel, pan) => {           // FM electric piano
    note({ t, f: hz(m), dur: dur + .25, type: 'sine', fm: 1, fmIdx: 1.3, fmDecay: .5, att: .004, vol: .045 * vel, out: r.duck, wobble: r.wobble, verb: .25, pan });
    note({ t, f: hz(m), dur: dur + .1, type: 'triangle', detune: 5, att: .004, vol: .014 * vel, cut: 1600, cutEnd: 500, out: r.duck, wobble: r.wobble });
  },
  piano: (r, t, m, dur, vel, pan) => {        // felt piano: soft strike, long ring, darkening
    note({ t, f: hz(m), dur: dur + 1.4, type: 'triangle', att: .002, vol: .05 * vel, cut: 3000, cutEnd: 600, cutT: .9, out: r.duck, wobble: r.wobble, verb: .4, pan });
    note({ t, f: hz(m + 12), dur: .5, type: 'sine', att: .002, vol: .01 * vel, out: r.duck, pan });
    note({ t, f: hz(m), dur: .12, type: 'sine', fm: 2, fmIdx: 3, fmDecay: .06, att: .001, vol: .015 * vel, out: r.duck, pan });
  },
  pluck: (r, t, m, dur, vel, pan) => [-6, 6].forEach(dt =>   // nylon-string guitar
    note({ t, f: hz(m), dur: Math.min(dur, .5) + .35, type: 'sawtooth', detune: dt, att: .002, vol: .035 * vel, cut: 3800, cutEnd: 380, cutT: .25, q: 2, out: r.duck, wobble: r.wobble, verb: .2, pan })),
  musicbox: (r, t, m, dur, vel, pan) =>       // tiny tines, an octave up
    note({ t, f: hz(m + 12), dur: 1.6, type: 'sine', fm: 5, fmIdx: .8, fmDecay: .05, att: .001, vol: .035 * vel, out: r.duck, wobble: r.wobble, verb: .5, echo: .15, pan }),
};
const STRUM = { ep: .011, piano: .02, pluck: .028, musicbox: null };   // null: arpeggiate one note per step

const BASS_INST = {
  round: (r, t, m, dur) => {
    note({ t, f: hz(m), dur, type: 'triangle', att: .008, hold: dur * .5, vol: .14, cut: 700, out: r.duck });
    note({ t, f: hz(m - 12), dur, type: 'sine', att: .008, hold: dur * .5, vol: .1, out: r.duck });
  },
  sub: (r, t, m, dur) => note({ t, f: hz(m - 12), dur, type: 'sine', att: .06, hold: dur * .6, vol: .2, out: r.duck }),
  upright: (r, t, m, dur) => {
    note({ t, f: hz(m), dur: Math.min(dur, .9) + .1, type: 'triangle', att: .004, vol: .26, cut: 900, cutEnd: 240, cutT: .4, out: r.duck });
    hiss({ t, dur: .03, f: 280, q: 1, vol: .05, out: r.duck });          // finger thump
  },
  pulse: (r, t, m, dur) => note({ t, f: hz(m), dur: dur * .9, type: 'square', att: .002, hold: dur * .6, vol: .13, cut: 1800, out: r.duck }),
};

const KITS = {
  boombap: {
    kick: (r, t) => { note({ t, f: 150, glide: 42, glideT: .12, dur: .38, type: 'sine', att: .002, vol: .55, out: r.drums }); hiss({ t, dur: .012, f: 3000, q: .8, vol: .08, out: r.drums }); pump(r, t); },
    snare: (r, t) => { hiss({ t, dur: .2, f: 1900, q: .7, vol: .2, out: r.drums, verb: .15 }); note({ t, f: 200, glide: 150, dur: .1, type: 'triangle', vol: .1, out: r.drums }); },
    hat: (r, t, vel) => hiss({ t, dur: .035 + vel * .02, f: 8500, ftype: 'highpass', vol: .06 * vel, out: r.drums, pan: .25 }),
  },
  chip: {                                      // 8-bit: square kick, raw noise channel
    kick: (r, t) => { note({ t, f: 180, glide: 40, glideT: .07, dur: .1, type: 'square', att: .001, vol: .3, out: r.drums }); pump(r, t, .7); },
    snare: (r, t) => hiss({ t, dur: .09, f: 2500, q: .3, vol: .4, out: r.drums }),
    hat: (r, t, vel) => hiss({ t, dur: .012, f: 9500, ftype: 'highpass', vol: .12 * vel, out: r.drums }),
  },
  brush: {                                     // jazz brushes and a rim-click clave
    kick: (r, t) => note({ t, f: 95, glide: 55, glideT: .1, dur: .3, type: 'sine', att: .004, vol: .42, out: r.drums }),
    snare: (r, t) => { hiss({ t, dur: .05, f: 2600, q: 6, vol: .11, out: r.drums, verb: .2 }); note({ t, f: 1400, dur: .03, type: 'sine', vol: .035, out: r.drums }); },
    hat: (r, t, vel) => hiss({ t, dur: .14, att: .035, f: 5000, q: .6, vol: .045 * vel, out: r.drums, pan: -.2 }),
  },
  soft: {                                      // felt kick, rim, shaker
    kick: (r, t) => { note({ t, f: 70, glide: 45, glideT: .15, dur: .35, type: 'sine', att: .01, vol: .32, out: r.drums }); pump(r, t, .8); },
    snare: (r, t) => { hiss({ t, dur: .05, f: 3200, q: 5, vol: .12, out: r.drums, verb: .3 }); note({ t, f: 820, dur: .04, type: 'sine', vol: .04, out: r.drums }); },
    hat: (r, t, vel) => hiss({ t, dur: .07, att: .018, f: 7000, q: 1.5, vol: .04 * vel, out: r.drums, pan: .3 }),
  },
};

const LEADS = {
  soft: (r, t, m, dur) => note({ t, f: hz(m), dur: dur + .2, type: 'triangle', att: .02, hold: dur * .4, vol: .05, vib: 14, cut: 2800, out: r.out, wobble: r.wobble, echo: .22, verb: .3 }),
  bell: (r, t, m, dur) => note({ t, f: hz(m), dur: dur + .8, type: 'sine', fm: 3.5, fmIdx: 1.1, fmDecay: .3, vol: .045, out: r.out, echo: .28, verb: .45 }),
  chip: (r, t, m, dur) => note({ t, f: hz(m), dur: dur + .05, type: 'square', att: .003, hold: dur * .6, vol: .05, vib: 25, vibRate: 7, cut: 3400, out: r.out, echo: .2, verb: .1 }),
  flute: (r, t, m, dur) => {
    note({ t, f: hz(m), dur: dur + .15, type: 'sine', att: .06, hold: dur * .6, vol: .08, vib: 12, vibRate: 4.8, out: r.out, wobble: r.wobble, verb: .35, echo: .1 });
    hiss({ t, dur: dur * .8 + .1, att: .05, f: hz(m) * 2, q: 6, vol: .02, out: r.out });   // breath
  },
  whistle: (r, t, m, dur) => note({ t, f: hz(m + 12), dur: dur + .3, type: 'sine', att: .04, hold: dur * .5, vol: .03, vib: 22, vibRate: 5.8, out: r.out, wobble: r.wobble, echo: .3, verb: .5 }),
  arp: (r, t, m, sd) => note({ t, f: hz(m), dur: sd * .9, type: 'square', att: .002, vol: .028, cut: 2600, cutEnd: 700, out: r.duck, pan: Math.random() * .6 - .3 }),
};

function playStep(n, t0, sd) {
  const T = TRACKS[mp.track], r = mp.rig, S = mp.song, K = KITS[T.kit];
  const s = n % 16, bar = Math.floor(n / 16) % 8, loop = Math.floor(n / 128);
  const sec = loop === 0 ? 'intro' : ['full', 'break', 'full2'][(loop - 1) % 3];
  const t = t0 + (s % 2 ? T.swing * sd : 0);
  const hum = () => Math.random() * .006;
  const v = S.voicings[bar];

  if (sec !== 'break') {
    if (sec !== 'intro' && T.kick[s] === 'x') K.kick(r, t);
    if (sec !== 'intro' && T.snare[s] === 'x') K.snare(r, t + hum());
    if (T.hat[s] === 'x') K.hat(r, t + hum(), s % 4 === 0 ? 1 : .55 + Math.random() * .3);
    else if (sec !== 'intro' && s % 2 && Math.random() < .08) K.hat(r, t, .3);            // ghost notes
  }
  if (s === 0 && T.pad) v.forEach(m => INST_PAD(r, t, m, 16 * sd + .3));
  if (T.chords) T.comp.forEach(([st, len]) => {
    if (st !== s) return;
    const gap = STRUM[T.chords] ?? sd;
    v.forEach((m, i) => CHORD_INST[T.chords](r, t + i * gap + hum(), m, len * sd, sec === 'break' ? 1.1 : .9, (i - 2) * .12));
  });
  if (T.arp && sec !== 'intro') LEADS.arp(r, t, v[(s * 3) % v.length] + 12, sd);
  if (sec !== 'intro' || bar >= 4) {
    const root = 36 + PC[T.prog[bar][0]];
    T.bass.forEach(([st, len, iv]) => { if (st === s) BASS_INST[T.bassInst](r, t, root + iv, len * sd * .95); });
  }
  if (sec === 'full' || sec === 'full2') {
    const mel = S.melodies[sec === 'full' ? 0 : 1][bar][s];
    if (mel) LEADS[T.lead](r, t + hum(), mel.m, mel.len * sd);
  }
}
function INST_PAD(r, t, m, dur) {
  [-9, 9].forEach(dt => note({ t, f: hz(m), dur, type: 'sawtooth', detune: dt, att: dur * .3, hold: dur * .3, vol: .007, cut: 900, cutEnd: 500, out: r.duck, wobble: r.wobble, verb: .5, pan: dt / 30 }));
}
function schedule() {
  const a = actx, T = TRACKS[mp.track], sd = 60 / T.bpm / 4;
  const ahead = document.hidden ? 1.5 : .15;          // background tabs throttle timers — look further ahead
  while (mp.next < a.currentTime + ahead) { playStep(mp.step, mp.next, sd); mp.next += sd; mp.step++; }
  const el = Math.max(0, Math.floor(a.currentTime - mp.started));
  if (el !== mp.lastSec) {
    mp.lastSec = el;
    $('#mp-time').textContent = `${String(Math.floor(el / 60)).padStart(2, '0')}:${String(el % 60).padStart(2, '0')} · playing`;
  }
}
function mpPlay() {
  const a = ac(); if (!a) return;
  try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch {}   // iOS: play even with the silent switch on
  const T = TRACKS[mp.track], voicings = voiceProg(T);
  mp.song = { voicings, melodies: [composeMelody(T, voicings, 0), composeMelody(T, voicings, 1)] };
  bus.dlyTime.setValueAtTime(60 / T.bpm * .75, a.currentTime);   // dotted-eighth echo
  retireRig(mp.rig); mp.rig = musicRig();
  mp.playing = true; mp.step = 0; mp.next = a.currentTime + .08; mp.started = mp.next; mp.lastSec = -1;
  clearInterval(mp.timer); mp.timer = setInterval(schedule, 25);
  mpRender();
}
function mpStop() {
  mp.playing = false; clearInterval(mp.timer);
  if (actx) { retireRig(mp.rig); mp.rig = null; }
  $('#mp-time').textContent = '00:00 · stopped';
  mpRender();
}
function mpRender() {
  $('#mp-title').textContent = TRACKS[mp.track].name + '.mid';
  $('#mp-play').innerHTML = ico(mp.playing ? 'pause' : 'play');
  $('#mp-play').setAttribute('aria-label', mp.playing ? 'Pause' : 'Play');
  setStatus('music', `Track ${mp.track + 1} of ${TRACKS.length} · ${TRACKS[mp.track].bpm} bpm`);
}
function mpSkip(d) { mp.track = (mp.track + d + TRACKS.length) % TRACKS.length; if (mp.playing) mpPlay(); else mpRender(); }
$('#mp-play').addEventListener('click', () => mp.playing ? mpStop() : mpPlay());
$('#mp-prev').addEventListener('click', () => mpSkip(-1));
$('#mp-next').addEventListener('click', () => mpSkip(1));
$('#mp-vol').addEventListener('input', () => { if (mp.rig) mp.rig.out.gain.setTargetAtTime($('#mp-vol').value / 100, actx.currentTime, .03); });
APPS.music.onClose = mpStop;

// ── INIT ──────────────────────────────────────────────────────────────────────

function wallRange() {
  const d = $('#desktop');
  const vis = Math.min(1000, 700 * d.clientWidth / Math.max(1, d.clientHeight));
  const tall = vis < 700;
  const iconStrip = tall ? 0 : 100 * 700 / Math.max(1, d.clientHeight);
  return { x0: 500 - vis / 2, vis, tall, lo: 500 - vis / 2 + iconStrip, hi: 500 + vis / 2, top: tall ? 200 : 0 };
}
function layoutWalls() {
  const R = wallRange();
  $$('.wall [data-ax]').forEach(g => {
    if (R.vis >= 1000) { g.removeAttribute('transform'); return; }
    const ax = +g.dataset.ax, ay = +g.dataset.ay, sc = R.tall ? +(g.dataset.s || 1) : 1;
    const nx = R.x0 + ax / 1000 * R.vis, ny = R.tall && g.dataset.ty ? +g.dataset.ty : ay;
    g.setAttribute('transform', `translate(${nx.toFixed(1)} ${ny}) scale(${sc}) translate(${-ax} ${-ay})`);
  });
  decorateWalls(R);
  bakeWall();
}

// The wallpaper is authored as live SVG but shown as one static image per theme and screen size:
// the browser rasterizes it once instead of on every repaint, which is what made dragging slow.
function bakeWall() {
  const w = $$('.wall').find(el => el.classList.contains('wall-' + settings.theme)); if (!w) return;
  const d = $('#desktop'), key = d.clientWidth + 'x' + d.clientHeight;
  if (w.dataset.key === key) return;
  let url;
  try {
    const svg = w.querySelector('svg').cloneNode(true);
    svg.setAttribute('width', '1000'); svg.setAttribute('height', '700');
    url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(svg)], { type: 'image/svg+xml' }));
  } catch { return; }                       // can't bake here: the live SVG simply stays visible
  const img = new Image();
  img.onload = () => {
    const old = w.dataset.url;
    w.style.backgroundImage = `url("${url}")`;
    w.dataset.url = url; w.dataset.key = key; w.classList.add('baked');
    if (old) setTimeout(() => URL.revokeObjectURL(old), 1000);
  };
  img.onerror = () => URL.revokeObjectURL(url);
  img.src = url;
}
let wallTimer;
addEventListener('resize', () => { clearTimeout(wallTimer); wallTimer = setTimeout(layoutWalls, 200); });

function decorateWalls(R) {
  let s = 7;
  const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  const X = (pad = 0) => R.lo + pad + rnd() * (R.hi - R.lo - 2 * pad) | 0;
  const Y = (a, b) => Math.max(R.top, a) + rnd() * (b - Math.max(R.top, a)) | 0;
  const n = k => Math.max(4, Math.round(k * (R.hi - R.lo) / 850));
  const spark = (x, y, u, c, o) => `<g fill="${c}" opacity="${o.toFixed(2)}"><rect x="${x}" y="${y - 2 * u}" width="${u}" height="${5 * u}"/><rect x="${x - 2 * u}" y="${y}" width="${5 * u}" height="${u}"/></g>`;
  const heart = (x, y, k) => `<path transform="translate(${x} ${y}) scale(${k.toFixed(2)})" fill="#ffb3d6" d="M-6 -4h4v-2h4v2h4v4h-2v2h-2v2h-2v2h-2v-2h-2v-2h-2v-2h-2z"/>`;

  let h = '';
  for (let i = 0, N = n(24); i < N; i++) h += spark(X(10), Y(0, 500), rnd() < .3 ? 3 : 2, rnd() < .5 ? '#fff' : '#ffd6ec', .55 + rnd() * .4);
  for (let i = 0, N = n(6); i < N; i++) h += heart(X(10), Y(60, 480), .8 + rnd() * .6);
  $('#sky-sparkles').innerHTML = h;

  let g = '';
  for (let xb = -1480; xb <= 2480; xb += 110) g += `<line x1="${(500 + (xb - 500) * .12).toFixed(1)}" y1="540" x2="${xb}" y2="700"/>`;
  for (let k = 1; k <= 9; k++) { const y = (540 + 160 * (k / 9) ** 2).toFixed(1); g += `<line x1="0" y1="${y}" x2="1000" y2="${y}"/>`; }
  $('#sky-grid').innerHTML = g;

  let st = '';
  for (let i = 0, N = n(70); i < N; i++) { const z = rnd() < .8 ? 2 : 4; st += `<rect x="${X()}" y="${rnd() * 440 | 0}" width="${z}" height="${z}" opacity="${(.4 + rnd() * .6).toFixed(2)}"/>`; }
  for (let i = 0, N = n(8); i < N; i++) st += spark(X(10), Y(20, 400), 2, '#fff', .9);
  $('#dream-stars').innerHTML = st;

  let c = '', x = -10;
  while (x < 1010) {
    const w = 30 + rnd() * 50 | 0, hh = 50 + rnd() * 120 | 0, top = 560 - hh;
    c += `<rect x="${x}" y="${top}" width="${w}" height="${hh}" fill="#8c72d8"/>`;
    for (let wy = top + 8; wy < 548; wy += 14)
      for (let wx = x + 6; wx < x + w - 8; wx += 12)
        if (rnd() < .28) c += `<rect x="${wx}" y="${wy}" width="5" height="6" fill="#ffe9b0" opacity=".85"/>`;
    x += w + (rnd() * 6 | 0);
  }
  $('#dream-city').innerHTML = c;

  let b = '';
  for (let i = 0, N = n(9); i < N; i++) { const r = 14 + rnd() * (R.tall ? 30 : 46) | 0; b += `<circle cx="${X(r)}" cy="${Y(r, 650)}" r="${r}" fill="url(#bub)" stroke="url(#iri)" stroke-width="2" opacity=".75"/>`; }
  for (let i = 0, N = n(16); i < N; i++) b += spark(X(10), Y(0, 650), 2, '#fff', .75);
  $('#holo-bits').innerHTML = b;
}

layoutWalls();
selectMethod('V60');
buildDrinks();
renderBrews(); renderBin();
applySettings();
showLegal('Privacy');
mpRender();
tick(); setInterval(tick, 15000);
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !dlgOpen) closeStart(); });
boot();
