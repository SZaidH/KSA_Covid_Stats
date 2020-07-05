let xlabels;
let cases;
let deaths;
let recoveries;

//Fetching data from server
async function getChartData() {
  const response = await fetch('/chart');
  const data = await response.json();
  console.log('Chart Data Received!');

  //Assigning the values obtained to variables
  xlabels = data.map(function (data) {
    //Changing the date format
    let date = new Date(data.updated);
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let yy = date.getFullYear().toString().substr(-2);
    date = dd + '/' + mm + '/' + yy;
    return date;
  });

  cases = data.map(function (data) {
    return data.todayCases;
  });

  deaths = data.map(function (data) {
    return data.todayDeaths;
  });

  recoveries = data.map(function (data) {
    return data.todayRecovered;
  });
}

//Designing the chart
async function drawChart() {
  let ctx = document.getElementById('myChart');
  await getChartData();
  Chart.defaults.global.defaultFontColor = '#FFFFFF';
  Chart.defaults.global.defaultFontFamily = 'Montserrat';
  let myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: xlabels,
      datasets: [{
        data: cases,
        label: "New Cases",
        borderColor: "#FFC107",
        borderWidth: 4,
        fill: true,
        pointHitRadius: 20
      }, {
        data: deaths,
        label: "New Deaths",
        borderColor: "#DC3545",
        borderWidth: 4,
        fill: true,
        pointHitRadius: 20
      }, {
        data: recoveries,
        label: "New Recoveries",
        borderColor: "#28a745",
        borderWidth: 4,
        fill: true,
        pointHitRadius: 20
      }
      ]
    },
    options: {
      maintainAspectRatio: false,
      title: {
        display: true,
        text: ['DAILY STATS OVER TIME', '(Toggle the Legend below to enable/disable statistics)'],
        fontSize: 20,
        fontStyle: 'Normal'
      },
      legend: {
        labels: {
          fontSize: 15
        }
      },
      scales: {
        xAxes: [{
          ticks: {
            fontSize: 15,
            fontStyle: 'Normal'
          }
        }],
        yAxes: [{
          ticks: {
            fontSize: 15,
            fontStyle: 'Normal'
          }
        }]
      }
    }
  });
};
drawChart();

