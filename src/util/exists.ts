import { program } from "commander";
import { SerialPort } from "serialport";
import chalk from "chalk";

const logError = (error: string, portName: string, info?: any[]) => {
  console.log(
    chalk.red("ERROR 101:"),
    `Port ${portName} can't be found. Please provide a valid port.${
      error.length ? "\n-----\nError message: " + error : ""
    }`
  );
  if (info) {
    console.log("Discovered ports: \n", info);
  }
  program.error("", { code: "101", exitCode: 1 });
};

export async function exists(portName: string) {
  await SerialPort.list()
    .then((info) => {
      const exists = info.some(
        (port) =>
          port.path?.toLocaleLowerCase() === portName.toLocaleLowerCase()
      );

      if (exists) {
        return;
      } else {
        logError("", portName, info);
      }
    })
    .catch((err) => logError(err, portName));
}
