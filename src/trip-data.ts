export type TimelineItem = { time: string; title: string; note: string };

export type Port = {
  id: string;
  city: string;
  country: string;
  flag: string;
  code: string;
  latitude: number;
  longitude: number;
  currency: string;
  currencyCode: string;
  hopOnOff?: { note: string; url: string };
  kicker: string;
  map: string;
  mapLabel: string;
  timing: string;
  transit: string;
  highlights: string[];
  eat: { name: string; why: string; url: string; tag: string }[];
  taste: string[];
  buy: string[];
  timeline: TimelineItem[];
};

export const ports: Port[] = [
  {
    id: "copenhagen", city: "Copenhagen", country: "Denmark", flag: "🇩🇰", code: "CPH", latitude: 55.6761, longitude: 12.5683, currency: "Danish krone", currencyCode: "DKK", hopOnOff: { note: "City Sightseeing booked for every Copenhagen day. Use the Classic route for Nyhavn, Rosenborg, Christiansborg and Tivoli; use the Home of Carlsberg route for Carlsberg.", url: "https://city-sightseeing.com/en-us/16/copenhagen/25/hop-on-hop-off-copenhagen" },
    kicker: "Three easy pre-cruise days of canals, castles, beer history, and good walking.",
    map: "https://www.openstreetmap.org/?mlat=55.6761&mlon=12.5683#map=13/55.6761/12.5683",
    mapLabel: "Central Copenhagen",
    timing: "Pre-cruise base · Adina near the port",
    transit: "Use the Metro/S-train for longer hops; central sights are pleasantly walkable. Keep embarkation morning light and allow a generous port buffer.",
    highlights: ["Nyhavn & harbor walk", "Rosenborg Castle", "Christiansborg Palace", "Home of Carlsberg", "Canal cruise", "Torvehallerne market"],
    eat: [
      { name: "Café Petersborg", why: "Old-school Danish cooking and smørrebrød at a sensible price.", url: "https://www.visitcopenhagen.com/copenhagen/planning/cafe-petersborg-gdk435772", tag: "Traditional" },
      { name: "Torvehallerne", why: "Flexible market lunch when you want several choices and little ceremony.", url: "https://www.visitcopenhagen.com/copenhagen/planning/torvehallerne-gdk539321", tag: "Easy lunch" },
    ],
    taste: ["Smørrebrød", "Danish pastry", "Carlsberg or a local craft beer"],
    buy: ["Danish design piece", "Licorice", "Carlsberg souvenir"],
    timeline: [
      { time: "09:30", title: "Board the Classic route", note: "Use your all-days ticket; confirm the first bus and nearest live stop in the operator map." },
      { time: "10:00", title: "Rosenborg & King’s Garden", note: "Hop off near Rosenborg, then walk to Torvehallerne for lunch." },
      { time: "12:45", title: "Christiansborg", note: "Rejoin the Classic route and prioritize the tower or royal rooms." },
      { time: "15:15", title: "Nyhavn & canal cruise", note: "The Classic route serves Nyhavn; pair it with a seated harbor cruise." },
      { time: "17:00", title: "Tivoli evening", note: "Ride toward Tivoli and stay for the lights if energy allows." },
      { time: "18:30", title: "Danish dinner", note: "Café Petersborg is the traditional pick." },
    ],
  },
  {
    id: "oslo", city: "Oslo", country: "Norway", flag: "🇳🇴", code: "OSL", latitude: 59.9139, longitude: 10.7522, currency: "Norwegian krone", currencyCode: "NOK", hopOnOff: { note: "City Sightseeing booked. The published route links the cruise terminal with Vigeland Park, the Bygdøy museums, Akershus, the Royal Palace and Opera House.", url: "https://city-sightseeing.com/en-us/69/oslo/74/hop-on-hop-off-oslo" },
    kicker: "Maritime history, bold waterfront architecture, and a compact center.",
    map: "https://www.openstreetmap.org/?mlat=59.9139&mlon=10.7522#map=13/59.9139/10.7522",
    mapLabel: "Oslo center & waterfront",
    timing: "September 6 · 10:00 AM–9:00 PM",
    transit: "Public transit is easy. If museum time matters, go straight to Bygdøy first and work back toward the ship.",
    highlights: ["Fram Museum", "Akershus Fortress", "Opera House roof", "City Hall", "Aker Brygge", "Vigeland Park"],
    eat: [
      { name: "Engebret Café", why: "A historic Oslo institution for classic Norwegian seafood and game.", url: "https://www.visitoslo.com/en/product/?tlp=2982043", tag: "Classic" },
      { name: "Den Glade Gris", why: "Relaxed gastropub known for slow-cooked pork and Norwegian comfort food.", url: "https://www.visitoslo.com/en/product/?tlp=2990003", tag: "Casual" },
    ],
    taste: ["Norwegian salmon", "Brown cheese", "Cinnamon bun"],
    buy: ["Wool knitwear", "Troll keepsake", "Norwegian chocolate"],
    timeline: [
      { time: "10:00", title: "Board at the cruise terminal", note: "City Sightseeing says its cruise service is coordinated with ship arrivals; verify the stop as you leave the pier." },
      { time: "10:45", title: "Vigeland Sculpture Park", note: "Hop off for a focused 60-minute walk through the central installation." },
      { time: "12:30", title: "FRAM Museum", note: "Reboard for Bygdøy and make FRAM the priority museum." },
      { time: "14:15", title: "Aker Brygge lunch", note: "Hop off at the waterfront for a relaxed late lunch." },
      { time: "15:45", title: "Akershus & Opera House", note: "Use central route stops, walking the compact waterfront section between them." },
      { time: "18:30", title: "Back near the ship", note: "Leave a large buffer before the 9:00 PM sailing; use the posted all-aboard time." },
    ],
  },
  {
    id: "warnemunde", city: "Warnemünde", country: "Germany", flag: "🇩🇪", code: "WAR", latitude: 54.1767, longitude: 12.09, currency: "Euro", currencyCode: "EUR",
    kicker: "A flexible Germany day: castle-and-old-town outing or an easy seaside reset.",
    map: "https://www.openstreetmap.org/?mlat=54.1767&mlon=12.0900#map=14/54.1767/12.0900",
    mapLabel: "Warnemünde harbor",
    timing: "September 8 · 6:00 AM–8:00 PM",
    transit: "Your booked six-hour Schwerin excursion leaves the port at 8:00 AM and returns at 2:00 PM. Lunch time is built into the Schwerin portion of the day.",
    highlights: ["Schwerin Castle", "Schwerin old town", "Rostock Neuer Markt", "Warnemünde beach", "Alter Strom", "Lighthouse"],
    eat: [
      { name: "Zur Kogge", why: "Maritime Rostock atmosphere with fish and northern German specialties.", url: "https://www.rostock.de/poi/zur-kogge", tag: "Maritime" },
      { name: "Borwin Hafenrestaurant", why: "Fresh fish and harbor views on Rostock’s waterfront.", url: "https://willkommen.rostock.de/en/rostock/streaming/detail/Gastro/g_100040585/borwin-harbour-restaurant", tag: "Waterfront" },
    ],
    taste: ["Fischbrötchen", "Currywurst", "Local pilsner"],
    buy: ["Sea-buckthorn products", "Maritime keepsake", "German marzipan"],
    timeline: [
      { time: "08:00", title: "Booked excursion departs", note: "Meet at the port for the six-hour round trip to Schwerin." },
      { time: "10:00", title: "Schwerin Castle", note: "Follow the excursion’s castle visit and garden time." },
      { time: "12:15", title: "Lunch in Schwerin", note: "Use the scheduled free time for a relaxed old-town lunch." },
      { time: "14:00", title: "Excursion returns to port", note: "The transfer brings you directly back to Warnemünde." },
      { time: "14:30", title: "Alter Strom & lighthouse", note: "Easy optional port walk after the excursion." },
      { time: "18:15", title: "Back aboard", note: "Freshen up before your confirmed Italian dinner." },
      { time: "19:00", title: "Italian dinner aboard", note: "Confirmed reservation on the ship." },
    ],
  },
  {
    id: "visby", city: "Visby", country: "Sweden", flag: "🇸🇪", code: "VBY", latitude: 57.6348, longitude: 18.2948, currency: "Swedish krona", currencyCode: "SEK",
    kicker: "A storybook walled town where the best plan is mostly a beautiful walk.",
    map: "https://www.openstreetmap.org/?mlat=57.6348&mlon=18.2948#map=15/57.6348/18.2948",
    mapLabel: "Visby inside the walls",
    timing: "September 10 · 11:00 AM–5:00 PM",
    transit: "Most highlights sit inside or beside the medieval wall. Wear the shoes with the best grip for cobbles and uneven lanes.",
    highlights: ["City wall", "St. Mary’s Cathedral", "Botanical Garden", "Gotlands Museum", "Almedalen", "St. Karin ruins"],
    eat: [
      { name: "Bakfickan", why: "Small, central seafood restaurant on Stora Torget; a strong Gotland lunch.", url: "https://gotland.com/companies/bakfickan/", tag: "Seafood" },
      { name: "Glassmagasinet", why: "A fun harbor ice-cream stop with an enormous selection.", url: "https://gotland.com/visby-centrum/mat-noje/", tag: "Treat" },
    ],
    taste: ["Saffranspannkaka", "Gotland lamb", "Local beer"],
    buy: ["Gotland wool", "Truffle salt", "Medieval-themed craft"],
    timeline: [
      { time: "09:00", title: "Walk into the old town", note: "Enter by the harbor and let the wall set the scene." },
      { time: "09:45", title: "Cathedral & ruins", note: "St. Mary’s plus the atmospheric St. Karin ruins." },
      { time: "11:15", title: "Wall and Botanical Garden", note: "The north side gives the prettiest quiet walk." },
      { time: "12:30", title: "Bakfickan lunch", note: "Seafood on Stora Torget; check seasonal hours." },
      { time: "14:00", title: "Gotlands Museum", note: "Excellent if the weather turns or history wins." },
      { time: "15:30", title: "Harbor treat & ship", note: "Leave time for the tender or port walk back." },
    ],
  },
  {
    id: "riga", city: "Riga", country: "Latvia", flag: "🇱🇻", code: "RIX", latitude: 56.9496, longitude: 24.1052, currency: "Euro", currencyCode: "EUR",
    kicker: "Art Nouveau confidence, a layered old town, and the Baltic’s biggest market energy.",
    map: "https://www.openstreetmap.org/?mlat=56.9496&mlon=24.1052#map=14/56.9496/24.1052",
    mapLabel: "Riga old town & market",
    timing: "September 11 · 9:30 AM–5:30 PM",
    transit: "Old Riga is compact. Add the Art Nouveau district only if the ship’s time and your pace comfortably allow it.",
    highlights: ["House of the Black Heads", "Riga Cathedral", "Freedom Monument", "Central Market", "Art Nouveau district", "St. Peter’s tower"],
    eat: [
      { name: "Folkklubs ALA Pagrabs", why: "Lively cellar pub for Latvian food, local beer, and frequent music.", url: "https://www.folkklubs.lv/home/", tag: "Lively" },
      { name: "Milda", why: "Authentic Latvian and Baltic dishes in the heart of the city.", url: "https://restoransmilda.lv/", tag: "Local favorite" },
    ],
    taste: ["Grey peas with bacon", "Rye bread dessert", "Riga Black Balsam"],
    buy: ["Amber", "Black Balsam", "Latvian linen"],
    timeline: [
      { time: "09:30", title: "Leave the ship", note: "Head directly toward Town Hall Square." },
      { time: "10:00", title: "House of the Black Heads", note: "Start with the city’s strongest old-town landmark." },
      { time: "11:15", title: "Old town lanes", note: "Riga Cathedral, Three Brothers, Swedish Gate." },
      { time: "12:30", title: "Central Market", note: "Taste, browse, and use it as an informal lunch stop." },
      { time: "14:30", title: "St. Peter’s or Art Nouveau", note: "Choose the tower view or Alberta iela—not both if rushed." },
      { time: "16:30", title: "Return aboard", note: "Be settled before the Japanese dinner reservation." },
      { time: "17:30", title: "Japanese dinner aboard", note: "Confirmed reservation on the ship." },
    ],
  },
  {
    id: "tallinn", city: "Tallinn", country: "Estonia", flag: "🇪🇪", code: "TLL", latitude: 59.437, longitude: 24.7536, currency: "Euro", currencyCode: "EUR", hopOnOff: { note: "City Sightseeing booked. Board at the cruise-port stop, use the Old Town route for Toompea, and the Green route only if adding Seaplane Harbour.", url: "https://city-sightseeing.com/en-us/39/tallinn/39/hop-on-hop-off-tallinn" },
    kicker: "Medieval lanes, skyline viewpoints, and one of the easiest cruise-port walks.",
    map: "https://www.openstreetmap.org/?mlat=59.4370&mlon=24.7536#map=14/59.4370/24.7536",
    mapLabel: "Tallinn port & old town",
    timing: "September 13 · 11:00 AM–8:00 PM",
    transit: "The old town is close to port, but the climb to Toompea is real. Go uphill early, then work downhill toward the ship.",
    highlights: ["Toompea viewpoints", "Alexander Nevsky Cathedral", "Town Hall Square", "Telliskivi & Fotografiska", "Viru Gate", "Seaplane Harbour"],
    eat: [
      { name: "Rataskaevu 16", why: "Warm service, house-baked bread, and modern European cooking; reserve ahead.", url: "https://visittallinn.ee/eng/visitor/near-me/176669/restaurant-rataskaevu-16", tag: "Reserve" },
      { name: "Olde Hansa", why: "A theatrical medieval meal that leans fully into Tallinn’s Hanseatic history.", url: "https://visittallinn.ee/eng/visitor/eat-drink/going-out/all-food-places/175225/olde-hansa-restaurant", tag: "Experience" },
    ],
    taste: ["Black bread", "Elk or wild boar", "Vana Tallinn liqueur"],
    buy: ["Wool goods", "Juniper wood craft", "Estonian chocolate"],
    timeline: [
      { time: "11:00", title: "Board at the cruise port", note: "Use the City Sightseeing port pickup and ride toward the Old Town/Toompea stop." },
      { time: "11:45", title: "Walk Toompea & Old Town", note: "Hop off for Alexander Nevsky, viewpoints, Town Hall Square and the medieval lanes." },
      { time: "13:15", title: "Old Town lunch", note: "Rataskaevu 16 if reserved; Olde Hansa for the medieval experience." },
      { time: "14:45", title: "Town Hall & Viru Gate", note: "Work downhill through the medieval lanes." },
      { time: "16:15", title: "Green route: Seaplane Harbour", note: "Choose this only if bus frequency leaves a comfortable return margin; otherwise stay in Old Town." },
      { time: "18:15", title: "Bus back to the port", note: "Aim for an earlier return than strictly necessary so the 7:45 dinner stays relaxed." },
      { time: "19:45", title: "French dinner aboard", note: "Confirmed reservation on the ship." },
    ],
  },
  {
    id: "stockholm", city: "Stockholm", country: "Sweden", flag: "🇸🇪", code: "STO", latitude: 59.3293, longitude: 18.0686, currency: "Swedish krona", currencyCode: "SEK", hopOnOff: { note: "City Sightseeing booked. Use it after the Nynäshamn transfer for the Royal Palace, Vasa Museum and City Hall corridor, but protect the 3:30 PM transfer meetup.", url: "https://city-sightseeing.com/en-us/109/stockholm/243/hop-on-hop-off-stockholm" },
    kicker: "A focused capital day from Nynäshamn: royal old town plus the Vasa.",
    map: "https://www.openstreetmap.org/?mlat=59.3293&mlon=18.0686#map=13/59.3293/18.0686",
    mapLabel: "Stockholm center",
    timing: "September 12 · 8:00 AM–6:00 PM",
    transit: "Your booked transfer leaves Nynäshamn at 9:00 AM and returns you to the port eight hours later at about 5:00 PM.",
    highlights: ["Vasa Museum", "Gamla Stan", "Royal Palace", "Stortorget", "City Hall", "Djurgården ferry"],
    eat: [
      { name: "Meatballs for the People", why: "Classic and creative Swedish meatballs in Södermalm.", url: "https://www.visitstockholm.com/o/meatballs-for-the-people/", tag: "Iconic" },
      { name: "Pelikan", why: "Relaxed historic beer hall serving classic Swedish home cooking.", url: "https://www.visitstockholm.com/o/pelikan/", tag: "Classic" },
    ],
    taste: ["Swedish meatballs", "Toast Skagen", "Cinnamon bun"],
    buy: ["Dala horse", "Swedish candy", "Design stationery"],
    timeline: [
      { time: "09:00", title: "Booked transfer departs", note: "Meet at the port for the ride into Stockholm." },
      { time: "10:15", title: "Gamla Stan & Royal Palace", note: "Join City Sightseeing near the transfer drop-off, then hop off for the old town and palace." },
      { time: "11:45", title: "Ride to the Vasa Museum", note: "The published route serves the Vasa; make it the one non-negotiable museum." },
      { time: "13:15", title: "Lunch & fika", note: "Eat near Djurgården or on the return corridor; keep the stop efficient." },
      { time: "14:15", title: "Reboard toward pickup", note: "Traffic can slow the loop. Start moving back early and walk the final stretch if faster." },
      { time: "15:30", title: "Meet the return transfer", note: "Follow the booked pickup instructions exactly." },
      { time: "17:00", title: "Back at Nynäshamn port", note: "The eight-hour transfer returns before the 6:00 PM sailing." },
    ],
  },
  {
    id: "gdansk", city: "Gdańsk", country: "Poland", flag: "🇵🇱", code: "GDN", latitude: 54.352, longitude: 18.6466, currency: "Polish złoty", currencyCode: "PLN",
    kicker: "A shorter afternoon and evening built around the Royal Way, amber lanes, and Polish dinner.",
    map: "https://www.openstreetmap.org/?mlat=54.3520&mlon=18.6466#map=14/54.3520/18.6466",
    mapLabel: "Gdańsk Main Town",
    timing: "September 9 · 1:30 PM–9:30 PM · from Gdynia",
    transit: "A pre-arranged transfer is the lowest-stress choice for this late call. If using rail, know the Gdynia–Gdańsk connection and last safe return before you leave.",
    highlights: ["Long Market", "Neptune Fountain", "St. Mary’s Church", "Mariacka Street", "Motława waterfront", "Amber shops"],
    eat: [
      { name: "PG4 Brewery & Restaurant", why: "Local food and beer tied to Gdańsk brewing tradition, near the main station.", url: "https://visitgdansk.com/en/link/4625/gdzie-wypic-drinka.qbpage?setLanguage=en", tag: "Beer" },
      { name: "Restaurant Kubicki", why: "Historic riverside atmosphere and refined Polish cooking.", url: "https://kartaturysty.visitgdansk.com/en/partners/restauracja-kubicki-28564589", tag: "Traditional" },
    ],
    taste: ["Pierogi", "Baltic cod", "Goldwasser or local beer"],
    buy: ["Amber jewelry", "Solidarity keepsake", "Polish sweets"],
    timeline: [
      { time: "13:30", title: "Dock in Gdynia", note: "Meet transfer promptly or move directly to the rail connection." },
      { time: "14:45", title: "Arrive Gdańsk", note: "Begin at the Golden Gate and walk the Royal Way." },
      { time: "15:45", title: "St. Mary’s & Mariacka", note: "Church interior, amber shops, then the waterfront." },
      { time: "17:15", title: "Polish dinner", note: "PG4 for beer convenience; Kubicki for riverside tradition." },
      { time: "18:45", title: "Depart for Gdynia", note: "Do not let dessert eat the return buffer." },
      { time: "20:15", title: "Back near ship", note: "A full hour-plus before the 21:30 sailing target." },
    ],
  },
  {
    id: "helsinki", city: "Helsinki", country: "Finland", flag: "🇫🇮", code: "HEL", latitude: 60.1699, longitude: 24.9384, currency: "Euro", currencyCode: "EUR",
    kicker: "A calm post-cruise finale of market flavors, sea views, design, and sauna culture.",
    map: "https://www.openstreetmap.org/?mlat=60.1699&mlon=24.9384#map=13/60.1699/24.9384",
    mapLabel: "Central Helsinki",
    timing: "September 14–15 · Scandic Grand Central base",
    transit: "The hotel is beside Helsinki Central Station, making the airport train easy. Trams handle the waterfront; ferries depart near Market Square.",
    highlights: ["Senate Square", "Market Square", "Suomenlinna", "Oodi Library", "Rock Church", "Löyly sauna"],
    eat: [
      { name: "Restaurant Savotta", why: "Traditional Finnish cooking with a nostalgic interior by Senate Square.", url: "https://www.myhelsinki.fi/places/restaurant-savotta/", tag: "Finnish" },
      { name: "Löyly", why: "Striking seaside sauna complex with a restaurant, terrace, and sea access.", url: "https://www.myhelsinki.fi/places/loyly/", tag: "Sauna + meal" },
    ],
    taste: ["Salmon soup", "Karelian pie", "Long drink"],
    buy: ["Fazer chocolate", "Finnish design", "Sauna textile"],
    timeline: [
      { time: "09:00", title: "Drop bags at hotel", note: "Use the central location to start light and unencumbered." },
      { time: "09:45", title: "Senate & Market Squares", note: "Cathedral views, harbor stalls, and Old Market Hall." },
      { time: "11:15", title: "Ferry to Suomenlinna", note: "Allow about 2½–3 hours including the crossing." },
      { time: "14:30", title: "Oodi & Rock Church", note: "Pair the modern library with Temppeliaukio’s granite interior." },
      { time: "17:00", title: "Sauna or Finnish dinner", note: "Löyly for the full ritual; Savotta for central tradition." },
      { time: "20:00", title: "Skyroom or Ateljee Bar", note: "Optional final-night city view if energy remains." },
      { time: "Next day", title: "Airport train", note: "Walk into Central Station and follow signs for the I/P trains." },
    ],
  },
];

