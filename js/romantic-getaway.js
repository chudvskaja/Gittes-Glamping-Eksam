const romanticInfo = document.querySelector(".romantic-stay");

function fetchRomanticStay() {
    fetch("https://glamping.webmcdm.dk/stays/6533c22ed89bd7c9ba8de735")
    .then (response => {
     if (!response.ok) {
      throw new Error(response.status);
     }
      return response.json();
     })
     .then((romanticstay) => renderRomanticStayInfo(romanticstay))
     .catch((error) => console.log(error));
  }
  
  fetchRomanticStay();

  function renderRomanticStayInfo(romanticstays) {
    const markup = romanticstays
      .map((romanticstay) => {
      const includesList = romanticstay.includes.map((include) => `<li><p class="weekend-small-text">${include}</p></li>`).join("");

        return `<div class="weekendstay-item">
        <h2 class="weekend-second-title">Tag væk en weekend, med én du holder af</h2>
        <p class="weekend-text">${romanticstay.description},</p>
        <h3 class="weekend-third-title"> Med i pakken, er der inkluderet: </h3>
        <ul>${includesList}</ul>
        <p class="weekendstay-price">Pris ${romanticstay.price},-</p>
        <a href="contact.html" class="book-now">BOOK NU</a>
        </div>
          </div>`;
      })
      .join("");
      romanticInfo.innerHTML = markup;
  } 
