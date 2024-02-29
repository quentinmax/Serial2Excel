import { filepath } from "../commands/program.js";
import { workbook } from "../index.js";

const loadWorkbook = async () => {
  const path = filepath.split("/");
  let worksheetName = path[path.length - 1];

  //   if (filePath) {
  //     await workbook.xlsx.readFile(filePath);

  //     const { exists, newFile } = nameExists(sampleName);

  //     if (exists) {
  //       worksheetName = `${sampleName}${newFile}`;
  //     }
  //     const worksheet = workbook.addWorksheet(worksheetName);
  //     // worksheet.removeConditionalFormatting();
  //     return worksheet;
  //   } else if (fileName) {
  //     const worksheet = workbook.addWorksheet(worksheetName);
  //     // worksheet.removeConditionalFormatting();
  //     return worksheet;
  //   }

  const worksheet = workbook.addWorksheet(worksheetName);

  return worksheet;
};

export default loadWorkbook;
