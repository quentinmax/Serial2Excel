import loadWorkbook from "../util/loadWorkbook.js";
import Excel from "exceljs";
import { rows, spinner, workbook } from "../index.js";
import { cols, filepath, fileType } from "../commands/program.js";
import inquirer from "inquirer";
import cp from "child_process";
import { resolvePath } from "../util/resolvePath.js";
import { openFile } from "../util/openFile.js";
import { program } from "commander";

export async function handleExcel() {
  spinner.start({ text: "Generating excel file..." });

  const worksheet: Excel.Worksheet | undefined = await loadWorkbook();

  const mappedCols = cols.map((item) => ({ name: item }));

  worksheet.addTable({
    name: "Values",
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

  switch (fileType) {
    case "csv":
      workbook.csv.writeFile(file).finally(async () => {
        openFile(file);
      });
      break;

    case "json":
      program.error("Not supported yet.");

    case "xlsx":
      workbook.xlsx.writeFile(file).finally(async () => {
        openFile(file);
      });
      break;

    default:
      workbook.xlsx.writeFile(file).finally(async () => {
        openFile(file);
      });
      break;
  }
}
