import { execSync } from "child_process";
import inquirer from "inquirer";
import additionalLibraries from "../../../helpers/additionalLibraries";
import { npmPackageInstaller } from "../../../helpers/packageInstallers";
import { createDir } from "../../../helpers/createDirsFiles";
import ErrorHandler from "../../../helpers/ErrorHandler";

export default async function ConsoleApp(
  language: "JavaScript" | "TypeScript"
) {
  try {
    console.log("Initialization of Console App...".blue);
    execSync("npm init -y");

    if (language === "TypeScript") {
      npmPackageInstaller(true, ["typescript", "ts-node", "@types/node"]);

      execSync("npx tsc --init", { stdio: "inherit" });
    }

    const { isAdditionalLibraries } = await inquirer.prompt({
      type: "confirm",
      name: "isAdditionalLibraries",
      message: "Is your app use additional libraries?",
    });

    if (isAdditionalLibraries) {
      additionalLibraries(language);
    }

    createDir("./src");
  } catch (error) {
    new ErrorHandler(
      error,
      "There was an error creating the console app."
    ).handleError();
  }
}
