import inquirer from "inquirer";
import { languageType } from "../types/types";
import { npmPackageInstaller, pipPackageInstaller } from "./packageInstallers";

export default async function additionalLibraries(language: languageType) {
  const { additionalLibraries } = await inquirer.prompt({
    type: "input",
    name: "additionalLibraries",
    message: "Type Additional Libraries to install",
  });
  if (language === "Python") {
    pipPackageInstaller(additionalLibraries.split(" "));
  } else if (language === "JavaScript" || language === "TypeScript") {
    const { saveDev } = await inquirer.prompt({
      type: "confirm",
      name: "saveDev",
      message: "Save Developer mode? (default: No)",
      default: false,
    });
    npmPackageInstaller(saveDev, additionalLibraries.split(" "));
  } else {
    return;
  }
}
