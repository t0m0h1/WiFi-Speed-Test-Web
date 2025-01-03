document.getElementById('start-test').addEventListener('click', () => {
    testWiFiSpeed();
  });
  
  async function testWiFiSpeed() {
    const speedElement = document.getElementById('speed');
    speedElement.textContent = "Testing...";
  
    try {
      const testURL = "https://api.example.com/speed-test"; // Replace with a valid API endpoint for speed testing.
      
      // Check if CORS is an issue by using a proxy or handling headers.
      const response = await fetch(testURL, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          // Add any additional headers required by the API.
        }
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      
      // Process the speed test data
      const downloadSpeed = data.downloadSpeed;
      const uploadSpeed = data.uploadSpeed;
  
      speedElement.textContent = `Download Speed: ${downloadSpeed} Mbps, Upload Speed: ${uploadSpeed} Mbps`;
    } catch (error) {
      // Handle possible errors, including CORS issues or network failure
      if (error.message.includes("CORS")) {
        speedElement.textContent = "CORS error: Unable to fetch speed data from the server.";
      } else {
        speedElement.textContent = `Error: ${error.message}`;
      }
    }
  }
  