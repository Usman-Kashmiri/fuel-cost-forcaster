// variables to get dom elements

var yearInputField = document.getElementById('yearInput'),
    historical_mode = document.getElementById('historical_mode'),
    forcast_mode = document.getElementById('forcast_mode'),
    historical_mode_btn = document.getElementById('historical_mode_btn'),
    forcast_mode_btn = document.getElementById('forcast_mode_btn'),
    fuelFilters = document.getElementsByClassName('fuelFilters'),
    forcastFuelFilters = document.getElementsByClassName('forcastFuelFilters');

// Functions for switching between modes


historical_mode_btn.onclick = () => {
    historical_mode.style.display = "block";
    forcast_mode.style.display = "none";
}

forcast_mode_btn.onclick = () => {
    historical_mode.style.display = "none";
    forcast_mode.style.display = "block";
    forcast_mode.style.position = "relative";
    forcast_mode.style.visibility = "visible";
}

async function fetchData() {
    var index = 1;
    const url = `assets/js/fuelCostData.json`;
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data.fuelCostData[index])
    return data;
}

// Global Scopes: variables that are initialized outside of a function are global variables or scopes

var months,
    D7DW,
    D7DU,
    D7DT,
    D7DV,
    forcastData,
    forcastMonthNames,
    forcastD7DWCost,
    forcastD7DUCost,
    forcastD7DTCost,
    forcastD7DVCost;

function getValue() {

    fetchData().then(data => {
        var index;

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

        const dataOf22 = data.fuelCostData[26].record;
        const dataOf21 = data.fuelCostData[25].record;
        const twelveMonthsData = (dataOf21.concat(dataOf22)).slice(-12);

        const years = data.fuelCostData.map(
            function (index) {
                return index.year;
            }
        );

        if (index == 26) {
            months = twelveMonthsData.map(
                function (index) {
                    return index.month;
                }
            );

            D7DW = twelveMonthsData.map(
                function (index) {
                    return index.D7DW;
                }
            );

            D7DU = twelveMonthsData.map(
                function (index) {
                    return index.D7DU;
                }
            );

            D7DT = twelveMonthsData.map(
                function (index) {
                    return index.D7DT;
                }
            );

            D7DV = twelveMonthsData.map(
                function (index) {
                    return index.D7DV;
                }
            );

        } else {
            months = data.fuelCostData[index].record.map(
                function (index) {
                    return index.month;
                }
            );
            D7DW = data.fuelCostData[index].record.map(
                function (index) {
                    return index.D7DW;
                }
            );
            D7DU = data.fuelCostData[index].record.map(
                function (index) {
                    return index.D7DU;
                }
            );
            D7DT = data.fuelCostData[index].record.map(
                function (index) {
                    return index.D7DT;
                }
            );
            D7DV = data.fuelCostData[index].record.map(
                function (index) {
                    return index.D7DV;
                }
            );
        }

        // For forcasting

        // Growth rate of for each fuel type:

        var growthRateOfD7DW = (twelveMonthsData[11].D7DW - twelveMonthsData[0].D7DW) / 12;
        var growthRateOfD7DU = (twelveMonthsData[11].D7DU - twelveMonthsData[0].D7DU) / 12;
        var growthRateOfD7DT = (twelveMonthsData[11].D7DT - twelveMonthsData[0].D7DT) / 12;
        var growthRateOfD7DV = (twelveMonthsData[11].D7DV - twelveMonthsData[0].D7DV) / 12;

        // rounding off growthRate to 1 decimal point

        function roundOff(value) {
            var multiplier = Math.pow(10, 1);
            return Math.round(value * multiplier) / multiplier;
        }


        forcastData = twelveMonthsData.map(
            (i, j) => {
                return {
                    month: `month ${j + 1}`,
                    D7DW: roundOff(parseFloat(twelveMonthsData[11].D7DW) + (`${j + 1}` * growthRateOfD7DW)),
                    D7DU: roundOff(parseFloat(twelveMonthsData[11].D7DU) + (`${j + 1}` * growthRateOfD7DU)),
                    D7DT: roundOff(parseFloat(twelveMonthsData[11].D7DT) + (`${j + 1}` * growthRateOfD7DT)),
                    D7DV: roundOff(parseFloat(twelveMonthsData[11].D7DV) + (`${j + 1}` * growthRateOfD7DV)),
                }
            });

        forcastMonthNames = forcastData.map(
            (i) => {
                return i.month;
            }
        );

        forcastD7DWCost = forcastData.map(
            (i) => {
                return i.D7DW;
            }
        );

        forcastD7DUCost = forcastData.map(
            (i) => {
                return i.D7DU;
            }
        );

        forcastD7DTCost = forcastData.map(
            (i) => {
                return i.D7DT;
            }
        );

        forcastD7DVCost = forcastData.map(
            (i) => {
                return i.D7DV;
            }
        );

        drawCharts(data.fuelCostData[0].record)
    });

}

