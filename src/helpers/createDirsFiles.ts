import fs from "fs";
import ErrorHandler from "./ErrorHandler";

const uniqueDir = (path: string) => {
  let dir = path;
  let counter = 1;
  while (fs.existsSync(dir)) {
    dir = path + `-${counter}`;
    counter++;
  }
  return dir;
};

export const createDir = (dirName: string): string => {
  const dir = uniqueDir(dirName);
  try {
    fs.mkdirSync(dir, { recursive: true });

    return dir;
  } catch (error) {
    new ErrorHandler(
      error,
      "There was an error creating the directory"
    ).handleError();
    throw error;
  }
};

export const createFile = (fileName: string, fileContent: string = "") => {
  try {
    fs.writeFileSync(fileName, fileContent, { encoding: "utf8" });
  } catch (error) {
    new ErrorHandler(
      error,
      "There was an error creating the file"
    ).handleError();
  }
};
