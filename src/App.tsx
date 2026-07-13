"use client";

import { useEffect, useMemo, useState } from "react";
import { packing, phrases, ports, tripDays, type Phrase } from "./trip-data";

const destinationPhotos = [
  { city: "Copenhagen", caption: "Nyhavn’s colorful harbor", credit: "Mahendra", image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Nyhavn-2023.jpg?width=1600", source: "https://commons.wikimedia.org/wiki/File:Nyhavn-2023.jpg" },
  { city: "Oslo", caption: "The Opera House on the fjord", credit: "Helge Høifødt", image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Oslo_Opera_House_seen_from_Langkaia.JPG?width=1600", source: "https://commons.wikimedia.org/wiki/File:Oslo_Opera_House_seen_from_Langkaia.JPG" },
  { city: "Schwerin", caption: "A castle rising from the lake", credit: "Harald Hoyer", image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Schwerin_Castle_Aerial_View.jpg?width=1600", source: "https://commons.wikimedia.org/wiki/File:Schwerin_Castle_Aerial_View.jpg" },
  { city: "Riga", caption: "Old Town’s layered architecture", credit: "Pierre André Leclercq", image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Old_Riga_Vecr%C4%ABga_Town_Hall.jpg?width=1600", source: "https://commons.wikimedia.org/wiki/File:Old_Riga_Vecr%C4%ABga_Town_Hall.jpg" },
  { city: "Tallinn", caption: "Medieval lanes below Town Hall", credit: "Steve Haslam", image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Tallinn_town_hall1.jpg?width=1600", source: "https://commons.wikimedia.org/wiki/File:Tallinn_town_hall1.jpg" },
  { city: "Stockholm", caption: "Gamla Stan from the water", credit: "Julian Herzog", image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Skeppsbrokajen_Gamla_Stan_from_Skeppsholmen_Stockholm_2016_01.jpg?width=1600", source: "https://commons.wikimedia.org/wiki/File:Skeppsbrokajen_Gamla_Stan_from_Skeppsholmen_Stockholm_2016_01.jpg" },
  { city: "Helsinki", caption: "Uspenski Cathedral above the harbor", credit: "InvictaHOG", image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Uspenski_Cathedral_Helsinki.jpg?width=1600", source: "https://commons.wikimedia.org/wiki/File:Uspenski_Cathedral_Helsinki.jpg" },
];

const dayPortId: Record<string, string> = {
  Copenhagen: "copenhagen", Oslo: "oslo", Warnemünde: "warnemunde", Visby: "visby",
  Riga: "riga", Tallinn: "tallinn", Stockholm: "stockholm", Gdańsk: "gdansk", Helsinki: "helsinki",
};

const portOrder = ["copenhagen", "oslo", "warnemunde", "gdansk", "visby", "riga", "stockholm", "tallinn", "helsinki"];
const orderedPorts = portOrder.map((id) => ports.find((port) => port.id === id)).filter((port): port is (typeof ports)[number] => Boolean(port));

type Countdown = { days: number; hours: number; minutes: number; seconds: number; departed: boolean };
type Weather = { temperature: number; apparent: number; code: number; wind: number; updated: string };
type ListItem = { id: string; text: string };
type EditableLists = Record<string, ListItem[]>;

const initialPacking: EditableLists = Object.fromEntries(Object.entries(packing).map(([category, items]) => [category, items.map((text) => ({ id: `${category}:${text}`, text }))]));
const initialTodos: EditableLists = {
  "Before departure": ["Check passport validity", "Confirm airline seats", "Download airline + cruise apps", "Save website for offline"].map((text) => ({ id: `before:${text}`, text })),
  "Bookings & tickets": ["Download excursion vouchers", "Save Hop-On Hop-Off tickets", "Confirm dinner reservations", "Print backup copies"].map((text) => ({ id: `bookings:${text}`, text })),
  "Home prep": ["Pause mail or arrange pickup", "Set thermostat", "Empty refrigerator perishables", "Share itinerary with family"].map((text) => ({ id: `home:${text}`, text })),
  "Final 48 hours": ["Check flight status", "Check Copenhagen weather", "Charge power banks", "Add luggage tags"].map((text) => ({ id: `final:${text}`, text })),
};

const departureTime = new Date("2026-09-02T00:00:00-04:00").getTime();
const weatherLabels: Record<number, string> = { 0: "Clear", 1: "Mostly clear", 2: "Partly cloudy", 3: "Overcast", 45: "Foggy", 48: "Icy fog", 51: "Light drizzle", 53: "Drizzle", 55: "Heavy drizzle", 61: "Light rain", 63: "Rain", 65: "Heavy rain", 71: "Light snow", 73: "Snow", 75: "Heavy snow", 80: "Rain showers", 81: "Rain showers", 82: "Heavy showers", 95: "Thunderstorms" };

function getCountdown(): Countdown {
  const remaining = Math.max(0, departureTime - Date.now());
  return { days: Math.floor(remaining / 86400000), hours: Math.floor(remaining / 3600000) % 24, minutes: Math.floor(remaining / 60000) % 60, seconds: Math.floor(remaining / 1000) % 60, departed: remaining === 0 };
}

export default function Home() {
  const [activePortId, setActivePortId] = useState("copenhagen");
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [packingLists, setPackingLists] = useState<EditableLists>(initialPacking);
  const [todoLists, setTodoLists] = useState<EditableLists>(initialTodos);
  const [todoChecked, setTodoChecked] = useState<Set<string>>(new Set());
  const [newPackingItems, setNewPackingItems] = useState<Record<string, string>>({});
  const [newTodoItems, setNewTodoItems] = useState<Record<string, string>>({});
  const [phraseCountry, setPhraseCountry] = useState("Denmark");
  const [playing, setPlaying] = useState("");
  const [countdown, setCountdown] = useState<Countdown>({ days: 0, hours: 0, minutes: 0, seconds: 0, departed: false });
  const [weather, setWeather] = useState<Weather | null>(null);
  const [weatherStatus, setWeatherStatus] = useState<"loading" | "ready" | "error">("loading");
  const [activePhoto, setActivePhoto] = useState(0);
  const [photoPaused, setPhotoPaused] = useState(false);
  const [online, setOnline] = useState(true);
  const [offlineSave, setOfflineSave] = useState<"idle" | "saving" | "ready" | "error">("idle");
  const [storageReady, setStorageReady] = useState(false);
  const activePort = ports.find((port) => port.id === activePortId) ?? ports[0];
  const totalPacking = Object.values(packingLists).flat().length;
  const packedCount = Object.values(packingLists).flat().filter((item) => checked.has(item.id)).length;
  const percent = totalPacking ? Math.round((packedCount / totalPacking) * 100) : 0;
  const totalTodos = Object.values(todoLists).flat().length;
  const completedTodos = Object.values(todoLists).flat().filter((item) => todoChecked.has(item.id)).length;
  const todoPercent = totalTodos ? Math.round((completedTodos / totalTodos) * 100) : 0;
  const countries = ["All", ...Array.from(new Set(phrases.map((phrase) => phrase.country)))];
  const visiblePhrases = phraseCountry === "All" ? phrases : phrases.filter((phrase) => phrase.country === phraseCountry);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("baltic-packing-v1");
      if (saved) window.setTimeout(() => setChecked(new Set(JSON.parse(saved))), 0);
      const savedPacking = window.localStorage.getItem("baltic-packing-items-v2");
      if (savedPacking) window.setTimeout(() => setPackingLists(JSON.parse(savedPacking)), 0);
      const savedTodos = window.localStorage.getItem("baltic-todo-items-v1");
      if (savedTodos) window.setTimeout(() => setTodoLists(JSON.parse(savedTodos)), 0);
      const savedTodoChecks = window.localStorage.getItem("baltic-todo-checks-v1");
      if (savedTodoChecks) window.setTimeout(() => setTodoChecked(new Set(JSON.parse(savedTodoChecks))), 0);
    } catch { /* local storage may be unavailable in private mode */ }
    if (window.localStorage.getItem("baltic-offline-ready")) window.setTimeout(() => setOfflineSave("ready"), 0);
    window.setTimeout(() => setStorageReady(true), 0);
    const updateConnection = () => setOnline(navigator.onLine);
    window.setTimeout(updateConnection, 0);
    window.addEventListener("online", updateConnection);
    window.addEventListener("offline", updateConnection);
    const refreshForNewVersion = () => {
      if (!navigator.serviceWorker.controller || window.sessionStorage.getItem("baltic-sw-v13-refreshed")) return;
      window.sessionStorage.setItem("baltic-sw-v13-refreshed", "true");
      window.location.reload();
    };
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("controllerchange", refreshForNewVersion);
      navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).then((registration) => registration.update()).catch(() => undefined);
    }
    return () => {
      window.removeEventListener("online", updateConnection);
      window.removeEventListener("offline", updateConnection);
      if ("serviceWorker" in navigator) navigator.serviceWorker.removeEventListener("controllerchange", refreshForNewVersion);
    };
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    try {
      window.localStorage.setItem("baltic-packing-v1", JSON.stringify(Array.from(checked)));
      window.localStorage.setItem("baltic-packing-items-v2", JSON.stringify(packingLists));
    }
    catch { /* checklist remains usable for this visit */ }
  }, [checked, packingLists, storageReady]);

  useEffect(() => {
    if (!storageReady) return;
    try {
      window.localStorage.setItem("baltic-todo-items-v1", JSON.stringify(todoLists));
      window.localStorage.setItem("baltic-todo-checks-v1", JSON.stringify(Array.from(todoChecked)));
    } catch { /* to-do list remains usable for this visit */ }
  }, [todoLists, todoChecked, storageReady]);

  useEffect(() => {
    setCountdown(getCountdown());
    const timer = window.setInterval(() => setCountdown(getCountdown()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${activePort.latitude}&longitude=${activePort.longitude}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=auto`, { signal: controller.signal })
      .then((response) => { if (!response.ok) throw new Error("Weather unavailable"); return response.json(); })
      .then((data) => {
        const current = data.current;
        setWeather({ temperature: Math.round(current.temperature_2m), apparent: Math.round(current.apparent_temperature), code: current.weather_code, wind: Math.round(current.wind_speed_10m), updated: current.time });
        setWeatherStatus("ready");
      })
      .catch((error) => { if (error.name !== "AbortError") setWeatherStatus("error"); });
    return () => controller.abort();
  }, [activePort.id, activePort.latitude, activePort.longitude]);

  useEffect(() => {
    if (photoPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActivePhoto((current) => (current + 1) % destinationPhotos.length), 5000);
    return () => window.clearInterval(timer);
  }, [photoPaused]);

  const nextItems = useMemo(() => Object.entries(packingLists).map(([category, items]) => ({
    category, remaining: items.filter((item) => !checked.has(item.id)).length,
  })), [checked, packingLists]);

  const choosePort = (id: string, shouldScroll = false) => {
    setWeather(null);
    setWeatherStatus("loading");
    setActivePortId(id);
    if (shouldScroll) window.setTimeout(() => document.getElementById("ports")?.scrollIntoView({ behavior: "smooth" }), 0);
  };

  const openDay = (city: string) => {
    const id = dayPortId[city];
    if (id) choosePort(id, true);
    else document.getElementById(city === "Travel" ? "essentials" : "days")?.scrollIntoView({ behavior: "smooth" });
  };

  const togglePacked = (key: string) => {
    setChecked((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  };

  const toggleTodo = (key: string) => {
    setTodoChecked((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  };

  const addItem = (kind: "packing" | "todo", category: string) => {
    const drafts = kind === "packing" ? newPackingItems : newTodoItems;
    const text = (drafts[category] ?? "").trim();
    if (!text) return;
    const item = { id: `${kind}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, text };
    if (kind === "packing") {
      setPackingLists((current) => ({ ...current, [category]: [...current[category], item] }));
      setNewPackingItems((current) => ({ ...current, [category]: "" }));
    } else {
      setTodoLists((current) => ({ ...current, [category]: [...current[category], item] }));
      setNewTodoItems((current) => ({ ...current, [category]: "" }));
    }
  };

  const removeItem = (kind: "packing" | "todo", category: string, id: string) => {
    if (kind === "packing") {
      setPackingLists((current) => ({ ...current, [category]: current[category].filter((item) => item.id !== id) }));
      setChecked((current) => { const next = new Set(current); next.delete(id); return next; });
    } else {
      setTodoLists((current) => ({ ...current, [category]: current[category].filter((item) => item.id !== id) }));
      setTodoChecked((current) => { const next = new Set(current); next.delete(id); return next; });
    }
  };

  const speak = (phrase: Phrase) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(phrase.phrase);
    utterance.lang = phrase.lang;
    utterance.rate = 0.78;
    utterance.onstart = () => setPlaying(`${phrase.country}:${phrase.phrase}`);
    utterance.onend = () => setPlaying("");
    utterance.onerror = () => setPlaying("");
    window.speechSynthesis.speak(utterance);
  };

  const saveForOffline = async () => {
    if (!("serviceWorker" in navigator) || !navigator.onLine) { setOfflineSave("error"); return; }
    setOfflineSave("saving");
    try {
      const registration = await navigator.serviceWorker.ready;
      const worker = registration.active;
      if (!worker) throw new Error("Offline worker unavailable");
      const resourceUrls = performance.getEntriesByType("resource").map((entry) => entry.name).filter((url) => url.startsWith(window.location.origin));
      const urls = Array.from(new Set([new URL(import.meta.env.BASE_URL, window.location.origin).href, ...resourceUrls, ...destinationPhotos.map((photo) => photo.image)]));
      await new Promise<void>((resolve, reject) => {
        const channel = new MessageChannel();
        const timer = window.setTimeout(() => reject(new Error("Offline save timed out")), 30000);
        channel.port1.onmessage = (event) => { window.clearTimeout(timer); if (event.data?.ok) resolve(); else reject(new Error("Offline save failed")); };
        worker.postMessage({ type: "CACHE_TRIP", urls }, [channel.port2]);
      });
      window.localStorage.setItem("baltic-offline-ready", new Date().toISOString());
      setOfflineSave("ready");
    } catch { setOfflineSave("error"); }
  };

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Baltic cruise companion home">
          <span className="brand-mark">B</span><span>Baltic Companion</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#essentials">Trip</a><a href="#music">Music</a><a href="#days">Days</a><a href="#ports">Ports</a><a href="#pack">Pack</a><a href="#todo">To-Do</a><a href="#phrases">Phrases</a>
        </nav>
        <span className={`connection-pill ${online ? "online" : "offline"}`}><i />{online ? "Online" : "Offline"}</span>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Owen’s pocket trip guide</p>
          <h1>All of the Baltic.<br /><em>Right in your pocket.</em></h1>
          <p className="hero-lede">Port plans, quick maps, food finds, packing checks, and useful local phrases—organized for the moment you need them.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#days">See the daily plan <span>→</span></a>
            <a className="button button-quiet" href="#ports">Explore the ports <span>↓</span></a>
          </div>
          <div className="trip-facts" aria-label="Trip summary">
            <div><strong>Sep 2–15</strong><span>2026 dates</span></div><div><strong>9</strong><span>destinations</span></div><div><strong>{countdown.departed ? "Let’s go" : `${countdown.days}d ${countdown.hours}h`}</strong><span>until departure</span></div>
          </div>
          <div className="countdown" aria-live="polite" aria-label="Countdown to September 2, 2026">
            <span className="overline">{countdown.departed ? "The adventure is underway" : "Until we go · Sep 2"}</span>
            <div>{[["Days", countdown.days], ["Hours", countdown.hours], ["Min", countdown.minutes], ["Sec", countdown.seconds]].map(([label, value]) => <b key={label}><strong>{String(value).padStart(2, "0")}</strong><small>{label}</small></b>)}</div>
          </div>
        </div>

        <div className="photo-bank" id="route" onMouseEnter={() => setPhotoPaused(true)} onMouseLeave={() => setPhotoPaused(false)} onFocus={() => setPhotoPaused(true)} onBlur={() => setPhotoPaused(false)}>
          <div className="photo-stage" aria-live="polite">
            {destinationPhotos.map((photo, index) => <img key={photo.city} src={photo.image} alt={`${photo.city} — ${photo.caption}`} className={index === activePhoto ? "active" : ""} loading={index === 0 ? "eager" : "lazy"} />)}
            <div className="photo-shade" />
            <div className="photo-copy"><span className="overline">A glimpse of stop {activePhoto + 1}</span><h2>{destinationPhotos[activePhoto].city}</h2><p>{destinationPhotos[activePhoto].caption}</p></div>
            <button className="photo-arrow prev" onClick={() => setActivePhoto((activePhoto - 1 + destinationPhotos.length) % destinationPhotos.length)} aria-label="Previous destination photo">←</button>
            <button className="photo-arrow next" onClick={() => setActivePhoto((activePhoto + 1) % destinationPhotos.length)} aria-label="Next destination photo">→</button>
          </div>
          <div className="photo-controls">
            <div className="photo-dots" aria-label="Choose a destination photo">{destinationPhotos.map((photo, index) => <button key={photo.city} className={index === activePhoto ? "active" : ""} onClick={() => setActivePhoto(index)} aria-label={`Show ${photo.city}`} aria-current={index === activePhoto ? "true" : undefined} />)}</div>
            <a href={destinationPhotos[activePhoto].source} target="_blank" rel="noreferrer">Photo: {destinationPhotos[activePhoto].credit} · details ↗</a>
          </div>
        </div>
      </section>

      <section className="essentials-section" id="essentials">
        <div className="section-heading">
          <div><p className="eyebrow"><span /> Confirmed travel</p><h2>Flights, beds, and the ship.</h2></div>
          <p>Your fixed trip spine from the Baltic planner. Check the airline and cruise apps for live times, gates, and terminal changes.</p>
        </div>
        <div className="offline-card">
          <div className="offline-symbol">↓</div>
          <div><span className="overline">Pocket mode</span><h3>{offlineSave === "ready" ? "Trip saved on this device" : "Keep the guide available without service"}</h3><p>Save the itinerary, port plans, packing list, phrases, currency notes, and destination photos. Live weather, maps, and external restaurant links still need a connection.</p></div>
          <div className="offline-actions">
            <button onClick={saveForOffline} disabled={offlineSave === "saving" || !online}>{offlineSave === "saving" ? "Saving…" : offlineSave === "ready" ? "Save again" : offlineSave === "error" ? "Try again online" : "Save for offline"}</button>
            <a href="https://app.notion.com/p/2b59aa1f16c080e7843ee206da6b1daa" target="_blank" rel="noreferrer">Open Notion planner ↗</a>
          </div>
        </div>
        <article className="music-card" id="music">
          <div className="music-art" aria-hidden="true">
            <div className="music-sun" />
            <div className="music-title"><span>Baltic</span><strong>After Dark</strong></div>
            <div className="music-wave">{[10, 18, 28, 14, 34, 23, 40, 19, 31, 12, 25, 16].map((height, index) => <i key={index} style={{ height }} />)}</div>
          </div>
          <div className="music-copy">
            <span className="overline">Your trip soundtrack</span>
            <h3>Baltic After Dark</h3>
            <p>Nordic electronica, Baltic club sounds, German techno, and familiar EDM anthems—sequenced for flights, sail-aways, city streets, and nights aboard.</p>
            <div className="music-tags"><span>Nordic EDM</span><span>Techno</span><span>Sail-away energy</span></div>
          </div>
          <div className="music-action">
            <a href="https://music.youtube.com/playlist?list=PLG45crNlxOPI&amp;si=-B7WQtj9Ikv56h79" target="_blank" rel="noreferrer" aria-label="Open Baltic After Dark playlist in YouTube Music"><b><i /> YouTube Music</b><span>Open the playlist&nbsp; ↗</span></a>
            <small><i className={online ? "live" : ""} /> {online ? "Ready to stream" : "Connect to stream"}</small>
          </div>
        </article>
        <div className="travel-grid">
          <article className="travel-card flight-card"><span className="travel-date">Sep 2–3</span><span className="overline">Outbound</span><h3>RDU <i>→</i> LHR <i>→</i> CPH</h3><div className="flight-pills"><b>AA174</b><b>SK502</b></div><p>Overnight to London, then onward to Copenhagen.</p></article>
          <article className="travel-card hotel-card"><span className="travel-date">Sep 3–5</span><span className="overline">Copenhagen stay</span><h3>Adina Apartment Hotel</h3><p>Your pre-cruise base near the harbor and cruise-port side of town.</p><span className="confirmed">✓ Confirmed in planner</span></article>
          <article className="travel-card cruise-card"><span className="travel-date">Sep 5–14</span><span className="overline">Baltic cruise</span><h3>Copenhagen <i>→</i> Helsinki</h3><p>Embark September 5; nine nights with one restorative sea day.</p><span className="confirmed">9 nights</span></article>
          <article className="travel-card hotel-card"><span className="travel-date">Sep 14–15</span><span className="overline">Helsinki stay</span><h3>Scandic Grand Central</h3><p>Beside Central Station for an easy final night and airport train.</p><span className="confirmed">✓ Confirmed in planner</span></article>
          <article className="travel-card flight-card"><span className="travel-date">Sep 15</span><span className="overline">Homebound</span><h3>HEL <i>→</i> LHR <i>→</i> RDU</h3><div className="flight-pills"><b>AY1331</b><b>AA173</b></div><p>Finnair to London, then American home to Raleigh–Durham.</p></article>
        </div>
        <div className="rail-plans" aria-label="Airport train plans">
          <article>
            <span className="rail-icon">CPH</span><div><span className="overline">Sep 3 · airport to hotel</span><h3>Direct regional train to Østerport</h3><p>After SK502’s scheduled 1:20 PM arrival, follow Train signs below Terminal 3. Take a northbound Øresund/regional train that lists <b>Østerport</b>, commonly toward Helsingør or Nivå. Ride about 25 minutes, then walk 10–15 minutes to Adina at Amerika Plads 7.</p><small>No fixed train number · services run frequently · buy the ticket before boarding</small></div>
          </article>
          <article>
            <span className="rail-icon">HEL</span><div><span className="overline">Sep 15 · hotel to airport</span><h3>I or P train · airport target 6:00 AM</h3><p>AY1331 is currently scheduled for <b>8:00 AM</b>. Leave the hotel room around <b>5:00 AM</b>, walk directly into Helsinki Central, and take the first airport-bound <b>I or P train departing by 5:20 AM</b>. The ride is about 30 minutes, putting you at HEL around 5:50 AM—just over two hours early.</p><small>ABC ticket required · use whichever I/P train leaves first · confirm flight and early train times the day before</small></div>
          </article>
        </div>
        <div className="locked-plans" aria-label="Booked excursions, transfers, and dinners">
          <div><span className="overline">Locked plans</span><strong>Already on the calendar</strong></div>
          <ul>
            <li><span>Sep 5 · 6:45 PM</span><b>French dinner aboard</b></li>
            <li><span>Sep 8 · 8:00 AM</span><b>Schwerin excursion · 6 hours</b></li>
            <li><span>Sep 8 · 7:00 PM</span><b>Italian dinner aboard</b></li>
            <li><span>Sep 11 · 5:30 PM</span><b>Japanese dinner aboard</b></li>
            <li><span>Sep 12 · 9:00 AM</span><b>Stockholm transfer · 8 hours</b></li>
            <li><span>Sep 13 · 7:45 PM</span><b>French dinner aboard</b></li>
            <li><span>Sep 3–5</span><b>Copenhagen sightseeing bus · all days</b></li>
            <li><span>Sep 6</span><b>Oslo sightseeing bus</b></li>
            <li><span>Sep 12</span><b>Stockholm sightseeing bus</b></li>
            <li><span>Sep 13</span><b>Tallinn sightseeing bus</b></li>
          </ul>
        </div>
        <div className="money-guide" aria-label="Currency used at each destination">
          <div><span className="overline">Money guide</span><strong>What to use in each port</strong><p>Cards are widely accepted, but keep a little local currency for small purchases.</p></div>
          <ul>{orderedPorts.map((port) => <li key={port.id}><span>{port.flag} {port.city}</span><b>{port.currency}</b><small>{port.currencyCode}</small></li>)}</ul>
        </div>
      </section>

      <section className="days-section" id="days">
        <div className="section-heading light-heading">
          <div><p className="eyebrow"><span /> The whole journey</p><h2>Your trip, day by day</h2></div>
          <p>Times inside each port guide are a practical starting point. Let the ship’s posted all-aboard time win every argument.</p>
        </div>
        <div className="day-rail" aria-label="Trip day sequence">
          {tripDays.map((day, index) => (
            <button className="day-card" key={`${day.stage}-${day.city}-${index}`} onClick={() => openDay(day.city)}>
              <span className="day-index">{String(index + 1).padStart(2, "0")}</span>
              <span className="overline">{day.stage}</span><strong>{day.city}</strong><h3>{day.title}</h3><p>{day.detail}</p><i>Open plan <b>→</b></i>
            </button>
          ))}
        </div>
        <p className="swipe-hint">Swipe the cards on a phone · tap any day for its full plan</p>
      </section>

      <section className="ports-section" id="ports">
        <div className="section-heading">
          <div><p className="eyebrow"><span /> Port field guide</p><h2>Pick a stop. See the plan.</h2></div>
          <p>Each guide keeps the day focused: what matters, how to move, where to eat, and when to turn back.</p>
        </div>
        <div className="port-tabs" role="tablist" aria-label="Choose a destination">
          {orderedPorts.map((port) => (
            <button key={port.id} className={activePort.id === port.id ? "active" : ""} onClick={() => choosePort(port.id)} role="tab" aria-selected={activePort.id === port.id}>
              <span>{port.flag}</span>{port.city}
            </button>
          ))}
        </div>

        <article className="port-guide">
          <div className="port-intro">
            <div className="port-code">{activePort.code}</div>
            <div><span className="overline">{activePort.country} · {activePort.timing}</span><h3>{activePort.city}</h3><p>{activePort.kicker}</p></div>
            <a className="map-button" href={activePort.map} target="_blank" rel="noreferrer" aria-label={`Open ${activePort.mapLabel} in OpenStreetMap`}><span className="pin">●</span><span>Open map<small>OpenStreetMap ↗</small></span></a>
          </div>

          <div className="port-grid">
            <div className="timeline-panel">
              <div className="panel-title"><span className="overline">Suggested timeline</span><strong>Make the most of the day</strong></div>
              <ol className="timeline-list">
                {activePort.timeline.map((item, index) => (
                  <li key={`${item.time}-${item.title}`}><span className="timeline-time">{item.time}</span><i className={index === activePort.timeline.length - 1 ? "last" : ""} /><div><strong>{item.title}</strong><p>{item.note}</p></div></li>
                ))}
              </ol>
              <div className="transit-note"><b>Transit note</b><p>{activePort.transit}</p></div>
            </div>

            <div className="port-details">
              {activePort.hopOnOff && <div className="detail-card bus-pass-card"><div><span className="overline">Booked · City Sightseeing</span><strong>Hop-On Hop-Off pass</strong></div><p>{activePort.hopOnOff.note}</p><a href={activePort.hopOnOff.url} target="_blank" rel="noreferrer">Current route & stops ↗</a></div>}
              <div className="detail-card weather-card" aria-live="polite">
                <div><span className="overline">Live weather · {activePort.city}</span><strong>{weatherStatus === "ready" && weather ? `${weather.temperature}°F` : weatherStatus === "error" ? "Unavailable" : "Loading…"}</strong></div>
                {weatherStatus === "ready" && weather && <div className="weather-reading"><b>{weatherLabels[weather.code] ?? "Current conditions"}</b><span>Feels {weather.apparent}° · Wind {weather.wind} mph</span><small>Updated locally at {weather.updated.slice(11, 16)} · Open-Meteo</small></div>}
                {weatherStatus === "error" && <p>Connect to the internet and reopen this port to refresh conditions.</p>}
              </div>
              <div className="detail-card highlights-card"><span className="overline">Port highlights</span><ul>{activePort.highlights.map((item) => <li key={item}><span>✓</span>{item}</li>)}</ul></div>
              <div className="detail-card"><span className="overline">Restaurant ideas</span><div className="restaurant-list">
                {activePort.eat.map((place) => <a key={place.name} href={place.url} target="_blank" rel="noreferrer"><div><strong>{place.name}</strong><p>{place.why}</p></div><span>{place.tag} ↗</span></a>)}
              </div></div>
              <div className="tiny-grid">
                <div className="detail-card"><span className="overline">Taste</span>{activePort.taste.map((item) => <p key={item}>• {item}</p>)}</div>
                <div className="detail-card"><span className="overline">Bring home</span>{activePort.buy.map((item) => <p key={item}>• {item}</p>)}</div>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section className="packing-section" id="pack">
        <div className="section-heading packing-heading">
          <div><p className="eyebrow"><span /> The practical bit</p><h2>Pack once. Walk everywhere.</h2></div>
          <div className="packing-progress" aria-label={`${packedCount} of ${totalPacking} packing items complete`}>
            <div><strong>{percent}%</strong><span>{packedCount} of {totalPacking} packed</span></div><span className="progress-track"><i style={{ width: `${percent}%` }} /></span>
          </div>
        </div>
        <div className="packing-grid">
          {Object.entries(packingLists).map(([category, items]) => (
            <fieldset key={category} className="packing-card"><legend><span>{category}</span><small>{nextItems.find((item) => item.category === category)?.remaining ?? 0} left</small></legend>
              {items.map((item) => {
                const isChecked = checked.has(item.id);
                return <div className="editable-row" key={item.id}><label className={isChecked ? "packed" : ""}><input type="checkbox" checked={isChecked} onChange={() => togglePacked(item.id)} /><span className="checkmark">✓</span><span>{item.text}</span></label><button onClick={() => removeItem("packing", category, item.id)} aria-label={`Remove ${item.text}`}>×</button></div>;
              })}
              <form className="add-row" onSubmit={(event) => { event.preventDefault(); addItem("packing", category); }}><input value={newPackingItems[category] ?? ""} onChange={(event) => setNewPackingItems((current) => ({ ...current, [category]: event.target.value }))} placeholder="Add an item…" aria-label={`Add item to ${category}`} /><button type="submit" aria-label={`Add to ${category}`}>+</button></form>
            </fieldset>
          ))}
        </div>
        <p className="privacy-note"><span>✓</span> Your checkmarks stay on this device. No sign-in, syncing, or account needed.</p>
      </section>

      <section className="todo-section" id="todo">
        <div className="section-heading packing-heading">
          <div><p className="eyebrow"><span /> Before you go</p><h2>A clear runway to departure.</h2></div>
          <div className="packing-progress" aria-label={`${completedTodos} of ${totalTodos} tasks complete`}>
            <div><strong>{todoPercent}%</strong><span>{completedTodos} of {totalTodos} done</span></div><span className="progress-track"><i style={{ width: `${todoPercent}%` }} /></span>
          </div>
        </div>
        <div className="packing-grid">
          {Object.entries(todoLists).map(([category, items]) => (
            <fieldset key={category} className="packing-card"><legend><span>{category}</span><small>{items.filter((item) => !todoChecked.has(item.id)).length} left</small></legend>
              {items.map((item) => {
                const isChecked = todoChecked.has(item.id);
                return <div className="editable-row" key={item.id}><label className={isChecked ? "packed" : ""}><input type="checkbox" checked={isChecked} onChange={() => toggleTodo(item.id)} /><span className="checkmark">✓</span><span>{item.text}</span></label><button onClick={() => removeItem("todo", category, item.id)} aria-label={`Remove ${item.text}`}>×</button></div>;
              })}
              <form className="add-row" onSubmit={(event) => { event.preventDefault(); addItem("todo", category); }}><input value={newTodoItems[category] ?? ""} onChange={(event) => setNewTodoItems((current) => ({ ...current, [category]: event.target.value }))} placeholder="Add a task…" aria-label={`Add task to ${category}`} /><button type="submit" aria-label={`Add to ${category}`}>+</button></form>
            </fieldset>
          ))}
        </div>
        <p className="privacy-note"><span>✓</span> Tasks and changes stay on this device and remain available offline.</p>
      </section>

      <section className="phrases-section" id="phrases">
        <div className="section-heading light-heading">
          <div><p className="eyebrow"><span /> Say it kindly</p><h2>A little local goes a long way.</h2></div>
          <p>Seven essentials for every language on the itinerary. Tap the speaker to hear your device pronounce each phrase.</p>
        </div>
        <div className="phrase-tabs" role="tablist" aria-label="Filter phrases by country">
          {countries.map((country) => <button key={country} className={phraseCountry === country ? "active" : ""} onClick={() => setPhraseCountry(country)}>{country}</button>)}
        </div>
        <div className="phrase-grid">
          {visiblePhrases.map((phrase) => {
            const key = `${phrase.country}:${phrase.phrase}`;
            return <article className="phrase-card" key={key}><div><span className="flag">{phrase.flag}</span><span className="overline">{phrase.country}</span></div><strong>{phrase.phrase}</strong><p>{phrase.meaning}</p><footer><span>Sounds like: {phrase.sound}</span><button onClick={() => speak(phrase)} aria-label={`Hear ${phrase.phrase} pronounced`}>{playing === key ? "◼" : "▶"}</button></footer></article>;
          })}
        </div>
      </section>

      <footer className="site-footer"><div><span className="brand-mark">B</span><div><strong>Baltic Companion</strong><p>Built for Owen’s cruise · adjust live details to the ship’s daily program</p></div></div><a href="#top">Back to top ↑</a></footer>

      <nav className="mobile-nav" aria-label="Mobile navigation">
        <a href="#essentials"><span>✈</span>Trip</a><a href="#ports"><span>⌖</span>Ports</a><a href="#pack"><span>✓</span>Pack</a><a href="#todo"><span>□</span>To-Do</a><a href="#phrases"><span>“</span>Phrases</a>
      </nav>
    </main>
  );
}
