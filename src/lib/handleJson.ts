import { cols, filepath } from "../commands/program.js";
import { program, rows } from "../index.js";
import fs from "fs";
import { resolvePath } from "../util/resolvePath.js";
import { openFile } from "../util/openFile.js";
import chalk from "chalk";

export function handleJSON() {
  const dataObject: Record<string, any> = {};
  cols.forEach((col, index) => {
    dataObject[col] = rows.map((row) => row[index]);
  });

  var file = resolvePath(filepath);

  fs.writeFile(file, JSON.stringify(dataObject, null, 2), (err) => {
    if (err) {
      console.log(
        chalk.red("ERROR 501:"),
        `Writing to file resulted in an error. Try again later.${
          err ? "\n-----\nError message: " + err : ""
        }`
      );
      program.error("", { code: "501", exitCode: 1 });
    } else {
      openFile(file);
    }
  });
}
