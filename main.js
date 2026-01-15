const BACKEND_URL_OF_INDEX = "https://api.ultimatejaipurians.in";

//const BACKEND_URL_OF_INDEX = "http://localhost:8000";

//-------------------------------
//       Venue Cards PopUp
//-------------------------------

const overlay = document.getElementById("eventPopupOverlay");
const closeBtn = document.getElementById("eventPopupClose");

// Popup text elements
const titleEl = document.getElementById("popupTitle");
const dateEl = document.getElementById("popupDate");
const timeEl = document.getElementById("popupTime");
const address = document.getElementById("event-address");
const popupIcon = document.getElementById("popupIcon");
const dress = document.getElementById("dress-code");

// All cards
const cards = document.querySelectorAll(".eventPopupTrigger");
const openMap = document.getElementById("openMap");

// When clicking any card
cards.forEach((card) => {
  card.addEventListener("click", () => {
    titleEl.textContent = card.dataset.title;
    dateEl.textContent = card.dataset.date;
    popIcon.setAttribute("src", card.dataset.icon);
    dress.textContent = card.dataset.dress;
    address.textContent = card.dataset.address;

    // popupIcon.innerHTML = `<img id="popupIcon" src="${card.dataset.icon}" style="width:44px;height:44px;"></img>`;

    const title = titleEl.textContent;

    if (title === "Dinner") {
      openMap.style.display = "flex";
      openMap.textContent = "Open To Map";
      openMap.setAttribute(
        "href",
        "https://maps.app.goo.gl/DSnifjemDkRE39xM9?g_st=aw"
      );
    } else if (title === "Lunch") {
      openMap.style.display = "flex";
      openMap.textContent = "Open Map";
      openMap.setAttribute(
        "href",
        "https://maps.app.goo.gl/u2v1BB323MhPc8GS6?g_st=aw"
      );
    }

    // re-render lucide icons
    requestAnimationFrame(() => lucide.createIcons());

    overlay.style.display = "flex";
  });
});

const popIcon = document.getElementById("popupIcon");

// Close popup
closeBtn.addEventListener("click", () => {
  overlay.style.display = "none";
  openMap.style.display = "none";
  popIcon.setAttribute("src", "data-icon");
});

// Click outside to close
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.style.display = "none";
    openMap.style.display = "none";
  }
});

//------------------------------------
//     Photo Pop Up Open Logic
//------------------------------------

function openPopPhoto(imgSrc) {
  document.getElementById("popup-photo-img").src = imgSrc;
  document.getElementById("popup-photo").style.display = "flex";

  function closePopup() {
    document.getElementById("popup-photo").style.display = "none";
  }

  document.getElementById("popup-photo").addEventListener("click", (e) => {
    if (e.target.id === "popup-photo") closePopup();
  });
}

// ---------------------------
//           Loader
//--------------------------
const button = document.getElementById("downloadBtn");

button.addEventListener("click", () => {
  // show loader
  button.classList.add("loading");
});

//----------------------------------------------
//      Change No. of People Compilation
//----------------------------------------------

const input = document.querySelectorAll(".someone-check");

input.forEach((el) => {
  el.addEventListener("change", function () {
    if (this.checked) {
      let selectedValue = this.value;

      const peopleChange = document.getElementById("attend");

      if (selectedValue === "stag") {
        peopleChange.innerText = 1;
      } else {
        peopleChange.innerText = 2;
      }
    }
  });
});

//----------------------------------------------
//            Donation Amount Valiation
//----------------------------------------------

// const donateAmount = document.getElementById("donate")
// const maximumDonate = document.getElementById("maxDonate");

// donateAmount.addEventListener("change", function () {
//   let checkAmount = this.value;

//   if (checkAmount >= 0 && checkAmount <= 10000) {
//     maximumDonate.style.display = "none";
//   } else if (checkAmount > 10000) {
//     maximumDonate.style.display = "block";
//   }
// });

