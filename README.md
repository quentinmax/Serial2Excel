![serial2excel-screenshot](https://github.com/quentinmax/Serial2Excel/assets/82818659/62dfc98d-ba84-4372-884c-3d69e31e5d01)

Serial2Excel is a CLI for capturing data from a serial connection (e.g. Arduino) and exporting it to an Excel spreadsheet, a CSV or JSON file.

> If this package is helping you, maybe consider

[!["Buy Me A Coffee"]([https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png])](https://www.buymeacoffee.com/quentinhoehne)

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Notes](#notes)
- [Usage](#usage)
  - [Options](#options)
- [Examples](#examples)
- [Errors](#errors)
- [License](#license)

## Features

- Capture data from a serial device.
- Process incoming data in real-time.
- Generate Excel, CSV or JSON files containing the processed data.

## Node Compatibility

Use at least Node v16+, however `serial2excel` has not been tested on every singe NodeJS version. For best results you may stick to LTS versions. Issue reports related are highly appreciated.

## Installation

Install `serial2excel` globally using npm:

```bash
npm install -g serial2excel
```

or run

```bash
npx serial2excel [port] [options]
```

## Notes

- Ensure that no other devices or programs are utilizing the serial connection before running the command.
- If you don't include file extensions in your output file path, the CLI will add them based on the chosen file type (see [first example](#examples)).
- If you have any occuring issues, [email me](mailto:quentinhoehne.dev@gmail.com) or create a [Github issue](https://github.com/quentinmax/Serial2Excel/issues).
- If you are using Windows PowerShell make sure two wrap your columns in quotation marks `-c 'Column1,Column2,Column3'`. Otherwise PowerShell parses the commas wrong, resulting in an error.
- Use -h or --help to display information about the available options.

## Usage

Once installed, you can use the serial2excel command to capture data from a serial device and export it to Excel, CSV or JSON format.

> Ensure that no other devices or programs are utilizing the serial connection before running the command.

```bash
serial2excel [port] [options]
```

1. Ensure that the serial device is configured to send data in a seperated format, such as `data1;data2;...`. You can define a custom seperator setting the `-s` flag. **Your serial monitor must be set to use** `NR & CR`.

![serial-monitor-screenshot](https://github.com/quentinmax/Serial2Excel/assets/82818659/7ce5d819-2d70-4066-87b4-b1109e74b2eb)

2. Start Serial2Excel by running it in your terminal or command prompt. **Define the columns so they fit to the data your sending**.

3. The CLI will capture data from the serial device automatically as it's sent.

4. When you're done sending data, send the command `stop` via the serial device. This signals to the CLI that data transmission is complete.

5. Once the data processing is complete the output file will be generated (Excel spreadsheet / CSV / JSON).

> If you have any occuring issues, do not hesitate to [email me](mailto:quentinhoehne.dev@gmail.com) or create a [Github issue](https://github.com/quentinmax/Serial2Excel/issues).

### Options

```
-V,  --version                       output the version number
-br, --baud-rate <number>            set baud rate for serial communication (default: 9600)
-t,  --type <filetype>               set expected file type (choices: "xlsx", "csv", "json", default: "xlsx")
-s, --seperator <separator>          set custom seperator - this will only effect the data your sending, not the columns specified in the cli (default: ";")
-o,  --output <filepath>             define the output file path and filename. (e.g. '/path/to/file/filename')
-c,  --columns <col1,col2,...>       define the columns of the table (e.g. 'Song,Musician,Album')
-h,  --help                          display help for command
```

## Examples

1. You have an Arduino running on port 'com4', which sends weather data including Temperatur, Humidity and Pressure formatted as `Temperatur;Humidity;Pressure`. You want to export the data as CSV.
   Your command prompt might look like this:

```bash
    serial2excel com4 -t csv -o ./data -c 'Temperature,Humidity,Pressure'
```

2. Your serial device runs on port '/dev/ttyUSB0' and sends data about a hardware device your testing and debugging. The device operates at 115200 baud and the data is formatted as `Acceleration|Speed|Timestamp`.

```bash
    serial2excel /dev/ttyUSB0 -o ./data.xlsx -br 115200 -s '|' -c 'Acceleration,Speed,Timestamp'
```

> Note: Changing the seperator only applies to the data your sending from your serial device. In the CLI itself, use the comma.

## Errors

### Invalid user input (100)

- `101`: Invalid Port. Make sure you choose the right port, where the serial connection is running on.

### Invalid Data (300)

- `301`: Column mismatch. The provided data has more columns than the table. Make sure every data row has the exact same columns. However you can bypass this, by adding more columns to the `-c` flag than actually needed (e.g. `-c 'Temperatur,Humidity,Pressure,-,-,...'`), though this is not recommended.

### Internal (500)

- `501`: Error writing to file. Try again later.

## License

[MIT](https://github.com/quentinmax/Serial2Excel/blob/master/LICENSE.md)
