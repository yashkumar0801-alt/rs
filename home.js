const categories = [
  [
    "Beauty & wellness",
    "Salon, spa & grooming",
    "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=400&q=80",
  ],
  [
    "Cleaning & repairs",
    "Sparkling homes, fixed fast",
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80",
  ],
  [
    "Appliance care",
    "AC, fridge & washing machine",
    "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=400&q=80",
  ],
  [
    "Electrician",
    "Safe electrical solutions",
    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80",
  ],
  [
    "Plumbing",
    "Quick fixes for every leak",
    "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=400&q=80",
  ],
  [
    "Home help",
    "Cooks, maids & daily support",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80",
  ],
];
const services = [
  {
    name: "Deep home cleaning",
    price: "₹799 onwards",
    tag: "Most booked",
    icon: "fa-broom-ball",
    img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
    desc: "A complete, room-by-room refresh for your home.",
  },
  {
    name: "AC service & repair",
    price: "₹499 onwards",
    tag: "Summer essential",
    icon: "fa-snowflake",
    img: "https://plus.unsplash.com/premium_photo-1683134512538-7b390d0adc9e?auto=format&fit=crop&w=600&q=80",
    desc: "Cooling care by trained, verified technicians.",
  },
  {
    name: "Salon at home",
    price: "₹299 onwards",
    tag: "Top rated",
    icon: "fa-scissors",
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
    desc: "Unwind with professional beauty care at home.",
  },
  {
    name: "Electrician visit",
    price: "₹149 onwards",
    tag: "Quick help",
    icon: "fa-bolt",
    img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80",
    desc: "Expert help for every electrical repair or install.",
  },
];
const cities = [
  "Patna",
  "Ranchi",
  "Gaya",
  "Muzaffarpur",
  "Bokaro",
  "Bhagalpur",
];
const $ = (s) => document.querySelector(s),
  $$ = (s) => [...document.querySelectorAll(s)];
let activeService = null;
const store = {
  get: (k, f = []) => JSON.parse(localStorage.getItem(k) || JSON.stringify(f)),
  set: (k, v) => localStorage.setItem(k, JSON.stringify(v)),
};
function renderCategories(f = "") {
  let x = categories.filter((c) => (c[0] + c[1]).toLowerCase().includes(f));
  $("#categoryGrid").innerHTML = x.length
    ? x
        .map(
          (c) =>
            `<button class="category" data-category="${c[0]}"><div class="category-image" style="background-image:url('${c[2]}')"></div><b>${c[0]}</b><small>${c[1]}</small></button>`,
        )
        .join("")
    : '<p class="empty">No services match that search yet.</p>';

  const categoryPageMap = {
    "Beauty & wellness": "providers.html?category=beauty",
    "Cleaning & repairs": "providers.html?category=cleaning",
    "Appliance care": "providers.html?category=appliance",
    "Electrician": "providers.html?category=electrician",
    "Plumbing": "providers.html?category=plumbing",
    "Home help": "providers.html?category=home_help"
  };

  $$(".category").forEach((e) => {
    e.onclick = () => {
      const catName = e.dataset.category;
      if (categoryPageMap[catName]) {
        window.location.href = categoryPageMap[catName];
      } else {
        openBooking({
          name: catName,
          price: "Starting from ₹299",
          icon: "fa-house",
        });
      }
    };
  });
}
function renderServices() {
  $("#serviceGrid").innerHTML = services
    .map(
      (s, i) =>
        `<article class="service-card" data-service="${i}"><div class="service-img" style="background-image:url('${s.img}')"><span class="service-tag">${s.tag}</span></div><div class="service-body"><h3>${s.name}</h3><p>${s.desc}</p><div class="service-bottom"><span class="price">${s.price}</span><button class="book-link">Book now <i class="fa-solid fa-arrow-right"></i></button></div></div></article>`,
    )
    .join("");
  $$(".service-card").forEach(
    (e) => (e.onclick = () => openBooking(services[e.dataset.service])),
  );
}
function openModal(id) {
  $("#" + id).classList.add("open");
}
function closeModal(id) {
  $("#" + id).classList.remove("open");
}
function openBooking(s) {
  activeService = s;
  $("#bookingTitle").textContent = s.name;
  $("#bookingPrice").textContent = s.price;
  $("#bookingIcon").innerHTML =
    `<i class="fa-solid ${s.icon || "fa-house"}"></i>`;
  $("#bookingDate").min = new Date().toISOString().split("T")[0];
  let u = store.get("rsCustomer", {});
  if (u.name) $("#bookingForm").name.value = u.name;
  if (u.phone) $("#bookingForm").phone.value = u.phone;
  if (u.address) $("#bookingForm").address.value = u.address;
  openModal("bookingModal");
}
function bookings() {
  return store.get("rsBookings");
}
function toast(s) {
  let t = $("#toast");
  t.textContent = s;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3200);
}
function updateAccount() {
  let u = store.get("rsCustomer", {}),
    a = $("#accountLink");
  if (u.name) {
    a.href = "dashboard.html";
    a.innerHTML = `<i class="fa-regular fa-user"></i> ${u.name.split(" ")[0]}`;
  } else {
    a.href = "login.html";
    a.innerHTML = '<i class="fa-regular fa-user"></i> Login';
  }
}
renderCategories();
renderServices();
updateAccount();
$("#cityChoices").innerHTML = cities
  .map(
    (c) =>
      `<button data-city="${c}"><i class="fa-solid fa-location-dot"></i> ${c}</button>`,
  )
  .join("");
