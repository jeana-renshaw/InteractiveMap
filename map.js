// Initialize the map
var map = L.map('map').setView([37.8, -96], 4);

// Load map tiles from OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Fetch the state data
fetch('states.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(state => {
      // Draw a shaded rectangle for the state
      var bounds = L.rectangle(state.coordinates, {
        color: state.color,
        weight: 1,
        fillOpacity: 0.6
      }).addTo(map);

      // Add tooltip on hover
      bounds.bindTooltip(state.state + ": " + state.status);

      // Add click event for drill-down details
      bounds.on('click', function() {
        alert("State: " + state.state + "\nStatus: " + state.status);
      });
    });
  })
  .catch(error => console.error("Error loading state data:", error));
