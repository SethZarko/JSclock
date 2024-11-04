// DOM Selectors
const secHand = document.querySelector(".sec-hand");
const minHand = document.querySelector(".min-hand");
const hourHand = document.querySelector(".hour-hand");
const hour = document.querySelector('.hour');
const min = document.querySelector('.min');
const sec = document.querySelector('.sec');
const dateDisplay = document.querySelector('.date');
const AMPM = document.querySelector('.am-pm');

// ---- Functions ----- //
const updateTime = () => {
  const now = new Date();

  // Seconds
  const seconds = now.getSeconds();
  const secDeg = (seconds / 60) * 360 + 90;
  secHand.style.transform = `rotate(${secDeg}deg)`;

  // Remove transition on 0-second tick to avoid jitter
  if (seconds === 0) {
    secHand.style.transition = "none";
  } else {
    secHand.style.transition = "all 0.055s cubic-bezier(0.1, 2.7, 0.58, 1)";
  }
  secHand.style.transform = `rotate(${secDeg}deg)`;
  sec.textContent = seconds;

  // Minutes
  const mins = now.getMinutes();
  const minDeg = (mins / 60) * 360 + 90;
  minHand.style.transform = `rotate(${minDeg}deg)`;
  min.textContent = String(mins).padStart(2, '0');

  // Hours
  const hours = now.getHours();
  const hourDeg = (hours / 12) * 360 + 90;
  hourHand.style.transform = `rotate(${hourDeg}deg)`;
  hour.textContent = ((hours % 12) || 12) + ':'; 

  // AM/PM
  let ampm = hours >= 12 ? 'P.M' : 'A.M';
  AMPM.textContent = ampm;
};

const updateDate = () => {
  const now = new Date();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = monthNames[now.getMonth()];
  const day = now.getDate();
  const year = now.getFullYear();
  
  dateDisplay.textContent = `${month} ${day}, ${year}`;
};


// Initialize clock and date
updateTime();
updateDate();

// Set interval for time
setInterval(updateTime, 1000);

// Set timeout to update date at midnight
const now = new Date();
const msUntilMidnight = ((24 - now.getHours() - 1) * 60 * 60 + (60 - now.getMinutes()) * 60 + (60 - now.getSeconds())) * 1000;
setTimeout(() => {
  updateDate();
  setInterval(updateDate, 24 * 60 * 60 * 1000); // Repeat every 24 hours
}, msUntilMidnight);