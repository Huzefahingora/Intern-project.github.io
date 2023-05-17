// script.js
document.getElementById("csvFileInput").addEventListener("change", handleFileSelect);

function handleFileSelect(evt) {
  const file = evt.target.files[0];
  const reader = new FileReader();
  reader.onload = (event) => {
    const csvData = event.target.result;
    const data = parseCSV(csvData);
    generateGraphs(data);
  };
  reader.readAsText(file);
}

function parseCSV(csvString) {
  const lines = csvString.split('\n');
  const headers = lines[0].split('\t');
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split('\t');
    if (values.length === headers.length) {
      const entry = {};
      for (let j = 0; j < headers.length; j++) {
        entry[headers[j]] = values[j];
      }
      data.push(entry);
    }
  }

  return data;
}

function generateGraphs(data) {
  const labels = data.map(entry => entry.time);
  const rpmData = data.map(entry => parseInt(entry.RPM));
  const rotationsData = data.map(entry => parseInt(entry.Total_rotations));
  const onTimeData = data.map(entry => parseInt(entry.On_time));
  const offTimeData = data.map(entry => parseInt(entry.Off_time));

  // RPM Chart
  const rpmCtx = document.getElementById("rpmChart").getContext("2d");
  const rpmChart = new Chart(rpmCtx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "RPM",
          data: rpmData,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: "Time",
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: "RPM",
          },
        },
      },
    },
  });

  // Rotations Chart
  const rotationsCtx = document.getElementById("rotationsChart").getContext("2d");
  const rotationsChart = new Chart(rotationsCtx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Total Rotations",
          data: rotationsData,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: "Time",
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: "Total Rotations",
          },
        },
      },
    },
  });

  // On-Time vs Off-Time Chart
  const timeCtx = document.getElementById("timeChart").getContext("2d");
  const timeChart = new Chart(timeCtx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "On-Time",
          data: onTimeData,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "Off-Time",
          data: offTimeData,
          backgroundColor: "rgba(255, 206, 86, 0.2)",
          borderColor: "rgba(255, 206, 86, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: "Time",
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: "Time (ms)",
          },
        },
      },
    },
  });
}
