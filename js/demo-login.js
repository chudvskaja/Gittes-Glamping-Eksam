document.getElementById('demoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;


    console.log('Sender en anmodning', { username, password });

    const responseDiv = document.getElementById('response');
    responseDiv.innerHTML = `Sendt: Navn - ${username}, Adgangdskode - ${password}`;
});
