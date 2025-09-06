import fs from "fs";
import path from "path";

export class FileHelper {
  private static createUniqueDirectory(
    createPath: string,
    counter: number = 1
  ): string {
    let dir = createPath;
    let counterValue = counter;

    if (!fs.existsSync(dir)) return dir;

    if (!isNaN(Number(dir[dir.length - 1]))) {
      dir = dir.replace(dir[dir.length - 1], `${counterValue}`);
    } else dir += `_${counterValue}`;

    return this.createUniqueDirectory(dir, counterValue + 1);
  }

  public static createDir(pathToDir: string): string {
    try {
      const dir = this.createUniqueDirectory(pathToDir);
      fs.mkdirSync(dir, { recursive: true });

      return dir;
    } catch (error) {
      throw new Error(
        `There was an error creating project directory\n${error}`
      );
    }
  }

  public static createFile(fileName: string, fileContent: string = ""): void {
    try {
      fs.writeFileSync(fileName, fileContent, { encoding: "utf-8" });
    } catch (error) {
      throw new Error(`There was an error creating file\n${error}`);
    }
  }

  public static async cleanUpInCaseOfError(projectPath: string, error: any) {
    try {
      console.log(String(error).red.bold);

      process.chdir("../");

      await fs.promises.rm(projectPath, { recursive: true, force: true });

      console.error(
        `[Error]: ${error}\nRemoving directory at ${path.resolve(projectPath)}`
      );
    } catch (error) {
      console.error(error);
    }
  }
}
