import inquirer from "inquirer";
import ConsoleApp from "../AppTypes/server/ConsoleApp";
import ServerApp from "../AppTypes/server/ServerApp";
import PlainWithHTMl from "../AppTypes/client/PlainWithHTML";
import { appType } from "../../types/types";
import checkFramework from "../AppTypes/client/FrontendApp";
import projectSummary from "../../helpers/creatingSummary";
import { createDir } from "../../helpers/createDirsFiles";
import ErrorHandler from "../../helpers/ErrorHandler";

export default async function JavaScript(
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
          await checkFramework(javaScriptFramework, projectInfos, "JavaScript");
          break;
        case "Backend":
          await ServerApp("JavaScript");
          break;
      }
    } else {
      const { app }: { app: appType } = await inquirer.prompt({
        type: "list",
        name: "app",
        message: "Choose App Type",
        choices: ["Console app", "Plain with HTML"],
      });

      switch (app) {
        case "Console app":
          await ConsoleApp("JavaScript");
          break;
        case "Plain with HTML":
          await PlainWithHTMl();
          break;
      }
    }
    await projectSummary(projectInfos, projectType);
  } catch (error) {
    new ErrorHandler(
      error,
      "There was an error creating the JavaScript project"
    ).handleError();
  }
}
