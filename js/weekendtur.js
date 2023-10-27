const weekendInfo = document.querySelector(".weekend-stay");

function fetchWeekendStay() {
    fetch("https://glamping.webmcdm.dk/stays/6533c19ad89bd7c9ba8de72e")
    .then (response => {
     if (!response.ok) {
      throw new Error(response.status);
     }
      return response.json();
     })
     .then((weekendstay) => renderWeekendStayInfo(weekendstay))
     .catch((error) => console.log(error));
  }
  
  fetchWeekendStay();

  function renderWeekendStayInfo(weekendstays) {
    const markup = weekendstays
      .map((weekendstay) => {
        const includesList = weekendstay.includes.map((include) => `<li><p class="weekend-small-text">${include}</p></li>`).join("");
        return `<div class="weekendstay-item">
        <h2 class="weekend-second-title">Tag væk en weekend, med én du holder af</h2>
        <p class="weekend-text">${weekendstay.description},</p>
        <h3 class="weekend-third-title"> Med i pakken, er der inkluderet: </h3>
        <ul>${includesList}</ul>
        <p class="weekendstay-price">Pris ${weekendstay.price},-</p>
        <a href="contact.html" class="book-now">BOOK NU</a>
        </div>
          </div>`;
      })
      .join("");
      weekendInfo.innerHTML = markup;
  } 
