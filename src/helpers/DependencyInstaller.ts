import { UserInterations } from "./UserInteractions";
import os from "os";
import child_process from "child_process";
export class DependencyInstaller {
  private static LANGUAGE_COMMANDS = {
    JavaScript: {
      Dev: (dependencies: string) => `npm i -D ${dependencies}`,
      Classic: (dependencies: string) => `npm i ${dependencies}`,
    },
    Python: {
      Dev: (dependencies: string) => {
        return os.platform() === "win32"
          ? `venv\\Scripts\\Activate.ps1 && pip install ${dependencies}`
          : `venv\\bin\\activate && venv\\bin\\pip install ${dependencies}`;
      },
      Classic: (dependencies: string) => `pip install ${dependencies}`,
    },
  };

  private static DEFAULT_DEPENDENCIES: Record<string, string[]> = {
    JavaScript: [],
    TypeScript: ["typescript", "ts-node", "@types/node"],
    Python: [],
  };
  public static async dependencyHandler(language: languageType) {
    const { dependenciesToInstall } = await UserInterations.prepareQuestion({
      type: "input",
      name: "dependenciesToInstall",
      message: "Enter additional dependencies to install",
    });

    const { isDevMode } = await UserInterations.prepareQuestion(
      {
        type: "confirm",
        name: "isDevMode",
        message: "Installing as Dev/Virutal Dependencies?",
      },
      { default: false }
    );

    if (language === "TypeScript") {
      await this.setUpTypeScript();
    }

    this.dependencyInstaller(language, dependenciesToInstall, isDevMode);
  }

  private static async dependencyInstaller(
    language: languageType,
    dependenciesToInstall: string,
    isDevMode: boolean
  ) {
    try {
      const installationVariant = isDevMode ? "Dev" : "Classic";
      let command: string = "";

      if (language === "JavaScript" || language === "TypeScript")
        command = this.LANGUAGE_COMMANDS["JavaScript"][installationVariant](
          dependenciesToInstall
        );
      if (language === "Python")
        command = this.LANGUAGE_COMMANDS["Python"][installationVariant](
          dependenciesToInstall
        );
      let response = child_process.exec(command);

      return response.exitCode;
    } catch (error) {
      console.log(error);
      throw new Error(`There was an Error installing Dependencies!\n${error}`);
    }
  }

  public static async setUpTypeScript(): Promise<void> {
    try {
      let command = this.LANGUAGE_COMMANDS["JavaScript"]["Dev"](
        this.DEFAULT_DEPENDENCIES["TypeScript"].join(" ")
      );
      command += "&& npx tsc --init";

      console.log(command);

      child_process.exec(command, (error) =>
        error ? console.error(error) : null
      );
    } catch (error) {
      throw new Error(`There was an error seting up TypeScript\n${error}`);
    }
  }

  public static async defaultDepInstaller(
    lang: "JavaScript" | "Python",
    deps: string[],
    isDev: boolean
  ): Promise<0 | 1> {
    console.log("Installing default libraries...");

    const installer: number | null = await this.dependencyInstaller(
      lang,
      deps.join(" "),
      isDev
    );

    if (installer) {
      return 1;
    }

    return 0;
  }
}
