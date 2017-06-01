# Exfills 
Exfiltration with pixels and QR Codes. Possibly sound, TBD
Writeup TBD.

Basically, use QRCodes for anything (captive browser, citrix, RDP)
Use pixel beaming for captive browsers and captive VMs.
```
Light/
├── pixeltrator
│   ├── consumer
│   │   ├── grandtanner.js
│   │   └── tanner.js
│   └── producer
│       ├── beamer.html
│       └── grandbeamer.html
└── qrcodexfil
    ├── consumer
    │   ├── libs
    │   │   ├── core-3.3.0.jar
    │   │   └── javase-3.3.0.jar
    │   ├── out
    │   │   └── Screen.class
    │   ├── scripts
    │   │   ├── build.sh
    │   │   └── run.sh
    │   └── src
    │       ├── Screen.class
    │       └── Screen.java
    └── producer
        └── qrbeamer.html
```
