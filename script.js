async function testWiFiSpeed() {
    const testFileUrl = "https://speed.hetzner.de/100MB.bin";
    const startTime = performance.now();
    const fileSizeBytes = 100 * 1024 * 1024;
  
    try {
      const response = await fetch(testFileUrl, { method: "GET", cache: "no-store" });
      const reader = response.body.getReader();
      let receivedBytes = 0;
  
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        receivedBytes += value.length;
      }
  
      const endTime = performance.now();
      const durationSeconds = (endTime - startTime) / 1000;
      const speedMbps = ((receivedBytes * 8) / (1024 * 1024)) / durationSeconds;
  
      document.getElementById("speed").innerText = `WiFi Speed: ${speedMbps.toFixed(2)} Mbps`;
    } catch (error) {
      document.getElementById("speed").innerText = "Error testing WiFi speed: " + error.message;
    }
  }
  
  document.getElementById("start-test").addEventListener("click", () => {
    document.getElementById("speed").innerText = "Testing... Please wait...";
    testWiFiSpeed();
  });
  