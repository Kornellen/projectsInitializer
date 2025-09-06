import { execSync } from "child_process";
import { FileHelper } from "../../../../../helpers/FileHelper";
import { DependencyInstaller } from "../../../../../helpers/DependencyInstaller";
import { UserInterations } from "../../../../../helpers/UserInteractions";
export default async function ConsoleApp(
  language: "JavaScript" | "TypeScript"
) {
  try {
    console.log("Initialization of Console App...".blue);
    execSync("npm init -y");

    if (language === "TypeScript") {
      console.log("Initializing TypeScript...");
      await DependencyInstaller.dependencyHandler("TypeScript");
    }

    const { isAdditionalDependencies } = await UserInterations.prepareQuestion({
      type: "confirm",
      name: "isAdditionalDependencies",
      message: "Do you want to install other dependencies?",
    });

    if (isAdditionalDependencies)
      DependencyInstaller.dependencyHandler(language);

    FileHelper.createDir("./src");
  } catch (error) {
    throw new Error(
      `There was an error creating new Console App with ${language}`
    );
  }
}