//----------------------------------------------
//             Grand Total
//----------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const attendSpan = document.getElementById("attend");
  // const donateInput = document.getElementById("donate");
  const grandTotalEl = document.getElementById("grandTotal");

  // The two checkboxes (values: "stag" and "noStag")
  const stagCheckbox = document.querySelector('.someone-check[value="stag"]');
  const plusOneCheckbox = document.querySelector(
    '.someone-check[value="noStag"]'
  );

  // Basic existence check
  if (
    !attendSpan ||
    // !donateInput ||
    !grandTotalEl ||
    !stagCheckbox ||
    !plusOneCheckbox
  ) {
    console.error(
      "Required elements not found: attend, donate, grandTotal, or checkboxes."
    );
    return;
  }

  // compute number of attendees
  function getAttendeesCount() {
    const stag = stagCheckbox.checked;
    const plusOne = plusOneCheckbox.checked;

    // If +1 is checked but stag is not, assume primary also coming -> 2
    if (plusOne && !stag) return 2;
    return (stag ? 1 : 0) + (plusOne ? 1 : 0);
  }

  // price rules
  function getPassPrice(count) {
    if (count === 1) return 5000;
    if (count === 2) return 7500;
    return 0;
  }

  // calculate & update UI
  function calculateAndRender() {
    const attendees = getAttendeesCount();
    attendSpan.textContent = attendees;

    // let donateAmt =
    //   Number(String(donateInput.value).replace(/[^0-9.-]/g, "")) || 0;

    // if (donateAmt > 10000) {
    //   donateAmt = 10000;
    // }

    const passValue = getPassPrice(attendees);

    const grand = passValue;
    // + donateAmt;
    grandTotalEl.textContent = grand.toLocaleString(); // formatted number
  }

  // wire events: changes to checkboxes or donation input update totals
  stagCheckbox.addEventListener("change", calculateAndRender);
  plusOneCheckbox.addEventListener("change", calculateAndRender);
  // donateInput.addEventListener("input", calculateAndRender);

  // initial render
  calculateAndRender();
});

//-------------------------------------------------
//          Popup Open Final Pricing
//------------------------------------------------

const openPop = document.getElementById("openPopup");

openPop.addEventListener("click", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("number").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value.trim();
  const adhaar = document.getElementById("adhaar").value.trim();
  const noPeople = document.getElementById("attend").textContent;
  // const donateAmt = Number(document.getElementById('donate').value.trim())

  const someone = document.querySelector(".someone-check:checked")?.value || "";
  const support = document.querySelector(".support-check:checked")?.value || "";

  if (
    !name ||
    !phone ||
    !email ||
    !address ||
    !city ||
    !adhaar ||
    !someone ||
    !support
  ) {
    alert("Please fill the form");
    e.preventDefault();
  } else {
    document.getElementById("popup").style.display = "flex";

    // let donateAmt = Number(document.getElementById("donate").value.trim());
    // if (donateAmt > 10000) {
    //   donateAmt = 10000;
    // }

    let passValue;
    if (noPeople == 1) {
      passValue = 5000;
    } else if (noPeople == 2) {
      passValue = 7500;
    } else {
      passValue = 0;
    }

    // let passValue = 1;

    const totalValue = passValue;
    // + donateAmt;
    const taxValue = (5 * totalValue) / 100;
    const payPrice = totalValue + taxValue;

    document.getElementById("totalPass").innerText = "1"; //`₹  ${passValue}`;
    // document.getElementById("totalDonate").innerText = `₹  ${donateAmt}`;
    document.getElementById("totalTax").innerText = "1"; // `₹  ${taxValue}`;
    document.getElementById("totalPay").innerText = "2"; //`₹ ${payPrice}`;
  }
});

document.getElementById("closePop").addEventListener("click", () => {
  document.getElementById("popup").style.display = "none";
  location.reload();
});

//----------------------------------------------
//             Create Order here
//----------------------------------------------

//  document.getElementById("contactForm").addEventListener("click", async function (e) {

