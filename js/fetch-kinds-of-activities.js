const activitiesList = document.querySelector(".activities-list");
const cartActivitiesList = document.querySelector('.cart-content__list');
const cartEl = document.querySelector('.cart');
const cartQuantity = document.querySelector('.cart_quantity');
const cartContent = document.querySelector(".cart-content");


function fetchActivities() {
  fetch("https://glamping.webmcdm.dk/activities")
  .then (response => {
   if (!response.ok) {
    throw new Error(response.status);
   }
    return response.json();
   })
   .then((activity) => renderActivitiesList(activity))
   .catch((error) => console.log(error));
}


function printQuantity() {
    const length = cartActivitiesList.children.length;
    cartQuantity.textContent = length;
    cartEl.classList.toggle("active", length > 0);
  }

  function deleteActivities(activityParent) {
   activityParent.remove();
    printQuantity();
  }


  function toggleAccordion(header) {
    const content = header.nextElementSibling;
    const buttonText = header.innerText.trim();
    
    if (content.style.maxHeight) {
        content.style.maxHeight = null; 
        header.innerText = buttonText === 'Læs mere' ? 'Læs mindre' : 'Læs mere';
    } else {
        content.style.maxHeight = content.scrollHeight + "px";  
        header.innerText = 'Læs mindre';
    }
}

function renderActivitiesList(activities) {
    const markup = activities
      .map((activity) => {
        return `<li class="activity-item">
        <img src="${activity.image}" alt="${activity.title}" class="activity-image">
    
        <div class="activity-title-containter">
        <p class="activity-title">${activity.title}</p>
        </div>
        <div class="activity-info">
        <div class="activity-flex">
        <div class="activity-time">
        <p class="activity-date">${activity.date}</p>
        <p class="activity-hours">${activity.time}</p>
        </div>
        <i class="fa-solid fa-heart"></i>
        </div>
        <div class="accordion">
        <div class="accordion-item">
            <div class="accordion-header" onclick="toggleAccordion(this)">Læs mere <i class="fa-solid fa-chevron-down"></i></div>
            <div class="accordion-content">
                <p class="accordion-text">${activity.description}</p>
            </div>
        </div>
        </div>
          </li>`;
      })
      .join("");
      
   activitiesList.innerHTML = markup;

   const heartBtn = document.querySelectorAll('.fa-heart');

   heartBtn.forEach(btn => {
    btn.addEventListener("click", (e) => {
      btn.classList.add('white-heart');
      const parent = btn.closest(".activity-item");
      const imgEl = parent.querySelector(".activity-image").getAttribute('src');
      const titleEl = parent.querySelector(".activity-title").textContent;
      const descriptionEl = parent.querySelector(".accordion-text").textContent;
      const dateEl = parent.querySelector(".activity-date").textContent; 
      const timeEl = parent.querySelector(".activity-hours").textContent; 

      

      const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
      selectedItems.push({ image: imgEl, title: titleEl, id: parent.id, description: descriptionEl,  date: dateEl, time: timeEl });
      localStorage.setItem('selectedItems', JSON.stringify(selectedItems));

      cartActivitiesList.insertAdjacentHTML("afterbegin", generateCartActivity(imgEl, titleEl, parent.id ));
      printQuantity();

      
    }); 
  });
 
  cartActivitiesList.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-trash")) {
      const activityParent = e.target.closest(".cart-content__item");
      deleteActivities(activityParent);
    }
  });

}  

function addToMyList(event) {
    const activityItem = event.target.closest('.activity-item');
    const activityTitle = activityItem.querySelector('.activity-title').textContent;
    const myList = JSON.parse(localStorage.getItem('myList')) || [];

    if (!myList.includes(activityTitle)) {
        myList.push(activityTitle);
        localStorage.setItem('myList', JSON.stringify(myList));
    }
} 


function generateCartActivity(image, title, id) {
    return `
      <li class="cart-content__item">
        <div class="cart-content__product cart-product" data-id="${id}">
          <img class="cart-product__img" src="${image}">
          <div class="cart-product__text">
            <h3 class="cart-product__title">${title}</h3>
          <button class="cart-product__delete" aria-label="delete-activity">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </li>`;
  }

fetchActivities();


   

