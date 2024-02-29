# Serial2Excel

Serial2Excel is a CLI for capturing data from a serial connection (e.g. Arduino) and exporting it to an Excel spreadsheet or a .csv file.

## Installation

Install `serial2excel` globally using npm:

```bash
npm install -g serial2excel
```

or run

```bash
npx serial2excel [port] [options]
```

## Usage

Once installed, you can use the serial2excel command to capture data from a serial device and export it to Excel or CSV format.

> Ensure that no other devices or programs are utilizing the serial connection before running the command.

```bash
serial2excel [port] [options]
```

## Options

```
-V, --version                       output the version number
-br, --baud-rate [number]           set the baud rate for serial communication (default: 9600)
--csv                               use .csv instead of .xlsx
-o, --output <filepath>             define the output file path and filename. (e.g. '/path/to/file/filename')
-c, --columns <col1,col2,...>       define the columns of the table (e.g. 'Song,Musician,Album)
-h, --help                          display help for command
```

## Examples

1. Capture data from the serial port '/dev/ttyUSB0' and save it as an Excel file named 'data.xlsx':

```bash
    serial2excel /dev/ttyUSB0 -o ./data.xlsx -br 9600 -c 'Column1,Column2,Column3'
```

2. Capture data and save it as a CSV file named 'data.csv':

```bash
    serial2excel com4 --csv -o ./data -br 115200 -c 'Temperature,Humidity,Pressure'
```

# Notes

- Ensure that no other devices or programs are utilizing the serial connection before running the command.
- If you don't include file extensions in your output file path, the CLI will add them based on the chosen file type.
- Use -h or --help to display information about the available options.
- If you are using Windows PowerShell make sure two wrap your columns in quotation marks `-c 'Column1,Column2,Column3'`. Otherwise PowerShell parses the commas wrong, resulting in an error.
