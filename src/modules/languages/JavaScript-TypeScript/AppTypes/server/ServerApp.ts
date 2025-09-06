import { UserInterations } from "../../../../../helpers/UserInteractions";
import { FileHelper } from "../../../../../helpers/FileHelper";
import { DependencyInstaller } from "../../../../../helpers/DependencyInstaller";
import { execSync } from "child_process";

export class ServerApp {
  private static DEFAULT_SERVER_DEPS = [
    "express",
    "express-validator",
    "cors",
    "dotenv",
    "http",
  ];
  private static DEFAULT_APP_STRUCTURE = [
    "src",
    "src/config",
    "src/routes",
    "src/controllers",
    "src/middlewares",
    "src/helpers",
  ];

  public static async main(language: "JavaScript" | "TypeScript") {
    try {
      execSync("npm init -y");

      if (language === "TypeScript") {
        console.log("Initializing TypeScript...");
        await DependencyInstaller.setUpTypeScript();
      }

      const isError = await DependencyInstaller.defaultDepInstaller(
        "JavaScript",
        this.DEFAULT_SERVER_DEPS,
        false
      );

      if (isError) {
        throw new Error(
          "There was an error installing default server libraries"
        );
      }

      const { isAdditionalDependencies } =
        await UserInterations.prepareQuestion({
          type: "confirm",
          name: "isAdditionalLibraries",
          message: `Is Backend App use other libraries? (Currently installed:\n${this.DEFAULT_SERVER_DEPS.join(
            ",\n"
          )})`,
        });

      if (isAdditionalDependencies)
        await DependencyInstaller.dependencyHandler(language);

      this.DEFAULT_APP_STRUCTURE.forEach((directory) =>
        FileHelper.createDir(directory)
      );
    } catch (error) {
      console.log(error);

      throw new Error("There was an error creating new Server App");
    }
  }
}
