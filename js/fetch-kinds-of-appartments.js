const appartmentsList = document.querySelector(".appartments-list");

function fetchAppartments() {
  fetch("https://glamping.webmcdm.dk/stays")
  .then (response => {
   if (!response.ok) {
    throw new Error(response.status);
   }
    return response.json();
   })
   .then((appartment) => renderAppartmentsList(appartment))
   .catch((error) => console.log(error));
}

fetchAppartments();

function renderAppartmentsList(appartments) {
    const markup = appartments
      .map((appartment) => {
        return `<li class="appartment-item">
        <img src="${appartment.image}" alt="${appartment.title}" class="appartment-image">
        <div class="appartment-overlay"></div>
        <div class="appartment-info">
        <p class="appartment-title">${appartment.title},</p>
        <p class="appartment-description">${appartment.numberOfPersons} personer</p>
       
        <p class="appartment-price">Fra ${appartment.price},-</p>
        </div>
        <a href="${appartment._id}.html" class="read-more">Læs mere</a>
          </li>`;
      })
      .join("");
   appartmentsList.innerHTML = markup;
  } 