import { UserInterations } from "../../../../../helpers/UserInteractions";
import { FileHelper } from "../../../../../helpers/FileHelper";
import { DependencyInstaller } from "../../../../../helpers/DependencyInstaller";

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
      if (language === "TypeScript") DependencyInstaller.setUpTypeScript();

      DependencyInstaller.defaultDepInstaller(
        "JavaScript",
        this.DEFAULT_SERVER_DEPS,
        false
      );

      const { isAdditionalDependencies } =
        await UserInterations.prepareQuestion({
          type: "confirm",
          name: "isAdditionalLibraries",
          message: `Is Backend App use other libraries? (Currently installed:\n${this.DEFAULT_SERVER_DEPS.join(
            ",\n"
          )})`,
        });

      if (isAdditionalDependencies)
        DependencyInstaller.dependencyHandler(language);

      this.DEFAULT_APP_STRUCTURE.forEach((directory) =>
        FileHelper.createDir(directory)
      );
    } catch (error) {
      throw new Error("There was an error creating new Server App");
    }
  }
}
