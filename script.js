// ================================================================
//  WANDERLUST — TRAVEL BOOKING SITE
// ================================================================

// ── STARTER DATA ─────────────────────────────────────────────────
const trips = [
  {
    id: 1,
    name: "Bali Sunrise Retreat",
    country: "Indonesia",
    continent: "Asia",
    price: 1_299.99,
    duration: 7,
    rating: 4.8,
    available: true,
    seats: 12,
    departure: new Date(2027, 8, 15),
    season: ["summer", "spring"],
    includes: ["hotel", "flights", "tours"],
    hotel: { name: "Sunset Villa", rating: 5 },
    description: "Experience the magic of Bali sunrises.",
  },
  {
    id: 2,
    name: "Santorini Escape",
    country: "Greece",
    continent: "Europe",
    price: 2_149.0,
    duration: 10,
    rating: 4.9,
    available: true,
    seats: 8,
    departure: new Date(2027, 9, 1),
    season: ["summer"],
    includes: ["hotel", "flights", "wine tour"],
    hotel: { name: "Caldera View", rating: 5 },
    description: "Iconic blue domes and golden sunsets.",
  },
  {
    id: 3,
    name: "Serengeti Safari",
    country: "Tanzania",
    continent: "Africa",
    price: 3_450.0,
    duration: 8,
    rating: 4.7,
    available: true,
    seats: 6,
    departure: new Date(2027, 10, 20),
    season: ["winter"],
    includes: ["lodge", "flights", "game drives"],
    hotel: { name: "Safari Camp", rating: 4 },
    description: null,
  },
  {
    id: 4,
    name: "Kyoto Cherry Blossom",
    country: "Japan",
    continent: "Asia",
    price: 1_899.5,
    duration: 9,
    rating: 4.9,
    available: true,
    seats: 10,
    departure: new Date(2027, 2, 25),
    season: ["spring"],
    includes: ["hotel", "bullet train", "tours"],
    hotel: { name: "Ryokan Inn", rating: 5 },
    description: "Walk through ancient temples in full bloom.",
  },
  {
    id: 5,
    name: "Machu Picchu Trek",
    country: "Peru",
    continent: "Americas",
    price: 2_050.0,
    duration: 12,
    rating: 4.6,
    available: false,
    seats: 0,
    departure: new Date(2027, 11, 5),
    season: ["summer", "winter"],
    includes: ["hostel", "guide", "train"],
    hotel: null,
    description: "Trek the Inca Trail to the lost city.",
  },
  {
    id: 6,
    name: "Northern Lights Iceland",
    country: "Iceland",
    continent: "Europe",
    price: 1_750.0,
    duration: 5,
    rating: 4.8,
    available: true,
    seats: 15,
    departure: new Date(2026, 9, 18),
    season: ["winter"],
    includes: ["hotel", "flights", "aurora tour"],
    hotel: { name: "Glass Igloo", rating: 5 },
    description: "Chase the aurora borealis.",
  },
  {
    id: 7,
    name: "Great Barrier Reef Dive",
    country: "Australia",
    continent: "Oceania",
    price: 2_300.0,
    duration: 7,
    rating: 4.5,
    available: true,
    seats: 20,
    departure: new Date(2026, 7, 10),
    season: ["summer"],
    includes: ["resort", "flights", "diving"],
    hotel: { name: "Reef Lodge", rating: 4 },
    description: "Dive the world's largest coral reef.",
  },
  {
    id: 8,
    name: "Amazon Rainforest Exp.",
    country: "Brazil",
    continent: "Americas",
    price: 1_600.0,
    duration: 6,
    rating: 4.4,
    available: true,
    seats: 8,
    departure: new Date(2026, 6, 26),
    season: ["summer"],
    includes: ["eco-lodge", "guide", "boat tours"],
    hotel: { name: "Jungle Camp", rating: 3 },
    description: "Explore the lungs of the earth.",
  },
];

let cart = [];
let displayedTrips = [...trips];

