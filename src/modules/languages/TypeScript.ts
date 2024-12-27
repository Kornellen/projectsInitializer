import inquirer from "inquirer";
import { appType } from "../../types/types";
import { execSync } from "child_process";
import ConsoleApp from "../AppTypes/server/ConsoleApp";
import ServerApp from "../AppTypes/server/ServerApp";
import checkFramework from "../AppTypes/client/FrontendApp";
import projectSummary from "../../helpers/creatingSummary";
import { createDir } from "../../helpers/createDirsFiles";
import ErrorHandler from "../../helpers/ErrorHandler";

export default async function TypeScript(
  projectType: "Plain" | "Framework",
  projectInfos: { projectName: string; projectPath: string }
) {
  try {
    projectInfos.projectPath = createDir(projectInfos.projectPath);

    process.chdir(projectInfos.projectPath);

    if (projectType === "Framework") {
      const { app }: { app: appType } = await inquirer.prompt({
        type: "list",
        name: "app",
        message: "Choose App Type",
        choices: ["Frontend", "Backend"],
      });

      switch (app) {
        case "Frontend":
          const { javaScriptFramework } = await inquirer.prompt({
            type: "list",
            name: "javaScriptFramework",
            message: "Choose Framework for Frontend",
            choices: ["React + Vite", "Next.js"],
          });
          await checkFramework(javaScriptFramework, projectInfos, "TypeScript");
          break;
        case "Backend":
          await ServerApp("TypeScript");
          break;
      }
    } else {
      const { app }: { app: appType } = await inquirer.prompt({
        type: "list",
        name: "app",
        message: "Choose App Type",
        choices: ["Console app"],
      });

      switch (app) {
        case "Console app":
          await ConsoleApp("TypeScript");
          break;
      }
    }

    await projectSummary(projectInfos, projectType);
  } catch (error) {
    new ErrorHandler(
      error,
      "There was an error creating the TypeScript project"
    ).handleError();
  }
}
