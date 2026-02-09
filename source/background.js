// Background service worker for Fingerprint Defender

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    canvas: true,
    font: false,
    audioContext: true,
    webgl: true,
    webgpu: false,
    clientRects: false,
    currentProfile: 'balanced'
  });
});
