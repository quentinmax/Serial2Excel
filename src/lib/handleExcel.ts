import loadWorkbook from "../util/loadWorkbook.js";
import Excel from "exceljs";
import { rows, spinner, workbook } from "../index.js";
import { cols, filepath, useCsv } from "../commands/program.js";
import inquirer from "inquirer";
import cp from "child_process";
import path from "path";
import { existsSync } from "fs";
import { resolvePath } from "../util/resolvePath.js";

export async function handleExcel() {
  spinner.start({ text: "Generating excel file..." });

  const worksheet: Excel.Worksheet | undefined = await loadWorkbook();

  const mappedCols = cols.map((item) => ({ name: item }));

  worksheet.addTable({
    name: "Werte",
    ref: "A1",
    totalsRow: false,
    style: {
      theme: "TableStyleMedium3",
      showRowStripes: true,
    },
    columns: mappedCols,
    rows: rows,
  });

  var file = resolvePath(filepath);

  if (useCsv) {
    workbook.csv.writeFile(file).finally(async () => {
      spinner.success({ text: `File successfully generated at: ${file}\n` });

      const openFilePrompt = await inquirer.prompt({
        name: "open_file",
        type: "list",
        message: "Open file?",
        choices: ["Yes", "No"],
      });
      if (openFilePrompt.open_file === "Yes") {
        cp.execSync(`start ${file}`);
      }
      process.exit(0);
    });
  } else {
    await workbook.xlsx.writeFile(file).finally(async () => {
      spinner.success({ text: `File successfully generated at: ${file}\n` });

      const openFilePrompt = await inquirer.prompt({
        name: "open_file",
        type: "list",
        message: "Open file?",
        choices: ["Yes", "No"],
      });
      if (openFilePrompt.open_file === "Yes") {
        cp.execSync(`start ${file}`);
      }
      process.exit(0);
    });
  }
}
