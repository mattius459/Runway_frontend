const submitUserPW = document.querySelector('#submitUserPW');

// Apply event listener to selector
submitUserPW.addEventListener("click", async function () {
    let userName = document.querySelector('#userName');
    let password = document.querySelector('#password');
    userName = userName.value;
    password = password.value;

    //Create onchange event listener and feed in password input so it continuously checks

    //const credentials = {userName, password}
    //const url = 'http://localhost:3000/create/';
    const url = 'https://runway-app2.herokuapp.com/';
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
        console.log(message);
        if (message === 'Account Created') {
          setTimeout(() => {
            window.location.href = "logIn.html";
          }, 2000);
        }
      })
});


