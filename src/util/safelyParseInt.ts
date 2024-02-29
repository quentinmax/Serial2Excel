import { InvalidArgumentError } from "commander";

export default function safelyParseInt(string: string) {
  let number;
  try {
    number = parseInt(string);
  } catch (error) {
    throw new InvalidArgumentError("Not a number.");
  }

  return number;
}