// ── UTILITIES ──────────────────────────────────────
function showToast(msg) {
  const toast = document.getElementById("toast");
  document.getElementById("toast-msg").textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

//  LIVE CLOCK ───────────────────────────────────────────

const clockEl = document.querySelector("#clock");
function getCurrentTime() {
  return new Date().toLocaleTimeString();
}
function startClock() {
  const clock = setInterval(() => {
    const time = getCurrentTime();
    clockEl.textContent = time;
  }, 1000);
}

startClock();

// ──  COUNTDOWN TO NEXT DEPARTURE ─────────────────────────

const daysEl = document.querySelector("#cd-days");
const hoursEl = document.querySelector("#cd-hours");
const minsEl = document.querySelector("#cd-mins");
const secsEl = document.querySelector("#cd-secs");

function getNextDepartingTripTime(trips) {
  //get the next departing trip
  const tripTime = trips.reduce(
    (t, trip) => (t < trip.departure ? t : trip.departure),
    trips[0].departure,
  );
  return tripTime;
}

function getTimeDifference(date1, date2) {
  //get number of mseconds left between current time and next departing trip
  const mseconds = Math.abs(date1 - date2);
  return mseconds;
}

function formatTime(ms) {
  //format milliseconds to a nice string with days,hours,mins,seconds
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((ms / (1000 * 60)) % 60);
  const secs = Math.floor((ms / 1000) % 60);

  return [days, hours, mins, secs];
}

function displayNextDepartingTripClock() {
  //display the time left at 1 second interval to the next departing trip
  const clock = setInterval(() => {
    const time = getTimeDifference(new Date(), getNextDepartingTripTime(trips));
    const [days, hours, mins, secs] = formatTime(time);
    daysEl.textContent = `${days}`;
    hoursEl.textContent = `${hours}`;
    minsEl.textContent = `${mins}`;
    secsEl.textContent = `${secs}`;
  }, 1000);
}

displayNextDepartingTripClock();
// RENDER TRIP CARDS ────────────────────────────────────

function renderTrips() {
  // YOUR CODE HERE
}

//SET TODAY'S DATE IN BOOKING FORM ────────────────────

function setDefaultDepartureDate() {
  const inputDateEl = document.querySelector("#input-date");
  inputDateEl.value = new Date().toISOString().split("T")[0];
}

setDefaultDepartureDate();

// POPULATE TRIP DROPDOWN ──────────────────────────────
const inputTripEl = document.querySelector("#input-trip");

function populateTripDropdown(trips) {
  trips?.forEach((trip, index) => {
    if (trip?.available) {
      const tripName = trip.name ?? "Unknown";
      const price = trip.price ?? 0;

      const optionString = `${tripName} - ${price}`;

      const html = `<option value =${index + 1}>${optionString}</option>`;

      inputTripEl.insertAdjacentHTML("beforeend", html);
    }
  });
}

populateTripDropdown(trips);

// CALCULATE & DISPLAY PRICE SUMMARY ───────────────────

const inputTravellersEl = document.querySelector("#input-travelers");
const priceSummaryEl = document.querySelector("#price-summary");

inputTravellersEl.addEventListener("change", () => displayPriceSummary(trips));

inputTripEl.addEventListener("change", () => displayPriceSummary(trips));

function displayPriceSummary(trips) {
  const travellersQuantity = Math.max(1, Number(inputTravellersEl.value));
  const tripId = Number(inputTripEl.value);

  const selectedTrip = trips.find((trip) => trip.id === tripId);

  if (selectedTrip) {
    const subTotal = selectedTrip.price * travellersQuantity;
    const tax = subTotal * 0.08;
    const total = subTotal + tax;

    const html = `
    <table>

      <tr>
        <th>Base Price Per Person</th>
        <th>Travellers</th>
        <th>Subtotal</th>
        <th>Tax (8%)</th>
        <th>Total</th>
      </tr>

      <tr>
        <td>${selectedTrip.price.toFixed(2)}</td>
        <td>${travellersQuantity}</td>
        <td>${subTotal.toFixed(2)}</td>
        <td>${tax.toFixed(2)}</td>
        <td>${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(total)}</td>
       

      </tr>

    </table>
    
    `;

    priceSummaryEl.innerHTML = html;
  }
}

// BOOK BUTTON — VALIDATE & CONFIRM ────────────────────

const btnBookEl = document.querySelector("#btn-book");
const nameEl = document.querySelector("#input-name");
const bookingMsgEl = document.querySelector("#booking-msg");

btnBookEl.addEventListener("click", function () {
  let name = nameEl.value.trim();
  let travellers = Number(inputTravellersEl.value);
  let tripId = Number(inputTripEl.value);

  if (!name) {
    bookingMsgEl.textContent = "Please enter your name";
    bookingMsgEl.classList.add("error", "show");
  } else if (!Number.isFinite(travellers) || travellers < 1) {
    bookingMsgEl.textContent = "Please enter valid number of travellers";
    bookingMsgEl.classList.add("error", "show");
  } else if (!tripId) {
    console.log("error travel id");
    bookingMsgEl.textContent = "Please select a trip";
    bookingMsgEl.classList.add("error", "show");
  } else {
    const trip = trips.find((trip) => trip.id === tripId);

    cart.push(trip);

    bookingMsgEl.textContent = "Success! Booking Confirmed";

    bookingMsgEl.classList.remove("error");
    bookingMsgEl.classList.add("success");
    bookingMsgEl.classList.add("show");

    setTimeout(() => {
      bookingMsgEl.classList.remove("show");
    }, 3000);
  }
});

// ── GOAL 8: RENDER CART ─────────────────────────────────────────
// Concept: forEach + insertAdjacentHTML + reduce + Intl.NumberFormat
// Function renderCart():
//   Clear #cart-items
//   If cart is empty, show "No trips added yet."
//   For each item in cart, insertAdjacentHTML a row showing:
//     trip name, travelers, price, and a remove button (data-index attribute)
//   Calculate total with: cart.reduce((sum, item) => sum + item.total, 0)
//   Show total in #cart-total using Intl.NumberFormat
//   Add event listeners to remove buttons (use data-index to splice from cart)
// YOUR CODE:
function renderCart() {
  // YOUR CODE HERE
}

// ── GOAL 9: RENDER STATS PANEL ───────────────────────────────────
// Concept: Math.min/max + reduce + filter + [...new Set()] + Intl.NumberFormat
// Function renderStats():
//   Cheapest:  Math.min(...trips.map(t => t.price))
//   Expensive: Math.max(...trips.map(t => t.price))
//   Average:   trips.reduce((s,t) => s + t.price, 0) / trips.length  → toFixed(2)
//   Available: trips.filter(t => t.available).length
//   Countries: [...new Set(trips.map(t => t.country))].length
//   Format prices with Intl.NumberFormat and update the stat elements.
// YOUR CODE:
function renderStats() {
  // YOUR CODE HERE
}

// ── GOAL 10: SEARCH FILTER ───────────────────────────────────────
// Concept: querySelector + String methods (.toLowerCase, .includes) + filter + renderTrips
// Listen to 'input' event on #search-input.
// On each keystroke:
//   const query = e.target.value.toLowerCase().trim()
//   displayedTrips = trips.filter(t =>
//     t.name.toLowerCase().includes(query) ||
//     t.country.toLowerCase().includes(query) ||
//     t.continent.toLowerCase().includes(query)
//   )
//   renderTrips()
// YOUR CODE:

// ── GOAL 11: CONTINENT FILTER BUTTONS ───────────────────────────
// Concept: querySelectorAll + forEach + filter + classList + bind
// Select all .filter-btn with querySelectorAll.
// On each button click:
//   - Remove 'active' class from all buttons (forEach)
//   - Add 'active' to clicked button
//   - If data-filter === 'all': displayedTrips = [...trips]
//   - Else: displayedTrips = trips.filter(t => t.continent === filter)
//   - Call renderTrips()
// YOUR CODE:

// ── GOAL 12: SORT SELECT ─────────────────────────────────────────
// Concept: querySelector + toSorted (non-mutating) + switch or object map
// Listen to 'change' on #sort-select.
// Based on value, use .toSorted() to sort displayedTrips:
//   'price-asc':  (a,b) => a.price - b.price
//   'price-desc': (a,b) => b.price - a.price
//   'rating':     (a,b) => b.rating - a.rating
//   'duration':   (a,b) => a.duration - b.duration
//   default: displayedTrips = [...trips]
// Call renderTrips() after sorting.
// YOUR CODE:

// ── GOAL 13: FORMAT DEPARTURE DATE ON CARD ───────────────────────
// Concept: Intl.DateTimeFormat + new Date()
// Inside renderTrips(), format each trip's departure date:
//   new Intl.DateTimeFormat('en-US', { month:'short', day:'numeric', year:'numeric' })
//     .format(trip.departure)
// Show this in the card meta section.
// (Requires you to update your renderTrips() from Goal 3)
// YOUR CODE: (edit renderTrips above)

// ── GOAL 14: DESTRUCTURE TRIP IN BOOKING HANDLER ─────────────────
// Concept: Object destructuring + default values
// Inside your booking click handler (Goal 7), when you have the trip object,
// destructure it: const { name, price, duration, hotel: { name: hotelName } = {} } = trip
// Use hotelName in the success message if available.
// YOUR CODE: (edit your Goal 7 handler above)

// ── GOAL 15: GROUP TRIPS BY CONTINENT ────────────────────────────
// Concept: Object.groupBy
// const grouped = Object.groupBy(trips, t => t.continent)
// Log grouped to console. Each key is a continent, value is array of trips.
// Then log how many trips are in each continent using Object.entries(grouped).
// YOUR CODE:

// ── GOAL 16: FIND CHEAPEST AVAILABLE TRIP ────────────────────────
// Concept: filter + toSorted + destructuring + optional chaining ?.
// const cheapest = trips
//   .filter(t => t.available)
//   .toSorted((a,b) => a.price - b.price)
//   .at(0)
// const { name, price, hotel } = cheapest
// console.log(`Cheapest: ${name} at $${price}. Hotel: ${hotel?.name ?? 'N/A'}`)
// YOUR CODE:

// ── GOAL 17: GET UNIQUE SEASONS ──────────────────────────────────
// Concept: flatMap + [...new Set()]
// All trips have a 'season' array. Flatten them all and get unique values.
// const uniqueSeasons = [...new Set(trips.flatMap(t => t.season))]
// console.log(uniqueSeasons)
// YOUR CODE:

// ── GOAL 18: TRIPS AVAILABLE IN BOTH SUMMER AND WINTER ───────────
// Concept: Set.intersection (or filter + every)
// Find trips whose season array includes BOTH 'summer' and 'winter'.
// const both = trips.filter(t => t.season.includes('summer') && t.season.includes('winter'))
// OR use Set intersection on the season arrays.
// console.log(both.map(t => t.name))
// YOUR CODE:

// ── GOAL 19: BUILD A MAP OF tripId → trip ────────────────────────
// Concept: Map + forEach (or new Map with Array.from)
// const tripMap = new Map()
// trips.forEach(t => tripMap.set(t.id, t))
// console.log(tripMap.get(1))   // should log the Bali trip
// console.log(tripMap.size)
// YOUR CODE:

// ── GOAL 20: FORMAT LARGE BOOKING ID WITH BigInt ─────────────────
// Concept: BigInt + numeric separators
// Imagine booking IDs can be astronomically large.
// const bookingId = 9_007_199_254_740_992n  // BigInt literal
// const nextId = bookingId + 1n
// console.log(`Booking ID: ${nextId.toString()}`)
// Note: you cannot mix BigInt with regular numbers.
// YOUR CODE:

// ── GOAL 21: DAYS SINCE EACH TRIP WAS ADDED ──────────────────────
// Concept: Date operations + Math.round + Intl.RelativeTimeFormat
// Pretend each trip's joinDate is its departure. Calculate days until/since:
// trips.forEach(t => {
//   const diffMs = t.departure - new Date()
//   const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24))
//   const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
//   console.log(t.name + ': ' + rtf.format(diffDays, 'day'))
// })
// YOUR CODE:

// ── GOAL 22: PRICE CHECK — isNaN / isFinite / Number() ──────────
// Concept: Number(), isNaN(), isFinite(), parseInt()
// Test these inputs from a fake "user" submission:
// const inputs = ['1299', '   42  ', 'abc', '', null, '3.5kg', '2500.99']
// inputs.forEach(v => {
//   const n = Number(v)
//   console.log(`"${v}" → Number: ${n} | isNaN: ${isNaN(n)} | isFinite: ${isFinite(n)}`)
// })
// YOUR CODE:

// ── GOAL 23: ROUND PRICES DIFFERENT WAYS ─────────────────────────
// Concept: Math.round, Math.floor, Math.ceil, Math.trunc, toFixed
// const price = 1_299.567
// console.log(Math.round(price))   // 1300
// console.log(Math.floor(price))   // 1299
// console.log Math.ceil(price))    // 1300
// console.log(Math.trunc(price))   // 1299
// console.log(price.toFixed(2))    // "1299.57"
// YOUR CODE:

// ── GOAL 24: SPREAD + REST ────────────────────────────────────────
// Concept: spread operator + rest parameters
// Write: function bookMultiple(mainTrip, ...extras) { ... }
// Inside, use spread to build a full list: const all = [mainTrip, ...extras]
// Log: `Booking ${all.length} trips: ${all.map(t=>t.name).join(', ')}`
// Call it: bookMultiple(trips[0], trips[1], trips[2])
// YOUR CODE:

// ── GOAL 25: SHORT CIRCUIT & NULLISH COALESCING ──────────────────
// Concept: ||, &&, ??, ??=, ||=
// trips.forEach(t => {
//   const desc = t.description ?? 'No description available.'   // ?? for null
//   const hotelName = t.hotel?.name ?? 'No hotel info'          // ?. and ??
//   const seats = t.seats || 'Sold out'                         // || for falsy
//   t.description ??= 'Auto-filled description'                 // ??= assignment
//   console.log(`${t.name}: ${desc} | Hotel: ${hotelName} | Seats: ${seats}`)
// })
// YOUR CODE:

// ── GOAL 26: OBJECT.ENTRIES — FORMAT TRIP DETAILS ────────────────
// Concept: Object.entries + map + join + for-of
// Pick trips[0] and format all its properties as "key: value" strings.
// const details = Object.entries(trips[0])
//   .map(([key, val]) => `${key}: ${JSON.stringify(val)}`)
// console.log(details.join('\n'))
// YOUR CODE:

// ── GOAL 27: ARRAY.FROM — COUNT RENDERED CARDS ───────────────────
// Concept: Array.from + querySelectorAll
// After renderTrips() runs, count how many cards are in the DOM.
// const cards = Array.from(document.querySelectorAll('.trip-card'))
// console.log('Cards in DOM:', cards.length)
// Also: use Array.from to create an array of prices from 500 to 3500 in steps of 250
// const priceSteps = Array.from({ length: 13 }, (_, i) => 500 + i * 250)
// console.log(priceSteps)
// YOUR CODE:

// ── GOAL 28: BIND — PRICE FORMATTER ──────────────────────────────
// Concept: bind + this
// const formatter = {
//   currency: 'USD',
//   locale: 'en-US',
//   format(amount) {
//     return new Intl.NumberFormat(this.locale, { style:'currency', currency: this.currency }).format(amount)
//   }
// }
// const formatUSD = formatter.format.bind(formatter)
// const formatEUR = formatter.format.bind({ locale:'de-DE', currency:'EUR' })
// console.log(formatUSD(1299.99))   // $1,299.99
// console.log(formatEUR(1299.99))   // 1.299,99 €
// YOUR CODE:

// ── INITIAL CALLS (already wired — do not change) ────────────────
renderTrips();
renderCart();
renderStats();
