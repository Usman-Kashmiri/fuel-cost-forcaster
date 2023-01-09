// variables to get dom elements.
var yearInputField = document.getElementById('yearInput'), // History charts will change with this input field.
    historical_mode = document.getElementById('historical_mode'), // History mode tab.
    forcast_mode = document.getElementById('forcast_mode'), // Forcast mode tab.
    historical_mode_btn = document.getElementById('historical_mode_btn'), // History mode switch button.
    forcast_mode_btn = document.getElementById('forcast_mode_btn'), // Forcast mode switch button.
    fuelFilters = document.getElementsByClassName('fuelFilters'), // History fuel filters.
    forcastFuelFilters = document.getElementsByClassName('forcastFuelFilters'), // Forcast Fuel Filters.
    filters = document.querySelectorAll('#historyChartsFilters div'), // fuel filters
    colors = ['#41DA96', '#E6AC2B', '#71EB92', '#FAAFF9'];

// this arrow function will retain bars' colors when switching fuel filters on/off:
const retainChartColors = (chartData) => {
    colors.forEach((color, index) => {
        chartData.setColumnProperty(index + 1, 'color', color);
    });
}

// JSON file path.
const url = `assets/js/fuelCostData.json`;

// Functions for switching between modes.

// On click function for switching to history mode.
historical_mode_btn.onclick = () => {

    // this adds active class to history tab switch button.
    historical_mode_btn.classList.add("active")
    // and this removes active class from forcast tab switch button.
    forcast_mode_btn.classList.remove("active")

    // to change display of history mode.
    historical_mode.style.display = "flex";
    forcast_mode.style.display = "none";
}

// On click function for switching to forcast mode.
forcast_mode_btn.onclick = () => {

    // this adds active class to forcast tab switch button.
    forcast_mode_btn.classList.add("active")
    // and this removes active class from history tab switch button.
    historical_mode_btn.classList.remove("active")

    // to make forcast tab visible visible and hide history tab.
    historical_mode.style.display = "none";
    forcast_mode.style.display = "flex";

    /* Had to set forcast mode's display to flex else the forcast chart
    else the chart who's display set to none initially doesn't renders properly. */

    // Initially forcast mode's position is set to absolute in style.css
    // this will set forcast mode's position to relative.
    forcast_mode.style.position = "relative";

    // Initially focast mode's visibility is set to hidden in style.css
    // this will set forcast mode's visibility to visible.
    forcast_mode.style.visibility = "visible";
}


// This async await function fetches fuel cost data that is stored in a JSON file.
async function fetchData() {

    // Storing the fetched data into a constant.
    const response = await fetch(url);

    // Parsing the fetched data into json format.
    const data = await response.json();

    return data;
}


// Global Scopes: variables that are initialized outside of a function are global variables or scopes.

var months, // for mapping months.
    D7DW, // for mapping solid type fuel cost values. 
    D7DU, // for mapping gas fuel cost values.
    D7DT, // for mapping electricity fuel cost values.
    D7DV, // for mapping liquid type fuel cost values.
    forcastData, // for storing whole forcast data.
    forcastMonthNames, // for mapping forcast months names.
    forcastD7DWCost, // for mapping forcast solid type fuel cost values.
    forcastD7DUCost, // for mapping forcast gas fuel cost values.
    forcastD7DTCost, // for mapping forcast electricity fuel cost values.
    forcastD7DVCost, // for mapping forcast liquid type fuel cost values.
    dataOf21, // for storing data of year 2021
    dataOf22, // for storing data of year 2022
    twelveMonthsData, // for iterating data of twelve months only out of year 2021 & 2022 combined
    recordLength; // for storing the length of total number of records per year.

// This function will get year input field's value to change history charts on onchange event listener.

