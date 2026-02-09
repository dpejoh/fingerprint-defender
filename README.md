# 🛡️ Fingerprint Defender

A Chrome extension that defends your privacy by protecting against browser fingerprinting tracking. It combines multiple fingerprinting defense methods into one easy-to-use extension with granular controls and preset protection modes.

## What is Browser Fingerprinting?

Browser fingerprinting is a tracking technique that doesn't rely on cookies. Instead, it collects information about your browser, system, and hardware to create a unique "fingerprint" that can identify you across websites. Fingerprint Defender makes it harder for trackers to build an accurate profile of your device.

## Features

The extension provides toggleable defenses for the following fingerprinting vectors:

- **Canvas** – Adds noise to canvas rendering to prevent fingerprinting via graphics
- **Font** – Randomizes font measurement values (offsetWidth/offsetHeight)
- **AudioContext** – Adds minimal noise to Web Audio API outputs
- **WebGL** – Spoofs WebGL parameters to mask your graphics hardware
- **WebGPU** – Randomizes WebGPU device limits and render data
- **ClientRects** – Adds noise to DOM element measurement APIs

Each protection method renews its randomization on every page load, making your fingerprint unpredictable.

## Protection Modes

Choose the preset that fits your workflow:

- **Compatibility Mode** – All defenses are disabled. Use this if sites break or behave strangely.
- **Balanced Mode** *(default)* – A sensible middle ground that protects privacy while maintaining compatibility with most websites.
- **Maximum Privacy Mode** – All defenses enabled for the strongest protection. Some sites (games, 3D apps, CAPTCHA) may experience issues.

You can also enable/disable individual protections if you want a custom setup.

## Installation

### Load as an Unpacked Extension (Chrome/Edge/Brave)

1. **Download or clone this repository** to your computer.

2. **Open your browser's extension management page:** go to `chrome://extensions`

3. **Enable Developer Mode** (toggle in the top-right corner if not already enabled).

4. **Click "Load unpacked"** and select the `source` folder from this project.

5. **The extension will appear in your extensions list.** Pin it to your toolbar for easy access.

## Usage

1. **Click the Fingerprint Defender icon** in your browser toolbar to open the popup.

2. **Select a Protection Mode** using the buttons at the bottom:
   - "Maximum Privacy" for strongest protection
   - "Balanced" for everyday browsing
   - "Compatibility" if sites break

3. **Toggle individual defenses** on or off using the switches next to each feature.

4. **Hover over the info icon** (ⓘ) next to each defense name to see what it does.

5. **Use "Test Protection"** to verify defenses are working (opens a test page).

6. **Use "Reset Defaults"** to restore the default settings at any time.

## ⚠️ Troubleshooting

### Sites are broken, loading slowly, or showing errors

Some sites may not like the noise injection from fingerprint protection. Try:
1. Switch to **Compatibility Mode** (disables all protections)
2. Use **Balanced Mode** (the default)
3. Disable specific protections one by one until the site works

Common culprits: 3D games, video platforms, real-time applications, and CAPTCHA services.

### Reporting Fingerprinting Defense Issues

This extension is a GUI wrapper around fingerprinting defense methods from **[mybrowseraddon.com](https://www.mybrowseraddon.com)**. 

If you encounter issues or bugs with the actual fingerprinting defense logic, please report them to: **[mybrowseraddon.com](https://www.mybrowseraddon.com)**

If you encounter issues with the **extension itself** (popup not loading, UI bugs, etc.), feel free to report them here.

## How It Works

The extension injects protective code into every webpage using Manifest V3's content script system:
- **ISOLATED world scripts** run in isolation from the page (highest security)
- **MAIN world scripts** run in the page's context (necessary for some protections)

Randomization happens on every page load, so your fingerprint changes constantly and becomes unreliable for tracking.

## About This Project

This extension is **vibe coded** – it's designed to be functional and effective without being overly complex. The code prioritizes clarity and ease of customization over fancy optimization.

## Privacy First

Fingerprint Defender does **not**:
- Collect your data
- Send information to external servers
- Track your browsing
- Use telemetry

All protections happen locally in your browser.
