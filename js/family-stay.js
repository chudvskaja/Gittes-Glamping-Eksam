const familyStayInfo = document.querySelector(".family-stay");

function fetchFamilyStay() {
    fetch("https://glamping.webmcdm.dk/stays/6533c25dd89bd7c9ba8de739")
    .then (response => {
     if (!response.ok) {
      throw new Error(response.status);
     }
      return response.json();
     })
     .then((familystay) => renderFamilyStayInfo(familystay))
     .catch((error) => console.log(error));
  }
  
  fetchFamilyStay();

  function renderFamilyStayInfo(familystays) {
    const markup = familystays
      .map((familystay) => {
        const includesList = familystay.includes.map((include) => `<li><p class="weekend-small-text">${include}</p></li>`).join("");
        return `<div class="weekendstay-item">
        <h2 class="weekend-second-title">Tag væk en weekend, med én du holder af</h2>
        <p class="weekend-text">${familystay.description},</p>
        <h3 class="weekend-third-title"> Med i pakken, er der inkluderet: </h3>
        <ul>${includesList}</ul>
        <p class="weekendstay-price">Pris ${familystay.price},-</p>
        <a href="contact.html" class="book-now">BOOK NU</a>
        </div>
          </div>`;
      })
      .join("");
      familyStayInfo.innerHTML = markup;
  } 