export const tripDays = [
  { stage: "Wed · Sep 2", city: "Travel", title: "Fly RDU → London", detail: "AA174 overnight; keep the Copenhagen essentials in the carry-on." },
  { stage: "Thu · Sep 3", city: "Copenhagen", title: "Arrive, check in, settle down", detail: "SK502 to Copenhagen; Adina check-in and a gentle first evening." },
  { stage: "Fri · Sep 4", city: "Copenhagen", title: "Castles, market, canal & Tivoli", detail: "Your full city day: Rosenborg, Torvehallerne, Nyhavn, and evening lights." },
  { stage: "Sat · Sep 5", city: "Copenhagen", title: "Carlsberg, embark & French dinner", detail: "Ship departs at 5:00 PM; confirmed French dinner aboard at 6:45 PM." },
  { stage: "Sun · Sep 6", city: "Oslo", title: "Vigeland to Aker Brygge", detail: "A long 10:00 AM–9:00 PM call with city sights and one museum." },
  { stage: "Mon · Sep 7", city: "At sea", title: "Recover and enjoy the ship", detail: "Spa, reading, a show, and a specialty dinner—no schedule required." },
  { stage: "Tue · Sep 8", city: "Warnemünde", title: "Booked Schwerin excursion", detail: "8:00 AM–2:00 PM with lunch time, then Italian dinner aboard at 7:00 PM." },
  { stage: "Wed · Sep 9", city: "Gdańsk", title: "Royal Way & Polish dinner", detail: "1:30–9:30 PM from Gdynia; protect the return buffer." },
  { stage: "Thu · Sep 10", city: "Visby", title: "Walk the medieval walls", detail: "11:00 AM–5:00 PM in the most wander-friendly stop." },
  { stage: "Fri · Sep 11", city: "Riga", title: "Old town & Central Market", detail: "Return aboard for the confirmed 5:30 PM Japanese dinner." },
  { stage: "Sat · Sep 12", city: "Stockholm", title: "Booked Stockholm transfer", detail: "Leave port at 9:00 AM and return eight hours later at about 5:00 PM." },
  { stage: "Sun · Sep 13", city: "Tallinn", title: "Toompea to Town Hall", detail: "Explore until early evening, then return for the 7:45 PM French dinner." },
  { stage: "Mon · Sep 14", city: "Helsinki", title: "Suomenlinna, design & sauna", detail: "Disembark, check in at Scandic Grand Central, and savor the finale." },
  { stage: "Tue · Sep 15", city: "Travel", title: "Fly Helsinki → RDU", detail: "AY1331 to London, then AA173 home." },
];

