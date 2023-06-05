const submitUserPW = document.querySelector('#submitUserPW');

// Apply event listener to selector
submitUserPW.addEventListener("click", async function () {
    let userName = document.querySelector('#userName');
    let password = document.querySelector('#password');
    userName = userName.value;
    password = password.value;

    //Create onchange event listener and feed in password input so it continuously checks

    //const credentials = {userName, password}
    const url = 'http://localhost:3000/create/';
    //const url = 'https://runway-app2.herokuapp.com/create';
    const data = {
    userName: userName,
    password: password
    };

    const response = await fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    }).then(response => response.text())
    .then(message => {
      const message_div = document.getElementById('message_div');

        if (message === 'Account Created') {
          let message_output = document.createElement('p');
          message_div.inner = '';
          message_output.textContent = "Account created... rerouting to log in page"
          message_div.appendChild(message_output);
          setTimeout(() => {
            window.location.href = "logIn.html";
          }, 2000);
        } else if (message === "Username already exists, try again") {
          let message_output = document.createElement('p');
          message_div.textContent = '';
          message_output.textContent = "Username already exists, try again"
          message_div.appendChild(message_output);
        } else {
          message_div.textContent = '';
          message_output.textContent = "Only 3 digit numbers are accepted for password"
          message_div.appendChild(message_output);
        }
      })
});