function getValue() {

    // calling the fetchData() function we declared above.
    fetchData().then(data => {

        var index;

        // this switch case statement will check input field's value and will assign index variable respectively.
        switch (yearInputField.value) {
            case '1996':
                index = 0;
                break;
            case '1997':
                index = 1;
                break;
            case '1998':
                index = 2;
                break;
            case '1999':
                index = 3;
                break;
            case '2000':
                index = 4;
                break;
            case '2001':
                index = 5;
                break;
            case '2002':
                index = 6;
                break;
            case '2003':
                index = 7;
                break;
            case '2004':
                index = 8;
                break;
            case '2005':
                index = 9;
                break;
            case '2006':
                index = 10;
                break;
            case '2007':
                index = 11;
                break;
            case '2008':
                index = 12;
                break;
            case '2009':
                index = 13;
                break;
            case '2010':
                index = 14;
                break;
            case '2011':
                index = 15;
                break;
            case '2012':
                index = 16;
                break;
            case '2013':
                index = 17;
                break;
            case '2014':
                index = 18;
                break;
            case '2015':
                index = 19;
                break;
            case '2016':
                index = 20;
                break;
            case '2017':
                index = 21;
                break;
            case '2018':
                index = 22;
                break;
            case '2019':
                index = 23;
                break;
            case '2020':
                index = 24;
                break;
            case '2021':
                index = 25;
                break;
            case '2022':
                index = 26;
                break;

            default:
                index = 26;
                break;
        }

        // Storing data of year 2021 & 2022 to merge them into one array.
        // because year 2022 has fewer data than 12 months.
        dataOf22 = data.fuelCostData[26].record;
        dataOf21 = data.fuelCostData[25].record;

        // the silce method will only get us last 12 months data.
        twelveMonthsData = (dataOf21.concat(dataOf22)).slice(-12);

        // mapping all the years into a constant array.
        // this const hasn't not been used, yet it is here... if ever needed.
        const years = data.fuelCostData.map(
            (i) => {
                return i.year;
            }
        );


        // as per switch case statement declared above inndex for year 2022 will be 26
        // this condition gets ready data for previous 12 months.
        if (index == 26) {

            // mapping all the previous 12 months' names into an array.
            months = twelveMonthsData.map(
                (i) => {
                    return i.month;
                }
            );

            // mapping all the previous 12 months' solid fuel cost data into an array.
            D7DW = twelveMonthsData.map(
                (i) => {
                    return i.D7DW;
                }
            );

            // mapping all the previous 12 months' gas fuel cost data into an array.
            D7DU = twelveMonthsData.map(
                (i) => {
                    return i.D7DU;
                }
            );

            // mapping all the previous 12 months' electricity fuel cost data into an array.
            D7DT = twelveMonthsData.map(
                (i) => {
                    return i.D7DT;
                }
            );

            // mapping all the previous 12 months' liquid fuel cost data into an array.
            D7DV = twelveMonthsData.map(
                (i) => {
                    return i.D7DV;
                }
            );

        }

        // this else statement gets ready data for each year respectively.
        else {

            // mapping all months' name into an array.
            months = data.fuelCostData[index].record.map(
                (i) => {
                    return i.month;
                }
            );

            // mapping all months' solid fuel cost data into an array.
            D7DW = data.fuelCostData[index].record.map(
                (i) => {
                    return i.D7DW;
                }
            );

            // mapping all months' gas fuel cost data into an array.
            D7DU = data.fuelCostData[index].record.map(
                (i) => {
                    return i.D7DU;
                }
            );

            // mapping all months' electricity fuel cost data into an array.
            D7DT = data.fuelCostData[index].record.map(
                (i) => {
                    return i.D7DT;
                }
            );

            // mapping all months' liquid fuel cost data into an array.
            D7DV = data.fuelCostData[index].record.map(
                (i) => {
                    return i.D7DV;
                }
            );
        }


        // calling drawCharts() function and passing array length (i.e 12) in the parameter.

        arrayLength = data.fuelCostData[0].record.length;

        drawCharts(arrayLength)
    });

}

// this code blocks loads google charts
google.charts.load('current', { 'packages': ['corechart'] });

// this code calls the getValue() function on web-page load.
google.charts.setOnLoadCallback(() => { getValue() });
google.charts.setOnLoadCallback(() => { ForcastChart() });

