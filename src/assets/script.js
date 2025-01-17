document.getElementById("startTest").addEventListener("click", async function () {
    document.getElementById("downloadSpeed").textContent = "Testing...";
    document.getElementById("uploadSpeed").textContent = "Testing...";
    document.getElementById("pingValue").textContent = "Testing...";

    setNeedlePosition("downloadNeedle", 0);
    setNeedlePosition("uploadNeedle", 0);
    setNeedlePosition("pingNeedle", 0);

    const duration = 5; // Test duration in seconds
    const downloadSpeed = await testSpeed(testDownloadSpeed, duration);
    const uploadSpeed = await testSpeed(testUploadSpeed, duration);
    const pingTime = await testPing();

    // Display results in Mbps for speed and ms for ping
    document.getElementById("downloadSpeed").textContent = `${downloadSpeed.toFixed(2)} Mbps`;
    document.getElementById("uploadSpeed").textContent = `${uploadSpeed.toFixed(2)} Mbps`;
    document.getElementById("pingValue").textContent = `${pingTime.toFixed(2)} ms`;

    // Update needles after the test is complete
    setNeedlePosition("downloadNeedle", downloadSpeed);
    setNeedlePosition("uploadNeedle", uploadSpeed);
    setNeedlePosition("pingNeedle", pingTime);
});

function setNeedlePosition(needleId, value) {
    const maxValue = needleId === "pingNeedle" ? 300 : 1000; // Ping max value can be higher than speed
    const maxAngle = 180; // Maximum angle for rotation
    const angle = Math.min((value / maxValue) * maxAngle, maxAngle); // Cap the angle at maxAngle

    const needle = document.getElementById(needleId);
    needle.style.transition = "transform 0.5s ease-out"; // Smooth transition
    needle.style.transform = `rotate(${angle - 90}deg)`; // Adjust by -90 degrees to start from the center
}

async function testSpeed(speedTestFunction, durationInSeconds) {
    const startTime = performance.now();
    let totalSpeed = 0;
    let testCount = 0;

    while ((performance.now() - startTime) / 1000 < durationInSeconds) {
        const speed = await speedTestFunction();
        totalSpeed += speed;
        testCount++;
    }

    return totalSpeed / testCount; // Return the average speed
}

async function testDownloadSpeed() {
    const fileSizeInBytes = 5000000; // 5MB file
    const startTime = performance.now();
    await fetch("http://localhost:3000/5mb-test-file");
    const endTime = performance.now();

    const durationInSeconds = (endTime - startTime) / 1000;
    const fileSizeInBits = fileSizeInBytes * 8; // Convert to bits
    return (fileSizeInBits / durationInSeconds) / (1024 * 1024); // Convert to Mbps (Megabits per second)
}

async function testUploadSpeed() {
    const data = new Blob([new ArrayBuffer(5000000)]); // 5MB blob
    const startTime = performance.now();
    await fetch("http://localhost:3000/upload-endpoint", { method: "POST", body: data });
    const endTime = performance.now();

    const durationInSeconds = (endTime - startTime) / 1000;
    const fileSizeInBits = data.size * 8; // Convert to bits
    return (fileSizeInBits / durationInSeconds) / (1024 * 1024); // Convert to Mbps (Megabits per second)
}

async function testPing() {
    const startTime = performance.now();
    try {
        await fetch("http://localhost:3000/ping");
    } catch (error) {
        console.error("Ping request failed:", error);
    }
    const endTime = performance.now();
    return endTime - startTime; // Return the round-trip time in milliseconds (ms)
}