google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(() => { getValue() });

function drawCharts(record) {

    var historyChartsData = new google.visualization.DataTable();

    var historyCharts = new google.visualization.ColumnChart(document.getElementById('history_charts'));

    var forcastChart = new google.visualization.ColumnChart(document.getElementById('forcast_chart'));

    var historyChartsOptions, forcastChartOptions

    if (yearInputField.value < 1996 || yearInputField.value > 2022) {

        document.getElementById('historyChartsFilters').style.display = "none"

        historyChartsData.addColumn({ label: 'months', type: 'string' });
        historyChartsData.addColumn({ label: 'cost', type: 'number' });
        historyChartsData.addColumn('number', 'Solid Fuels');
        historyChartsData.addColumn({ role: 'annotation', type: 'string' });
        historyChartsData.addColumn('number', 'Gas');

        historyChartsData.addRows([['', 0, 0, 'No Data Available', 0]]);

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

        historyCharts.draw(historyChartsData, historyChartsOptions);

    } else {

        document.getElementById('historyChartsFilters').style.display = "block"

        historyChartsData.addColumn('string', 'Months');
        historyChartsData.addColumn('number', 'Solid Fuels');
        historyChartsData.addColumn('number', 'Gas');
        historyChartsData.addColumn('number', 'Electricity');
        historyChartsData.addColumn('number', 'Liquid Fuels');

        for (i = 0; i <= record.length; i++) {
            historyChartsData.addRows([[months[i], D7DW[i], D7DU[i], D7DT[i], D7DV[i]]]);
        }


        historyChartsOptions = {
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

    var colors = ['#41DA96', '#E6AC2B', '#71EB92', '#FAAFF9'];
    colors.forEach(function (color, index) {
        historyChartsData.setColumnProperty(index + 1, 'color', color);
    });

    function drawHistoryCharts() {
        var chartColors = [];
        var chartColumns = [0];
        var historyChartsView = new google.visualization.DataView(historyChartsData);
        Array.from(fuelFilters).forEach((fuelFilters) => {
            var seriesColumn = parseInt(fuelFilters.value);
            if (fuelFilters.checked) {
                chartColumns.push(seriesColumn);
                chartColors.push(historyChartsData.getColumnProperty(seriesColumn, 'color'));
                //console.log(seriesColumn);
            }
        });

        historyChartsView.setColumns(chartColumns);
        historyChartsOptions.colors = chartColors;
        historyCharts.draw(historyChartsView, historyChartsOptions);
    }

    for (let index = 0; index < fuelFilters.length; index++) {
        fuelFilters[index].onchange = () => {
            drawHistoryCharts();
        }
    }


    drawHistoryCharts();


    // function forcastChart(months, D7DW, D7DU, D7DT, D7DV) {

    var forcastChartData = new google.visualization.DataTable();
    forcastChartData.addColumn('string', 'Months');
    forcastChartData.addColumn('number', 'Solid Fuels');
    forcastChartData.addColumn('number', 'Gas');
    forcastChartData.addColumn('number', 'Electricity');
    forcastChartData.addColumn('number', 'Liquid Fuels');

    for (i = 0; i <= record.length; i++) {
        forcastChartData.addRows([[forcastMonthNames[i], forcastD7DWCost[i], forcastD7DUCost[i], forcastD7DTCost[i], forcastD7DVCost[i]]]);
    }


    forcastChartOptions = {
        title: 'Fuel Cost History',
        annotations: {
            stem: {
                color: 'transparent',
                length: 180
            },
            textStyle: {
                color: 'red',
                fontSize: 32
            }
        },
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

    // forcastChart.draw(forcastChartData, forcastChartOptions)

    function drawForcastChart() {
        var chartColors = [];
        var chartColumns = [0];
        var forcastChartView = new google.visualization.DataView(forcastChartData);
        Array.from(forcastFuelFilters).forEach((forcastFuelFilters) => {
            var seriesColumn = parseInt(forcastFuelFilters.value);
            if (forcastFuelFilters.checked) {
                chartColumns.push(seriesColumn);
                chartColors.push(forcastChartData.getColumnProperty(seriesColumn, 'color'));
                //console.log(seriesColumn);
            }
        });

        forcastChartView.setColumns(chartColumns);
        forcastChartOptions.colors = chartColors;
        forcastChart.draw(forcastChartView, historyChartsOptions);
    }

    for (let index = 0; index < forcastFuelFilters.length; index++) {
        forcastFuelFilters[index].onchange = () => {
            drawForcastChart();
        }
    }

    drawForcastChart();
}