// the drawCharts() function that will render the charts
function drawCharts(recordLength) {

    // creating Data Table for history charts using methods provided by Google Charts
    var historyChartsData = new google.visualization.DataTable(),

        // using column charts (aka vertical bar chart).

        // for history charts.
        historyCharts = new google.visualization.ColumnChart(document.getElementById('history_charts')),

        // variables which are going to be reassigned later.
        historyChartsOptions;

    /* In-case the user tries to scroll behind 1996 or beyond 2022
    then this condition will render a chart with an error of no data available */
    if (yearInputField.value < 1996 || yearInputField.value > 2022) {

        // this block of code will hide all the filters if there is no data available
        for (let index = 0; index < filters.length; index++) {
            filters[index].style.display = "none";
        }

        // this is what to render if there is no data
        historyChartsData.addColumn({ label: 'months', type: 'string' });
        historyChartsData.addColumn({ label: 'cost', type: 'number' });
        historyChartsData.addColumn('number', 'Solid Fuels');
        historyChartsData.addColumn({ role: 'annotation', type: 'string' });
        historyChartsData.addColumn('number', 'Gas');

        historyChartsData.addRows([['', 0, 0, 'No Data Available', 0]]);

        // Chart options
        historyChartsOptions = {
            title: 'Fuel Cost History',
            annotations: {
                stem: {
                    color: 'transparent',
                    length: 150
                },
                textStyle: {
                    color: 'red',
                    fontSize: 32
                }
            },
            vAxis: {
                title: 'Cost',
                minValue: 0,
                maxValue: 300,
                format: 'decimal'
            },
            hAxis: {
                title: 'Months'
            },
            legend: { position: 'none' }
        };

        // calling the draw function and passing chart data and chart options in parameters.
        historyCharts.draw(historyChartsData, historyChartsOptions);

    } else {

        // this block of code will show all the fuel filters if there data available.
        for (let index = 0; index < filters.length; index++) {
            filters[index].style.display = "block";
        }

        // setting history charts columns.
        historyChartsData.addColumn('string', 'Months');
        historyChartsData.addColumn('number', 'Solid (D7DW)');
        historyChartsData.addColumn('number', 'Gas (D7DU)');
        historyChartsData.addColumn('number', 'Electricity (D7DT)');
        historyChartsData.addColumn('number', 'Liquid (D7DV)');

        // iterating fuel cost data using for-loop into DataTable rows.
        for (i = 0; i <= recordLength; i++) {
            historyChartsData.addRows([[months[i], D7DW[i], D7DU[i], D7DT[i], D7DV[i]]]);
        }

        // console.log(historyChartsData)

        // History charts options:
        historyChartsOptions = {
            legend: {
                position: "bottom",
                alignment: "center"
            },
            title: 'Fuel Cost History',
            vAxis: {
                title: 'Cost',
                format: 'decimal'
            },
            hAxis: {
                title: 'Months',
                slantedText: true
            },
            height: 600,
            colors: colors
        };
    }

    // calling the retainChartColors() function:
    retainChartColors(historyChartsData);

    // draw method is provided by google charts library to draw the chart:
    historyCharts.draw(historyChartsData, historyChartsOptions);

    // calling the filterChart() function:
    filterChart(historyChartsData, fuelFilters, historyChartsOptions, historyCharts)

}

