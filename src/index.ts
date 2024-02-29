#!/usr/bin/env node
import { Command } from "commander";
import safelyParseInt from "./util/safelyParseInt.js";
import handleProgram from "./commands/program.js";
import { createSpinner } from "nanospinner";
import Excel from "exceljs";

export const spinner = createSpinner();
export const workbook = new Excel.Workbook();
export const rows: any[] = [];

//Declare program
export const program = new Command();
program.version("0.2.0");

const description = `Command-line utility for capturing data from a serial connection and exporting it to an Excel spreadsheet. IMPORTANT - Seperate your data (row insertions) with a semicolon: 'data1;data2;data3;...' in order to be processed.`;

//Add actions onto CLI
program
  .name("serial2excel")
  .description(description)
  .argument(
    "<port>",
    "specify the path or port for serial connection. (e.g. 'com3')"
  )
  .option(
    "-br, --baud-rate [number]",
    "sets the baud rate for serial communication",
    (value, prev) => safelyParseInt(value),
    9600
  )
  .option("--csv", "use .csv instead of .xlsx")
  .requiredOption(
    "-o, --output <filepath>",
    "defines the output file path and filename. (e.g. '/path/to/file/filename')"
  )
  .requiredOption(
    "-c, --columns <col1,col2,...>",
    "defines the columns of the table (e.g. 'Song,Musician,Album)"
  )
  .action(handleProgram);

//Execute CLI with given arguments
program.parse(process.argv);
