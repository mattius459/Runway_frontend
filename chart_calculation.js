/* ORGANIZE VARIABLES */

//BASIC INPUTS
//Age
let currentAge = 26;
let lifeExpectancy = 90;



//Monthly Net Income
let MNI_input = 4000;
window.addEventListener('monthlyIncomeSlider', function(event) {
    MNI_input = Number(event.detail);
    let net_worth_traces_data = computeChartData();
    const dataChangeEvent = new CustomEvent('net_worth_array_change', { detail: net_worth_traces_data });
    window.dispatchEvent(dataChangeEvent);
});

//Monthly Spending
let MS_input = 5000;
window.addEventListener('monthlySpendSlider', function(event) {
    MS_input = Number(event.detail);
    let net_worth_traces_data = computeChartData();
    const dataChangeEvent = new CustomEvent('net_worth_array_change', { detail: net_worth_traces_data });
    window.dispatchEvent(dataChangeEvent);
});

//Total assets
let TA_input = 25000;
window.addEventListener('currentInvestmentsSlider', function(event) {
    TA_input = Number(event.detail);
    let net_worth_traces_data = computeChartData();
    const dataChangeEvent = new CustomEvent('net_worth_array_change', { detail: net_worth_traces_data });
    window.dispatchEvent(dataChangeEvent);
});

//ADVANCED CONFIGURATIONS

//Expected Inflation and Compute Monthly Inflation rate given annual inflation rate
let EI = .05
let MIR = (1 + EI)**(1/12) - 1

//Expected Return
let ER = .09
let MER = (1 + ER)**(1/12) - 1

//Expected Entitlements Age
let EEA = 65

//Life Expectancy
let LE = 90

//Salary Increase
let SI = .02 + EI
let MNIIR = (1 + SI)**(1/12) - 1 //Monthly Net Income Increase Rate

//Taxation Factor
let TF = 0.15

/* CALCULATION */


//Create an array which has the user's projected net worth each month
function computeChartData() {

    let retireIn = 0
    let net_worth_traces_data = [];

    while (retireIn <= 100){
        //Explain these lines better
        let MS = MS_input;
        let MNI = MNI_input;
        let TA = TA_input;

        let net_worth = [];
        let month = 0;

        while ((TA > 0) && (month < 1000)) {

            //retirement year
            if (month == retireIn*12) {
            MNI = 0;
            }
            //Create monthly_leftover which is the difference between MNI and MS for the month
            let monthly_leftover = MNI - MS
            if (monthly_leftover > 0) {
                TA = TA + monthly_leftover; //This happens when you have leftover income to put into total assets at the end of the month
            } else {
                TA = TA + (monthly_leftover * (1 + TF)) //This happens when monthly spending exceeds income and triggers a withdrawal from total assets
            }

            MS = MS * (1 + MIR) //Increase monthly spending according to the monthly inflation rate (MIR)
            MNI = MNI * (1 + MNIIR) //Increase MNI due to monthly net income increase rate (MNIIR)
            TA = TA * (1 + MER) //Increase total assets by amount of interest earned on them that month

            net_worth[month] = TA
            month += 1
        }

        retireIn += 1;
        net_worth_traces_data.push(net_worth)
    }
    return net_worth_traces_data;
}