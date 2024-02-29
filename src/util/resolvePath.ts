import path from "path";
import { useCsv } from "../commands/program.js";
import { existsSync } from "fs";

export function resolvePath(filepath: string) {
  if (useCsv) {
    //Handle file extensions
    filepath = filepath.includes(".csv") ? filepath : `${filepath}.csv`;
  } else {
    filepath = filepath.includes(".xlsx") ? filepath : `${filepath}.xlsx`;
  }

  // Check if the path starts with './' or '../'
  if (!filepath.startsWith("./") && !filepath.startsWith("../")) {
    // Prepend './' to the path
    filepath = `./${filepath}`;
  }

  //Check if path exists
  // var userPath = filepath.split("/");
  // userPath.pop();

  // filepath = userPath.join("/");

  // if (existsSync(path.resolve(filepath)))

  // Resolve the path and return the absolute path
  return path.resolve(filepath);
}