// an arrow function for forcast data logic:
const forcastChartLogic = () => {

    // calling the fetchData() function we declared above.
    fetchData().then(data => {

        // Storing data of year 2021 & 2022 to merge them into one array.
        // because year 2022 has fewer data than 12 months.
        dataOf22 = data.fuelCostData[26].record;
        dataOf21 = data.fuelCostData[25].record;

        // the silce method will only get us last 12 months data.
        twelveMonthsData = (dataOf21.concat(dataOf22)).slice(-12);

        // Calculations for forcasting fuel cast for next 12 months

        /*
        
        using straight line method for forcasting.

        what is straight line forcasting method?
         
        Forecasting future revenue involves multiplying a company's previous year's revenue by its growth rate.
        For example, if the previous year's growth rate was 12 percent, straight-line forecasting assumes it'll continue to grow by 12 percent next year.

        */

        // Determinig growth rate for each fuel type:

        /* to determine growth rate, substracting the first month fuel cost from last month fuel cost of each fuel
        and then dividing the total by total numbers of month i.e 12 */

        // growth rate of solid fuel.

        var growthRateOfD7DW = (twelveMonthsData[11].D7DW - twelveMonthsData[0].D7DW) / 12,

            // growth rate of gas fuel.
            growthRateOfD7DU = (twelveMonthsData[11].D7DU - twelveMonthsData[0].D7DU) / 12,

            // growth rate of electricity fuel.
            growthRateOfD7DT = (twelveMonthsData[11].D7DT - twelveMonthsData[0].D7DT) / 12,

            // growth rate of liquid fuel.
            growthRateOfD7DV = (twelveMonthsData[11].D7DV - twelveMonthsData[0].D7DV) / 12;


        // rounding off growthRates to 1 decimal point
        function roundOff(value) {
            var multiplier = Math.pow(10, 1);
            return Math.round(value * multiplier) / multiplier;
        }

        // mapping forcast data in an array
        forcastData = twelveMonthsData.map(
            // passing to parameters in map function, here i stores every value as an object and j is just a iteration counter variable
            (i, j) => {
                return {
                    // because here j starts form 0 and ends at 11 so adding 1 to j to get right months names
                    // the forcast months names will be as month 1, month 2, month 3 and so on...
                    month: `month ${j + 1}`,

                    // mapping next 12 months' solid fuel cost data into an array.
                    D7DW: roundOff(parseFloat(twelveMonthsData[11].D7DW) + (`${j + 1}` * growthRateOfD7DW)),

                    // mapping next 12 months' gas fuel cost data into an array.
                    D7DU: roundOff(parseFloat(twelveMonthsData[11].D7DU) + (`${j + 1}` * growthRateOfD7DU)),

                    // mapping next 12 months' electricity fuel cost data into an array.
                    D7DT: roundOff(parseFloat(twelveMonthsData[11].D7DT) + (`${j + 1}` * growthRateOfD7DT)),

                    // mapping next 12 months' liquid fuel cost data into an array.
                    D7DV: roundOff(parseFloat(twelveMonthsData[11].D7DV) + (`${j + 1}` * growthRateOfD7DV)),
                }
            });

        // now, separating forcast months names and mapping them into an array.
        forcastMonthNames = forcastData.map(
            (i) => {
                return i.month;
            }
        );

        // separating forcast solid fuel cost and mapping them into an array.
        forcastD7DWCost = forcastData.map(
            (i) => {
                return i.D7DW;
            }
        );

        // separating forcast gas fuel cost and mapping them into an array.
        forcastD7DUCost = forcastData.map(
            (i) => {
                return i.D7DU;
            }
        );

        // separating forcast electricity fuel cost and mapping them into an array.
        forcastD7DTCost = forcastData.map(
            (i) => {
                return i.D7DT;
            }
        );

        // separating forcast liquid fuel cost and mapping them into an array.
        forcastD7DVCost = forcastData.map(
            (i) => {
                return i.D7DV;
            }
        );

        // calling drawCharts() function and passing array length (i.e 12) in the parameter.
        recordLength = data.fuelCostData[0].record.length;

    });
}

// calling the forcastChartLofic()
forcastChartLogic();

function ForcastChart() {

    // for forcast chart:
    var forcastChart = new google.visualization.ColumnChart(document.getElementById('forcast_chart')),

        forcastChartData = new google.visualization.DataTable(), // getting ready forcast chart Data Table: 

        forcastChartOptions;

    forcastChartData.addColumn('string', 'Months');
    forcastChartData.addColumn('number', 'Solid Fuels');
    forcastChartData.addColumn('number', 'Gas');
    forcastChartData.addColumn('number', 'Electricity');
    forcastChartData.addColumn('number', 'Liquid Fuels');

    // iterating forcast chart data:
    for (i = 0; i <= recordLength; i++) {
        forcastChartData.addRows([[forcastMonthNames[i], forcastD7DWCost[i], forcastD7DUCost[i], forcastD7DTCost[i], forcastD7DVCost[i]]]);
    }

    // forcast chart options:
    forcastChartOptions = {
        legend: {
            position: "bottom",
            alignment: "center"
        },
        title: 'Forcast Fuel Cost',
        vAxis: {
            title: 'Cost',
            minValue: 0,
            format: 'decimal'
        },
        hAxis: {
            title: 'Months',
            slantedText: true
        },
        height: 600,
        colors: colors
    };

    // calling the retainChartColors() function:
    retainChartColors(forcastChartData);

    // draw method is provided by google charts library to draw the chart:
    forcastChart.draw(forcastChartData, forcastChartOptions);

    // calling the filterChart() function:
    filterChart(forcastChartData, forcastFuelFilters, forcastChartOptions, forcastChart)
}

