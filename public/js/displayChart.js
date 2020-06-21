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
    return data.updated.split('T')[0];
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
  let myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: xlabels,
      datasets: [{
        data: cases,
        label: "# of Cases",
        borderColor: "#FFC107",
        fill: true
      }, {
        data: deaths,
        label: "# of Deaths",
        borderColor: "#DC3545",
        fill: true
      }, {
        data: recoveries,
        label: "# of Recoveries",
        borderColor: "#028A74",
        fill: true
      }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Visual Statistics'
      }
    }
  });
};
drawChart();

