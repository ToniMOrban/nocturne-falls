//pulls dates from HTML and arranges in array
const eventDates = [];
const dateDivs = document.querySelectorAll(".date");
dateDivs.forEach((dateDiv) => {
  eventDates.push(dateDiv.innerText);
});

//formats dates from HTML into more user friendly format
const formattedEvents = [];
eventDates.forEach((eventDate) => {
  let date = moment(eventDate).format("MMMM D, YYYY");
  formattedEvents.push(date);
});

//changes displayed date on page to user friendly format
dateDivs.forEach((element, index) => {
  element.innerHTML = formattedEvents[index];
});

const daysTag = document.querySelector(".days"),
  currentDate = document.querySelector(".current-date"),
  prevNextIcon = document.querySelectorAll(".icons span");
// getting new date, current year and month
let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();
// storing full name of all months in array
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const thisMonthEvents = [];
let isEvent;

const renderDatesWithEvents = function (i) {
  for (let n = 0; n < thisMonthEvents.length; n++) {
    if (
      currMonth + 1 == parseInt(moment(thisMonthEvents[n]).format("MM")) &&
      i == parseInt(moment(thisMonthEvents[n]).format("D"))
    ) {
      isEvent = "event";
      break;
    } else {
      isEvent = "";
    }
  }
};

const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
  let liTag = "";
  eventDates.forEach((eventDate) => {
    if (currMonth + 1 == parseInt(moment(eventDate).format("MM"))) {
      thisMonthEvents.push(eventDate);
    }
  });
  for (let i = firstDayofMonth; i > 0; i--) {
    // creating li of previous month last days
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }
  for (let i = 1; i <= lastDateofMonth; i++) {
    // creating li of all days of current month
    // adding active class to li if the current day, month, and year matched
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    renderDatesWithEvents(i);
    liTag += `<li class="${isToday} ${isEvent}">${i}</li>`;
    //console.log(liTag);
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    // creating li of next month first days
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }
  currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
  daysTag.innerHTML = liTag;
};
renderCalendar();

prevNextIcon.forEach((icon) => {
  // getting prev and next icons
  icon.addEventListener("click", () => {
    // adding click event on both icons
    updateEventsToHidden();
    // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
    eventDates.forEach((eventDate) => {
      if (currMonth + 1 == parseInt(moment(eventDate).format("MM"))) {
        thisMonthEvents.push(eventDate);
      }
    });
    if (currMonth < 0 || currMonth > 11) {
      // if current month is less than 0 or greater than 11
      // creating a new date of current year & month and pass it as date value
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear(); // updating current year with new date year
      currMonth = date.getMonth(); // updating current month with new date month
    } else {
      date = new Date(); // pass the current date as date value
    }
    renderCalendar(); // calling renderCalendar function
    updateEventsToDisplay();
    for (let i = 0; i < thisMonthEvents.length; i++) {
      renderDatesWithEvents(i);
    }
  });
});

let updateEventsToDisplay = function () {
  let targetText = months[currMonth];
  let targetH3 = null;

  // Get all the h3 elements
  const h3Elements = document.querySelectorAll("h3");

  // Iterate through the h3 elements and check for a match
  h3Elements.forEach((h3) => {
    if (h3.innerText === targetText) {
      targetH3 = h3;
    }
  });

  // Check if a matching h3 element is found
  if (targetH3) {
    let currentMonthDiv = targetH3.parentNode;
    currentMonthDiv.classList.remove("hidden");
    // Now you can use the currentMonthDiv variable to access the parent <div> of the target h3 element
  }
};
updateEventsToDisplay();

let updateEventsToHidden = function () {
  let targetText = months[currMonth];
  let targetH3 = null;

  // Get all the h3 elements
  const h3Elements = document.querySelectorAll("h3");

  // Iterate through the h3 elements and check for a match
  h3Elements.forEach((h3) => {
    if (h3.innerText === targetText) {
      targetH3 = h3;
    }
  });

  // Check if a matching h3 element is found
  if (targetH3) {
    let currentMonthDiv = targetH3.parentNode;
    currentMonthDiv.classList.add("hidden");
    // Now you can use the currentMonthDiv variable to access the parent <div> of the target h3 element
  }
};
