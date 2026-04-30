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
    const { name, price, duration, hotel: { name: hotelName } = {} } = trip;

    cart.push({
      name,
      travellers: travellers,
      price: total.toFixed(2),
      duration,
      hotelName,
    });
    // console.log(cart);

    bookingMsgEl.textContent = `Success! Booking Confirmed ${hotelName ? `for ${hotelName}` : null}`;

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

//  GROUP TRIPS BY CONTINENT ────────────────────────────

const groupedByContinent = Object.groupBy(trips, (t) => t.continent);
console.log(groupedByContinent);

for (const item of Object.entries(groupedByContinent)) {
  console.log(
    `number of trips for continent ${item[0].toUpperCase()} are ${item[1].length}`,
  );
}

// FIND CHEAPEST AVAILABLE TRIP ────────────────────────

function calcCheapestTrip(trips) {
  const availableTrips = trips.filter((trip) => trip.available);
  const sortedByPriceAsc = trips.toSorted((a, b) => a.price - b.price);
  const cheapestTrip = trips.at(0);

  let { name, price, hotel: { name: hotelName } = {} } = cheapestTrip;
  price = price.toFixed(2);
  Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    price,
  );

  console.log(
    `cheapest trip available is ${name}, for ${price}${hotelName ? ` with hotel ${hotelName}` : null}`,
  );
}

calcCheapestTrip(trips);
//  GET UNIQUE SEASONS ──────────────────────────────────
function getUniqueSeasons(trips) {
  let seasons = new Set(trips.flatMap((trip) => trip.season));
  seasons = [...seasons];
  return seasons;
}

const seasons = getUniqueSeasons(trips);
console.log(seasons);

// TRIPS AVAILABLE IN BOTH SUMMER AND WINTER ───────────

function getSummerWinterTrips(trips) {
  const selected = trips.filter(
    (trip) => trip.season.includes("summer") && trip.season.includes("winter"),
  );
  return selected;
}

console.log(getSummerWinterTrips(trips));

// A MAP OF tripId → trip ────────────────────────

function getTripMap(trips) {
  tripMap = new Map();
  ids = trips.map((trip) => trip.id);

  ids.forEach((id, index) => {
    tripMap.set(ids, trips[index]);
  });

  console.log(tripMap.size);
  console.log(tripMap);
  return tripMap;
}

getTripMap(trips);

// DAYS SINCE EACH TRIP WAS ADDED ──────────────────────

function getDaysTillDeparture(trips) {
  trips.forEach((trip) => {
    let difference = trip.departure - Date.now();
    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
    const daysLeft = rtf.format(
      Math.round(difference / (1000 * 60 * 60 * 24)),
      "day",
    );
    console.log(` ${trip.name} is ${daysLeft}`);
  });
}

getDaysTillDeparture(trips);

//  PRINT TRIPS ──────────────────

function printTrips(trips) {
  trips.forEach((trip) => {
    console.log(`Trip Name: ${trip.name}`);
    console.log(
      `Description ${trip.description ?? "No Description Available"}`,
    );
    console.log(`Hotel Name: ${trip.hotel?.name ?? "No hotel info available"}`);
    console.log(`Seats availability: ${trip.seats || "No seats available"}`);

    console.log(`\n\n\n------------------------------\n\n\n`);
  });
}

printTrips(trips);

// ── GOAL 26: OBJECT.ENTRIES — FORMAT TRIP DETAILS ────────────────
function printTripDetails(trip) {
  tripArray = Object.entries(trip);
  tripStrings = tripArray.map((pair) => {
    const [key, value] = pair;
    return `${key}: ${JSON.stringify(value)}`;
  });
  tripStrings.unshift(`-------------------`);
  tripStrings.push("-------------------");
  const details = tripStrings.join(`\n`);
  console.log(details);
}

printTripDetails(trips[0]);

//  COUNT RENDERED CARDS ───────────────────

function getCardsLength() {
  let cards = document.querySelectorAll(".trip-card");
  cards = Array.from(cards);
  console.log(`cards length: ${cards.length}`);
}

getCardsLength();

function generatePrices() {
  const prices = Array.from({ length: 15 }, (_, index) => {
    return (index + 1) * 250;
  });
  console.log(prices);
  return prices;
}
generatePrices();
//  BIND — PRICE FORMATTER ──────────────────────────────

const formatter = {
  currency: "USD",
  locale: "en-US",
  format(amount) {
    return new Intl.NumberFormat(this.locale, {
      style: "currency",
      currency: this.currency,
    }).format(amount);
  },
};
const formatUSD = formatter.format.bind(formatter);
const formatEUR = formatter.format.bind({ currency: "EUR", locale: "de-DE" });

console.log(formatUSD(1299.99)); // $1,299.99
console.log(formatEUR(1299.99)); // 1.299,99 €
