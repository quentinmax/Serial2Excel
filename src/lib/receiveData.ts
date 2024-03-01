import { ReadlineParser } from "serialport";
import { handleExcel } from "./handleExcel.js";
import chalk from "chalk";
import { rows } from "../index.js";
import { log } from "console";
import { cols, fileType, seperator } from "../commands/program.js";
import { program } from "commander";
import { handleJSON } from "./handleJson.js";

export async function receiveData(parser: ReadlineParser) {
  parser.on("close", () => {
    log("Serial connection closed.");
  });

  parser.on("data", (data: string) => {
    if (data === "stop") {
      console.log("\n");
      if (fileType === "json") {
        return handleJSON();
      } else {
        return handleExcel();
      }
    }

    const values = data.split(seperator);

    if (values.length > cols.length) {
      console.error(
        chalk.red("ERROR 301:"),
        `The provided data (${values.length} columns) has more columns than the table (${cols.length} columns). Exiting...`
      );
      program.error("", { code: "301", exitCode: 1 });
    }

    if (values.length) {
      const convertedToNumbers = values.map((str) => parseFloat(str) || str);
      rows.push(convertedToNumbers);
    }

    console.log(chalk.dim(`  -  ${values.join(" | ")}`));
  });
}
