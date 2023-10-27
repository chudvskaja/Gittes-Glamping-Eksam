const userList = document.querySelector(".statement-list");

function fetchUsers() {
  fetch("https://glamping.webmcdm.dk/reviews")
  .then (response => {
   if (!response.ok) {
    throw new Error(response.status);
   }
    return response.json();
   })
   .then((user) => renderUserList(user))
   .catch((error) => console.log(error));
}

fetchUsers();

function renderUserList(users) {
    const markup = users
      .map((user) => {
        return `<li class="statement-item">
        <div class="client-info">
        <p class="client-name">${user.name},</p>
        <p class="client-age">${user.age} år</p>
        </div>
        <p class="client-stay">Har været på ${user.stay}</p>
        <p class="statement-text">${user.review}</p>
          </li>`;
      })
      .join("");
    userList.innerHTML = markup;
  }