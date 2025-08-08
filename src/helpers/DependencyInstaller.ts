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
      const dependencies = new Set(dependenciesToInstall.split(" "));

      if (language === "TypeScript" && isDevMode) {
        this.DEFAULT_DEPENDENCIES["TypeScript"].forEach((dep) =>
          dependencies.add(dep)
        );
      }

      dependenciesToInstall = [...dependencies].join(" ");

      if (language === "JavaScript" || language === "TypeScript")
        command = this.LANGUAGE_COMMANDS["JavaScript"][installationVariant](
          dependenciesToInstall
        );
      if (language === "Python")
        command = this.LANGUAGE_COMMANDS["Python"][installationVariant](
          dependenciesToInstall
        );

      const { stderr } = child_process.exec(command);

      if (stderr) console.error(stderr);
    } catch (error) {
      throw new Error(`There was an Error installing Dependencies!\n${error}`);
    }
  }

  public static setUpTypeScript() {
    try {
      const command = this.LANGUAGE_COMMANDS["JavaScript"]["Dev"](
        this.DEFAULT_DEPENDENCIES["TypeScript"].join(" ")
      );

      child_process.exec(command);

      child_process.exec("npx tsc --init");
    } catch (error) {
      throw new Error(`There was an error seting up TypeScript\n${error}`);
    }
  }

  public static defaultDepInstaller(
    lang: "JavaScript" | "Python",
    deps: string[],
    isDev: boolean
  ) {
    if (lang === "JavaScript")
      child_process.exec(
        this.LANGUAGE_COMMANDS["JavaScript"][isDev ? "Dev" : "Classic"](
          deps.join(" ")
        )
      );

    if (lang === "Python")
      child_process.exec(
        this.LANGUAGE_COMMANDS["Python"][isDev ? "Dev" : "Classic"](
          deps.join(" ")
        )
      );
  }
}
