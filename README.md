# un-detector

> browser, os, device detector

[![npm version](https://img.shields.io/npm/v/un-detector.svg)](https://www.npmjs.com/package/un-detector)
[![npm downloads](https://img.shields.io/npm/dm/un-detector.svg)](https://www.npmjs.com/package/un-detector)
[![npm license](https://img.shields.io/npm/l/un-detector.svg)](https://www.npmjs.com/package/un-detector)

## Install

```sh
pnpm add un-detector
```

## Usage

```ts
import { detect } from 'un-detector'

// client
const detected = detect(window.navigator.userAgent)

// server
const detected = detect(request.headers['user-agent'])
```

Then you will get device info like:

```ts
detected = {
  os: {
    name: 'Mac OS',
    version: '10.15.7',
  },
  browser: {
    version: '118.0.2088.61',
    name: 'Edge',
    majorVersion: '118',
  },
  device: {
    model: 'Macintosh',
    vendor: 'Apple',
  },
  is: {
    mobile: false,
    mobileOnly: false,
    tablet: false,
    mac: true,
    windows: false,
    iOS: false,
    android: false,
    winPhone: false,
    linux: false,
    edge: true,
    chrome: false,
    safari: false,
    firefox: false,
    opera: false,
    IE: false,
    chromium: false,
    iPhone: false,
    iPad: false,
    iPod: false,
  },
}

```

## For ease of use


### os
```ts
import { os } from 'un-detector'

console.log(os.isMac())
```

### device
```ts
import { device } from 'un-detector'

console.log(device.isMobile())
```

### browser
```ts
import { browser } from 'un-detector'

console.log(browser.isChrome())
```


## Thanks

- `ua-parser-js`
- `detector-js`
- `browser-detect`
- `mobile-device-detect`
