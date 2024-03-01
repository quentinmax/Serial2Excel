import figlet from "figlet";
import gradient from "gradient-string";
import chalk from "chalk";
import { sleep } from "../util/sleep.js";
import { ReadlineParser, SerialPort } from "serialport";
import { receiveData } from "../lib/receiveData.js";
import { exists } from "../util/exists.js";
import { FileType, Options } from "../types/Options.js";

export var filepath = "";
export var cols: string[] = [];
export var fileType: FileType = "xlsx";
export var seperator: string = ";";

const handleProgram = async (port: string, opts: Options) => {
  const { baudRate, output, columns, type, seperator: inputSeperator } = opts;

  await exists(port);

  const serialPort = new SerialPort({
    path: port,
    baudRate: baudRate,
  });

  const parser = new ReadlineParser({
    delimiter: "\r\n",
  });

  serialPort.pipe(parser);

  console.clear();
  const msg = "Serial2Excel";
  figlet(msg, (err, data) => {
    console.log(gradient.cristal.multiline(data));
  });

  await sleep(100);
  console.log(
    chalk.gray(
      `[Port: ${port} | Baud Rate: ${baudRate} | File type: ${type} | File output: ${output} | Seperator: '${inputSeperator}']\n`
    )
  );
  await sleep(1200);

  console.log(
    chalk.yellow("IMPORTANT:"),
    "Make sure every other serial connection is closed!\n"
  );

  console.log(chalk.green("Receiving data...\n"));

  cols = columns.split(",");
  filepath = output;
  fileType = type;
  seperator = inputSeperator;

  await receiveData(parser);
};

export default handleProgram;
