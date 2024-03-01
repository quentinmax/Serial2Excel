export type Options = {
  baudRate: number;
  output: string;
  columns: string;
  type: FileType;
  seperator: string;
};

export type FileType = "xlsx" | "csv" | "json";
