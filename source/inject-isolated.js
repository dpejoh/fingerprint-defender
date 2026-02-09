// Isolated world script to sync settings to sessionStorage

chrome.storage.local.get({
  canvas: true,
  font: true,
  audioContext: true,
  webgl: true,
  webgpu: true,
  clientRects: true
}, (settings) => {
  try {
    sessionStorage.setItem('fpDefenderSettings', JSON.stringify(settings));
  } catch (e) {
    // sessionStorage might not be available
  }
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local') {
    chrome.storage.local.get({
      canvas: true,
      font: true,
      audioContext: true,
      webgl: true,
      webgpu: true,
      clientRects: true
    }, (settings) => {
      try {
        sessionStorage.setItem('fpDefenderSettings', JSON.stringify(settings));
      } catch (e) {
        // sessionStorage might not be available
      }
    });
  }
});
