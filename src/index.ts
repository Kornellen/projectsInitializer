#!/usr/bin/env node

import selectLanguage from "./helpers/selectLanguage";
import colors from "colors";
import ErrorHandler from "./helpers/ErrorHandler";
import { UserInterations } from "./helpers/UserInteractions";
import { ProjectDetails } from "./helpers/ProjectDetails";
import { FileHelper } from "./helpers/FileHelper";

colors.enable();

class App {
  private static LANGUAGES_WITHOUT_FRAMEWORK_SUPPORT: string[] = [
    "SQL",
    "PowerShell",
    "C++",
    "Python",
  ];

  private static projectAppType: projectAppType = "Plain";

  public static async main(): Promise<void> {
    try {
      ErrorHandler.handleSIGNINT();
      const { language } = await UserInterations.prepareQuestion({
        type: "list",
        name: "language",
        message: "Choose Language for Project",
        choices: [
          "Python",
          "TypeScript",
          "JavaScript",
          "C++",
          "PowerShell",
          "SQL",
        ],
      });

      if (this.isSupportedLanguageFramework(language)) {
        const { projectAppType } = await UserInterations.prepareQuestion({
          type: "list",
          name: "projectAppType",
          message: "Choose Project App type",
          choices: ["Plain", "Framework"],
        });

        this.projectAppType = projectAppType;
      }

      await ProjectDetails.SetUpProjectDetails(language);

      selectLanguage(language, this.projectAppType);
    } catch (error) {
      throw new Error("There was an error");
    }
  }

  private static isSupportedLanguageFramework(language: string): boolean {
    return !this.LANGUAGES_WITHOUT_FRAMEWORK_SUPPORT.includes(language);
  }
}

App.main();
