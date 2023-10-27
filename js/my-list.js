function updateActivitiesInfoTitle() {
  const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
  const selectedItemsCount = selectedItems.length;
  const activitiesInfoTitle = document.querySelector('.activities-info-title');
  activitiesInfoTitle.textContent = `Antal aktiviteter tilføjet: ${selectedItemsCount}`;
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

function displaySelectedItems() {
    const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
  
    console.log(selectedItems);

    selectedItems.forEach(item => {
      const itemEl = document.createElement('li');
      itemEl.classList.add('activity-item');
    
      const imgElement = document.createElement('img');
      imgElement.src = item.image;
      imgElement.alt = item.title;
      imgElement.classList.add('activity-image');
    
      const titleContainer = document.createElement('div');
      titleContainer.classList.add('activity-title-containter');
    
      const titleEl = document.createElement('p');
      titleEl.textContent = item.title;
      titleEl.classList.add('activity-title');
    
      const infoContainer = document.createElement('div');
      infoContainer.classList.add('activity-info');
    
      const flexContainer = document.createElement('div');
      flexContainer.classList.add('activity-flex');
    
      const timeContainer = document.createElement('div');
      timeContainer.classList.add('activity-time');
    
      const dateEl = document.createElement('p');
      dateEl.textContent = item.date;
      dateEl.classList.add('activity-date');
    
      const timeEl = document.createElement('p');
      timeEl.textContent = item.time;
      timeEl.classList.add('activity-hours');
    
      const accordionContainer = document.createElement('div');
      accordionContainer.classList.add('accordion');
    
      const accordionItem = document.createElement('div');
      accordionItem.classList.add('accordion-item');
    
      const accordionHeader = document.createElement('div');
      accordionHeader.classList.add('accordion-header');
      accordionHeader.textContent = 'Læs mere ';

      accordionHeader.addEventListener('click', function() {
        toggleAccordion(this); 
    });
    
      const chevronIcon = document.createElement('i');
      chevronIcon.classList.add('fa-solid', 'fa-chevron-down');
    
      accordionHeader.appendChild(chevronIcon);
    
      const accordionContent = document.createElement('div');
      accordionContent.classList.add('accordion-content');
    
      const accordionText = document.createElement('p');
      accordionText.classList.add('accordion-text');
      accordionText.textContent = item.description;
    
      accordionContent.appendChild(accordionText);
      accordionItem.appendChild(accordionHeader);
      accordionItem.appendChild(accordionContent);
      accordionContainer.appendChild(accordionItem);
    
      timeContainer.appendChild(dateEl);
      timeContainer.appendChild(timeEl);
    
      flexContainer.appendChild(timeContainer);
    
      infoContainer.appendChild(flexContainer);
      infoContainer.appendChild(accordionContainer);
    
      titleContainer.appendChild(titleEl);
    
      itemEl.appendChild(imgElement);
      itemEl.appendChild(titleContainer);
      itemEl.appendChild(infoContainer);
    
      const container = document.querySelector('.my-list-container');
      container.appendChild(itemEl);
 
      updateActivitiesInfoTitle();

    });
  }

  displaySelectedItems();

  // window.addEventListener('load', () => {
  //   localStorage.removeItem('selectedItems');
  // });   

 