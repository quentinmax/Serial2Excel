# Serial2Excel

Serial2Excel is a CLI for capturing data from a serial connection (e.g. Arduino) and exporting it to an Excel spreadsheet or a .csv file.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Notes](#notes)
- [Usage](#usage)
  - [Options](#options)
- [Examples](#examples)
- [Errors](#errors)

## Features

- Capture data from a serial device.
- Process incoming data in real-time.
- Generate output files (Excel, CSV) containing the captured and processed data.

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
- If you don't include file extensions in your output file path, the CLI will add them based on the chosen file type (see [second example](#examples)).
- Use -h or --help to display information about the available options.
- If you are using Windows PowerShell make sure two wrap your columns in quotation marks `-c 'Column1,Column2,Column3'`. Otherwise PowerShell parses the commas wrong, resulting in an error.

## Usage

Once installed, you can use the serial2excel command to capture data from a serial device and export it to Excel or CSV format.

> Ensure that no other devices or programs are utilizing the serial connection before running the command.

```bash
serial2excel [port] [options]
```

1. Ensure that the serial device is configured to send data in a semicolon-separated format, such as `data1;data2;data3`.

2. Start Serial2Excel by running it in your terminal or command prompt.

3. The CLI will start capturing and process data from the serial device automatically as it's sent.

4. When you're done sending data, send the command `stop` via the serial device. This signals to the CLI that data transmission is complete.

5. Receiving the `stop` command, the CLI will stop capturing data and begin processing the collected data.

6. Once the data processing is complete the output file will be generated (Excel spreadsheet / CSV files).

### Options

```
-V, --version                       output the version number
-br, --baud-rate [number]           set the baud rate for serial communication (default: 9600)
--csv                               use .csv instead of .xlsx
-o, --output <filepath>             define the output file path and filename. (e.g. '/path/to/file/filename')
-c, --columns <col1,col2,...>       define the columns of the table (e.g. 'Song,Musician,Album)
-h, --help                          display help for command
```

## Examples

Capture data from the serial port '/dev/ttyUSB0' and save it as an Excel file named 'data.xlsx':

```bash
    serial2excel /dev/ttyUSB0 -o ./data.xlsx -br 9600 -c 'Column1,Column2,Column3'
```

Capture data and save it as a CSV file named 'data.csv':

```bash
    serial2excel com4 --csv -o ./data -br 115200 -c 'Temperature,Humidity,Pressure'
```

## Errors

### Invalid user input (100)

- `101`: Invalid Port. Make sure you choose the right port, where the serial connection is running on.

### Invalid Data (300)

- `301`: Column mismatch. The provided data has more columns than the table. Make sure every data row has the exact same columns.
