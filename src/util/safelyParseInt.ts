import { InvalidArgumentError } from "commander";

export default function safelyParseInt(string: string) {
  const number = parseInt(string);
  if (isNaN(number)) {
    console.error("Please provide a valid number");
    throw new InvalidArgumentError("Not a number.");
  }

  return number;
}
