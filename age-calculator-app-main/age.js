const years = document.querySelector(".years");
const months = document.querySelector(".month");
const days = document.querySelector(".days");
const form = document.querySelector("form");

document.addEventListener("DOMContentLoaded", function () {
  const yearInput = document.getElementById("year");
  const monthInput = document.getElementById("month");
  const dayInput = document.getElementById("day");

  dayInput.addEventListener("input", function () {
    if (this.value.length >= this.maxLength) {
      // If the maximum length is reached, move focus to the next input (month)
      monthInput.focus();
    }
  });

  monthInput.addEventListener("input", function () {
    if (this.value.length >= this.maxLength) {
      // If the maximum length is reached, move focus to the next input (day)
      yearInput.focus();
    }
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const yearOfBirth = document.getElementById("year").value;
  const monthOfBirth = document.getElementById("month").value;
  const dayOfBirth = document.getElementById("day").value;
  const validity = document.querySelector(".error p");
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const todaysDate = new Date();

  if (
    isNaN(yearOfBirth) ||
    isNaN(monthOfBirth) ||
    isNaN(dayOfBirth) ||
    dayOfBirth > 31 ||
    monthOfBirth > 12
  ) {
    validity.innerHTML = `<i>Must be a valid date</i>`;
  } else if (!yearOfBirth || !monthOfBirth || !dayOfBirth) {
    validity.innerHTML = `<i>All input fields are required</i>`;
  } else if (yearOfBirth > todaysDate.getFullYear()) {
    validity.innerHTML = `<i>Input a valid year</i>`;
  } else {
    const birthDate = new Date(yearOfBirth, monthOfBirth - 1, dayOfBirth);

    // Calculate age
    let ageInYears = todaysDate.getFullYear() - birthDate.getFullYear();
    let ageInMonths = todaysDate.getMonth() - birthDate.getMonth();
    let ageInDays = todaysDate.getDate() - birthDate.getDate();

    // Adjust for negative months or days
    if (ageInDays < 0) {
      ageInMonths--;
      ageInDays += daysInMonth[todaysDate.getMonth() - 1];

      // If January, subtract an extra day if it's a leap year
      if (todaysDate.getMonth() === 1 && isLeapYear(todaysDate.getFullYear())) {
        ageInDays--;
      }
      if (monthOfBirth === 1 && isLeapYear(yearOfBirth)) {
        ageInDays++;
      }
    }

    if (ageInMonths < 0) {
      ageInYears--;
      ageInMonths += 12;
    }

    years.innerHTML = `${ageInYears} `;
    months.innerHTML = `${ageInMonths} `;
    days.innerHTML = `${ageInDays} `;
    validity.innerHTML = `<i></i>`;

    console.log(ageInYears);
  }
});

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
