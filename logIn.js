const submitlogInUserPW = document.querySelector('#submitlogInUserPW');

// Apply event listener to selector
submitlogInUserPW.addEventListener("click", async function () {
    let userName = document.querySelector('#logInUserName');
    let password = document.querySelector('#logInPassword');
    userName = userName.value;
    password = password.value;

    //const url = 'http://localhost:3000/logIn/';
    const url = 'https://runway-app2.herokuapp.com/logIn';
    
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
    .then(response => JSON.parse(response))
    .then(response => {
        if (response.message === "Log in successful... rerouting to homepage") {

            localStorage.setItem('userEmail', response.userEmail);
            localStorage.setItem('loggedIn', true);
            localStorage.setItem('MNI', response.MNI);
            localStorage.setItem('MS', response.MS);
            localStorage.setItem('TA', response.TA);
            localStorage.setItem('ER', response.ER);
            localStorage.setItem('EI', response.EI);
            localStorage.setItem('EEA', response.EEA);
            localStorage.setItem('LE', response.LE);
            localStorage.setItem('_id', response._id);

            let message_output = document.createElement('p');
            message_div.textContent = '';
            message_output.textContent = "Log in successful... rerouting to homepage"
            message_div.appendChild(message_output);

            setTimeout(() => {
            window.location.href = "index.html";
            }, 2000);
            
        } else if (response.message === "Log in unsuccessful... try again"){
            let message_output = document.createElement('p');
            message_div.textContent = '';
            message_output.textContent = "Log in unsuccessful... try again"
            message_div.appendChild(message_output);
        }
    })
});



/*



*/