export const packing = {
  "Documents & money": ["Passport", "Cruise documents", "Travel insurance details", "Current entry authorizations", "Primary + backup card", "A little euro cash", "Printed emergency contacts"],
  "Layers for fall": ["Puffer coats", "Waterproof shell", "Light fleece or sweater", "Compact umbrella", "Comfortable walking boots", "Backup walking shoes", "Light gloves", "Scarf or buff", "Warm socks"],
  "Port-day bag": ["Ship card + photo ID", "Power bank", "Refillable water bottle", "Daily medications", "Sunglasses", "Packable tote", "Small snack", "Paper copy of all-aboard time"],
  "Tech & cabin": ["Socket adapters (EU + UK)", "Charging cables", "Kindle", "Tablet", "Luggage tracker", "Headphones", "Magnetic cabin hooks", "Seasickness remedy", "Dopp kit", "Offline copies of bookings"],
};

export type Phrase = { country: string; flag: string; lang: string; phrase: string; sound: string; meaning: string };

export const phrases: Phrase[] = [
  { country: "Denmark", flag: "🇩🇰", lang: "da-DK", phrase: "Hej", sound: "hi", meaning: "Hello" },
  { country: "Denmark", flag: "🇩🇰", lang: "da-DK", phrase: "Farvel", sound: "far-vel", meaning: "Goodbye" },
  { country: "Denmark", flag: "🇩🇰", lang: "da-DK", phrase: "Tak", sound: "tahk", meaning: "Thank you" },
  { country: "Denmark", flag: "🇩🇰", lang: "da-DK", phrase: "Selv tak", sound: "sel tahk", meaning: "You’re welcome" },
  { country: "Denmark", flag: "🇩🇰", lang: "da-DK", phrase: "Ja", sound: "yah", meaning: "Yes" },
  { country: "Denmark", flag: "🇩🇰", lang: "da-DK", phrase: "Nej", sound: "nigh", meaning: "No" },
  { country: "Denmark", flag: "🇩🇰", lang: "da-DK", phrase: "Taler du engelsk?", sound: "tale-er doo eng-elsk", meaning: "Do you speak English?" },

  { country: "Norway", flag: "🇳🇴", lang: "nb-NO", phrase: "Hei", sound: "hi", meaning: "Hello" },
  { country: "Norway", flag: "🇳🇴", lang: "nb-NO", phrase: "Ha det", sound: "hah deh", meaning: "Goodbye" },
  { country: "Norway", flag: "🇳🇴", lang: "nb-NO", phrase: "Takk", sound: "tahk", meaning: "Thank you" },
  { country: "Norway", flag: "🇳🇴", lang: "nb-NO", phrase: "Bare hyggelig", sound: "bah-reh hoo-geh-lee", meaning: "You’re welcome" },
  { country: "Norway", flag: "🇳🇴", lang: "nb-NO", phrase: "Ja", sound: "yah", meaning: "Yes" },
  { country: "Norway", flag: "🇳🇴", lang: "nb-NO", phrase: "Nei", sound: "nigh", meaning: "No" },
  { country: "Norway", flag: "🇳🇴", lang: "nb-NO", phrase: "Snakker du engelsk?", sound: "snah-ker doo eng-elsk", meaning: "Do you speak English?" },

  { country: "Germany", flag: "🇩🇪", lang: "de-DE", phrase: "Hallo", sound: "hah-loh", meaning: "Hello" },
  { country: "Germany", flag: "🇩🇪", lang: "de-DE", phrase: "Auf Wiedersehen", sound: "owf vee-der-zay-en", meaning: "Goodbye" },
  { country: "Germany", flag: "🇩🇪", lang: "de-DE", phrase: "Danke", sound: "dahn-keh", meaning: "Thank you" },
  { country: "Germany", flag: "🇩🇪", lang: "de-DE", phrase: "Gern geschehen", sound: "gern geh-shay-en", meaning: "You’re welcome" },
  { country: "Germany", flag: "🇩🇪", lang: "de-DE", phrase: "Ja", sound: "yah", meaning: "Yes" },
  { country: "Germany", flag: "🇩🇪", lang: "de-DE", phrase: "Nein", sound: "nine", meaning: "No" },
  { country: "Germany", flag: "🇩🇪", lang: "de-DE", phrase: "Sprechen Sie Englisch?", sound: "shpreh-khen zee eng-lish", meaning: "Do you speak English?" },

  { country: "Sweden", flag: "🇸🇪", lang: "sv-SE", phrase: "Hej", sound: "hay", meaning: "Hello" },
  { country: "Sweden", flag: "🇸🇪", lang: "sv-SE", phrase: "Hej då", sound: "hay doh", meaning: "Goodbye" },
  { country: "Sweden", flag: "🇸🇪", lang: "sv-SE", phrase: "Tack", sound: "tahk", meaning: "Thank you" },
  { country: "Sweden", flag: "🇸🇪", lang: "sv-SE", phrase: "Varsågod", sound: "var-sha-good", meaning: "You’re welcome" },
  { country: "Sweden", flag: "🇸🇪", lang: "sv-SE", phrase: "Ja", sound: "yah", meaning: "Yes" },
  { country: "Sweden", flag: "🇸🇪", lang: "sv-SE", phrase: "Nej", sound: "nigh", meaning: "No" },
  { country: "Sweden", flag: "🇸🇪", lang: "sv-SE", phrase: "Talar du engelska?", sound: "tah-lar doo eng-ell-ska", meaning: "Do you speak English?" },

  { country: "Latvia", flag: "🇱🇻", lang: "lv-LV", phrase: "Sveiki", sound: "svay-kee", meaning: "Hello" },
  { country: "Latvia", flag: "🇱🇻", lang: "lv-LV", phrase: "Uz redzēšanos", sound: "ooz red-zay-sha-nos", meaning: "Goodbye" },
  { country: "Latvia", flag: "🇱🇻", lang: "lv-LV", phrase: "Paldies", sound: "pahl-dee-es", meaning: "Thank you" },
  { country: "Latvia", flag: "🇱🇻", lang: "lv-LV", phrase: "Lūdzu", sound: "lood-zoo", meaning: "You’re welcome" },
  { country: "Latvia", flag: "🇱🇻", lang: "lv-LV", phrase: "Jā", sound: "yah", meaning: "Yes" },
  { country: "Latvia", flag: "🇱🇻", lang: "lv-LV", phrase: "Nē", sound: "neh", meaning: "No" },
  { country: "Latvia", flag: "🇱🇻", lang: "lv-LV", phrase: "Vai jūs runājat angliski?", sound: "vye yoos roo-nah-yat ang-lis-kee", meaning: "Do you speak English?" },

  { country: "Estonia", flag: "🇪🇪", lang: "et-EE", phrase: "Tere", sound: "teh-reh", meaning: "Hello" },
  { country: "Estonia", flag: "🇪🇪", lang: "et-EE", phrase: "Head aega", sound: "heh-ad eye-gah", meaning: "Goodbye" },
  { country: "Estonia", flag: "🇪🇪", lang: "et-EE", phrase: "Aitäh", sound: "eye-tah", meaning: "Thank you" },
  { country: "Estonia", flag: "🇪🇪", lang: "et-EE", phrase: "Palun", sound: "pah-loon", meaning: "You’re welcome" },
  { country: "Estonia", flag: "🇪🇪", lang: "et-EE", phrase: "Jah", sound: "yah", meaning: "Yes" },
  { country: "Estonia", flag: "🇪🇪", lang: "et-EE", phrase: "Ei", sound: "ay", meaning: "No" },
  { country: "Estonia", flag: "🇪🇪", lang: "et-EE", phrase: "Kas te räägite inglise keelt?", sound: "kas teh rah-gee-teh ing-lee-seh kaylt", meaning: "Do you speak English?" },

  { country: "Poland", flag: "🇵🇱", lang: "pl-PL", phrase: "Dzień dobry", sound: "jen doh-brih", meaning: "Hello" },
  { country: "Poland", flag: "🇵🇱", lang: "pl-PL", phrase: "Do widzenia", sound: "doh vee-dzen-yah", meaning: "Goodbye" },
  { country: "Poland", flag: "🇵🇱", lang: "pl-PL", phrase: "Dziękuję", sound: "jen-koo-yeh", meaning: "Thank you" },
  { country: "Poland", flag: "🇵🇱", lang: "pl-PL", phrase: "Proszę", sound: "proh-sheh", meaning: "You’re welcome" },
  { country: "Poland", flag: "🇵🇱", lang: "pl-PL", phrase: "Tak", sound: "tahk", meaning: "Yes" },
  { country: "Poland", flag: "🇵🇱", lang: "pl-PL", phrase: "Nie", sound: "nyeh", meaning: "No" },
  { country: "Poland", flag: "🇵🇱", lang: "pl-PL", phrase: "Czy mówi pan lub pani po angielsku?", sound: "chih moo-vee pahn loob pah-nee poh ang-yel-skoo", meaning: "Do you speak English?" },

  { country: "Finland", flag: "🇫🇮", lang: "fi-FI", phrase: "Hei", sound: "hay", meaning: "Hello" },
  { country: "Finland", flag: "🇫🇮", lang: "fi-FI", phrase: "Näkemiin", sound: "nah-keh-meen", meaning: "Goodbye" },
  { country: "Finland", flag: "🇫🇮", lang: "fi-FI", phrase: "Kiitos", sound: "kee-toss", meaning: "Thank you" },
  { country: "Finland", flag: "🇫🇮", lang: "fi-FI", phrase: "Ole hyvä", sound: "oh-leh hoo-vah", meaning: "You’re welcome" },
  { country: "Finland", flag: "🇫🇮", lang: "fi-FI", phrase: "Kyllä", sound: "kool-lah", meaning: "Yes" },
  { country: "Finland", flag: "🇫🇮", lang: "fi-FI", phrase: "Ei", sound: "ay", meaning: "No" },
  { country: "Finland", flag: "🇫🇮", lang: "fi-FI", phrase: "Puhutteko englantia?", sound: "poo-hoot-teh-ko eng-lahn-tee-ah", meaning: "Do you speak English?" },
];
