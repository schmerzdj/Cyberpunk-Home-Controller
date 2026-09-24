export type ESP32Board = {
  id: string;
  model: string;
  manufacturer: string;
  screenSize: string;
  resolution: string;
  touchType: 'Resistive' | 'Capacitive' | 'None';
  driverIC: string;
  mcu: string;
  flash: string;
  psram: string;
  interface: string;
  aspectRatio: number;
  notes?: string;
};

export const esp32Boards: ESP32Board[] = [
  // ── Sunton ESP32-2432 series (ESP32-D0WD, SPI displays) ──
  { id: '2432s024r', model: 'ESP32-2432S024R', manufacturer: 'Sunton', screenSize: '2.4"', resolution: '320×240', touchType: 'Resistive', driverIC: 'ILI9341', mcu: 'ESP32-D0WDQ5', flash: '4MB', psram: '—', interface: 'SPI', aspectRatio: 4 / 3 },
  { id: '2432s028r', model: 'ESP32-2432S028R', manufacturer: 'Sunton', screenSize: '2.8"', resolution: '320×240', touchType: 'Resistive', driverIC: 'ILI9341', mcu: 'ESP32-D0WDQ5', flash: '4MB', psram: '—', interface: 'SPI', aspectRatio: 4 / 3, notes: 'Most common entry-level HMI board' },
  { id: '2432s032r', model: 'ESP32-2432S032R', manufacturer: 'Sunton', screenSize: '3.2"', resolution: '240×320', touchType: 'Resistive', driverIC: 'ILI9341', mcu: 'ESP32-D0WDQ5', flash: '4MB', psram: '—', interface: 'SPI', aspectRatio: 3 / 4 },
  { id: '2432s028c', model: 'ESP32-2432S028C', manufacturer: 'Sunton', screenSize: '2.8"', resolution: '320×240', touchType: 'Capacitive', driverIC: 'ILI9341', mcu: 'ESP32-D0WDQ5', flash: '4MB', psram: '—', interface: 'SPI', aspectRatio: 4 / 3 },

  // ── Sunton ESP32-3248 series (ESP32-D0WD, ILI9488) ──
  { id: '3248s035c', model: 'ESP32-3248S035C', manufacturer: 'Sunton', screenSize: '3.5"', resolution: '480×320', touchType: 'Capacitive', driverIC: 'ILI9488', mcu: 'ESP32-D0WDQ5', flash: '4MB', psram: '—', interface: 'SPI', aspectRatio: 3 / 2 },
  { id: '3248s035r', model: 'ESP32-3248S035R', manufacturer: 'Sunton', screenSize: '3.5"', resolution: '480×320', touchType: 'Resistive', driverIC: 'ILI9488', mcu: 'ESP32-D0WDQ5', flash: '4MB', psram: '—', interface: 'SPI', aspectRatio: 3 / 2 },

  // ── Sunton ESP32-S3 RGB parallel series ──
  { id: '4827s043r', model: 'ESP32-4827S043R', manufacturer: 'Sunton', screenSize: '4.3"', resolution: '480×272', touchType: 'Resistive', driverIC: 'RGB Parallel', mcu: 'ESP32-S3-WROOM-1', flash: '16MB', psram: '8MB', interface: 'RGB', aspectRatio: 16 / 9 },
  { id: '4827s043c', model: 'ESP32-4827S043C', manufacturer: 'Sunton', screenSize: '4.3"', resolution: '480×272', touchType: 'Capacitive', driverIC: 'RGB Parallel', mcu: 'ESP32-S3-WROOM-1', flash: '16MB', psram: '8MB', interface: 'RGB', aspectRatio: 16 / 9 },
  { id: '4827s043n', model: 'ESP32-4827S043N', manufacturer: 'Sunton', screenSize: '4.3"', resolution: '480×272', touchType: 'None', driverIC: 'RGB Parallel', mcu: 'ESP32-S3-WROOM-1', flash: '16MB', psram: '8MB', interface: 'RGB', aspectRatio: 16 / 9, notes: 'No touch — display only' },
  { id: '8048s043c', model: 'ESP32-8048S043C', manufacturer: 'Sunton', screenSize: '4.3"', resolution: '800×480', touchType: 'Capacitive', driverIC: 'RGB Parallel', mcu: 'ESP32-S3-WROOM-1', flash: '16MB', psram: '16MB', interface: 'RGB', aspectRatio: 5 / 3 },
  { id: '8048s043r', model: 'ESP32-8048S043R', manufacturer: 'Sunton', screenSize: '4.3"', resolution: '800×480', touchType: 'Resistive', driverIC: 'RGB Parallel', mcu: 'ESP32-S3-WROOM-1', flash: '16MB', psram: '16MB', interface: 'RGB', aspectRatio: 5 / 3 },
  { id: '8048s050c', model: 'ESP32-8048S050C', manufacturer: 'Sunton', screenSize: '5.0"', resolution: '800×480', touchType: 'Capacitive', driverIC: 'RGB Parallel', mcu: 'ESP32-S3-WROOM-1', flash: '16MB', psram: '16MB', interface: 'RGB', aspectRatio: 5 / 3 },
  { id: '8048s070c', model: 'ESP32-8048S070C', manufacturer: 'Sunton', screenSize: '7.0"', resolution: '800×480', touchType: 'Capacitive', driverIC: 'RGB Parallel', mcu: 'ESP32-S3-WROOM-1', flash: '16MB', psram: '16MB', interface: 'RGB', aspectRatio: 5 / 3 },
  { id: '8048s070r', model: 'ESP32-8048S070R', manufacturer: 'Sunton', screenSize: '7.0"', resolution: '800×480', touchType: 'Resistive', driverIC: 'RGB Parallel', mcu: 'ESP32-S3-WROOM-1', flash: '16MB', psram: '16MB', interface: 'RGB', aspectRatio: 5 / 3 },
  { id: '1024s043c', model: 'ESP32-1024S043C', manufacturer: 'Sunton', screenSize: '4.3"', resolution: '1024×600', touchType: 'Capacitive', driverIC: 'RGB Parallel', mcu: 'ESP32-S3-WROOM-1', flash: '16MB', psram: '16MB', interface: 'RGB', aspectRatio: 16 / 9 },
  { id: '1024s070c', model: 'ESP32-1024S070C', manufacturer: 'Sunton', screenSize: '7.0"', resolution: '1024×600', touchType: 'Capacitive', driverIC: 'RGB Parallel', mcu: 'ESP32-S3-WROOM-1', flash: '16MB', psram: '16MB', interface: 'RGB', aspectRatio: 16 / 9, notes: 'Highest resolution in the lineup' },
  { id: '7016s070c', model: 'ESP32-7016S070C', manufacturer: 'Sunton', screenSize: '7.0"', resolution: '1024×600', touchType: 'Capacitive', driverIC: 'RGB Parallel', mcu: 'ESP32-S3-WROOM-1', flash: '16MB', psram: '32MB', interface: 'RGB', aspectRatio: 16 / 9, notes: 'Max PSRAM variant' },
  { id: '5804s050c', model: 'ESP32-5804S050C', manufacturer: 'Sunton', screenSize: '5.0"', resolution: '800×480', touchType: 'Capacitive', driverIC: 'RGB Parallel', mcu: 'ESP32-S3-WROOM-1', flash: '16MB', psram: '16MB', interface: 'RGB', aspectRatio: 5 / 3 },

  // ── HiWonder HWT32 series ──
  { id: 'hwt32w543r', model: 'HWT32W543R', manufacturer: 'HiWonder', screenSize: '4.3"', resolution: '480×272', touchType: 'Resistive', driverIC: 'RGB Parallel', mcu: 'ESP32-S3-WROOM-1', flash: '16MB', psram: '8MB', interface: 'RGB', aspectRatio: 16 / 9 },
  { id: 'hwt32w543c', model: 'HWT32W543C', manufacturer: 'HiWonder', screenSize: '4.3"', resolution: '480×272', touchType: 'Capacitive', driverIC: 'RGB Parallel', mcu: 'ESP32-S3-WROOM-1', flash: '16MB', psram: '8MB', interface: 'RGB', aspectRatio: 16 / 9 },

  // ── JC series (common AliExpress HMI) ──
  { id: 'jc4827w543', model: 'JC4827W543', manufacturer: 'JC', screenSize: '4.3"', resolution: '480×272', touchType: 'Resistive', driverIC: 'RGB Parallel', mcu: 'ESP32-S3-WROOM-1', flash: '16MB', psram: '8MB', interface: 'RGB', aspectRatio: 16 / 9, notes: 'Referenced in panel firmware string' },
  { id: 'jc3248w345', model: 'JC3248W345', manufacturer: 'JC', screenSize: '3.5"', resolution: '320×480', touchType: 'Capacitive', driverIC: 'ILI9488', mcu: 'ESP32-D0WDQ5', flash: '4MB', psram: '—', interface: 'SPI', aspectRatio: 2 / 3 },
  { id: 'jc8048w550', model: 'JC8048W550', manufacturer: 'JC', screenSize: '5.0"', resolution: '800×480', touchType: 'Capacitive', driverIC: 'RGB Parallel', mcu: 'ESP32-S3-WROOM-1', flash: '16MB', psram: '16MB', interface: 'RGB', aspectRatio: 5 / 3 },

  // ── Espressif official ──
  { id: 's3box3', model: 'ESP32-S3-BOX-3', manufacturer: 'Espressif', screenSize: '2.4"', resolution: '320×240', touchType: 'Capacitive', driverIC: 'ILI9341', mcu: 'ESP32-S3', flash: '16MB', psram: '8MB', interface: 'SPI', aspectRatio: 4 / 3, notes: 'Has mic + speaker for voice control' },
  { id: 's3boxlite', model: 'ESP32-S3-BOX-Lite', manufacturer: 'Espressif', screenSize: '2.4"', resolution: '320×240', touchType: 'Capacitive', driverIC: 'ILI9341', mcu: 'ESP32-S3', flash: '16MB', psram: '8MB', interface: 'SPI', aspectRatio: 4 / 3, notes: 'Lite version without mic array' },

  // ── Wireless Tag ──
  { id: 'wt32sc01', model: 'WT32-SC01', manufacturer: 'Wireless Tag', screenSize: '3.5"', resolution: '320×480', touchType: 'Capacitive', driverIC: 'ST7796', mcu: 'ESP32-D0WD', flash: '4MB', psram: '—', interface: 'SPI', aspectRatio: 2 / 3 },
  { id: 'wt32sc01plus', model: 'WT32-SC01 Plus', manufacturer: 'Wireless Tag', screenSize: '3.5"', resolution: '320×480', touchType: 'Capacitive', driverIC: 'ST7796', mcu: 'ESP32-S3', flash: '16MB', psram: '8MB', interface: 'SPI', aspectRatio: 2 / 3, notes: 'S3 upgrade with PSRAM' },

  // ── LilyGO ──
  { id: 'tdisplay', model: 'T-Display', manufacturer: 'LilyGO', screenSize: '1.14"', resolution: '240×135', touchType: 'None', driverIC: 'ST7789', mcu: 'ESP32-D0WDQ6', flash: '4MB', psram: '—', interface: 'SPI', aspectRatio: 16 / 9, notes: 'Tiny display — status panel use' },
  { id: 'tdisplays3', model: 'T-Display-S3', manufacturer: 'LilyGO', screenSize: '1.9"', resolution: '170×320', touchType: 'None', driverIC: 'ST7789', mcu: 'ESP32-S3', flash: '16MB', psram: '8MB', interface: 'SPI', aspectRatio: 17 / 32 },
  { id: 'tdisplayamoled', model: 'T-Display-S3 AMOLED', manufacturer: 'LilyGO', screenSize: '1.91"', resolution: '240×536', touchType: 'Capacitive', driverIC: 'AMOLED', mcu: 'ESP32-S3', flash: '16MB', psram: '8MB', interface: 'QSPI', aspectRatio: 9 / 20, notes: 'Tall AMOLED — portrait kiosk' },

  // ── Makerfabs ──
  { id: 'mf-s3-43', model: 'ESP32-S3 4.3" IPS', manufacturer: 'Makerfabs', screenSize: '4.3"', resolution: '800×480', touchType: 'Capacitive', driverIC: 'RGB Parallel', mcu: 'ESP32-S3-WROOM-1', flash: '16MB', psram: '8MB', interface: 'RGB', aspectRatio: 5 / 3 },
  { id: 'mf-s3-35', model: 'ESP32-S3 3.5" IPS', manufacturer: 'Makerfabs', screenSize: '3.5"', resolution: '480×320', touchType: 'Capacitive', driverIC: 'ILI9488', mcu: 'ESP32-S3-WROOM-1', flash: '16MB', psram: '8MB', interface: 'SPI', aspectRatio: 3 / 2 },

  // ── Waveshare ──
  { id: 'ws-s3-43', model: 'ESP32-S3 4.3"', manufacturer: 'Waveshare', screenSize: '4.3"', resolution: '800×480', touchType: 'Capacitive', driverIC: 'RGB Parallel', mcu: 'ESP32-S3-WROOM-1', flash: '16MB', psram: '8MB', interface: 'RGB', aspectRatio: 5 / 3 },
  { id: 'ws-s3-70', model: 'ESP32-S3 7.0"', manufacturer: 'Waveshare', screenSize: '7.0"', resolution: '800×480', touchType: 'Capacitive', driverIC: 'RGB Parallel', mcu: 'ESP32-S3-WROOM-1', flash: '16MB', psram: '16MB', interface: 'RGB', aspectRatio: 5 / 3 },

  // ── Elecrow ──
  { id: 'ec-terminal', model: 'ESP32 Terminal', manufacturer: 'Elecrow', screenSize: '3.5"', resolution: '320×480', touchType: 'Capacitive', driverIC: 'ILI9488', mcu: 'ESP32-S3-WROOM-1', flash: '16MB', psram: '8MB', interface: 'SPI', aspectRatio: 2 / 3, notes: 'Has Grove + RTC breakout' },
];
