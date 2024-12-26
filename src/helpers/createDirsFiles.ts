import fs from "fs";

export const createDir = (dirName: string) => {
  fs.mkdir(`./${dirName}`, { recursive: true }, (err) => {
    if (err) {
      console.error(`Error creating - ./${dirName}/ - dir: ` + err);
    }
  });
};

export const createFile = (fileName: string, fileContent: string = "") => {
  fs.writeFile(fileName, fileContent, { encoding: "utf8" }, (err) => {
    if (err) {
      console.error(`Error creating - ${fileName} - file: ` + err);
    }
  });
};