$("#locationButton").onclick = () => openModal("locationModal");
$$("[data-close]").forEach(
  (b) => (b.onclick = () => closeModal(b.dataset.close)),
);
$$(".modal").forEach(
  (m) =>
    (m.onclick = (e) => {
      if (e.target === m) closeModal(m.id);
    }),
);
$$("#cityChoices button").forEach(
  (b) =>
    (b.onclick = () => {
      localStorage.setItem("rsCity", b.dataset.city);
      $("#locationName").textContent = b.dataset.city;
      closeModal("locationModal");
      toast(`Services are now tailored for ${b.dataset.city}.`);
    }),
);
$("#locationName").textContent =
  localStorage.getItem("rsCity") || "Select city";
$("#serviceSearch").oninput = (e) =>
  renderCategories(e.target.value.toLowerCase());
document.addEventListener("keydown", (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    $("#serviceSearch").focus();
  }
  if (e.key === "Escape") $$(".modal.open").forEach((m) => closeModal(m.id));
});
$$("[data-scroll]").forEach(
  (b) =>
    (b.onclick = () =>
      $("#" + b.dataset.scroll).scrollIntoView({ behavior: "smooth" })),
);
$("#showAllCategories").onclick = () => {
  window.location.href = "services.html";
};
$("#prevService").onclick = () =>
  $("#serviceGrid").scrollBy({ left: -280, behavior: "smooth" });
$("#nextService").onclick = () =>
  $("#serviceGrid").scrollBy({ left: 280, behavior: "smooth" });
$("#membershipButton").onclick = () =>
  toast("RS Plus is coming soon — you’re on the early-access list!");
$("#bookingForm").onsubmit = (e) => {
  e.preventDefault();
  let d = Object.fromEntries(new FormData(e.target)),
    r = {
      id: `RS${Date.now().toString().slice(-6)}`,
      service: activeService.name,
      icon: activeService.icon,
      price: activeService.price,
      date: new Date(d.date + "T00:00:00").toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      rawDate: d.date,
      time: d.time,
      city: localStorage.getItem("rsCity") || "your city",
      status: "Confirmed",
      address: d.address,
      notes: d.notes,
      customer: d.name,
      phone: d.phone,
      createdAt: Date.now(),
    };
  store.set("rsBookings", [r, ...bookings()]);
  store.set("rsCustomer", {
    ...store.get("rsCustomer", {}),
    name: d.name,
    phone: d.phone,
    address: d.address,
  });
  closeModal("bookingModal");
  e.target.reset();
  updateAccount();
  toast(`Booking ${r.id} confirmed! Track it from your dashboard.`);
};