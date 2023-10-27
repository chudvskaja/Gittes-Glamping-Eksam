let allMessages = []; 

function getAllMessages() {
  return fetch("https://glamping.webmcdm.dk/contacts", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
}

function filterAndSortMessages(messages, type) {
  return messages
    .filter(message => message.subject === type)
    .sort((a, b) => new Date(b.created) - new Date(a.created));
}

function displayMessages(messages, type) {
  const messagesDiv = document.getElementById('messages');
  messagesDiv.innerHTML = ''; 

  messages.forEach(message => {
    const messageElement = document.createElement('div');
    const createdDate = new Date(message.created);
    messageElement.innerHTML = `
    <div class="message-item">
        <p><strong>Type:</strong> ${type}</p>
        <p><strong>Navn:</strong> ${message.name}</p>
        <p><strong>Email:</strong> ${message.email}</p>
        <p><strong>Besked:</strong> ${message.message}</p>
        <p><strong>Dato:</strong> ${createdDate.toLocaleString()}</p>
        </div>
    `;
    messagesDiv.appendChild(messageElement);
  });
}

function filterMessages(type) {
  const filteredMessages = filterAndSortMessages(allMessages, type);
  displayMessages(filteredMessages, type);
}

function showAllMessages() {
  displayMessages(allMessages, 'All');
}

function sortByDate() {
  allMessages.sort((a, b) => new Date(b.created) - new Date(a.created));
  showAllMessages();
}


getAllMessages()
  .then(data => {
    allMessages = data; 
    showAllMessages(); 
  })
  .catch(error => {
    console.error('Fejl', error);
  }); 
