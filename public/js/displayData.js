//Fetching data from server
async function getData() {
  const response = await fetch('/api');
  const data = await response.json();
  console.log('API data received!');

  //Assigning response data to variables
  const cases = data[0].cases;
  const todayCases = data[0].todayCases;
  const deaths = data[0].deaths;
  const todayDeaths = data[0].todayDeaths;
  const recovered = data[0].recovered;
  const todayRecovered = data[0].todayRecovered;
  const active = data[0].active;
  const critical = data[0].critical;
  const tests = data[0].tests;
  const population = data[0].population;

  //Date today
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();
  today = dd + '-' + mm + '-' + yyyy;

  //Assigning the Data to elements
  document.getElementById('population').textContent = population.toLocaleString();
  document.getElementById('totalCases').textContent = cases.toLocaleString();
  document.getElementById('tests').textContent = tests.toLocaleString() + ` TESTS`;
  document.getElementById('totalDeaths').textContent = deaths.toLocaleString();
  document.getElementById('fatalityRate').textContent = ((deaths / cases) * 100).toFixed(2) + '% FATALITY RATE';
  document.getElementById('totalRecoveries').textContent = recovered.toLocaleString();
  document.getElementById('recoveryRate').textContent = ((recovered / cases) * 100).toFixed(2) + '% RECOVERY RATE';
  document.getElementById('critical').textContent = critical.toLocaleString();
  document.getElementById('activeCases').textContent = active.toLocaleString() + ` ACTIVE CASES`
  document.getElementById('cases').textContent = todayCases.toLocaleString();
  document.getElementById('deaths').textContent = todayDeaths.toLocaleString();
  document.getElementById('recoveries').textContent = todayRecovered.toLocaleString();
  document.getElementById('date').textContent = today;
  document.getElementById('date2').textContent = today;
}

//Executing the Server
getData();