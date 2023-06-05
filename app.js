//Declare user input variable(s)
let TA;
let MS;
let MNI;

//Signup Btn
const signUp = document.querySelector('#signUp');
signUp.addEventListener("click", function () {
  window.location.href = "signUp.html";
})

//Login Btn
const logIn = document.querySelector('#logIn');
logIn.addEventListener("click", function () {
  window.location.href = "logIn.html";
})

//Financials Submit Button
const submitBtn = document.getElementById("submitBtn")
submitBtn.addEventListener("click", function() {
  const age = document.querySelector('#age');
  const age_div = document.querySelector('#age_div');

  const monthly_income = document.querySelector('#monthly_income');
  const monthly_income_div = document.querySelector('#monthly_income_div');

  const monthly_spend = document.querySelector('#monthly_spend');
  const monthly_spend_div = document.querySelector('#monthly_spend_div');

  const current_investments = document.querySelector('#current_investments');
  const current_investments_div = document.querySelector('#current_investments_div');


  input_becomes_slider(monthly_income, monthly_income_div);
  input_becomes_slider(monthly_spend, monthly_spend_div);
  input_becomes_slider(current_investments, current_investments_div);
})


//SLIDER STUFF
function input_becomes_slider(input_box, input_box_div){
  const inputValue = input_box.value;
  //Create Slider
  const slider = document.createElement('input');
  slider.className = "slider"
  slider.type = 'range';
  slider.min = 0;
  slider.max = inputValue * 2;
  slider.value = inputValue;
  slider.step = 50;
  slider.id = input_box.id;
  if (input_box.id === 'current_investments') {
    slider.step = 1000;
  }

  //Create output number on slider
  const sliderOutput = document.createElement('output');
  sliderOutput.className = "slider-output";
  sliderOutput.id = "sliderValue";
  sliderOutput.innerHTML = slider.value;

  //remove input box and create slider in the following two lines
  input_box.remove();
  input_box_div.appendChild(slider);
  input_box_div.appendChild(sliderOutput);
  // Add event listener to update output when slider value changes
  slider.addEventListener("input", function() {
    sliderOutput.innerHTML = this.value;
    let sliderValue = this.value;

    if (input_box_div.id === 'current_investments_div') {
      TA = new CustomEvent('currentInvestmentsSlider', { detail: sliderValue });
      window.dispatchEvent(TA);
    }
    if (input_box_div.id === 'monthly_spend_div') {
      MS = new CustomEvent('monthlySpendSlider', { detail: sliderValue });
      window.dispatchEvent(MS);
    }
    if (input_box_div.id === 'monthly_income_div') {
      MNI = new CustomEvent('monthlyIncomeSlider', { detail: sliderValue });
      window.dispatchEvent(MNI);
    }
});
//Create event listener to update database when slider is changed
slider.addEventListener("change", async function() {

  const url = 'http://localhost:3000/update';
  const data = {
    value: this.value,
    slider_id: this.id,
    userObjectID: localStorage.getItem('_id')
    };
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
  
})
};

//Collapsible
const coll = document.getElementsByClassName("collapsible");
for (let i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    const content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

function tooltip_popup(popup_id) {
  var popup = document.getElementById(popup_id);
  popup.classList.toggle("show");
}

//Check localstorage to see if user is logged in If so, fills in user data into input boxes and render chart.
if (localStorage.getItem('loggedIn') === 'true') {
  //Remove buttons
  signUp.remove();
  logIn.remove();
  // Append new loggedInAs element
  const runway_header = document.querySelector('.runway_header');
  const loggedInAs = document.createElement('p');
  loggedInAs.textContent = 'Logged in as: ' + localStorage.getItem('userEmail');
  runway_header.appendChild(loggedInAs);
  //Grab user values from localstorage and set to corresponding values in input boxes
  monthly_income.value = localStorage.getItem('MNI')
  monthly_spend.value = localStorage.getItem('MS')
  current_investments.value = localStorage.getItem('TA')

  //Set loggedIn to false so that when the the user leaves the page, it will log them out?
  localStorage.setItem('loggedIn', false);

  //Create logOut button
  const logOutBtn = document.createElement('button');
  logOutBtn.textContent = 'Log Out';
  logOutBtn.id = 'logOut';
  logOutBtn.addEventListener('click', logOut);
  runway_header.appendChild(logOutBtn);
  function logOut() {
    window.location.href = "index.html";
    localStorage.clear();
  }

    //Create DeleteAccount button
    const DeleteAcctBtn = document.createElement('button');
    DeleteAcctBtn.textContent = 'Delete Account';
    DeleteAcctBtn.id = 'DeleteAcct';
    DeleteAcctBtn.addEventListener('click', deleteAcct);
    runway_header.appendChild(DeleteAcctBtn);
    async function deleteAcct() {
      const url = 'http://localhost:3000/deleteUser';
      const data = {
        userEmail: localStorage.getItem('userEmail')
        };
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        }).then(response => response.text())
        .then(parsedResponse => JSON.parse(parsedResponse))
        .then(parsedResponse => {
            if (parsedResponse.message === "Account Deleted") {
              logOutBtn.remove();
              DeleteAcctBtn.remove();
              const deletingAcctText = document.createElement('p');
              deletingAcctText.textContent = 'Your data has been deleted from out server. Logging you out for the last time...'
              runway_header.appendChild(deletingAcctText);
              setTimeout(() => {
                window.location.href = "index.html";
              }, 4000);
        }
      })
    }

  submitBtn.click();

}