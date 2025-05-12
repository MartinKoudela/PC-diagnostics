function diagnostics() {
    const memorySpec = document.getElementById("memory");
    if ('deviceMemory' in navigator) {
        memorySpec.innerHTML = `Paměť: ${navigator.deviceMemory} GB`;
    } else {
        memorySpec.innerHTML = "Zkuste jiný vyhledávač";
    }
}
document.getElementById('startButton').addEventListener('click', diagnostics)