// this arrow function saves code from being redent. 
const filterChart = (chartData, chartFuelFilters, chartOptions, chart) => {

    // this function will filter the forcast chart:
    function drawFilteredChart() {

        var chartColors = [], // this array is to store color of bars.
            chartColumns = [0], // this variable is just to store an index.
            chartView = new google.visualization.DataView(chartData); // DataView is a method provided by google charts for visualization.

        // iterating fuel filter values:
        Array.from(chartFuelFilters).forEach((chartFuelFilters) => {

            // this variable is to store values of checked input field
            var seriesColumn = parseInt(chartFuelFilters.value);

            // this condition is to check if the input field is checked or unchecked.
            if (chartFuelFilters.checked) {

                // this code block pushes the checked input fields values only
                // and hides the rest fuel types.
                chartColumns.push(seriesColumn);

                // this code block retains respective colors for each bar:
                chartColors.push(chartData.getColumnProperty(seriesColumn, 'color'));
            }
        });


        // this code block rerenders the filtered chart:
        chartView.setColumns(chartColumns);
        chartOptions.colors = chartColors;
        chart.draw(chartView, chartOptions);
    }

    // filtering fuel types on change using for-loop:
    for (let index = 0; index < chartFuelFilters.length; index++) {
        chartFuelFilters[index].onchange = () => {
            drawFilteredChart();
        }
    }
}

/* 

⠀⠀⠀⠀⠀⠀⣀⣤⣶⣶⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⣾⠛⠁⢰⣧⡈⢻⣦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢸⣇⣼⡀⠻⠟⠁⠀⢻⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢀⡞⣹⠙⣧⡀⠀⠀⡀⢸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⣀⡴⠋⠀⣀⣴⣿⡷⠴⠞⠁⢸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢾⣁⣀⡤⠾⠛⠁⣸⠀⠀⠀⠀⢸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠈⠁⠀⠀⠀⠀⢠⡟⠀⠀⠀⠀⣾⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣠⣿⠁⠀⠀⠀⢀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⣰⡿⠁⠀⠀⠀⠀⠀⢿⣶⠶⠿⠟⠿⠿⣶⣦⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⣼⠟⠀⠀⠀⠀⠀⠀⠀⠈⠻⣄⠀⠀⠀⠀⠀⠈⠙⠛⠿⠶⣶⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⣸⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⢀⣀⣠⣤⣤⣤⣤⣤⣀⠀⠉⠙⠳⢦⣄⡀⣀⣤⣀⣀⡄⠀
⠀⢀⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠁⠀⠀⠀⠀⠀⠈⠉⠻⢶⣀⠀⠀⠈⠉⢁⠈⠏⣿⣁⠀
⠀⢸⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣦⣀⣀⡴⠁⠀⠀⢙⣿⡾
⠀⠘⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠀⠀⣀⣠⡾⠟⠃
⠀⠀⠹⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⡔⢊⣵⠞⠋⠁⠀⠀⠀
⠀⠀⠀⠙⠿⣦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡠⠚⠉⠀⣠⣴⠟⠁⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠈⠙⠳⠶⣤⣤⣄⣀⠀⠀⠀⠀⠀⠀⠀⢤⣤⣴⠊⣁⣤⠶⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠙⠛⡷⢶⡶⠶⠤⠔⢺⠃⡟⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⠀⢰⡇⠀⡇⠀⠀⠀⢸⠀⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠈⣹⣤⣭⠿⠟⣃⣾⠋⠀⠀⢠⡟⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠈⠉⠙⠛⢋⣿⣙⣶⣾⡿⢷⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠛⠛⠻⠧⠶⠾⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀

This duck is happy that the work is finally over...

*/