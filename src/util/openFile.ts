import inquirer from "inquirer";
import { spinner } from "../index.js";
import cp from "child_process";

export async function openFile(file: string) {
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
}
