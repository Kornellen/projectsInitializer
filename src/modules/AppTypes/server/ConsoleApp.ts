import { exec, execSync } from "child_process";
import fs from "fs";
import inquirer from "inquirer";
import additionalLibraries from "../../../helpers/additionalLibraries";
import { npmPackageInstaller } from "../../../helpers/packageInstallers";

export default async function ConsoleApp(
  language: "JavaScript" | "TypeScript"
) {
  execSync("npm init -y");

  if (language === "TypeScript") {
    try {
      npmPackageInstaller(true, ["typescript", "ts-node", "@types/node"]);

      execSync("npx tsc --init", { stdio: "inherit" });
    } catch (error) {
      execSync(`rmdir ${process.cwd()}`);
      throw new Error("There was an error installing the required packages.");
    }
  }

  const { isAdditionalLibraries } = await inquirer.prompt({
    type: "confirm",
    name: "isAdditionalLibraries",
    message: "Is your app use additional libraries?",
  });

  if (isAdditionalLibraries) {
    additionalLibraries(language);
  }

  fs.mkdir("./src", { recursive: true }, (err) => {
    if (err) {
      console.error(`Error creating - src/ - dir: ` + err);
    }
  });
}
