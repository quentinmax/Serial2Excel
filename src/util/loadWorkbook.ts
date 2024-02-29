import { filepath } from "../commands/program.js";
import { workbook } from "../index.js";

const loadWorkbook = async () => {
  const path = filepath.split("/");
  let worksheetName = path[path.length - 1];

  const worksheet = workbook.addWorksheet(worksheetName);

  return worksheet;
};

export default loadWorkbook;
