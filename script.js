document.addEventListener("DOMContentLoaded", diagnostics)

function diagnostics() {
    const memorySpec = document.getElementById("memory");
    const cpuSpec = document.getElementById("cpu");
    const gpuSpec = document.getElementById("gpu");
    const connectionSpec = document.getElementById("connection");
    const agentSpec = document.getElementById("user")
    const platformSpec = document.getElementById("platform")



    // Memory
    if ('deviceMemory' in navigator) {
        memorySpec.innerHTML = `Paměť: ${navigator.deviceMemory} GB`;
    } else {
        memorySpec.innerHTML = "Paměť: Nedostupná";
    }

    // CPU
    if ('hardwareConcurrency' in navigator) {
        cpuSpec.innerHTML = `CPU: ${navigator.hardwareConcurrency} jader`;
    } else {
        cpuSpec.innerHTML = "CPU: Nedostupné";
    }

    // GPU through WebGL
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        const gpuName = debugInfo
            ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
            : "GPU: Nelze detekovat přes WebGL";
        gpuSpec.innerHTML = `GPU: ${gpuName}`;
    } else {
        gpuSpec.innerHTML = "GPU: WebGL není podporováno";
    }

    // Battery (Charging / Not charging)
    navigator.getBattery().then((battery) => {
        const batteryLevel = Math.round(battery.level * 100);
        const chargingText = battery.charging ? " (Nabíjí se)" : " (Nenabíjí se)";
        document.getElementById('battery').innerHTML = `Baterie: ${batteryLevel}%${chargingText}`;

        // Connection speed
        if ('connection' in navigator) {
            const type = navigator.connection.effectiveType;
            const downlink = navigator.connection.downlink;
            connectionSpec.innerHTML = `Připojení: ${type}, Rychlost: ${downlink} Mb/s`;
        } else {
            connectionSpec.innerHTML = "Připojení: Nedostupné";
        }

        // UserAgent
        if ('userAgent' in navigator) {
            agentSpec.innerHTML = `Agent: ${navigator.userAgent}`;
        } else {
            agentSpec.innerHTML = "Agent: Nedostupné";
        }

        // UserAgent
        if ('platform' in navigator) {
            platformSpec.innerHTML = `Platforma: ${navigator.platform}`;
        } else {
            platformSpec.innerHTML = "Platforma: Nedostupné";
        }
    });
}

