// Popup script with auto-reload, profiles, and action buttons

// Profile presets
const profiles = {
  maximum: {
    canvas: true,
    font: true,
    audioContext: true,
    webgl: true,
    webgpu: true,
    clientRects: true
  },
  balanced: {
    canvas: true,
    font: false,
    audioContext: true,
    webgl: true,
    webgpu: false,
    clientRects: false
  },
  compatibility: {
    canvas: false,
    font: false,
    audioContext: false,
    webgl: false,
    webgpu: false,
    clientRects: false
  }
};

// Load current settings and determine active profile
chrome.storage.local.get({
  canvas: true,
  font: false,
  audioContext: true,
  webgl: true,
  webgpu: false,
  clientRects: false,
  currentProfile: 'balanced'
}, (settings) => {
  document.getElementById('canvas').checked = settings.canvas;
  document.getElementById('font').checked = settings.font;
  document.getElementById('audioContext').checked = settings.audioContext;
  document.getElementById('webgl').checked = settings.webgl;
  document.getElementById('webgpu').checked = settings.webgpu;
  document.getElementById('clientRects').checked = settings.clientRects;
  
  // Update active profile button
  updateActiveProfile(settings.currentProfile || 'balanced');
});

function updateActiveProfile(profileName) {
  document.querySelectorAll('.profile-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.profile === profileName);
  });
}

function getCurrentSettings() {
  return {
    canvas: document.getElementById('canvas').checked,
    font: document.getElementById('font').checked,
    audioContext: document.getElementById('audioContext').checked,
    webgl: document.getElementById('webgl').checked,
    webgpu: document.getElementById('webgpu').checked,
    clientRects: document.getElementById('clientRects').checked
  };
}

function detectProfile(settings) {
  for (let [name, preset] of Object.entries(profiles)) {
    if (JSON.stringify(preset) === JSON.stringify({
      canvas: settings.canvas,
      font: settings.font,
      audioContext: settings.audioContext,
      webgl: settings.webgl,
      webgpu: settings.webgpu,
      clientRects: settings.clientRects
    })) {
      return name;
    }
  }
  return 'custom';
}

// Profile button handlers
document.querySelectorAll('.profile-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const profile = btn.dataset.profile;
    const settings = profiles[profile];
    
    // Update checkboxes
    document.getElementById('canvas').checked = settings.canvas;
    document.getElementById('font').checked = settings.font;
    document.getElementById('audioContext').checked = settings.audioContext;
    document.getElementById('webgl').checked = settings.webgl;
    document.getElementById('webgpu').checked = settings.webgpu;
    document.getElementById('clientRects').checked = settings.clientRects;
    
    // Save settings
    chrome.storage.local.set({
      ...settings,
      currentProfile: profile
    }, () => {
      updateActiveProfile(profile);
      // Reload active tab
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs[0] && tabs[0].id) {
          chrome.tabs.reload(tabs[0].id);
        }
      });
    });
  });
});

// Save settings and reload active tab when toggles change
const toggles = ['canvas', 'font', 'audioContext', 'webgl', 'webgpu', 'clientRects'];

toggles.forEach(id => {
  document.getElementById(id).addEventListener('change', (e) => {
    const settings = getCurrentSettings();
    const profile = detectProfile(settings);
    
    // Save the new setting
    chrome.storage.local.set({
      [id]: e.target.checked,
      currentProfile: profile
    }, () => {
      updateActiveProfile(profile);
      // Reload the active tab after setting is saved
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs[0] && tabs[0].id) {
          chrome.tabs.reload(tabs[0].id);
        }
      });
    });
  });
});

// Reset Defaults button - sets to Balanced profile
document.getElementById('resetBtn').addEventListener('click', () => {
  const settings = profiles.balanced;
  
  // Update checkboxes
  document.getElementById('canvas').checked = settings.canvas;
  document.getElementById('font').checked = settings.font;
  document.getElementById('audioContext').checked = settings.audioContext;
  document.getElementById('webgl').checked = settings.webgl;
  document.getElementById('webgpu').checked = settings.webgpu;
  document.getElementById('clientRects').checked = settings.clientRects;
  
  // Save settings
  chrome.storage.local.set({
    ...settings,
    currentProfile: 'balanced'
  }, () => {
    updateActiveProfile('balanced');
    // Reload active tab
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if (tabs[0] && tabs[0].id) {
        chrome.tabs.reload(tabs[0].id);
      }
    });
  });
});

// Test Protection button - opens browserleaks.com
document.getElementById('testBtn').addEventListener('click', () => {
  chrome.tabs.create({
    url: 'https://browserleaks.com'
  });
});
