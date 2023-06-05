let currentAge = 26;
let lifeExpectancy = 90;
let net_worth_traces = []
let y_axes_max = 0

window.addEventListener('net_worth_array_change', function(event) {
    const net_worth_traces_data = event.detail;
    //Create month array to use in X axis

    net_worth_traces = render_chart(net_worth_traces_data);
});

//plotly chart
function render_chart(net_worth_traces_data){
    net_worth_traces = []
    //Create month_array which will serve as the X axis data for each trace in chart
    for (let i=0; i< net_worth_traces_data.length; i++) {
        let net_worth = net_worth_traces_data[i];
        let month_array = []
        for (let i = 0; i < net_worth.length; i++) {
            month_array.push(i);
        }
        month_array = month_array.map(element => ((element / 12) + currentAge));
        //Set default trace characteristics
        var newTrace = {
            x: month_array,
            y: net_worth,
            line: {
                color: 'red'
              },
            visible: false,
        }
        
        net_worth_traces.push(newTrace)
    }
    //adjust traces according to if runway runs out, hits target, or goes infinite.
    function adjustTraces (net_worth_traces) {
        for (let trace=0; trace<net_worth_traces.length; trace++) {
            if ((net_worth_traces[trace].x.length) < (lifeExpectancy - currentAge) * 12) {
                net_worth_traces[trace].line.dash = 'dash';
                net_worth_traces[trace].visible = true;
            } else {
                for (let i=0; i<5; i++) {
                    net_worth_traces[trace + i].visible = true;
                    net_worth_traces[trace + i].line.dash = 'dash';
                    net_worth_traces[trace + i].line.color = 'green';
                    
                    if (i == 1) {
                        //This trace is the one in which life expectancy is first achieved
                        net_worth_traces[trace - i].line.dash = 'solid';
                        net_worth_traces[trace - i].line.color = 'green';
                        //y_axes_max is set here and will be used to set the max chart height
                        y_axes_max = Math.max(...net_worth_traces[trace].y);
                    }
                }
            break;

            }
            
        }
        return net_worth_traces;
    }
    net_worth_traces = adjustTraces(net_worth_traces)

    var data = net_worth_traces;

    var layout = {
        showlegend: false,

        margin: {
          l: 55,
          r: 10,
          b: 45,
          t: 20,
          pad: 4
        },
        xaxis: {
            title: {
              text: 'Age',
            },
            range: [currentAge, lifeExpectancy + 5]
        },
        yaxis: {
            title: {
              text: 'Net Worth'
            },
            range: [0, y_axes_max * 1.5]
        }
    }
    Plotly.newPlot('plotly_chart', data, layout, {displayModeBar: false});
}

/*

- Make it so that when one field is done and submitted, the rest of the fields auto-generate with default values
- Make it so that a chart shows when submit button is clicked instead of when the slider is moved
- get currentAge and lifeExpectancy fed from user input, not hard coded
- Figure out how to detect infinite runways and then change their color

*/