async function paymentRazorpay() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("number").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();
  const city = document.getElementById("city").value.trim();
  const adhaar = document.getElementById("adhaar").value.trim();

  const noPeople = Number(document.getElementById("attend").textContent);
  // let donateAmt = Number(document.getElementById("donate").value.trim());

  const someone = document.querySelector(".someone-check:checked")?.value || "";
  const support = document.querySelector(".support-check:checked")?.value || "";

  // if (donateAmt > 10000) {
  //   donateAmt = 10000;
  // }

  let passValue;
  if (noPeople == 1) {
    passValue = 5000;
  } else if (noPeople == 2) {
    passValue = 7500;
  } else {
    passValue = 0;
  }

  const passDonateValue = passValue;
  // + donateAmt;
  const payValue = (5 * passDonateValue) / 100;
  const totalPayPrice = passDonateValue + payValue;

  const formData = {
    name,
    phone,
    email,
    address,
    city,
    adhaar,
    noPeople,
    // donateAmt,
    someone,
    support,
    passValue,
    // donateAmt,
    totalPayPrice,
  };

  async function initiatePayment() {
    const response = await fetch(`${BACKEND_URL_OF_INDEX}/paytm/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalPayPrice, formData: formData }),
    });

    const data = await response.json();

    //----- use paytm docs code ----------------//

    async function onScriptLoad() {
      var config = {
        root: "",
        flow: "DEFAULT",
        data: {
          orderId: data.orderId.toString() /* update order id */,
          token: data.txnToken /* update token value */,
          tokenType: "TXN_TOKEN",
          amount: data.amount /* update amount */,
        },
        handler: {
          notifyMerchant: function (eventName, data) {
            console.log("notifyMerchant handler function called");
            console.log("eventName => ", eventName);
            console.log("data => ", data);
          },
        },
      };

      console.log(config);
      console.log("Now Everything is working before opening window");

      if (window.Paytm && window.Paytm.CheckoutJS) {
        console.log("Paytm checkout window runing start");

        await window.Paytm.CheckoutJS.init(config);
        window.Paytm.CheckoutJS.invoke(); // MUST be inside click
      }
    }

    onScriptLoad();
  }

  initiatePayment();
}

// Allow only one checkbox from a group
function allowOnlyOne(className) {
  const boxes = document.querySelectorAll("." + className);
  boxes.forEach((box) => {
    box.addEventListener("change", () => {
      if (box.checked) {
        boxes.forEach((other) => {
          if (other !== box) other.checked = false;
        });
      }
    });
  });
}

// allowOnlyOne("someone-check");
allowOnlyOne("support-check");

// Mobile Menu controls
document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
});

const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const closeMenuBtn = document.getElementById("close-menu");
const mobileLinks = document.querySelectorAll(".mobile-link");

function toggleMenu() {
  const open = mobileMenu.classList.contains("open");
  if (!open) {
    mobileMenu.classList.add("open");
    mobileMenu.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  } else {
    mobileMenu.classList.remove("open");
    mobileMenu.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
}

menuBtn.addEventListener("click", toggleMenu);
closeMenuBtn.addEventListener("click", toggleMenu);
mobileLinks.forEach((link) => link.addEventListener("click", toggleMenu));

// Form submission simulation + toast
const form = document.getElementById("contactForm");
const toast = document.getElementById("toast");

//COntact form whatsapp send

document.getElementById("contact-btn").addEventListener("click", function (e) {
  e.preventDefault();

  const name = document.getElementById("contact-name").value;
  const phone = document.getElementById("contact-phone").value;
  const email = document.getElementById("contact-email").value;
  const message = document.getElementById("contact-text").value;

  const whatsappNumber = "916388505758"; // with country code

  const text = `
Name: ${name}
Phone: ${phone}
email: ${email}
message: ${message}
  `;

  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    text
  )}`;

  window.open(url, "_blank");
});

// Stop Music Logic

const music = document.getElementById("music");
const noMusic = document.getElementsByClassName("stop-music");
const audio = document.getElementById("bgMusic");

audio.volume = 0.01;
let checkMusic;
music.addEventListener("click", () => {
  if (!checkMusic) {
    noMusic[0].style.display = "block";
    audio.pause();
    checkMusic = true;
  } else {
    noMusic[0].style.display = "none";
    audio.play();
    checkMusic = false;
  }
});
