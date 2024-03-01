import path from "path";
import { fileType } from "../commands/program.js";
import { existsSync } from "fs";

export function resolvePath(filepath: string) {
  //Handle file extensions
  filepath = filepath.includes(`.${fileType}`)
    ? filepath
    : `${filepath}.${fileType}`;

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
