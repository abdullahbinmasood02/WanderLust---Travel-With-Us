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

function getStars(rating) {
  rating = Math.floor(rating);
  return "★".repeat(rating) + "☆".repeat(5 - rating);
}

displayNextDepartingTripClock();
// RENDER TRIP CARDS ────────────────────────────────────

const tripsGridEl = document.querySelector("#trips-grid");

function renderTrips(displayedTrips) {
  tripsGridEl.innerHTML = "";

  displayedTrips.forEach((trip, index) => {
    let cardClasses = `trip-card ${index % 2 !== 0 ? "stripe" : null} ${trip.available ? null : "unavailable"}`;
    let departureDate = trip.departure;
    departureDate = Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(departureDate);

    const tripCard = `
  
  
  <div class = ${cardClasses}>

    <div class ="card-img ${trip.continent.toLowerCase()}">
      <text class="card-country">${trip.country}</text>
    </div>

    <div class = "card-body"

      <div class = "card-name">
        ${trip.name}
      </div>

      <div class = "card-meta">

        <span>${trip.duration} days</span>
        <span>${trip.seats} seats left</span>
        <span>Departing on ${departureDate}</span>
        

      </div>

      <div class = "card-price">

        ${trip.price} <small>/person</small>

      </div>

      <div class = "card-footer"

        <div  class = "rating"> ${trip.rating} ${getStars(trip.rating)}  </div>
        <button class = "btn-book"> Book </button>

      </div>

    </div>

  

  </div>
  `;

    tripsGridEl.insertAdjacentHTML("beforeend", tripCard);
  });
}

renderTrips(displayedTrips);

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
let total;
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
    total = subTotal + tax;

    const html = `
    <table class="price-summary">

      <tr class="price-row">
        <td>Base Price Per Person: ${selectedTrip.price.toFixed(2)}</td>
      </tr>
       <tr class="price-row">
          <td>Travellers: ${travellersQuantity}</td>
        </tr>
         <tr class="price-row">
          <td>Subtotal: ${subTotal.toFixed(2)}</td>
        </tr>
         <tr class="price-row">
           <td>Tax (8%): ${tax.toFixed(2)}</td>
        </tr>
        <tr class="price-row">
          <td>Total: ${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(total)}</td>
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

    cart.push({
      name: trip.name,
      travellers: travellers,
      price: total.toFixed(2),
    });
    // console.log(cart);

    bookingMsgEl.textContent = "Success! Booking Confirmed";

    bookingMsgEl.classList.remove("error");
    bookingMsgEl.classList.add("success");
    bookingMsgEl.classList.add("show");
    renderCart();
    setTimeout(() => {
      bookingMsgEl.classList.remove("show");
    }, 3000);
  }
});

// RENDER CART ─────────────────────────────────────────

const cartItemsEl = document.querySelector("#cart-items");
function renderCart() {
  cartItemsEl.textContent = "";

  cart.forEach((item, index) => {
    console.log(item);
    const html = `
    <div class="cart-item">
      <div>${item.name}</div>
      <div>${item.travellers} </div>
      <div id="cart-total">${Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(total)}</div>
      <button class ="cart-remove" data-index=${index}>remove</button>
    
    </div>
    `;
    cartItemsEl.insertAdjacentHTML("beforeend", html);
  });
}

document.addEventListener("click", function (e) {
  if (e.target.dataset.index) {
    const index = e.target.dataset.index;
    cart.splice(index, 1);
    renderCart();
  }
});

// RENDER STATS PANEL ──────────────────────────────────

const statCheapEl = document.querySelector("#stat-cheap");
const statExpensiveEl = document.querySelector("#stat-expensive");
const statAvgEl = document.querySelector("#stat-avg");
const statAvailableEl = document.querySelector("#stat-available");
const statCountriesEl = document.querySelector("#stat-countries");

function getCurrencyOptions() {
  return {
    style: "currency",
    currency: "USD",
  };
}
function renderStats(trips) {
  let cheapestTrip = trips.map((trip) => trip.price);
  cheapestTrip = Intl.NumberFormat("en-US", getCurrencyOptions()).format(
    Math.min(...cheapestTrip),
  );
  cheapestTrip;
  let expensiveTrip = Math.max(...trips.map((trip) => trip.price));
  expensiveTrip = Intl.NumberFormat("en-US", getCurrencyOptions()).format(
    expensiveTrip,
  );
  let averagePrice = (
    trips.reduce((acc, trip) => acc + trip.price, 0) / trips.length
  ).toFixed(2);
  averagePrice = Intl.NumberFormat("en-US", getCurrencyOptions()).format(
    averagePrice,
  );
  const availableTrips = trips
    .filter((trip) => trip.available)
    .map((trip) => trip.name);
  const countries = [...new Set(trips.map((trip) => trip.country))];

  statAvailableEl.textContent = availableTrips.length;
  statAvgEl.textContent = averagePrice;
  statCheapEl.textContent = cheapestTrip;
  statExpensiveEl.textContent = expensiveTrip;
  statCountriesEl.textContent = countries.length;
}

renderStats(displayedTrips);

//  SEARCH FILTER ───────────────────────────────────────

const searchInputEl = document.querySelector("#search-input");

function displayFilteredTrips(e) {
  const filterString = e.target.value.toLowerCase().trim();

  const filteredTrips = trips.filter((trip) => {
    return (
      trip.name.toLowerCase().includes(filterString) ||
      trip.country.toLowerCase().includes(filterString) ||
      trip.continent.toLowerCase().includes(filterString)
    );
  });

  displayedTrips = filteredTrips;

  renderTrips(displayedTrips);
}

searchInputEl.addEventListener("input", displayFilteredTrips);
// CONTINENT FILTER BUTTONS ───────────────────────────

filterBtnsList = document.querySelectorAll(".filter-btn");

function removeActiveClasses(filterBtns) {
  filterBtns.forEach((btn) => btn.classList.remove("active"));
}

filterBtnsList.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    removeActiveClasses(filterBtnsList); //remove active class from all filter buttons
    e.target.classList.add("active"); // add active class only to currently clicked filter button
    const continent = e.target.dataset.filter;

    if (continent === "all") {
      // if clicked on "All" display all trips
      displayedTrips = [...trips];
    } else {
      // else display only the trips having the that continent present in button filter e.g Asia, Africa, etc.
      const filteredTrips = trips.filter(
        (trip) => trip.continent === continent,
      );
      displayedTrips = [...filteredTrips];
    }

    renderTrips(displayedTrips);
  });
});

// SORT SELECT ─────────────────────────────────────────

const sortTripsBtn = document.querySelector("#sort-select");

function sort(sortCriteria) {
  let sortedTrips;

  if (sortCriteria === "price-asc") {
    sortedTrips = trips.toSorted((a, b) => a.price - b.price);
  } else if (sortCriteria === "price-desc") {
    sortedTrips = trips.toSorted((a, b) => b.price - a.price);
  } else if (sortCriteria === "rating") {
    sortedTrips = trips.toSorted((a, b) => b.rating - a.rating);
  } else if (sortCriteria === "duration") {
    sortedTrips = trips.toSorted((a, b) => a.duration - b.duration);
  }
  displayedTrips = [...sortedTrips];

  renderTrips(displayedTrips);
}

sortTripsBtn.addEventListener("change", (e) => sort(e.target.value));

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
