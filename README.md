# un-detector

## Install

```bash
pnpm add un-detector
```

## Usage

```ts
import { detect } from 'un-detector';

const detected = detect();
```

Then you will get device info like:

```ts
detected = {
  isAndroid: false,
  isIOS: false,
  isMac: true,
  isMobile: false,
  isWindows: false,
  os: 'Mac OS X 10.15.7',
  platform: 'edge-chromium',
  version: '118.0.2088',
  versionNumber: 118.02088,
};
```

## For better experience


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

console.log(browser.isEdge())
```
