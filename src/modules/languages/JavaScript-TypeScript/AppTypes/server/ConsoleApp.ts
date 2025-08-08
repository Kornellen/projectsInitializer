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
      // console.log(
      //   "Default TypeScript dependencies are installed automaticaly !if you use dev mode! You don't have to mention them later! ".bgRed.bold()
      // );

      // DependencyInstaller.dependencyHandler("TypeScript");
      // execSync("npx tsc --init", { stdio: "inherit" });
      console.log("Initializing TypeScript...");

      DependencyInstaller.setUpTypeScript();
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
