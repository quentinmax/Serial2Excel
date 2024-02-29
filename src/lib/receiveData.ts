import { ReadlineParser } from "serialport";
import { handleExcel } from "./handleExcel.js";
import chalk from "chalk";
import { rows } from "../index.js";
import { log } from "console";
import { cols } from "../commands/program.js";

export async function receiveData(parser: ReadlineParser) {
  parser.on("close", () => {
    log("Serial connection closed.");
  });

  parser.on("data", (data: string) => {
    if (data === "stop") {
      console.log("\n");
      return handleExcel();
    }

    const values = data.split(";");

    if (values.length > cols.length) {
      console.error(
        chalk.red("ERROR:"),
        "The provided data has more columns than the table. Exiting..."
      );
      process.exit(1);
    }

    if (values.length) {
      rows.push(values);
    }

    console.log(chalk.dim(`  -  ${values.join(" | ")}`));
  });
}
